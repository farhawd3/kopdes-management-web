'use client';
import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { taskProgress } from '@/lib/progress';
import { type Item } from './schemas';
import { type Workspace } from './useWorkspace';
import { api } from '@/lib/client';
import { formatDate, today } from '@/lib/date';

type ScrumColumn = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  color: string;
};

const SCRUM_COLUMNS: ScrumColumn[] = [
  { id: 'rencana', key: 'rencana', title: 'Rencana', subtitle: 'Rencana kerja', color: 'var(--ink-muted)' },
  { id: 'proses', key: 'proses', title: 'Dikerjakan', subtitle: 'Sedang berjalan', color: 'var(--brand)' },
  { id: 'dibatalkan', key: 'dibatalkan', title: 'Dibatalkan', subtitle: 'Tidak dilanjutkan', color: 'var(--danger, #ef4444)' },
  { id: 'selesai', key: 'selesai', title: 'Selesai', subtitle: 'Tuntas', color: 'var(--success, #10b981)' },
];

export function ScrumBoardView({
  tasks,
  workspace,
  onOpenTask,
  onCreateTask,
  onRefresh,
}: {
  tasks: Item[];
  workspace: Workspace;
  onOpenTask: (task: Item) => void;
  onCreateTask: (status: string) => void;
  onRefresh: () => Promise<void>;
}) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  // Group tasks by status
  function getTasksForColumn(colKey: string): Item[] {
    return tasks.filter((task) => {
      const status = String(task.data.status || 'rencana');
      if (colKey === 'rencana') return status === 'rencana' || status === 'draft';
      if (colKey === 'siap') return status === 'siap' || status === 'antrean';
      if (colKey === 'proses') return status === 'proses' || status === 'berjalan';
      if (colKey === 'dibatalkan') return status === 'dibatalkan' || status === 'menunggu' || status === 'tertunda';
      if (colKey === 'selesai') return status === 'selesai';
      return status === colKey;
    });
  }

  async function handleDrop(targetColKey: string) {
    if (!draggedTaskId || busyId) return;
    const task = tasks.find((t) => t.id === draggedTaskId);
    if (!task) return;

    // Map column key to standard task status
    const statusMap: Record<string, string> = {
      rencana: 'rencana',
      proses: 'proses',
      dibatalkan: 'dibatalkan',
      selesai: 'selesai',
    };
    const nextStatus = statusMap[targetColKey] || targetColKey;

    if (task.data.status === nextStatus) {
      setDraggedTaskId(null);
      setDragOverCol(null);
      return;
    }

    setBusyId(task.id);
    setError('');
    try {
      await api('work-items', {
        id: task.id,
        data: {
          ...task.data,
          status: nextStatus,
          completed_at: nextStatus === 'selesai' ? today() : '',
        },
      });
      await onRefresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusyId(null);
      setDraggedTaskId(null);
      setDragOverCol(null);
    }
  }

  return (
    <div className="scrum-view-container" aria-label="Papan tugas">
      {error && (
        <p role="alert" className="notice error">
          {error}
        </p>
      )}
      <div className="scrum-board-columns">
        {SCRUM_COLUMNS.map((col) => {
          const colTasks = getTasksForColumn(col.key);
          const isOver = dragOverCol === col.key;

          return (
            <div
              key={col.id}
              className={`scrum-column ${isOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragOverCol !== col.key) setDragOverCol(col.key);
              }}
              onDragLeave={() => {
                if (dragOverCol === col.key) setDragOverCol(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                void handleDrop(col.key);
              }}
            >
              {/* Column Header */}
              <div className="scrum-column-header">
                <div className="scrum-col-title-group">
                  <span
                    className="scrum-col-indicator"
                    style={{ backgroundColor: col.color }}
                  />
                  <div className="scrum-col-title-text">
                    <h3 className="column-title">{col.title}</h3>
                    <small className="column-subtitle">{col.subtitle}</small>
                  </div>
                </div>
                <span className="scrum-count-pill">{colTasks.length}</span>
              </div>

              {/* Dashed Add Task Card Dropzone */}
              <button
                type="button"
                className="scrum-add-task-card"
                onClick={() => onCreateTask(col.key)}
                aria-label={`Tambah tugas di ${col.title}`}
              >
                <div className="add-task-icon-circle">
                  <Plus size={16} strokeWidth={2.5} />
                </div>
                <span>Tambah tugas</span>
              </button>

              {/* Task Cards List */}
              <div className="scrum-cards-list">
                {colTasks.length === 0 ? (
                  <div className="scrum-empty-column-placeholder">
                    <span>Belum ada tugas</span>
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const data = task.data;
                    const taskCode = String(data.code || `#KD-${task.id.slice(0, 5).toUpperCase()}`);
                    const subtasks = Array.isArray(data.subtasks)
                      ? (data.subtasks as { title: string; done: boolean }[])
                      : [];
                    const doneSubtasks = subtasks.filter((s) => s.done).length;
                    const progressPct = taskProgress({
                      status: data.status as 'rencana' | 'proses' | 'selesai' | 'dibatalkan',
                      subtasks,
                    });

                    // Determine date range or deadline display
                    const dueDate = String(data.due_date || today());
                    const datePill = data.start_date
                      ? `${formatDate(String(data.start_date))} – ${formatDate(dueDate)}`
                      : formatDate(dueDate);

                    // Calculate time / deadline text
                    const isLate = dueDate < today() && data.status !== 'selesai' && data.status !== 'dibatalkan';
                    const deadlineText =
                      data.status === 'selesai'
                        ? 'Selesai'
                        : isLate
                          ? 'Terlambat'
                          : subtasks.length > 0
                            ? `${doneSubtasks}/${subtasks.length} selesai`
                            : 'Tenggat terdekat';

                    const managerName = String(workspace.organization?.[0]?.data?.manager || 'Manajer');
                    const assignee = String(data.assignee || managerName);
                    const initials = assignee
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    const project = (workspace.workstreams || []).find(
                      (w) => w.id === data.workstream_id,
                    );

                    return (
                      <article
                        key={task.id}
                        className={`scrum-task-card ${busyId === task.id ? 'card-busy' : ''}`}
                        draggable
                        onDragStart={() => setDraggedTaskId(task.id)}
                        onClick={() => onOpenTask(task)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onOpenTask(task);
                          }
                        }}
                      >
                        {/* Top Date Badge Pill & Meta */}
                        <div className="card-top-row">
                          <span className={`card-date-pill ${isLate ? 'is-late' : ''}`}>
                            {isLate && <AlertCircle size={11} className="inline-icon" />}
                            {datePill}
                          </span>
                          {project && (
                            <span
                              className="card-project-pill"
                              style={{
                                borderColor: String(project.data.color || 'var(--line-strong)'),
                              }}
                            >
                              <span
                                className="project-dot"
                                style={{ backgroundColor: String(project.data.color || 'var(--brand)') }}
                              />
                              {String(project.data.title)}
                            </span>
                          )}
                          {Boolean(data.priority) && data.priority !== 'normal' && (
                            <span className={`card-priority-pill priority-${data.priority}`}>
                              {String(data.priority)}
                            </span>
                          )}
                        </div>

                        {/* Card Title & Code */}
                        <div className="card-title-wrap">
                          <span className="card-task-code">{taskCode}</span>
                          <h4 className="card-task-title">{String(data.title)}</h4>
                        </div>

                        {/* Snippet Description */}
                        {Boolean(data.description) && (
                          <p className="card-description-snippet">
                            {String(data.description).slice(0, 85)}
                            {String(data.description).length > 85 ? '…' : ''}
                          </p>
                        )}

                        {/* Card Bottom Row: Avatars & Progress Bar */}
                        <div className="card-bottom-section">
                          <div className="card-avatars-row">
                            <span className="scrum-user-avatar" title={assignee}>
                              {initials}
                            </span>
                          </div>

                          <div className="card-progress-section">
                            <div className="progress-labels-row">
                              <span className="progress-percent-text">{progressPct}%</span>
                              <span className={`progress-time-text ${isLate ? 'late-text' : ''}`}>
                                {deadlineText}
                              </span>
                            </div>
                            <div className="scrum-progress-bar-track">
                              <div
                                className="scrum-progress-bar-fill"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
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
