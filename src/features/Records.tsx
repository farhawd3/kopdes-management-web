'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { catalog, labels, options } from './catalog';
import { schemas, type Entity, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { Editor } from './Editor';
import { api } from '@/lib/client';
import { today, addDays, formatDate } from '@/lib/date';
import { readiness } from '@/lib/progress';
import { Meter, RiskMatrix } from '@/components/charts/Charts';
import { TaskCalendar } from './TaskCalendar';
import { ReadinessRadar } from '@/components/charts/ReadinessRadar';
import { InfluenceMap } from '@/components/charts/InfluenceMap';
import {
  ListTodo,
  Columns3,
  CalendarDays,
  Search,
  Plus,
  ChartGantt,
  CalendarClock,
  UploadCloud,
  Target,
  X,
} from 'lucide-react';
import { TaskTimeline } from './TaskTimeline';
import { downloadMeeting } from './meeting';
import { DailyTasksView } from './DailyTasksView';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { SprintModal } from './SprintModal';
import { SprintCard } from './SprintCard';
import { CsvDropzone } from '@/components/ui/CsvDropzone';
import { ScrumBoardView } from './ScrumBoardView';
export function Records({
  entity,
  workspace,
  refresh,
  initialFilter = '',
  scopeId,
}: {
  entity: Entity;
  workspace: Workspace;
  refresh: () => Promise<void>;
  initialFilter?: string;
  scopeId?: string;
}) {
  const query = useSearchParams(),
    router = useRouter();
  const [edit, setEdit] = useState<Item | null | undefined>(),
    [detailTask, setDetailTask] = useState<Item | null>(null),
    [showSprintModal, setShowSprintModal] = useState<Item | boolean>(false),
    [showCsvModal, setShowCsvModal] = useState(false),
    [sprintFilter, setSprintFilter] = useState(''),
    [quickTitle, setQuickTitle] = useState(''),
    [search, setSearch] = useState(''),
    [filter, setFilter] = useState(initialFilter),
    [workstream, setWorkstream] = useState(''),
    [priority, setPriority] = useState(''),
    [sort, setSort] = useState('due'),
    [view, setView] = useState(
      query.get('view') === 'kalender'
        ? 'kalender'
        : query.get('view') === 'harian'
          ? 'harian'
          : 'daftar',
    ),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  function createTask(date = today(), status = 'rencana') {
    setEdit({
      id: '',
      created_at: '',
      updated_at: '',
      data: {
        ...schemas['work-items'].parse({
          title: 'Tugas baru',
          due_date: date,
          status,
          workstream_id: scopeId || workstream || '',
          sprint_id: sprintFilter || '',
        }),
        title: '',
      },
    });
  }
  const requestedView = query.get('view');
  useEffect(() => {
    // A sidebar link can change only the query while this page remains mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requestedView === 'kalender') setView('kalender');
    else if (requestedView === 'harian') setView('harian');
  }, [requestedView]);
  const quickAdd = entity === 'work-items' && query.get('baru') === '1';
  const effectiveFilter = filter || (entity === 'work-items' ? query.get('status') || '' : '');
  const all = (workspace[entity] || []).filter(
      (row) => !scopeId || row.data.workstream_id === scopeId,
    ),
    rows = all
      .filter(
        (row) =>
          JSON.stringify(row.data)
            .toLocaleLowerCase('id')
            .includes(search.toLocaleLowerCase('id')) &&
          (!effectiveFilter ||
            (effectiveFilter === 'terlambat'
              ? String(row.data.due_date) < today() &&
                !['selesai', 'dibatalkan'].includes(String(row.data.status))
              : row.data.status === effectiveFilter)) &&
          (!workstream || row.data.workstream_id === workstream) &&
          (!sprintFilter || row.data.sprint_id === sprintFilter) &&
          (!priority || row.data.priority === priority),
      )
      .sort((a, b) =>
        sort === 'title'
          ? String(a.data.title).localeCompare(String(b.data.title), 'id')
          : sort === 'updated'
            ? b.updated_at.localeCompare(a.updated_at)
            : String(a.data.due_date || a.data.date || '').localeCompare(
                String(b.data.due_date || b.data.date || ''),
              ),
      );
  const update = async (item: Item, changes: Record<string, unknown>) => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await api(entity, { id: item.id, data: { ...item.data, ...changes } });
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const card = (row: Item) => (
    <article
      className="record card"
      key={row.id}
      draggable={entity === 'work-items' && view === 'papan'}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', row.id)}
    >
      <div className="section-head">
        <h3>{String(row.data.title)}</h3>
        {Boolean(row.data.status) && (
          <span className={'badge ' + (row.data.status === 'selesai' ? 'ok' : '')}>
            {String(row.data.status)}
          </span>
        )}
      </div>
      <div className="record-meta">
        {entity === 'meetings' && (
          <>
            <span>{String(row.data.time)} WIB</span>
            <span>{String(row.data.mode || 'tatap muka')}</span>
          </>
        )}
        {Boolean(row.data.assignee) && <span>{String(row.data.assignee)}</span>}
        {Boolean(row.data.priority) && <span>Prioritas {String(row.data.priority)}</span>}
        {Boolean(row.data.due_date || row.data.date) && (
          <span
            className={
              String(row.data.due_date) < today() &&
              !['selesai', 'dibatalkan'].includes(String(row.data.status))
                ? 'late'
                : ''
            }
          >
            {formatDate(String(row.data.due_date || row.data.date))}
          </span>
        )}
      </div>
      {entity === 'units' && (
        <Meter
          value={readiness(
            (workspace.checklist || [])
              .filter((i) => i.data.unit_id === row.id)
              .map((i) => schemas.checklist.parse(i.data)),
          )}
        />
      )}
      {entity === 'units' && (
        <ReadinessRadar
          items={(workspace.checklist || [])
            .filter((item) => item.data.unit_id === row.id)
            .map((item) => schemas.checklist.parse(item.data))}
        />
      )}
      {entity === 'checklist' && (
        <p>
          {row.data.required ? 'Wajib' : 'Opsional'} · {String(row.data.dimension)}
          {row.data.evidence ? ` · ${String(row.data.evidence)}` : ''}
        </p>
      )}
      {entity === 'documents' && Boolean(row.data.expires_date) && (
        <p className={String(row.data.expires_date) <= addDays(today(), 30) ? 'late' : ''}>
          Berlaku sampai {formatDate(String(row.data.expires_date))}
        </p>
      )}
      {entity === 'risks' && (
        <p>
          Skor {Number(row.data.probability) * Number(row.data.impact)}/25 ·{' '}
          {String(row.data.mitigation || 'Mitigasi belum dicatat')}
        </p>
      )}
      {entity === 'stakeholders' && (
        <p>
          {String(row.data.category)} ·{' '}
          {row.data.last_contact
            ? `Kontak terakhir ${formatDate(String(row.data.last_contact))}`
            : 'Belum ada kontak'}
          {String(row.data.last_contact) < addDays(today(), -14) ? ' · Perlu dihubungi' : ''}
        </p>
      )}
      {['description', 'notes', 'minutes', 'reason', 'follow_up'].map((key) =>
        row.data[key] ? (
          <p className="record-text" key={key}>
            <strong>{labels[key]}: </strong>
            {String(row.data[key])}
          </p>
        ) : null,
      )}
      {Boolean(row.data.link) && (
        <a href={String(row.data.link)} target="_blank" rel="noreferrer">
          Buka tautan ↗
        </a>
      )}
      {entity === 'meetings' && (
        <>
          {Boolean(row.data.location) && <p>Lokasi: {String(row.data.location)}</p>}
          {Boolean(row.data.agenda) && (
            <p className="record-text">
              <strong>Agenda: </strong>
              {String(row.data.agenda)}
            </p>
          )}
          {Boolean(row.data.participants) && <p>Peserta: {String(row.data.participants)}</p>}
          {Boolean(row.data.meeting_url) && /^https?:\/\//.test(String(row.data.meeting_url)) && (
            <a
              className="button meeting-join"
              href={String(row.data.meeting_url)}
              target="_blank"
              rel="noreferrer"
            >
              Bergabung ke rapat ↗
            </a>
          )}
          <button className="meeting-join" onClick={() => downloadMeeting(row)}>
            Unduh agenda (.ics)
          </button>
        </>
      )}
      {entity === 'work-items' &&
        Array.isArray(row.data.subtasks) &&
        row.data.subtasks.length > 0 && (
          <div className="subtask-list">
            <small>
              {row.data.subtasks.filter((task) => task.done).length}/{row.data.subtasks.length}{' '}
              subtugas selesai
            </small>
            {(row.data.subtasks as { title: string; done: boolean }[]).map((task, index) => (
              <label className="check" key={index}>
                <input
                  type="checkbox"
                  checked={task.done}
                  disabled={busy}
                  onChange={(event) =>
                    void update(row, {
                      subtasks: (row.data.subtasks as { title: string; done: boolean }[]).map(
                        (subtask, i) =>
                          i === index ? { ...subtask, done: event.target.checked } : subtask,
                      ),
                    })
                  }
                />
                <span>{task.title}</span>
              </label>
            ))}
          </div>
        )}
      <div className="actions">
        <button onClick={() => (entity === 'work-items' ? setDetailTask(row) : setEdit(row))}>
          Buka catatan
        </button>
        {(entity === 'work-items' || entity === 'checklist') && row.data.status !== 'selesai' && (
          <button
            disabled={busy}
            onClick={() =>
              void update(row, {
                status: 'selesai',
                ...(entity === 'work-items' ? { completed_at: today() } : {}),
              })
            }
          >
            ✓ Selesai
          </button>
        )}
        <details className="record-options">
          <summary>Opsi lainnya</summary>
          <div className="actions">
            {entity === 'work-items' && (
              <>
                <button
                  disabled={busy}
                  onClick={() =>
                    void update(row, { due_date: addDays(String(row.data.due_date), 1) })
                  }
                >
                  +1 hari
                </button>
                <button
                  disabled={busy}
                  onClick={() =>
                    void update(row, { due_date: addDays(String(row.data.due_date), 7) })
                  }
                >
                  +1 minggu
                </button>
                <label className="inline-label">
                  Status
                  <select
                    value={String(row.data.status)}
                    disabled={busy}
                    onChange={(e) =>
                      void update(row, {
                        status: e.target.value,
                        completed_at: e.target.value === 'selesai' ? today() : '',
                      })
                    }
                  >
                    {options['work-items.status'].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
              </>
            )}
            {(entity === 'meetings' || entity === 'issues') && (
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('hub-task', {
                      detail: {
                        title: `Tindak lanjut: ${row.data.title}`,
                        description:
                          entity === 'meetings'
                            ? String(row.data.minutes || row.data.agenda || '')
                            : String(row.data.description || ''),
                        notes: `Sumber ${entity}: ${row.id}`,
                        ...(entity === 'meetings' ? { meeting_id: row.id } : { issue_id: row.id }),
                      },
                    }),
                  );
                }}
              >
                + Tindak lanjut
              </button>
            )}
            {!['organization', 'workstreams'].includes(entity) && (
              <button
                className="danger"
                disabled={busy}
                onClick={async () => {
                  if (!confirm(`Hapus “${row.data.title}”?`)) return;
                  setBusy(true);
                  try {
                    await api(entity, { id: row.id }, 'DELETE');
                    await refresh();
                  } catch (e) {
                    setError((e as Error).message);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Hapus
              </button>
            )}
          </div>
        </details>
      </div>
    </article>
  );
  return (
    <section className={entity === 'work-items' ? 'task-database' : undefined}>
      <div className="section-head">
        <div>
          <h2>{catalog[entity].title}</h2>
          <p>{catalog[entity].description}</p>
        </div>
        <button
          className="primary"
          onClick={() =>
            setEdit(
              entity === 'organization' && all[0]
                ? all[0]
                : scopeId
                  ? {
                      id: '',
                      created_at: '',
                      updated_at: '',
                      data: schemas[entity].parse({
                        title: 'Tugas baru',
                        due_date: today(),
                        workstream_id: scopeId,
                      }),
                    }
                  : null,
            )
          }
        >
          <Plus size={16} />{' '}
          {entity === 'organization' && all.length
            ? 'Ubah profil'
            : entity === 'work-items'
              ? 'Tugas baru'
              : 'Tambah'}
        </button>
      </div>
      {entity === 'work-items' && (
        <div className="database-views" aria-label="Tampilan tugas">
          {[
            ['harian', 'Harian', CalendarClock],
            ['papan', 'Scrum View', Columns3],
            ['daftar', 'Daftar', ListTodo],
            ['kalender', 'Kalender', CalendarDays],
            ['gantt', 'Gantt', ChartGantt],
          ].map(([value, label, Icon]) => {
            const ViewIcon = Icon as typeof ListTodo;
            return (
              <button
                key={String(value)}
                aria-pressed={view === value}
                onClick={() => setView(String(value))}
              >
                <ViewIcon size={17} />
                {String(label)}
              </button>
            );
          })}
          <span>{rows.length} tugas</span>
          <div className="view-extra-actions">
            <button
              type="button"
              className="btn-sprint-trigger"
              title="Kelola Target Periode (Sprint)"
              onClick={() => setShowSprintModal(true)}
            >
              <Target size={15} />
              <span>Sprint</span>
            </button>
            <button
              type="button"
              className="btn-csv-trigger"
              title="Tarik & Lepas File CSV"
              onClick={() => setShowCsvModal(true)}
            >
              <UploadCloud size={15} />
              <span>Impor CSV</span>
            </button>
          </div>
        </div>
      )}
      {entity === 'work-items' && (workspace.sprints || []).length > 0 && !sprintFilter && (
        <div className="active-sprints-row">
          {(workspace.sprints || [])
            .filter((s) => s.data.status === 'aktif')
            .map((sprint) => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                tasks={all}
                onEdit={(item) => setShowSprintModal(item)}
                onRefresh={refresh}
              />
            ))}
        </div>
      )}
      {entity === 'work-items' && (
        <form
          className="inline-task"
          onSubmit={async (event) => {
            event.preventDefault();
            if (busy || !quickTitle.trim()) return;
            setBusy(true);
            setError('');
            try {
              await api(entity, {
                data: schemas['work-items'].parse({
                  title: quickTitle,
                  due_date: today(),
                  workstream_id: scopeId || workstream || '',
                }),
              });
              await refresh();
              setQuickTitle('');
            } catch (error) {
              setError((error as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Plus size={17} />
          <input
            aria-label="Tulis tugas baru"
            value={quickTitle}
            maxLength={200}
            onChange={(event) => setQuickTitle(event.target.value)}
            placeholder="Tulis tugas, lalu Enter…"
          />
          <small>Tenggat hari ini</small>
          <button disabled={busy || !quickTitle.trim()} type="submit">
            Tambah
          </button>
        </form>
      )}
      <div className="filters">
        <label>
          <span className="field-caption">
            <Search size={14} /> Cari
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Judul, penanggung jawab, catatan…"
          />
        </label>
        {options[entity + '.status'] && (
          <label>
            Status
            <select
              value={effectiveFilter}
              onChange={(e) => {
                setFilter(e.target.value);
                if (entity === 'work-items' && query.has('status'))
                  router.replace(scopeId ? `/proyek?id=${scopeId}` : '/tugas');
              }}
            >
              <option value="">Semua status</option>
              {entity === 'work-items' && <option value="terlambat">Terlambat</option>}
              {options[entity + '.status'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
        {!scopeId && ['work-items', 'checklist'].includes(entity) && (
          <label>
            Proyek / bidang kerja
            <select value={workstream} onChange={(e) => setWorkstream(e.target.value)}>
              <option value="">Semua proyek</option>
              {(workspace.workstreams || []).map((row) => (
                <option key={row.id} value={row.id}>
                  {String(row.data.title)}
                </option>
              ))}
            </select>
          </label>
        )}
        {entity === 'work-items' && (workspace.sprints || []).length > 0 && (
          <label>
            Target periode
            <select value={sprintFilter} onChange={(e) => setSprintFilter(e.target.value)}>
              <option value="">Semua periode (Sprint)</option>
              {(workspace.sprints || []).map((row) => (
                <option key={row.id} value={row.id}>
                  {String(row.data.title)}
                </option>
              ))}
            </select>
          </label>
        )}
        {entity === 'work-items' && (
          <>
            <label>
              Prioritas
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Semua prioritas</option>
                {options.priority.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              Urutkan
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="due">Tenggat terdekat</option>
                <option value="title">Nama tugas</option>
                <option value="updated">Terakhir diubah</option>
              </select>
            </label>
          </>
        )}
      </div>
      {error && (
        <p className="notice error" role="alert">
          {error}
        </p>
      )}
      {entity === 'risks' && <RiskMatrix items={rows} />}
      {entity === 'stakeholders' && <InfluenceMap items={rows} />}
      {!rows.length && view === 'daftar' && (
        <div className="empty card">
          <h3>Belum ada catatan</h3>
          <p>Mulai dengan menambah {catalog[entity].title.toLowerCase()}, atau ubah filter Anda.</p>
        </div>
      )}
      {view === 'harian' && entity === 'work-items' ? (
        <DailyTasksView
          tasks={rows}
          workspace={workspace}
          onOpenTask={(task) => setDetailTask(task)}
          onCreateTask={(date) => createTask(date)}
          onRefresh={refresh}
        />
      ) : view === 'gantt' && entity === 'work-items' ? (
        <TaskTimeline
          key={scopeId || workstream}
          items={rows}
          workspace={workspace}
          refresh={refresh}
          scopeId={scopeId || workstream || undefined}
        />
      ) : view === 'papan' && entity === 'work-items' ? (
        <ScrumBoardView
          tasks={rows}
          workspace={workspace}
          onOpenTask={(task) => setDetailTask(task)}
          onCreateTask={(status) => createTask(today(), status)}
          onRefresh={refresh}
        />
      ) : view === 'kalender' && entity === 'work-items' ? (
        <TaskCalendar
          items={rows}
          render={card}
          onCreate={createTask}
          onEdit={(item) => setDetailTask(item)}
        />
      ) : entity === 'work-items' && rows.length ? (
        <div className="task-table-wrap">
          <table className="task-table">
            <thead>
              <tr>
                <th>Tugas</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Tenggat</th>
                <th>Penanggung jawab</th>
                <th>
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <button className="task-title" onClick={() => setDetailTask(row)}>
                      <span className="task-code-badge-inline">
                        {String(row.data.code || `#KD-${row.id.slice(0, 4).toUpperCase()}`)}
                      </span>
                      {String(row.data.title)}
                    </button>
                    <small>
                      {String(
                        workspace.workstreams?.find(
                          (project) => project.id === row.data.workstream_id,
                        )?.data.title || 'Tanpa proyek',
                      )}
                    </small>
                  </td>
                  <td>
                    <label>
                      <span className="sr-only">Status {String(row.data.title)}</span>
                      <select
                        disabled={busy}
                        value={String(row.data.status)}
                        onChange={(event) =>
                          void update(row, {
                            status: event.target.value,
                            completed_at: event.target.value === 'selesai' ? today() : '',
                          })
                        }
                      >
                        {options['work-items.status'].map((value) => (
                          <option key={value}>{value}</option>
                        ))}
                      </select>
                    </label>
                  </td>
                  <td>
                    <span className={`badge priority-${row.data.priority}`}>
                      {String(row.data.priority)}
                    </span>
                  </td>
                  <td
                    className={
                      String(row.data.due_date) < today() &&
                      !['selesai', 'dibatalkan'].includes(String(row.data.status))
                        ? 'late'
                        : ''
                    }
                  >
                    {formatDate(String(row.data.due_date))}
                  </td>
                  <td>{String(row.data.assignee || '—')}</td>
                  <td>
                    {!['selesai', 'dibatalkan'].includes(String(row.data.status)) && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          void update(row, { status: 'selesai', completed_at: today() })
                        }
                      >
                        ✓ Selesai
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="records">{rows.map(card)}</div>
      )}
      {(edit !== undefined || quickAdd) && (
        <Editor
          entity={entity}
          item={edit || undefined}
          quick={quickAdd}
          workspace={workspace}
          onClose={() => {
            setEdit(undefined);
            if (quickAdd) router.replace('/tugas');
          }}
          onSaved={refresh}
        />
      )}
      {detailTask && entity === 'work-items' && (
        <TaskDetailDrawer
          task={detailTask}
          workspace={workspace}
          onClose={() => setDetailTask(null)}
          onUpdated={async () => {
            await refresh();
            const refreshed = (workspace['work-items'] || []).find((t) => t.id === detailTask.id);
            if (refreshed) setDetailTask(refreshed);
          }}
          onPrev={() => {
            const idx = rows.findIndex((t) => t.id === detailTask.id);
            if (idx > 0) setDetailTask(rows[idx - 1]);
          }}
          onNext={() => {
            const idx = rows.findIndex((t) => t.id === detailTask.id);
            if (idx >= 0 && idx < rows.length - 1) setDetailTask(rows[idx + 1]);
          }}
        />
      )}
      {showSprintModal && (
        <SprintModal
          sprint={typeof showSprintModal === 'object' ? showSprintModal : null}
          onClose={() => setShowSprintModal(false)}
          onSaved={refresh}
        />
      )}
      {showCsvModal && (
        <dialog className="csv-import-dialog" open>
          <div className="section-head">
            <h3>Impor File CSV — {catalog[entity].title}</h3>
            <button
              type="button"
              className="close-dialog-btn"
              onClick={() => setShowCsvModal(false)}
            >
              <X size={18} />
            </button>
          </div>
          <p className="dialog-sub">
            Unggah file CSV dengan kolom sesuai format data untuk menambahkan data secara langsung.
          </p>
          <CsvDropzone
            onDataParsed={async (parsedRows) => {
              setBusy(true);
              setError('');
              try {
                for (const row of parsedRows) {
                  if (row.title && row.title.trim()) {
                    const fallbackData: Record<string, unknown> = {
                      due_date: today(),
                      date: today(),
                      ...row,
                    };
                    const parsed = schemas[entity].parse(fallbackData);
                    await api(entity, { data: parsed });
                  }
                }
                await refresh();
                setShowCsvModal(false);
              } catch (err) {
                setError((err as Error).message || 'Gagal mengimpor beberapa baris data CSV.');
              } finally {
                setBusy(false);
              }
            }}
          />
          {error && <p className="notice error">{error}</p>}
        </dialog>
      )}
    </section>
  );
}
