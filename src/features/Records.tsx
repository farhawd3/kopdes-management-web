'use client';
import React from 'react';
import Link from 'next/link';
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
import { selectTaskStatus, taskStatusChange, isActiveTask, type TaskStatus } from '@/lib/task-status';
import { readiness } from '@/lib/progress';
import { Meter, RiskMatrix } from '@/components/charts/Charts';
import { TaskCalendar } from './TaskCalendar';
import { ReadinessRadar } from '@/components/charts/ReadinessRadar';
import { Select } from '@/components/ui/Select';
import {
  ListTodo,
  Columns3,
  CalendarDays,
  Calendar,
  Search,
  Plus,
  ChartGantt,
  CalendarClock,
  UploadCloud,
  Target,
  ChevronDown,
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
  CheckCircle2,
  Video,
  AlertCircle,
  ShieldCheck,
  FolderArchive,
  User,
  CheckSquare,
  Flag,
} from 'lucide-react';
import { TaskTimeline } from './TaskTimeline';
import { downloadMeeting, meetingJoinUrl } from './meeting';
import { DailyTasksView } from './DailyTasksView';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { SprintModal } from './SprintModal';
import { SprintCard } from './SprintCard';
import { CsvDropzone } from '@/components/ui/CsvDropzone';
import { ScrumBoardView } from './ScrumBoardView';
import { formatDisplayCode } from './task-code';
import { EmptyState } from '@/components/ui/EmptyState';

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

