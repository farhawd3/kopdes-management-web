'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { catalog, labels, options, formatChoiceLabel } from './catalog';
import { schemas, type Entity, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { SavedTaskViews, type TaskView } from './SavedTaskViews';
import { TaskBatchActions } from './TaskBatchActions';
import { Editor } from './Editor';
import { api } from '@/lib/client';
import { today, addDays, formatDate } from '@/lib/date';
import { readiness } from '@/lib/progress';
import { Meter, RiskMatrix } from '@/components/charts/Charts';
import { TaskCalendar } from './TaskCalendar';
import { ReadinessRadar } from '@/components/charts/ReadinessRadar';
import { Select } from '@/components/ui/Select';
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
  Shield,
  Landmark,
  Scale,
  Users2,
  Building2,
  Wheat,
  Handshake,
  CircleDot,
  Clock,
  MapPin,
  Users,
  BookOpen,
  FileText,
  Phone,
  AlertTriangle,
  FolderOpen,
  CheckCircle2,
  Video,
  AlertCircle,
  ShieldCheck,
  FolderArchive,
  Check,
  CheckSquare,
  RotateCw,
  Flame,
  ArrowUpRight,
  Calendar,
} from 'lucide-react';
import { TaskTimeline } from './TaskTimeline';
import { downloadMeeting } from './meeting';
import { DailyTasksView } from './DailyTasksView';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { SprintModal } from './SprintModal';
import { SprintCard } from './SprintCard';
import { CsvDropzone } from '@/components/ui/CsvDropzone';
import { ScrumBoardView } from './ScrumBoardView';

function getStakeholderCategoryClass(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('keamanan') || cat.includes('babinsa') || cat.includes('bhabinkamtibmas'))
    return 'badge-security';
  if (
    cat.includes('pemerintah') ||
    cat.includes('kepala desa') ||
    cat.includes('kades') ||
    cat.includes('bpd')
  )
    return 'badge-gov';
  if (cat.includes('pengawas')) return 'badge-supervisor';
  if (cat.includes('pengurus') || cat.includes('pengelola')) return 'badge-board';
  if (cat.includes('dinas') || cat.includes('pembina')) return 'badge-agency';
  if (cat.includes('masyarakat') || cat.includes('tani') || cat.includes('gapoktan'))
    return 'badge-community';
  if (cat.includes('mitra') || cat.includes('pemasok')) return 'badge-partner';
  return 'badge-general';
}

