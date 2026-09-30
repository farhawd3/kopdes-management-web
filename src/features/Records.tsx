'use client';
import { useState } from 'react';
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
import { ListTodo, Columns3, CalendarDays, Search, Plus } from 'lucide-react';
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
  const [edit, setEdit] = useState<Item | null | undefined>(),
    [search, setSearch] = useState(''),
    [filter, setFilter] = useState(initialFilter),
    [workstream, setWorkstream] = useState(''),
    [priority, setPriority] = useState(''),
    [sort, setSort] = useState('due'),
    [view, setView] = useState('daftar'),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const query = useSearchParams(),
    router = useRouter();
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
      <div className="actions">
        <button onClick={() => setEdit(row)}>Detail / ubah</button>
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
        {entity === 'work-items' && (
          <>
            <button
              disabled={busy}
              onClick={() => void update(row, { due_date: addDays(String(row.data.due_date), 1) })}
            >
              +1 hari
            </button>
            <button
              disabled={busy}
              onClick={() => void update(row, { due_date: addDays(String(row.data.due_date), 7) })}
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
                      data: schemas['work-items'].parse({
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
            ['daftar', 'Daftar', ListTodo],
            ['papan', 'Papan', Columns3],
            ['kalender', 'Kalender', CalendarDays],
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
        </div>
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
      {!rows.length && (
        <div className="empty card">
          <h3>Belum ada catatan</h3>
          <p>Mulai dengan menambah {catalog[entity].title.toLowerCase()}, atau ubah filter Anda.</p>
        </div>
      )}
      {view === 'papan' && entity === 'work-items' ? (
        <div className="kanban">
          {options['work-items.status'].map((status) => (
            <section
              className="kanban-column"
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const row = all.find((item) => item.id === e.dataTransfer.getData('text/plain'));
                if (row)
                  void update(row, { status, completed_at: status === 'selesai' ? today() : '' });
              }}
            >
              <h3>
                {status} <small>{rows.filter((row) => row.data.status === status).length}</small>
              </h3>
              {rows.filter((row) => row.data.status === status).map(card)}
            </section>
          ))}
        </div>
      ) : view === 'kalender' && entity === 'work-items' ? (
        <TaskCalendar items={rows} render={card} />
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
                    <button className="task-title" onClick={() => setEdit(row)}>
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
    </section>
  );
}