function CompletedTimelineView({
  items,
  workspace,
  onOpenTask,
  onReopenTask,
}: {
  items: Item[];
  workspace: Workspace;
  onOpenTask: (task: Item) => void;
  onReopenTask: (task: Item) => void;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Belum Ada Tugas yang Selesai"
        description="Tugas yang telah Anda tuntaskan akan tersusun rapi secara kronologis di linimasa ini."
        tone="blue"
        compact
      />
    );
  }

  const todayStr = today();
  const weekAgo = addDays(todayStr, -7);
  const twoWeeksAgo = addDays(todayStr, -14);

  const groups = [
    {
      id: 'pekan-ini',
      title: 'Pekan Ini',
      subtitle: '7 hari terakhir',
      items: items.filter((r) => {
        if (r.data.status !== 'selesai') return false;
        const d = String(r.data.completed_at || r.data.due_date || r.updated_at.slice(0, 10));
        return d >= weekAgo;
      }),
    },
    {
      id: 'pekan-lalu',
      title: 'Pekan Lalu',
      subtitle: '8–14 hari lalu',
      items: items.filter((r) => {
        if (r.data.status !== 'selesai') return false;
        const d = String(r.data.completed_at || r.data.due_date || r.updated_at.slice(0, 10));
        return d >= twoWeeksAgo && d < weekAgo;
      }),
    },
    {
      id: 'arsip-lama',
      title: 'Arsip Sebelumnya',
      subtitle: 'Lebih dari 2 pekan lalu',
      items: items.filter((r) => {
        if (r.data.status !== 'selesai') return false;
        const d = String(r.data.completed_at || r.data.due_date || r.updated_at.slice(0, 10));
        return d < twoWeeksAgo;
      }),
    },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="completed-github-timeline" aria-label="Linimasa riwayat tugas selesai">
      {groups.map((group) => (
        <section key={group.id} className="timeline-group-section">
          <div className="timeline-group-header">
            <div className="timeline-group-badge">
              <CheckCircle2 size={13} />
              <span>{group.title}</span>
            </div>
            <span className="timeline-group-sub">
              · {group.subtitle} ({group.items.length} tugas)
            </span>
            <div className="timeline-group-divider-line" />
          </div>
          <div className="timeline-group-stream">
            <div className="timeline-vertical-spine" aria-hidden="true" />
            {group.items.map((row) => {
              const project = workspace.workstreams?.find((p) => p.id === row.data.workstream_id);
              const subtasks = Array.isArray(row.data.subtasks) ? row.data.subtasks : [];
              const doneSubtasks = subtasks.filter((s: { done?: boolean }) => s.done).length;
              const assigneeName = String(row.data.assignee || '').trim();
              const completedDate = String(
                row.data.completed_at || row.data.due_date || row.updated_at.slice(0, 10),
              );

              return (
                <article key={row.id} className="timeline-task-row">
                  <div className="timeline-node" aria-hidden="true">
                    <CheckCircle2 size={15} />
                  </div>
                  <div className="timeline-task-bubble">
                    <div className="timeline-bubble-head">
                      <div className="timeline-title-wrap">
                        <span className="task-code-tag">
                          {formatDisplayCode(String(row.data.code), 'work-items', row.id)}
                        </span>
                        <button
                          type="button"
                          className="timeline-task-title-btn"
                          onClick={() => onOpenTask(row)}
                          title="Buka rincian tugas"
                        >
                          {String(row.data.title)}
                        </button>
                        {project && (
                          <span className="task-project-name has-project">
                            {String(project.data.title)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="table-btn-reopen"
                        title="Buka kembali tugas ini ke daftar tugas aktif"
                        onClick={() => onReopenTask(row)}
                      >
                        Buka Kembali ↩
                      </button>
                    </div>
                    <div className="timeline-bubble-meta">
                      <span className="meta-chip meta-chip-date" title="Tanggal diselesaikan">
                        <Calendar size={12} />
                        <span>Selesai {formatDate(completedDate)}</span>
                      </span>
                      {assigneeName && (
                        <span className="meta-chip meta-chip-assignee">
                          <User size={12} />
                          <span>{assigneeName}</span>
                        </span>
                      )}
                      {subtasks.length > 0 && (
                        <span className="meta-chip meta-chip-subtasks">
                          <CheckSquare size={12} />
                          <span>
                            {doneSubtasks}/{subtasks.length} subtugas tuntas
                          </span>
                        </span>
                      )}
                      {Boolean(row.data.priority && row.data.priority !== 'normal') && (
                        <span className={`priority-badge priority-${row.data.priority}`}>
                          <Flag size={11} /> {formatChoiceLabel(String(row.data.priority))}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function JournalBoardView({
  activities,
  workspace,
  onOpenItem,
  onCreateItem,
  onRefresh,
}: {
  activities: Item[];
  workspace: Workspace;
  onOpenItem: (item: Item) => void;
  onCreateItem: (date: string) => void;
  onRefresh: () => Promise<void>;
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const todayStr = today();

  const cols = [
    {
      id: 'mendatang',
      title: 'Terjadwal / Rencana',
      subtitle: 'Aktivitas mendatang',
      color: 'var(--brand)',
      filter: (a: Item) => String(a.data.date || '') > todayStr,
      defaultDate: addDays(todayStr, 1),
    },
    {
      id: 'hari-ini',
      title: 'Hari Ini',
      subtitle: 'Aktivitas lapangan hari ini',
      color: '#10b981',
      filter: (a: Item) => String(a.data.date || '') === todayStr,
      defaultDate: todayStr,
    },
    {
      id: 'terlaksana',
      title: 'Terdokumentasi',
      subtitle: 'Riwayat catatan lapangan',
      color: 'var(--ink-muted)',
      filter: (a: Item) => String(a.data.date || '') < todayStr,
      defaultDate: addDays(todayStr, -1),
    },
  ];

  async function handleDrop(targetColId: string) {
    if (!draggedId || busy) return;
    const item = activities.find((a) => a.id === draggedId);
    if (!item) return;

    let targetDate = String(item.data.date || todayStr);
    if (targetColId === 'hari-ini') targetDate = todayStr;
    else if (targetColId === 'mendatang' && String(item.data.date) <= todayStr) {
      targetDate = addDays(todayStr, 1);
    } else if (targetColId === 'terlaksana' && String(item.data.date) >= todayStr) {
      targetDate = addDays(todayStr, -1);
    }

    if (targetDate === item.data.date) {
      setDraggedId(null);
      setDragOverCol(null);
      return;
    }

    setBusy(true);
    try {
      await api('journal', {
        id: item.id,
        data: { ...item.data, date: targetDate },
      });
      await onRefresh();
    } finally {
      setBusy(false);
      setDraggedId(null);
      setDragOverCol(null);
    }
  }

  return (
    <div className="journal-board-container" aria-label="Papan alur kegiatan lapangan">
      <div className="scrum-board-columns cols-3">
        {cols.map((col) => {
          const colItems = activities.filter(col.filter);
          const isOver = dragOverCol === col.id;

          return (
            <div
              key={col.id}
              className={`scrum-column ${isOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragOverCol !== col.id) setDragOverCol(col.id);
              }}
              onDragLeave={() => {
                if (dragOverCol === col.id) setDragOverCol(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                void handleDrop(col.id);
              }}
            >
              <div className="scrum-column-header">
                <div className="scrum-col-title-group">
                  <span className="scrum-col-indicator" style={{ backgroundColor: col.color }} />
                  <div className="scrum-col-title-text">
                    <h3 className="column-title">{col.title}</h3>
                    <small className="column-subtitle">{col.subtitle}</small>
                  </div>
                </div>
                <div className="scrum-col-header-actions">
                  <span className="scrum-count-pill">{colItems.length}</span>
                  <button
                    type="button"
                    className="scrum-col-add-btn"
                    onClick={() => onCreateItem(col.defaultDate)}
                    title={`Tambah kegiatan di ${col.title}`}
                    aria-label={`Tambah kegiatan di ${col.title}`}
                  >
                    <Plus size={15} strokeWidth={2.4} />
                  </button>
                </div>
              </div>

              <div className="scrum-cards-list">
                {colItems.length === 0 ? (
                  <div className="scrum-empty-column-placeholder">
                    <span>Belum ada kegiatan</span>
                  </div>
                ) : (
                  colItems.map((item) => {
                    const unit = (workspace.units || []).find((u) => u.id === item.data.unit_id);
                    const stakeholder = (workspace.stakeholders || []).find(
                      (s) => s.id === item.data.stakeholder_id,
                    );
                    const linkedMeeting = (workspace.meetings || []).find(
                      (m) => m.id === item.data.meeting_id,
                    );

                    return (
                      <article
                        key={item.id}
                        className="scrum-task-card"
                        draggable
                        onDragStart={() => setDraggedId(item.id)}
                        onClick={() => onOpenItem(item)}
                      >
                        <div className="card-top-row">
                          <span className="task-code-tag">
                            {formatDisplayCode(
                              item.data.code ? String(item.data.code) : undefined,
                              'journal',
                              item.id,
                            )}
                          </span>
                          <span className="task-due-chip task-due-today">
                            <Calendar size={12} />
                            <span>{formatDate(String(item.data.date))}</span>
                          </span>
                        </div>
                        <h4 className="card-task-title">{String(item.data.title)}</h4>
                        {Boolean(item.data.notes) && (
                          <p className="card-description-snippet">
                            {String(item.data.notes).slice(0, 90)}
                            {String(item.data.notes).length > 90 ? '…' : ''}
                          </p>
                        )}
                        <div className="card-bottom-section">
                          <div className="card-assignee-row">
                            {unit && (
                              <span className="scrum-assignee-pill">
                                Gerai: {String(unit.data.title)}
                              </span>
                            )}
                            {stakeholder && (
                              <span className="scrum-assignee-pill">
                                Mitra: {String(stakeholder.data.title)}
                              </span>
                            )}
                            {linkedMeeting && (
                              <span className="scrum-assignee-pill">
                                Rapat Terkait
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JournalTimelineView({
  activities,
  workspace,
  onOpenItem,
}: {
  activities: Item[];
  workspace: Workspace;
  onOpenItem: (item: Item) => void;
}) {
  if (activities.length === 0) {
    return (
      <EmptyState
        title="Belum ada catatan kegiatan"
        description="Catatan kegiatan lapangan akan tersusun rapi secara kronologis di linimasa ini."
        tone="amber"
        compact
      />
    );
  }

  const sorted = [...activities].sort((a, b) =>
    String(b.data.date || '').localeCompare(String(a.data.date || '')),
  );

  return (
    <div className="journal-timeline-container" aria-label="Linimasa kegiatan lapangan">
      <div className="timeline-vertical-spine" aria-hidden="true" />
      <div className="journal-timeline-stream">
        {sorted.map((item) => {
          const unit = (workspace.units || []).find((u) => u.id === item.data.unit_id);
          const stakeholder = (workspace.stakeholders || []).find(
            (s) => s.id === item.data.stakeholder_id,
          );
          const linkedMeeting = (workspace.meetings || []).find(
            (m) => m.id === item.data.meeting_id,
          );
          const joinUrl = meetingJoinUrl(linkedMeeting);

          return (
            <article key={item.id} className="timeline-task-row">
              <div className="timeline-node timeline-node-journal" aria-hidden="true">
                <BookOpen size={14} />
              </div>
              <div className="timeline-task-bubble">
                <div className="timeline-bubble-head">
                  <div className="timeline-title-wrap">
                    <span className="task-code-tag">
                      {formatDisplayCode(
                        item.data.code ? String(item.data.code) : undefined,
                        'journal',
                        item.id,
                      )}
                    </span>
                    <button
                      type="button"
                      className="timeline-task-title-btn"
                      onClick={() => onOpenItem(item)}
                      title="Lihat / ubah rincian kegiatan"
                    >
                      {String(item.data.title)}
                    </button>
                    {unit && (
                      <span className="task-project-name has-project">
                        {String(unit.data.title)}
                      </span>
                    )}
                  </div>
                  <span className="task-due-chip task-due-today">
                    <Calendar size={12} />
                    <span>{formatDate(String(item.data.date))}</span>
                  </span>
                </div>
                {Boolean(item.data.notes) && (
                  <p className="timeline-notes-snippet">{String(item.data.notes)}</p>
                )}
                <div className="timeline-bubble-meta">
                  {stakeholder && (
                    <span className="meta-chip meta-chip-assignee">
                      <Handshake size={12} />
                      <span>{String(stakeholder.data.title)}</span>
                    </span>
                  )}
                  {joinUrl && (
                    <a
                      href={joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="journal-join-chip"
                      title="Gabung rapat daring"
                    >
                      <Video size={11} />
                      <span>Rapat Daring ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function JournalTableView({
  activities,
  workspace,
  onOpenItem,
}: {
  activities: Item[];
  workspace: Workspace;
  onOpenItem: (item: Item) => void;
}) {
  return (
    <div className="task-table-wrap journal-table-wrap">
      <table className="task-table journal-table">
        <thead>
          <tr>
            <th className="col-journal-date">Tanggal</th>
            <th className="col-journal-main">Kegiatan Lapangan & Uraian</th>
            <th className="col-journal-relation">Terkait</th>
            <th className="col-journal-action">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map((row) => {
            const unit = workspace.units?.find((u) => u.id === row.data.unit_id);
            const task = workspace['work-items']?.find((t) => t.id === row.data.work_item_id);
            const stakeholder = workspace.stakeholders?.find(
              (s) => s.id === row.data.stakeholder_id,
            );
            const meeting = workspace.meetings?.find((m) => m.id === row.data.meeting_id);
            const joinUrl = meetingJoinUrl(meeting);

            return (
              <tr key={row.id} className="journal-table-row">
                <td className="col-journal-date">
                  <span className="journal-date-badge">
                    <Calendar size={12} />
                    <span>{formatDate(String(row.data.date))}</span>
                  </span>
                </td>
                <td className="col-journal-main">
                  <div className="journal-main-cell">
                    <button
                      type="button"
                      className="journal-title-btn"
                      onClick={() => onOpenItem(row)}
                      title="Lihat atau ubah rincian kegiatan"
                    >
                      <span className="task-code-tag">
                        {formatDisplayCode(
                          row.data.code ? String(row.data.code) : undefined,
                          'journal',
                          row.id,
                        )}
                      </span>
                      <strong className="journal-title-text">{String(row.data.title)}</strong>
                    </button>
                    {Boolean(row.data.notes) && (
                      <p className="journal-notes-preview">{String(row.data.notes)}</p>
                    )}
                  </div>
                </td>
                <td className="col-journal-relation">
                  <div className="journal-relation-chips">
                    {unit && (
                      <span className="relation-pill pill-unit" title={`Gerai: ${String(unit.data.title)}`}>
                        <Building2 size={11} />
                        <span>{String(unit.data.title)}</span>
                      </span>
                    )}
                    {task ? (
                      <Link
                        href={`/tugas?task=${encodeURIComponent(task.id)}`}
                        className="relation-pill pill-task has-link"
                        title={`Buka tugas: ${String(task.data.title)}`}
                      >
                        <CheckSquare size={11} />
                        <span>{String(task.data.title)}</span>
                        <span className={`task-status-mini status-${String(task.data.status || 'rencana')}`}>
                          {String(task.data.status || 'rencana')}
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="relation-pill-btn-add"
                        title="Buat tugas tindak lanjut langsung dari kegiatan ini"
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent('hub-task', {
                              detail: {
                                title: `Tindak lanjut: ${row.data.title}`,
                                description: String(row.data.notes || ''),
                                notes: `Sumber kegiatan: ${row.id}`,
                              },
                            }),
                          );
                        }}
                      >
                        <Plus size={11} />
                        <span>+ Tindak Lanjut</span>
                      </button>
                    )}
                    {stakeholder && (
                      <span className="relation-pill pill-stakeholder" title={`Mitra: ${String(stakeholder.data.title)}`}>
                        <Handshake size={11} />
                        <span>{String(stakeholder.data.title)}</span>
                      </span>
                    )}
                    {joinUrl && (
                      <a
                        href={joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="journal-join-chip"
                        title="Masuk ruang rapat daring (Google Meet / Zoom)"
                      >
                        <Video size={11} />
                        <span>Gabung rapat ↗</span>
                      </a>
                    )}
                  </div>
                </td>
                <td className="col-journal-action">
                  <button
                    type="button"
                    className="table-btn-done btn-journal-open"
                    onClick={() => onOpenItem(row)}
                  >
                    Buka
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
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
    [journalUnit, setJournalUnit] = useState(''),
    [journalStakeholder, setJournalStakeholder] = useState(''),
    [journalMeeting, setJournalMeeting] = useState(''),
    [filtersOpen, setFiltersOpen] = useState(false),
    [quickTitle, setQuickTitle] = useState(''),
    [search, setSearch] = useState(''),
    [filter, setFilter] = useState<string | null>(initialFilter || null),
    [workstream, setWorkstream] = useState(''),
    [priority, setPriority] = useState(''),
    [sort, setSort] = useState('due'),
    [view, setView] = useState<string>(() => {
      const paramView = query.get('view');
      if (paramView && ['daftar', 'papan', 'kalender', 'gantt', 'harian'].includes(paramView)) {
        return paramView;
      }
      if (typeof window !== 'undefined') {
        try {
          const savedView = localStorage.getItem(`preferred_view_${entity}`);
          if (savedView && ['daftar', 'papan', 'kalender', 'gantt', 'harian'].includes(savedView)) {
            return savedView;
          }
        } catch {}
      }
      return 'daftar';
    }),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const handleViewChange = (newView: string) => {
    setView(newView);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`preferred_view_${entity}`, newView);
      } catch {}
    }
  };
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
    if (requestedView && ['daftar', 'papan', 'kalender', 'gantt', 'harian'].includes(requestedView)) {
      setView(requestedView);
    }
  }, [requestedView]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const details = document.querySelector('.view-extra-actions[open]');
      if (details && !details.contains(e.target as Node)) {
        details.removeAttribute('open');
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
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
  const isCompletedArchive = entity === 'work-items' && effectiveFilter === 'selesai';
  const all = (workspace[entity] || []).filter(
      (row) => !scopeId || row.data.workstream_id === scopeId,
    ),
    rows = all
      .filter(
        (row) =>
          JSON.stringify(row.data)
            .toLocaleLowerCase('id')
            .includes(search.toLocaleLowerCase('id')) &&
          (entity !== 'work-items'
            ? true
            : isCompletedArchive
              ? row.data.status === 'selesai'
              : effectiveFilter === 'terlambat'
                ? String(row.data.due_date) < today() && isActiveTask(row.data.status)
                : effectiveFilter
                  ? row.data.status === effectiveFilter
                  : isActiveTask(row.data.status)) &&
          (!workstream || row.data.workstream_id === workstream) &&
          (!sprintFilter || row.data.sprint_id === sprintFilter) &&
          (!priority || row.data.priority === priority) &&
          (!journalUnit || row.data.unit_id === journalUnit) &&
          (!journalStakeholder || row.data.stakeholder_id === journalStakeholder) &&
          (!journalMeeting || row.data.meeting_id === journalMeeting),
      )
      .sort((a, b) =>
        sort === 'title'
          ? String(a.data.title).localeCompare(String(b.data.title), 'id')
          : sort === 'updated'
            ? b.updated_at.localeCompare(a.updated_at)
            : isCompletedArchive
              ? String(b.data.completed_at || b.data.due_date || b.updated_at).localeCompare(
                  String(a.data.completed_at || a.data.due_date || a.updated_at),
                )
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
        <h3>
          {['work-items', 'journal'].includes(entity) && (
            <span className="task-code-tag mr-2">
              {formatDisplayCode(String(row.data.code), entity, row.id)}
            </span>
          )}
          {String(row.data.title)}
        </h3>
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
        {entity === 'journal' && (
          <>
            {Boolean(row.data.work_item_id) && (
              <span>
                Tugas:{' '}
                {String(
                  workspace['work-items']?.find((t) => t.id === row.data.work_item_id)?.data
                    .title || 'tidak ditemukan',
                )}
              </span>
            )}
            {Boolean(row.data.stakeholder_id) && (
              <span>
                Mitra:{' '}
                {String(
                  workspace.stakeholders?.find((s) => s.id === row.data.stakeholder_id)?.data
                    .title || 'tidak ditemukan',
                )}
              </span>
            )}
            {Boolean(row.data.unit_id) && (
              <span>
                Gerai:{' '}
                {String(
                  workspace.units?.find((u) => u.id === row.data.unit_id)?.data.title ||
                    'tidak ditemukan',
                )}
              </span>
            )}
            {(() => {
              const meeting = workspace.meetings?.find((m) => m.id === row.data.meeting_id);
              const joinUrl = meetingJoinUrl(meeting);
              return joinUrl ? (
                <a
                  href={joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="journal-join-link"
                  title="Masuk ruang rapat daring (Google Meet / Zoom)"
                >
                  <Video size={13} className="inline-icon" />
                  <span>Gabung rapat ↗</span>
                </a>
              ) : null;
            })()}
          </>
        )}
        {Boolean(row.data.assignee) && <span>{String(row.data.assignee)}</span>}
        {Boolean(row.data.priority) && <span>Prioritas {String(row.data.priority)}</span>}
        {Boolean(row.data.due_date || row.data.date) && (
          <span
            className={
              String(row.data.due_date) < today() && isActiveTask(row.data.status) ? 'late' : ''
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
        {entity === 'journal' && (
          <button
            type="button"
            className="btn-journal-followup"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('hub-task', {
                  detail: {
                    title: `Tindak lanjut: ${row.data.title}`,
                    description: String(row.data.notes || ''),
                    notes: `Sumber kegiatan: ${row.id}`,
                    ...(row.data.work_item_id ? { parent_id: row.data.work_item_id } : {}),
                  },
                }),
              );
            }}
            title="Buat tugas tindak lanjut dari kegiatan ini"
          >
            + Tindak lanjut
          </button>
        )}
        {(entity === 'work-items' || entity === 'checklist') && row.data.status !== 'selesai' && (
          <button
            disabled={busy}
            onClick={() =>
              void update(row, {
                ...(entity === 'work-items'
                  ? taskStatusChange('complete')
                  : { status: 'selesai' }),
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
                        ...(entity === 'work-items'
                          ? selectTaskStatus(e.target.value as TaskStatus)
                          : { status: e.target.value }),
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
      {isCompletedArchive ? (
        <div className="completed-archive-header">
          <div className="completed-archive-title-wrap">
            <div className="completed-archive-icon" aria-hidden="true">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2>Arsip Riwayat Selesai</h2>
              <p>Rekap tugas yang telah tuntas dikerjakan, diurutkan dan dikelompokkan secara kronologis.</p>
            </div>
          </div>
          <div className="completed-archive-stats">
            <div className="completed-stat-badge">
              <span className="stat-label">Total Selesai</span>
              <strong>{rows.length} tugas</strong>
            </div>
            <Link href={scopeId ? `/proyek` : `/tugas`} className="btn-back-to-active-tasks">
              ← Kembali ke Tugas Aktif
            </Link>
          </div>
        </div>
      ) : (
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
      )}
      {(entity === 'work-items' || entity === 'journal') && !isCompletedArchive && (
        <div className="database-views-bar">
          <div
            className="database-views"
            aria-label={`Tampilan ${entity === 'work-items' ? 'tugas' : 'kegiatan'}`}
          >
            {(entity === 'work-items'
              ? [
                  ['harian', 'Harian', CalendarClock],
                  ['papan', 'Papan', Columns3],
                  ['daftar', 'Daftar', ListTodo],
                  ['kalender', 'Kalender', CalendarDays],
                  ['gantt', 'Linimasa', ChartGantt],
                ]
              : [
                  ['daftar', 'Daftar', ListTodo],
                  ['papan', 'Papan', Columns3],
                  ['kalender', 'Kalender', CalendarDays],
                  ['gantt', 'Linimasa', ChartGantt],
                ]
            ).map(([value, label, Icon]) => {
              const ViewIcon = Icon as typeof ListTodo;
              return (
                <button
                  key={String(value)}
                  aria-pressed={view === value}
                  onClick={() => handleViewChange(String(value))}
                >
                  <ViewIcon size={17} />
                  {String(label)}
                </button>
              );
            })}
            <span>
              {rows.length} {entity === 'work-items' ? 'tugas' : 'kegiatan'}
            </span>
          </div>

          {entity === 'work-items' && (
            <details className="view-extra-actions">
              <summary className="view-extra-summary">
                <span>Lainnya</span>
                <ChevronDown size={13} className="extra-chevron" />
              </summary>
              <div className="view-extra-menu">
                <button
                  type="button"
                  className="btn-sprint-trigger"
                  title="Kelola Target Periode (Sprint)"
                  onClick={(e) => {
                    e.currentTarget.closest('details')?.removeAttribute('open');
                    setShowSprintModal(true);
                  }}
                >
                  <Target size={15} />
                  <span>Periode kerja</span>
                </button>
                <button
                  type="button"
                  className="btn-csv-trigger"
                  title="Tarik & Lepas File CSV"
                  onClick={(e) => {
                    e.currentTarget.closest('details')?.removeAttribute('open');
                    setShowCsvModal(true);
                  }}
                >
                  <UploadCloud size={15} />
                  <span>Impor CSV</span>
                </button>
              </div>
            </details>
          )}
        </div>
      )}
      {entity === 'work-items' && (workspace.sprints || []).length > 0 && !sprintFilter && !isCompletedArchive && view === 'daftar' && (
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
      {entity === 'work-items' && !isCompletedArchive && view === 'daftar' && (
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
          </div>
        </form>
      )}
      {view !== 'harian' && (
        <>
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
        {options[entity + '.status'] && view !== 'papan' && (
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
        {entity === 'journal' && (
          <>
            <label>
              <span className="field-caption">Gerai</span>
              <Select
                value={journalUnit}
                onChange={setJournalUnit}
                options={[
                  { value: '', label: 'Semua Gerai' },
                  ...(workspace.units || []).map((row) => ({
                    value: row.id,
                    label: String(row.data.title),
                  })),
                ]}
                ariaLabel="Gerai"
              />
            </label>
            <label>
              <span className="field-caption">Mitra / Pemangku</span>
              <Select
                value={journalStakeholder}
                onChange={setJournalStakeholder}
                options={[
                  { value: '', label: 'Semua Mitra' },
                  ...(workspace.stakeholders || []).map((row) => ({
                    value: row.id,
                    label: String(row.data.title),
                  })),
                ]}
                ariaLabel="Mitra"
              />
            </label>
            <label>
              <span className="field-caption">Rapat Terkait</span>
              <Select
                value={journalMeeting}
                onChange={setJournalMeeting}
                options={[
                  { value: '', label: 'Semua Rapat' },
                  ...(workspace.meetings || []).map((row) => ({
                    value: row.id,
                    label: String(row.data.title),
                  })),
                ]}
                ariaLabel="Rapat Terkait"
              />
            </label>
          </>
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
        </>
      )}
      {entity === 'work-items' && !isCompletedArchive && view === 'daftar' && (
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
      )}
      {entity === 'work-items' && !isCompletedArchive && view === 'daftar' && (
        <TaskBatchActions items={rows} refresh={refresh} />
      )}
      {error && (
        <p className="notice error" role="alert">
          {error}
        </p>
      )}
      {entity === 'risks' && <RiskMatrix items={rows} />}
      {!rows.length && !isCompletedArchive && (
        <EmptyState
          title={`Belum ada ${catalog[entity].title.toLowerCase()}`}
          description={`Mulai dengan menambah ${catalog[entity].title.toLowerCase()} baru atau sesuaikan filter pencarian.`}
          tone="emerald"
          action={{
            label: `Tambah ${catalog[entity].title}`,
            onClick: () => setEdit(null),
          }}
        />
      )}
      {isCompletedArchive ? (
        <CompletedTimelineView
          items={rows}
          workspace={workspace}
          onOpenTask={(task) => setDetailTask(task)}
          onReopenTask={(row) => void update(row, taskStatusChange('reopen'))}
        />
      ) : view === 'harian' && entity === 'work-items' ? (
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
      ) : view === 'gantt' && entity === 'journal' ? (
        <JournalTimelineView
          activities={rows}
          workspace={workspace}
          onOpenItem={(item) => setEdit(item)}
        />
      ) : view === 'papan' && entity === 'work-items' ? (
        <ScrumBoardView
          tasks={all.filter(
            (row) =>
              JSON.stringify(row.data)
                .toLocaleLowerCase('id')
                .includes(search.toLocaleLowerCase('id')) &&
              (!workstream || row.data.workstream_id === workstream) &&
              (!sprintFilter || row.data.sprint_id === sprintFilter) &&
              (!priority || row.data.priority === priority),
          )}
          workspace={workspace}
          onOpenTask={(task) => setDetailTask(task)}
          onCreateTask={(status) => createTask(today(), status)}
          onRefresh={refresh}
        />
      ) : view === 'papan' && entity === 'journal' ? (
        <JournalBoardView
          activities={rows}
          workspace={workspace}
          onOpenItem={(item) => setEdit(item)}
          onCreateItem={(date) => createTask(date)}
          onRefresh={refresh}
        />
      ) : view === 'kalender' && (entity === 'work-items' || entity === 'journal') ? (
        <TaskCalendar
          items={rows}
          render={card}
          onCreate={(date) => createTask(date)}
          onEdit={(item) => (entity === 'work-items' ? setDetailTask(item) : setEdit(item))}
        />
      ) : entity === 'journal' && rows.length ? (
        <JournalTableView
          activities={rows}
          workspace={workspace}
          onOpenItem={(item) => setEdit(item)}
        />
      ) : entity === 'work-items' && rows.length ? (
        <div className="task-table-wrap">
          <table className="task-table">
            <thead>
              <tr>
                <th className="col-task-title">Tugas & Proyek</th>
                <th className="col-task-status">Status</th>
                <th className="col-task-priority">Prioritas</th>
                <th className="col-task-due">
                  {isCompletedArchive ? 'Diselesaikan' : 'Tenggat'}
                </th>
                <th className="col-task-assignee">Penanggung Jawab</th>
                <th className="col-task-action">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const renderTableRow = (row: Item) => {
                  const isDone = row.data.status === 'selesai';
                  const isLate =
                    String(row.data.due_date) < today() && isActiveTask(row.data.status);
                  const isToday =
                    String(row.data.due_date) === today() && isActiveTask(row.data.status);
                  const project = workspace.workstreams?.find((p) => p.id === row.data.workstream_id);
                  const subtasks = Array.isArray(row.data.subtasks) ? row.data.subtasks : [];
                  const doneSubtasks = subtasks.filter((s: { done?: boolean }) => s.done).length;
                  const assigneeName = String(row.data.assignee || '').trim();

                  return (
                    <tr key={row.id} className={isDone ? 'row-completed' : ''}>
                      <td className="col-task-title">
                        <div className="task-title-cell">
                          <button
                            type="button"
                            className={`task-title-btn ${isDone ? 'is-done-text' : ''}`}
                            onClick={() => setDetailTask(row)}
                            title="Buka rincian tugas"
                          >
                            <span className="task-title-primary">
                              <span className="task-code-tag">
                                {formatDisplayCode(String(row.data.code), 'work-items', row.id)}
                              </span>
                              <span className="task-title-text">{String(row.data.title)}</span>
                            </span>
                            <span className="task-title-sub">
                              <span
                                className={`task-project-name ${project ? 'has-project' : ''}`}
                              >
                                {String(project?.data.title || 'Tanpa proyek')}
                              </span>
                              {subtasks.length > 0 && (
                                <span className="task-subtasks-count">
                                  · {doneSubtasks}/{subtasks.length} subtugas
                                </span>
                              )}
                              {Boolean(row.data.recurrence && row.data.recurrence !== 'tidak') && (
                                <span className="task-recurrence-text">
                                  · {formatChoiceLabel(String(row.data.recurrence))}
                                </span>
                              )}
                            </span>
                          </button>
                        </div>
                      </td>
                      <td className="col-task-status">
                        <label className="task-status-field">
                          <span className="sr-only">Status {String(row.data.title)}</span>
                          <select
                            disabled={busy}
                            className={`task-status-select status-${row.data.status}`}
                            value={String(row.data.status)}
                            onChange={(event) =>
                              void update(row, selectTaskStatus(event.target.value as TaskStatus))
                            }
                          >
                            {options['work-items.status'].map((value) => (
                              <option key={value} value={value}>
                                {formatChoiceLabel(value)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </td>
                      <td className="col-task-priority">
                        <span
                          className={`priority-badge priority-${row.data.priority || 'normal'}`}
                        >
                          {formatChoiceLabel(String(row.data.priority || 'normal'))}
                        </span>
                      </td>
                      <td className="col-task-due">
                        {isDone && row.data.completed_at ? (
                          <span className="task-due-chip task-due-done" title="Tanggal diselesaikan">
                            <Calendar size={12} className="task-due-icon" />
                            <span>Selesai {formatDate(String(row.data.completed_at))}</span>
                          </span>
                        ) : isLate ? (
                          <span className="task-due-chip task-due-late" title="Tenggat terlewat">
                            <Calendar size={12} className="task-due-icon" />
                            <span>{formatDate(String(row.data.due_date))}</span>
                          </span>
                        ) : isToday ? (
                          <span className="task-due-chip task-due-today" title="Jatuh tempo hari ini">
                            <Calendar size={12} className="task-due-icon" />
                            <span>Hari Ini</span>
                          </span>
                        ) : row.data.due_date ? (
                          <span className="task-due-chip task-due-normal" title="Tenggat waktu">
                            <Calendar size={12} className="task-due-icon" />
                            <span>{formatDate(String(row.data.due_date))}</span>
                          </span>
                        ) : (
                          <span className="task-due-empty">—</span>
                        )}
                      </td>
                      <td className="col-task-assignee">
                        {assigneeName ? (
                          <span className="task-assignee-pill" title={`Penanggung jawab: ${assigneeName}`}>
                            {assigneeName}
                          </span>
                        ) : (
                          <span className="task-assignee-empty">—</span>
                        )}
                      </td>
                      <td className="col-task-action">
                        {!isDone ? (
                          <button
                            type="button"
                            className="table-btn-done"
                            disabled={busy}
                            onClick={() => void update(row, taskStatusChange('complete'))}
                            title="Tandai tugas selesai"
                          >
                            Selesai
                          </button>
                        ) : isCompletedArchive ? (
                          <button
                            type="button"
                            className="table-btn-reopen"
                            disabled={busy}
                            onClick={() => void update(row, taskStatusChange('reopen'))}
                            title="Buka kembali tugas ini (kembalikan ke rencana)"
                          >
                            Buka Kembali ↩
                          </button>
                        ) : (
                          <span className="task-done-label">Selesai</span>
                        )}
                      </td>
                    </tr>
                  );
                };

                return rows.map(renderTableRow);
              })()}
            </tbody>
          </table>
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
                    <EmptyState
                      title="Tidak ada agenda rapat"
                      description="Tidak ada rapat yang terjadwal untuk hari ini atau mendatang."
                      tone="purple"
                      compact
                    />
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
          quick={quickAdd && entity === 'work-items'}
          workspace={workspace}
          onClose={() => {
            setEdit(undefined);
            if (quickAdd) router.replace(entity === 'work-items' ? '/tugas' : window.location.pathname);
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
          onFullEdit={(task) => {
            closeTaskDetail();
            setEdit(task);
          }}
          onDelete={async (task) => {
            if (!window.confirm(`Hapus tugas "${task.data.title || 'ini'}"? Tindakan ini tidak dapat dibatalkan.`)) return;
            closeTaskDetail();
            await api('work-items', { id: task.id, data: { ...task.data, status: 'dibatalkan' } });
            await refresh();
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
