'use client';
import { useState } from 'react';
import { Plus, Clock, CheckCircle2 } from 'lucide-react';
import { type Item } from './schemas';
import { type Workspace } from './useWorkspace';
import { api } from '@/lib/client';
import { formatDate, today, addDays } from '@/lib/date';

type ScrumColumn = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
};

const SCRUM_COLUMNS: ScrumColumn[] = [
  { id: 'rencana', key: 'rencana', title: 'Backlog', subtitle: 'Rencana kerja' },
  { id: 'siap', key: 'siap', title: 'Ice Box', subtitle: 'Siap dikerjakan' },
  { id: 'proses', key: 'proses', title: 'To Do', subtitle: 'Sedang berjalan' },
  { id: 'menunggu', key: 'menunggu', title: 'Impediments', subtitle: 'Terkendala / koordinasi' },
  { id: 'selesai', key: 'selesai', title: 'Selesai', subtitle: 'Tuntas' },
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
  const [busyId, setBusyId] = useState<string | null>(null);

  // Group tasks by status
  function getTasksForColumn(colKey: string): Item[] {
    return tasks.filter((task) => {
      const status = String(task.data.status || 'rencana');
      if (colKey === 'rencana') return status === 'rencana' || status === 'draft';
      if (colKey === 'siap') return status === 'siap' || status === 'antrean';
      if (colKey === 'proses') return status === 'proses' || status === 'berjalan';
      if (colKey === 'menunggu') return status === 'menunggu' || status === 'tertunda';
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
      siap: 'siap',
      proses: 'proses',
      menunggu: 'menunggu',
      selesai: 'selesai',
    };
    const nextStatus = statusMap[targetColKey] || targetColKey;

    if (task.data.status === nextStatus) {
      setDraggedTaskId(null);
      setDragOverCol(null);
      return;
    }

    setBusyId(task.id);
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
    } finally {
      setBusyId(null);
      setDraggedTaskId(null);
      setDragOverCol(null);
    }
  }

  return (
    <div className="scrum-view-container" aria-label="Tampilan Papan Scrum Koperasi">
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
                <div className="column-title-group">
                  <h3 className="column-title">{col.title}</h3>
                  <small className="column-subtitle">{col.subtitle}</small>
                </div>
                <span className="column-count-badge">{colTasks.length}</span>
              </div>

              {/* Dashed Add Task Card Dropzone (Behance Ref 4) */}
              <button
                type="button"
                className="scrum-add-task-card"
                onClick={() => onCreateTask(col.key)}
                aria-label={`Tambah tugas di ${col.title}`}
              >
                <div className="add-task-icon-circle">
                  <Plus size={18} strokeWidth={2.5} />
                </div>
                <span>Add Task</span>
              </button>

              {/* Task Cards List */}
              <div className="scrum-cards-list">
                {colTasks.map((task) => {
                  const data = task.data;
                  const taskCode = String(data.code || `#${task.id.slice(0, 6).toUpperCase()}`);
                  const subtasks = Array.isArray(data.subtasks)
                    ? (data.subtasks as { title: string; done: boolean }[])
                    : [];
                  const doneSubtasks = subtasks.filter((s) => s.done).length;
                  const progressPct =
                    data.status === 'selesai'
                      ? 100
                      : subtasks.length > 0
                        ? Math.round((doneSubtasks / subtasks.length) * 100)
                        : data.status === 'proses'
                          ? 50
                          : 0;

                  // Determine date range or deadline display (Behance Ref 4 pill)
                  const dueDate = String(data.due_date || today());
                  const datePill = `${formatDate(dueDate).slice(0, 6)} - ${formatDate(addDays(dueDate, 4)).slice(0, 6)}`;

                  // Calculate time / deadline text
                  const isLate = dueDate < today() && data.status !== 'selesai';
                  const deadlineText =
                    data.status === 'selesai'
                      ? 'Selesai'
                      : isLate
                        ? 'Terlambat'
                        : subtasks.length > 0
                          ? `${doneSubtasks}/${subtasks.length} selesai`
                          : 'Tenggat terdekat';

                  const assignee = String(data.assignee || 'Manajer Koperasi');
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
                      {/* Top Date Badge Pill */}
                      <div className="card-top-row">
                        <span className="card-date-pill">{datePill}</span>
                        {project && (
                          <span
                            className="card-project-pill"
                            style={{
                              borderColor: String(project.data.color || '#ed7d3d'),
                              color: String(project.data.color || '#ed7d3d'),
                            }}
                          >
                            {String(project.data.title)}
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

                      {/* Card Bottom Row: Avatars & Progress Bar (Behance Ref 4) */}
                      <div className="card-bottom-section">
                        <div className="card-avatars-row">
                          <span className="scrum-user-avatar" title={assignee}>
                            {initials}
                          </span>
                          <span
                            className="scrum-user-avatar avatar-secondary"
                            title="KDMP Puntukrejo"
                          >
                            KD
                          </span>
                        </div>

                        <div className="card-progress-section">
                          <div className="progress-labels-row">
                            <span className="progress-percent-text">{progressPct}%</span>
                            <span className="progress-time-text">{deadlineText}</span>
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
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