function getStakeholderCategoryIcon(category: string): React.ReactElement {
  const cat = category.toLowerCase();
  if (cat.includes('keamanan') || cat.includes('babinsa') || cat.includes('bhabinkamtibmas'))
    return <Shield size={13} />;
  if (
    cat.includes('pemerintah') ||
    cat.includes('kepala desa') ||
    cat.includes('kades') ||
    cat.includes('bpd')
  )
    return <Landmark size={13} />;
  if (cat.includes('pengawas')) return <Scale size={13} />;
  if (cat.includes('pengurus') || cat.includes('pengelola')) return <Users2 size={13} />;
  if (cat.includes('dinas') || cat.includes('pembina')) return <Building2 size={13} />;
  if (cat.includes('masyarakat') || cat.includes('tani') || cat.includes('gapoktan'))
    return <Wheat size={13} />;
  if (cat.includes('mitra') || cat.includes('pemasok')) return <Handshake size={13} />;
  return <CircleDot size={13} />;
}

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
  const [edit, setEdit] = useState<Item | null | undefined>(() =>
      (workspace[entity] || []).find((row) => row.id === query.get('record')),
    ),
    [detailTask, setDetailTask] = useState<Item | null>(() =>
      entity === 'work-items'
        ? (workspace['work-items'] || []).find((item) => item.id === query.get('task')) || null
        : null,
    ),
    [showSprintModal, setShowSprintModal] = useState<Item | boolean>(false),
    [showCsvModal, setShowCsvModal] = useState(false),
    [sprintFilter, setSprintFilter] = useState(''),
    [filtersOpen, setFiltersOpen] = useState(false),
    [quickTitle, setQuickTitle] = useState(''),
    [search, setSearch] = useState(''),
    [filter, setFilter] = useState<string | null>(initialFilter || null),
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
    else setView('daftar');
  }, [requestedView]);
  const quickAdd = query.get('baru') === '1';
  function closeTaskDetail() {
    setDetailTask(null);
    if (query.get('task')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('task');
      router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    }
  }
  const effectiveFilter = filter ?? (entity === 'work-items' ? query.get('status') || '' : '');
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
        {entity === 'stakeholders' && Boolean(row.data.category) && (
          <span
            className={`stakeholder-badge ${getStakeholderCategoryClass(String(row.data.category))}`}
          >
            {getStakeholderCategoryIcon(String(row.data.category))} {String(row.data.category)}
          </span>
        )}
      </div>
      <div className="record-meta">
        {entity === 'meetings' && (
          <>
            <span className="meeting-time-tag">
              <Clock size={12} /> {String(row.data.time)} WIB
            </span>
            <span
              className={`meeting-mode-tag mode-${String(row.data.mode || 'tatap muka').replace(' ', '-')}`}
            >
              {String(row.data.mode).toLowerCase() === 'online'
                ? 'Online'
                : String(row.data.mode).toLowerCase() === 'hybrid'
                  ? 'Hybrid'
                  : 'Tatap Muka'}
            </span>
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
      {entity === 'documents' && (
        <div className="document-card-details">
          <div className="doc-meta-pills">
            {Boolean(row.data.number) && (
              <span className="doc-number-pill">No: {String(row.data.number)}</span>
            )}
            {Boolean(row.data.kind) && (
              <span className="doc-kind-pill">{String(row.data.kind)}</span>
            )}
            <span
              className={`doc-status-pill status-${String(row.data.status || 'belum ada').replace(/\s+/g, '-')}`}
            >
              {String(row.data.status) === 'tersedia' ? (
                <>
                  <CheckCircle2 size={12} />
                  <span>Tersedia Lengkap</span>
                </>
              ) : String(row.data.status) === 'diproses' ? (
                <>
                  <Clock size={12} />
                  <span>Sedang Diproses</span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} />
                  <span>Belum Ada / Diurus</span>
                </>
              )}
            </span>
          </div>
          <div className="doc-dates-row">
            {Boolean(row.data.issued_date) && (
              <span className="doc-date">Terbit: {formatDate(String(row.data.issued_date))}</span>
            )}
            {Boolean(row.data.expires_date) ? (
              <span
                className={`doc-expiry ${
                  String(row.data.expires_date) < today()
                    ? 'is-expired'
                    : String(row.data.expires_date) <= addDays(today(), 30)
                      ? 'is-near-expiry'
                      : 'is-valid'
                }`}
              >
                {String(row.data.expires_date) < today() ? (
                  <>
                    <AlertCircle size={13} /> Kadaluwarsa (
                    {formatDate(String(row.data.expires_date))})
                  </>
                ) : String(row.data.expires_date) <= addDays(today(), 30) ? (
                  <>
                    <Clock size={13} /> Berakhir dalam 30 hari (
                    {formatDate(String(row.data.expires_date))})
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={13} /> Berlaku s.d.{' '}
                    {formatDate(String(row.data.expires_date))}
                  </>
                )}
              </span>
            ) : (
              <span className="doc-expiry is-permanent">
                <ShieldCheck size={13} /> Masa berlaku tetap
              </span>
            )}
          </div>
        </div>
      )}
      {entity === 'risks' &&
        (() => {
          const prob = Number(row.data.probability || 3);
          const imp = Number(row.data.impact || 3);
          const score = prob * imp;
          const level =
            score >= 15
              ? { label: 'Bahaya Kritis', cls: 'risk-critical', desc: 'Perlu tindakan segera' }
              : score >= 8
                ? { label: 'Perlu Waspada', cls: 'risk-warning', desc: 'Siapkan mitigasi' }
                : { label: 'Terkendali', cls: 'risk-safe', desc: 'Dalam SOP standar' };
          return (
            <div className="risk-card-details">
              <div className="risk-level-strip">
                <span className={`risk-level-badge ${level.cls}`}>
                  {level.label} ({score}/25)
                </span>
                <span className="risk-level-desc">{level.desc}</span>
              </div>
              {Boolean(row.data.mitigation) && (
                <p className="record-text">
                  <strong>Rencana Mitigasi: </strong>
                  {String(row.data.mitigation)}
                </p>
              )}
              {Boolean(row.data.review_date) && (
                <small className="risk-review-date">
                  Jadwal Tinjau: {formatDate(String(row.data.review_date))}
                </small>
              )}
            </div>
          );
        })()}
      {entity === 'stakeholders' &&
        (() => {
          const rawContact = String(row.data.contact || '').trim();
          const phoneDigits = rawContact.replace(/[^\d+]/g, '');
          const isPhone = phoneDigits.length >= 8;
          const waPhone = phoneDigits.startsWith('0')
            ? '62' + phoneDigits.slice(1)
            : phoneDigits.replace(/^\+/, '');
          const lastContactStr = String(row.data.last_contact || '');
          const isLate = Boolean(lastContactStr && lastContactStr < addDays(today(), -14));
          const interactions = (workspace.interactions || []).filter(
            (i) => i.data.stakeholder_id === row.id,
          );

          return (
            <div className="stakeholder-card-body">
              {rawContact && (
                <div className="stakeholder-contact-row">
                  <span className="contact-text">
                    <span className="contact-icon">
                      <Phone size={12} />
                    </span>{' '}
                    {rawContact}
                  </span>
                  {isPhone && (
                    <div className="contact-actions">
                      <a
                        href={`https://wa.me/${waPhone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button wa-btn"
                        title="Kirim pesan WhatsApp"
                      >
                        WhatsApp ↗
                      </a>
                      <a
                        href={`tel:${phoneDigits}`}
                        className="button call-btn"
                        title="Panggil nomor telepon"
                      >
                        Telepon
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="stakeholder-comm-status">
                <span className={`comm-date ${isLate ? 'late-warning' : ''}`}>
                  {lastContactStr
                    ? `Kontak terakhir: ${formatDate(lastContactStr)}`
                    : 'Belum ada catatan interaksi'}
                  {isLate ? ' · Perlu dihubungi kembali (>14 hari)' : ''}
                </span>
                {interactions.length > 0 && (
                  <span className="comm-count">{interactions.length} riwayat interaksi</span>
                )}
              </div>
            </div>
          );
        })()}
      {['description', 'notes', 'minutes', 'reason', 'follow_up']
        .filter((key) => entity !== 'stakeholders' || key !== 'follow_up')
        .map((key) =>
          row.data[key] ? (
            <p className="record-text" key={key}>
              <strong>{labels[key]}: </strong>
              {String(row.data[key])}
            </p>
          ) : null,
        )}
      {entity === 'stakeholders' && Boolean(row.data.follow_up) && (
        <div className="stakeholder-followup-callout">
          <strong>Tindak Lanjut:</strong> {String(row.data.follow_up)}
        </div>
      )}
      {Boolean(row.data.link) && (
        <a href={String(row.data.link)} target="_blank" rel="noreferrer">
          Buka tautan ↗
        </a>
      )}
      {entity === 'meetings' &&
        (() => {
          const linkedDecisions = (workspace.decisions || []).filter(
            (d) => d.data.meeting_id === row.id,
          );
          return (
            <div className="meeting-card-details">
              {Boolean(row.data.location) && String(row.data.mode).toLowerCase() !== 'online' && (
                <p className="meeting-detail-row">
                  <MapPin size={13} />
                  <strong>Tempat / Lokasi: </strong>
                  <span>{String(row.data.location)}</span>
                </p>
              )}
              {Boolean(row.data.participants) && (
                <p className="meeting-detail-row">
                  <Users size={13} />
                  <strong>Peserta Rapat: </strong>
                  <span>{String(row.data.participants)}</span>
                </p>
              )}
              {Boolean(row.data.agenda) && (
                <div className="meeting-section-box">
                  <BookOpen size={13} />
                  <strong>Agenda Pembahasan: </strong>
                  <p className="record-text">{String(row.data.agenda)}</p>
                </div>
              )}
              {Boolean(row.data.minutes) && (
                <div className="meeting-section-box">
                  <FileText size={13} />
                  <strong>Notulen / Hasil Kesepakatan: </strong>
                  <p className="record-text">{String(row.data.minutes)}</p>
                </div>
              )}
              {linkedDecisions.length > 0 && (
                <div className="meeting-section-box meeting-decisions-box">
                  <div className="meeting-decisions-head">
                    <CheckCircle2 size={13} />
                    <strong>Keputusan Terkait ({linkedDecisions.length}):</strong>
                  </div>
                  <ul className="meeting-decisions-list">
                    {linkedDecisions.map((dec) => (
                      <li key={dec.id}>
                        <span className="decision-title">{String(dec.data.title)}</span>
                        {dec.data.reason ? (
                          <span className="decision-reason"> · {String(dec.data.reason)}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="meeting-action-row">
                {Boolean(row.data.meeting_url) &&
                  String(row.data.mode).toLowerCase() !== 'tatap muka' &&
                  /^https?:\/\//.test(String(row.data.meeting_url)) && (
                    <a
                      className="button meeting-join btn-join-meeting"
                      href={String(row.data.meeting_url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Video size={13} />
                      Masuk Rapat Online ↗
                    </a>
                  )}
                <button
                  className="button meeting-join btn-download-ics"
                  onClick={() => downloadMeeting(row)}
                  title="Unduh jadwal rapat .ics"
                >
                  Unduh Jadwal (.ics)
                </button>
                <button
                  className="button meeting-followup-btn"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent('hub-task', {
                        detail: {
                          title: `Tindak lanjut: ${row.data.title}`,
                          description: String(row.data.minutes || row.data.agenda || ''),
                          notes: `Sumber meetings: ${row.id}`,
                          meeting_id: row.id,
                        },
                      }),
                    );
                  }}
                  title="Buat tugas tindak lanjut rapat"
                >
                  + Tindak Lanjut
                </button>
              </div>
            </div>
          );
        })()}
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
            Selesai
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
                      <option key={value} value={value}>
                        {formatChoiceLabel(value)}
                      </option>
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
    <section
      className={
        entity === 'work-items'
          ? `task-database task-view-${view}`
          : `domain-records domain-${entity}`
      }
    >
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
            ['papan', 'Papan', Columns3],
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
          <details className="view-extra-actions">
            <summary>Lainnya</summary>
            <button
              type="button"
              className="btn-sprint-trigger"
              title="Kelola Target Periode (Sprint)"
              onClick={() => setShowSprintModal(true)}
            >
              <Target size={15} />
              <span>Periode kerja</span>
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
          </details>
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
      {entity === 'work-items' && view !== 'kalender' && view !== 'gantt' && (
        <form
          className="today-quick-add-card"
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
          <div className="quick-add-input-wrap">
            <Plus size={18} className="quick-add-icon" />
            <input
              type="text"
              aria-label="Tulis tugas baru"
              value={quickTitle}
              maxLength={200}
              onChange={(event) => setQuickTitle(event.target.value)}
              placeholder="Tambah tugas baru, lalu tekan Enter…"
              disabled={busy}
            />
          </div>
          <div className="quick-add-actions">
            <button
              type="submit"
              className="btn-quick-submit"
              disabled={busy || !quickTitle.trim()}
            >
              {busy ? 'Menyimpan…' : 'Tambah'}
            </button>
            <button
              type="button"
              className="btn-full-task-modal"
              onClick={() => {
                setEdit(
                  scopeId
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
                    : {
                        id: '',
                        created_at: '',
                        updated_at: '',
                        data: schemas[entity].parse({
                          title: 'Tugas baru',
                          due_date: today(),
                        }),
                      },
                );
              }}
              title="Buka formulir lengkap dengan rincian"
            >
              + Form lengkap
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className="mobile-filter-toggle"
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        Cari & filter{search || effectiveFilter || workstream || priority ? ' · aktif' : ''}
      </button>
      <div className={`filters ${filtersOpen ? 'filters-expanded' : ''}`}>
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
            <span className="field-caption">Status</span>
            <Select
              value={effectiveFilter}
              onChange={(value) => {
                setFilter(value);
                if (entity === 'work-items' && query.has('status')) {
                  const next = new URLSearchParams(query.toString());
                  next.delete('status');
                  router.replace(
                    (scopeId ? '/proyek' : '/tugas') + (next.size ? '?' + next.toString() : ''),
                  );
                }
              }}
              options={[
                { value: '', label: 'Semua Status' },
                ...(entity === 'work-items' ? [{ value: 'terlambat', label: 'Terlambat' }] : []),
                ...options[entity + '.status'].map((value) => ({
                  value,
                  label: formatChoiceLabel(value),
                })),
              ]}
              ariaLabel="Status"
            />
          </label>
        )}
        {!scopeId && ['work-items', 'checklist'].includes(entity) && (
          <label>
            <span className="field-caption">Proyek / bidang kerja</span>
            <Select
              value={workstream}
              onChange={setWorkstream}
              options={[
                { value: '', label: 'Semua Proyek' },
                ...(workspace.workstreams || []).map((row) => ({
                  value: row.id,
                  label: String(row.data.title),
                })),
              ]}
              ariaLabel="Proyek / bidang kerja"
            />
          </label>
        )}
        {entity === 'work-items' && (workspace.sprints || []).length > 0 && (
          <label>
            <span className="field-caption">Target periode</span>
            <Select
              value={sprintFilter}
              onChange={setSprintFilter}
              options={[
                { value: '', label: 'Semua Target Periode (Sprint)' },
                ...(workspace.sprints || []).map((row) => ({
                  value: row.id,
                  label: String(row.data.title),
                })),
              ]}
              ariaLabel="Target periode"
            />
          </label>
        )}
        {entity === 'work-items' && (
          <>
            <label>
              <span className="field-caption">Prioritas</span>
              <Select
                value={priority}
                onChange={setPriority}
                options={[
                  { value: '', label: 'Semua Prioritas' },
                  ...options.priority.map((value) => ({
                    value,
                    label: formatChoiceLabel(value),
                  })),
                ]}
                ariaLabel="Prioritas"
              />
            </label>
            <label>
              <span className="field-caption">Urutkan</span>
              <Select
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'due', label: 'Tenggat Terdekat' },
                  { value: 'title', label: 'Nama Tugas (A–Z)' },
                  { value: 'updated', label: 'Terakhir Diubah' },
                ]}
                ariaLabel="Urutkan"
              />
            </label>
          </>
        )}
      </div>
      {entity === 'work-items' && (
        <>
          <SavedTaskViews
            value={{
              search,
              status: effectiveFilter,
              project: workstream,
              priority,
              sort: sort as TaskView['sort'],
              view: view as TaskView['view'],
              sprint: sprintFilter,
            }}
            onApply={(saved) => {
              setSearch(saved.search);
              setFilter(saved.status);
              setWorkstream(saved.project);
              setPriority(saved.priority);
              setSort(saved.sort);
              setView(saved.view);
              setSprintFilter(saved.sprint);
            }}
          />
          <TaskBatchActions items={rows} refresh={refresh} />
        </>
      )}
      {error && (
        <p className="notice error" role="alert">
          {error}
        </p>
      )}
      {entity === 'risks' && <RiskMatrix items={rows} />}
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
                <th className="col-task-title">Tugas & Proyek</th>
                <th className="col-task-status">Status</th>
                <th className="col-task-priority">Prioritas</th>
                <th className="col-task-due">Tenggat</th>
                <th className="col-task-assignee">Penanggung Jawab</th>
                <th className="col-task-action">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isDone = row.data.status === 'selesai';
                const isLate =
                  String(row.data.due_date) < today() &&
                  !['selesai', 'dibatalkan'].includes(String(row.data.status));
                const isToday =
                  String(row.data.due_date) === today() &&
                  !['selesai', 'dibatalkan'].includes(String(row.data.status));
                const project = workspace.workstreams?.find((p) => p.id === row.data.workstream_id);
                const subtasks = Array.isArray(row.data.subtasks) ? row.data.subtasks : [];
                const doneSubtasks = subtasks.filter((s: { done?: boolean }) => s.done).length;
                const assigneeName = String(row.data.assignee || '').trim();

                return (
                  <tr key={row.id} className={isDone ? 'row-completed' : ''}>
                    <td className="col-task-title">
                      <div className="task-title-cell-wrap">
                        <button
                          type="button"
                          className={`task-row-checkbox ${isDone ? 'is-checked' : ''}`}
                          disabled={busy}
                          onClick={() =>
                            void update(row, {
                              status: isDone ? 'proses' : 'selesai',
                              completed_at: isDone ? '' : today(),
                            })
                          }
                          title={isDone ? 'Tandai belum selesai' : 'Tandai tugas selesai'}
                          aria-label={
                            isDone
                              ? `Tandai belum selesai: ${row.data.title}`
                              : `Tandai selesai: ${row.data.title}`
                          }
                        >
                          {isDone ? (
                            <Check size={13} strokeWidth={3} />
                          ) : (
                            <span className="check-ring" />
                          )}
                        </button>
                        <div className="task-title-content">
                          <div className="task-title-main-row">
                            {Boolean(row.data.code) && (
                              <span className="task-code-badge">{String(row.data.code)}</span>
                            )}
                            <button
                              type="button"
                              className={`task-title-btn ${isDone ? 'is-done-text' : ''}`}
                              onClick={() => setDetailTask(row)}
                            >
                              <span>{String(row.data.title)}</span>
                            </button>
                          </div>
                          <div className="task-meta-pills-row">
                            <span className="task-project-pill">
                              <FolderOpen size={12} aria-hidden="true" />
                              <span>{String(project?.data.title || 'Tanpa proyek')}</span>
                            </span>
                            {subtasks.length > 0 && (
                              <span
                                className="task-subtasks-pill"
                                title={`${doneSubtasks} dari ${subtasks.length} subtugas selesai`}
                              >
                                <CheckSquare size={11} aria-hidden="true" />
                                <span>
                                  {doneSubtasks}/{subtasks.length}
                                </span>
                              </span>
                            )}
                            {Boolean(row.data.recurrence && row.data.recurrence !== 'tidak') && (
                              <span
                                className="task-recurrence-pill"
                                title={`Berulang: ${formatChoiceLabel(String(row.data.recurrence))}`}
                              >
                                <RotateCw size={11} aria-hidden="true" />
                                <span>{formatChoiceLabel(String(row.data.recurrence))}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="col-task-status">
                      <label className="task-status-label">
                        <span className="sr-only">Status {String(row.data.title)}</span>
                        <div className={`status-pill-wrap status-${row.data.status}`}>
                          <span className="status-indicator-dot" />
                          <select
                            disabled={busy}
                            className={`task-table-status-select status-${row.data.status}`}
                            value={String(row.data.status)}
                            onChange={(event) =>
                              void update(row, {
                                status: event.target.value,
                                completed_at: event.target.value === 'selesai' ? today() : '',
                              })
                            }
                          >
                            {options['work-items.status'].map((value) => (
                              <option key={value} value={value}>
                                {formatChoiceLabel(value)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </label>
                    </td>
                    <td className="col-task-priority">
                      <span className={`table-badge priority-pill priority-${row.data.priority}`}>
                        {row.data.priority === 'mendesak' && <Flame size={12} />}
                        {row.data.priority === 'tinggi' && <AlertCircle size={12} />}
                        <span>{formatChoiceLabel(String(row.data.priority))}</span>
                      </span>
                    </td>
                    <td className="col-task-due">
                      {isLate ? (
                        <span className="table-badge badge-late" title="Tenggat sudah terlewati">
                          <AlertTriangle size={12} />
                          <span>{formatDate(String(row.data.due_date))}</span>
                        </span>
                      ) : isToday ? (
                        <span className="table-badge badge-today" title="Jatuh tempo hari ini">
                          <CalendarDays size={12} />
                          <span>Hari Ini</span>
                        </span>
                      ) : (
                        <span className="table-date">
                          <Calendar size={12} />
                          <span>{formatDate(String(row.data.due_date))}</span>
                        </span>
                      )}
                    </td>
                    <td className="col-task-assignee">
                      {assigneeName ? (
                        <div className="task-assignee-pill" title={`PIC: ${assigneeName}`}>
                          <span className="assignee-avatar">
                            {assigneeName.charAt(0).toUpperCase()}
                          </span>
                          <span className="task-assignee-text">{assigneeName}</span>
                        </div>
                      ) : (
                        <span className="task-assignee-empty">—</span>
                      )}
                    </td>
                    <td className="col-task-action">
                      <div className="task-row-actions">
                        {!isDone && (
                          <button
                            type="button"
                            className="table-btn-done"
                            disabled={busy}
                            onClick={() =>
                              void update(row, { status: 'selesai', completed_at: today() })
                            }
                            title="Tandai tugas selesai"
                          >
                            <Check size={13} strokeWidth={2.5} />
                            <span>Selesai</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="table-btn-open"
                          onClick={() => setDetailTask(row)}
                          title="Buka rincian tugas"
                          aria-label={`Buka detail ${String(row.data.title)}`}
                        >
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="task-table-footer">
            <span className="table-footer-stat">
              Menampilkan <strong>{rows.length}</strong> tugas
            </span>
            <span className="table-footer-sep">·</span>
            <span className="table-footer-stat">
              <strong>{rows.filter((r) => r.data.status === 'selesai').length}</strong> selesai
            </span>
            <span className="table-footer-sep">·</span>
            <span className="table-footer-stat">
              <strong>{rows.filter((r) => r.data.status === 'proses').length}</strong> sedang
              dikerjakan
            </span>
            {rows.filter(
              (r) =>
                String(r.data.due_date) < today() &&
                !['selesai', 'dibatalkan'].includes(String(r.data.status)),
            ).length > 0 && (
              <>
                <span className="table-footer-sep">·</span>
                <span className="table-footer-stat text-late">
                  <strong>
                    {
                      rows.filter(
                        (r) =>
                          String(r.data.due_date) < today() &&
                          !['selesai', 'dibatalkan'].includes(String(r.data.status)),
                      ).length
                    }
                  </strong>{' '}
                  terlambat
                </span>
              </>
            )}
          </div>
        </div>
      ) : entity === 'meetings' ? (
        <div className="meetings-container">
          {(() => {
            const todayStr = today();
            const upcoming = rows.filter((r) => String(r.data.date) >= todayStr);
            const past = rows.filter((r) => String(r.data.date) < todayStr);

            return (
              <>
                <section
                  className="meeting-section-group"
                  aria-label="Rapat akan datang dan hari ini"
                >
                  <div className="meeting-section-header">
                    <div className="meeting-section-title-wrap">
                      <CalendarDays size={16} />
                      <h3>Rapat Mendatang & Hari Ini</h3>
                    </div>
                    <span className="badge">{upcoming.length}</span>
                  </div>
                  {upcoming.length > 0 ? (
                    <div className="records">{upcoming.map(card)}</div>
                  ) : (
                    <div className="empty card compact">
                      <p>Tidak ada rapat yang terjadwal hari ini atau mendatang.</p>
                    </div>
                  )}
                </section>

                {past.length > 0 && (
                  <section
                    className="meeting-section-group past-meetings"
                    aria-label="Riwayat rapat sebelumnya"
                  >
                    <div className="meeting-section-header">
                      <div className="meeting-section-title-wrap">
                        <FolderArchive size={16} />
                        <h3>Riwayat Rapat Sebelumnya</h3>
                      </div>
                      <span className="badge">{past.length}</span>
                    </div>
                    <div className="records">{past.map(card)}</div>
                  </section>
                )}
              </>
            );
          })()}
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
            if (quickAdd)
              router.replace(entity === 'work-items' ? '/tugas' : window.location.pathname);
          }}
          onSaved={refresh}
        />
      )}
      {detailTask && entity === 'work-items' && (
        <TaskDetailDrawer
          key={detailTask.id}
          task={
            (workspace['work-items'] || []).find((item) => item.id === detailTask.id) || detailTask
          }
          workspace={workspace}
          onClose={closeTaskDetail}
          onUpdated={refresh}
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
        <div
          className="sprint-modal-backdrop"
          role="dialog"
          aria-labelledby="csv-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCsvModal(false);
          }}
        >
          <div className="sprint-modal-card">
            <header className="sprint-modal-head">
              <div className="title-with-badge">
                <span className="sprint-icon-pill">
                  <UploadCloud size={18} />
                </span>
                <h2 id="csv-modal-title">Impor File CSV — {catalog[entity].title}</h2>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowCsvModal(false)}
                aria-label="Tutup modal"
              >
                <X size={18} />
              </button>
            </header>
            <p className="dialog-sub">
              Unggah file CSV dengan kolom sesuai format data untuk menambahkan data secara
              langsung.
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
          </div>
        </div>
      )}
    </section>
  );
}
