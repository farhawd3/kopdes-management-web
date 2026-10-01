'use client';
import { useState } from 'react';
import { Check, ChevronDown, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';
import { type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { addDays, formatDate, today } from '@/lib/date';
import { api } from '@/lib/client';

const DAY_LABELS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] as const;

export function DailyTasksView({
  tasks,
  workspace,
  onOpenTask,
  onCreateTask,
  onRefresh,
}: {
  tasks: Item[];
  workspace: Workspace;
  onOpenTask: (task: Item) => void;
  onCreateTask: (date: string) => void;
  onRefresh: () => Promise<void>;
}) {
  const currentDate = today();
  // Find date for Monday of current week
  const dayOfWeek = (new Date(currentDate + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const monday = addDays(currentDate, -dayOfWeek);

  // Expanded days state: default Tuesday, Today, and Overdue expanded
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = { upcoming: true, overdue: true };
    // Expand today and Tuesday by default
    for (let i = 0; i < 7; i++) {
      const date = addDays(monday, i);
      init[date] = date === currentDate || i === 1; // 1 is Tuesday
    }
    return init;
  });

  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  function toggleDay(key: string) {
    setExpandedDays((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function toggleComplete(task: Item, e: React.MouseEvent) {
    e.stopPropagation();
    if (busyId) return;
    setBusyId(task.id);
    setError('');
    try {
      const isDone = task.data.status === 'selesai';
      const nextStatus = isDone ? 'rencana' : 'selesai';
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
    }
  }

  async function toggleSubtask(task: Item, subIndex: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (busyId) return;
    setBusyId(task.id);
    setError('');
    try {
      const subtasks = Array.isArray(task.data.subtasks)
        ? (task.data.subtasks as { title: string; done: boolean; code?: string }[])
        : [];
      const updated = subtasks.map((s, idx) => (idx === subIndex ? { ...s, done: !s.done } : s));
      await api('work-items', {
        id: task.id,
        data: { ...task.data, subtasks: updated },
      });
      await onRefresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function deleteTask(task: Item, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(`Hapus tugas "${task.data.title}"?`)) return;
    setBusyId(task.id);
    setError('');
    try {
      await api('work-items', { id: task.id }, 'DELETE');
      await onRefresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  // Days in week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(monday, i);
    const dayName = DAY_LABELS[i];
    const items = tasks.filter((t) => t.data.due_date === date);
    return { date, dayName, items, isToday: date === currentDate };
  });

  // Overdue / past tasks (due before Monday of this week and not yet completed)
  const pastOverdueTasks = tasks.filter(
    (t) =>
      !['selesai', 'dibatalkan'].includes(String(t.data.status)) &&
      String(t.data.due_date) < monday,
  );

  // Upcoming tasks (after this week)
  const sunday = addDays(monday, 6);
  const upcomingTasks = tasks.filter((t) => String(t.data.due_date) > sunday);

  return (
    <div className="daily-tasks-container">
      {error && (
        <p role="alert" className="notice error">
          {error}
        </p>
      )}

      {/* Past Overdue Tasks (If Any) */}
      {pastOverdueTasks.length > 0 && (
        <section className="daily-group-card overdue-group-card">
          <header className="daily-group-header" onClick={() => toggleDay('overdue')}>
            <button
              type="button"
              className="toggle-collapse-btn"
              aria-expanded={!!expandedDays['overdue']}
              aria-label="Buka tutup tugas terlambat sebelumnya"
            >
              {expandedDays['overdue'] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            <div className="day-title-wrap">
              <span className="day-name alert-text">Terlewat / Perlu Tindak Lanjut</span>
              <small className="day-date">Jatuh tempo sebelum pekan ini</small>
            </div>
            <div className="day-count-badge alert-count-badge">
              <span>{pastOverdueTasks.length.toString().padStart(2, '0')}</span>
            </div>
          </header>

          {expandedDays['overdue'] && (
            <div className="daily-task-items-list">
              {pastOverdueTasks.map((task) => {
                const isDone = task.data.status === 'selesai';
                const taskCode = String(
                  task.data.code || `#KD-${task.id.slice(0, 5).toUpperCase()}`,
                );
                const subtasks = Array.isArray(task.data.subtasks)
                  ? (task.data.subtasks as { title: string; done: boolean; code?: string }[])
                  : [];
                const project = workspace.workstreams?.find(
                  (w) => w.id === task.data.workstream_id,
                );

                return (
                  <div
                    key={task.id}
                    className={`daily-task-row-wrap ${isDone ? 'is-completed' : ''}`}
                  >
                    <div
                      className="daily-task-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => onOpenTask(task)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenTask(task);
                        }
                      }}
                    >
                      <button
                        type="button"
                        className={`task-round-check ${isDone ? 'checked' : ''}`}
                        onClick={(e) => toggleComplete(task, e)}
                        title={isDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                      >
                        {isDone && <Check size={13} />}
                      </button>

                      <span className="task-code-tag">{taskCode}</span>
                      <span className="task-title-text">{String(task.data.title)}</span>
                      <span className="task-due-tag is-overdue">
                        {formatDate(String(task.data.due_date))}
                      </span>

                      {project && (
                        <span
                          className="task-project-pill"
                          style={{
                            borderColor: String(project.data.color || 'var(--line)'),
                          }}
                        >
                          {String(project.data.title)}
                        </span>
                      )}

                      {subtasks.length > 0 && (
                        <span className="subtasks-count-pill">
                          {subtasks.filter((s) => s.done).length}/{subtasks.length}
                        </span>
                      )}

                      <div className="task-row-actions">
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Ubah / Buka detail"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTask(task);
                          }}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-icon-btn delete-action"
                          title="Hapus tugas"
                          onClick={(e) => deleteTask(task, e)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 7 Days of the Week */}
      {weekDays.map(({ date, dayName, items, isToday }) => {
        const isExpanded = !!expandedDays[date];
        return (
          <section key={date} className={`daily-group-card ${isToday ? 'current-day-group' : ''}`}>
            <header className="daily-group-header" onClick={() => toggleDay(date)}>
              <button
                type="button"
                className="toggle-collapse-btn"
                aria-expanded={isExpanded}
                aria-label={`Buka tutup ${dayName}`}
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              <div className="day-title-wrap">
                <span className="day-name">{dayName}</span>
                <small className="day-date">{formatDate(date)}</small>
                {isToday && <span className="today-badge">Hari ini</span>}
              </div>
              <div className="day-count-badge">
                <span>{items.length.toString().padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                className="btn-quick-add-day"
                title={`Tambah tugas untuk ${dayName}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateTask(date);
                }}
              >
                <Plus size={16} />
              </button>
            </header>

            {isExpanded && (
              <div className="daily-task-items-list">
                {items.length === 0 ? (
                  <p className="empty-day-note">Tidak ada tugas pada hari ini.</p>
                ) : (
                  items.map((task) => {
                    const isDone = task.data.status === 'selesai';
                    const taskCode = String(
                      task.data.code || `#KD-${task.id.slice(0, 5).toUpperCase()}`,
                    );
                    const subtasks = Array.isArray(task.data.subtasks)
                      ? (task.data.subtasks as { title: string; done: boolean; code?: string }[])
                      : [];
                    const project = workspace.workstreams?.find(
                      (w) => w.id === task.data.workstream_id,
                    );

                    return (
                      <div
                        key={task.id}
                        className={`daily-task-row-wrap ${isDone ? 'is-completed' : ''}`}
                      >
                        {/* Parent Task Row */}
                        <div
                          className="daily-task-item"
                          role="button"
                          tabIndex={0}
                          onClick={() => onOpenTask(task)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onOpenTask(task);
                            }
                          }}
                        >
                          <button
                            type="button"
                            className={`task-round-check ${isDone ? 'checked' : ''}`}
                            onClick={(e) => toggleComplete(task, e)}
                            title={isDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                          >
                            {isDone && <Check size={13} />}
                          </button>

                          <span className="task-code-tag">{taskCode}</span>

                          <span className="task-title-text">{String(task.data.title)}</span>

                          {project && (
                            <span
                              className="task-project-pill"
                              style={{
                                borderColor: String(project.data.color || 'var(--line)'),
                              }}
                            >
                              {String(project.data.title)}
                            </span>
                          )}

                          {subtasks.length > 0 && (
                            <span className="subtasks-count-pill">
                              {subtasks.filter((s) => s.done).length}/{subtasks.length}
                            </span>
                          )}

                          {/* Quick Hover Actions */}
                          <div className="task-row-actions">
                            <button
                              type="button"
                              className="action-icon-btn"
                              title="Ubah / Buka detail"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenTask(task);
                              }}
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="Hapus Tugas"
                              onClick={(e) => deleteTask(task, e)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Indented Subtasks Tree Connector */}
                        {subtasks.length > 0 && (
                          <div className="nested-subtasks-tree">
                            {subtasks.map((sub, sIdx) => {
                              const isLast = sIdx === subtasks.length - 1;
                              const subCode = sub.code || `${taskCode}-${sIdx + 1}`;
                              return (
                                <div
                                  key={sIdx}
                                  className={`tree-subtask-item ${sub.done ? 'sub-done' : ''}`}
                                  onClick={(e) => toggleSubtask(task, sIdx, e)}
                                >
                                  <span className="tree-connector">{isLast ? '└──' : '├──'}</span>
                                  <button
                                    type="button"
                                    className={`subtask-round-check ${sub.done ? 'checked' : ''}`}
                                    onClick={(e) => toggleSubtask(task, sIdx, e)}
                                  >
                                    {sub.done && <Check size={11} />}
                                  </button>
                                  <span className="subtask-code-tag">{subCode}</span>
                                  <span className="subtask-title-text">{sub.title}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </section>
        );
      })}

      {/* Up Coming Section */}
      <section className="daily-group-card upcoming-group">
        <header className="daily-group-header" onClick={() => toggleDay('upcoming')}>
          <button
            type="button"
            className="toggle-collapse-btn"
            aria-expanded={!!expandedDays.upcoming}
          >
            {expandedDays.upcoming ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          <div className="day-title-wrap">
            <span className="day-name">Mendatang (Up Coming)</span>
            <small className="day-date">Tenggat di masa depan</small>
          </div>
          <div className="day-count-badge">
            <span>{upcomingTasks.length.toString().padStart(2, '0')}</span>
          </div>
        </header>

        {expandedDays.upcoming && (
          <div className="daily-task-items-list">
            {upcomingTasks.length === 0 ? (
              <p className="empty-day-note">Belum ada tugas mendatang.</p>
            ) : (
              upcomingTasks.map((task) => {
                const isDone = task.data.status === 'selesai';
                const taskCode = String(
                  task.data.code || `#KD-${task.id.slice(0, 5).toUpperCase()}`,
                );
                return (
                  <div key={task.id} className="daily-task-item" onClick={() => onOpenTask(task)}>
                    <button
                      type="button"
                      className={`task-round-check ${isDone ? 'checked' : ''}`}
                      onClick={(e) => toggleComplete(task, e)}
                    >
                      {isDone && <Check size={13} />}
                    </button>
                    <span className="task-code-tag">{taskCode}</span>
                    <span className="task-title-text">{String(task.data.title)}</span>
                    <span className="task-due-badge">{formatDate(String(task.data.due_date))}</span>
                    <div className="task-row-actions">
                      <button
                        type="button"
                        className="action-icon-btn"
                        title="Buka detail"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenTask(task);
                        }}
                      >
                        <Edit2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>
    </div>
  );
}
