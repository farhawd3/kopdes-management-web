'use client';
import { useState } from 'react';
import {
  CalendarDays,
  Check,
  Clock,
  Plus,
  AlertTriangle,
  ExternalLink,
  Download,
  CalendarCheck,
  Video,
  MapPin,
  Globe,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import type { Workspace } from './useWorkspace';
import { schemas, type Item } from './schemas';
import { addDays, formatDate, today } from '@/lib/date';
import { api } from '@/lib/client';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { Editor } from './Editor';
import { downloadMeeting } from './meeting';

export function TodayView({
  workspace,
  refresh,
}: {
  workspace: Workspace;
  refresh: () => Promise<void>;
}) {
  const now = today();
  const tasks = (workspace['work-items'] || []).map((row) => ({
    ...row,
    parsed: schemas['work-items'].safeParse(row.data),
  }));

  const [detailTask, setDetailTask] = useState<Item | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // 1. Overdue tasks
  const overdueTasks = tasks.filter(
    (t) =>
      !['selesai', 'dibatalkan'].includes(String(t.data.status)) && String(t.data.due_date) < now,
  );

  // 2. Today's tasks
  const todayTasks = tasks
    .filter((t) => String(t.data.due_date) === now && t.data.status !== 'dibatalkan')
    .sort((a, b) => Number(a.data.status === 'selesai') - Number(b.data.status === 'selesai'));

  // 3. Upcoming tasks (next 7 days)
  const next7Days = addDays(now, 7);
  const upcomingTasks = tasks
    .filter(
      (t) =>
        !['selesai', 'dibatalkan'].includes(String(t.data.status)) &&
        String(t.data.due_date) > now &&
        String(t.data.due_date) <= next7Days,
    )
    .sort((a, b) => String(a.data.due_date).localeCompare(String(b.data.due_date)));

  // 4. Today's meetings
  const todayMeetings = (workspace.meetings || []).filter(
    (m) => String(m.data.date) === now && m.data.status !== 'dibatalkan',
  );

  const projects = workspace.workstreams || [];

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
          completed_at: nextStatus === 'selesai' ? now : '',
        },
      });
      await refresh();
    } catch (err) {
      setError((err as Error).message || 'Gagal memperbarui status tugas.');
    } finally {
      setBusyId(null);
    }
  }

  async function rescheduleToToday(task: Item, e: React.MouseEvent) {
    e.stopPropagation();
    if (busyId) return;
    setBusyId(task.id);
    setError('');
    try {
      await api('work-items', {
        id: task.id,
        data: {
          ...task.data,
          due_date: now,
        },
      });
      await refresh();
    } catch (err) {
      setError((err as Error).message || 'Gagal memindahkan tenggat tugas.');
    } finally {
      setBusyId(null);
    }
  }

  async function handleQuickAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!quickTitle.trim() || busyId) return;
    setBusyId('quick-add');
    setError('');
    try {
      await api('work-items', {
        data: schemas['work-items'].parse({
          title: quickTitle.trim(),
          due_date: now,
        }),
      });
      setQuickTitle('');
      await refresh();
    } catch (err) {
      setError((err as Error).message || 'Gagal menambahkan tugas.');
    } finally {
      setBusyId(null);
    }
  }

  const completedTodayCount = todayTasks.filter((t) => t.data.status === 'selesai').length;

  return (
    <div className="today-view-wrapper">
      {/* Top Hero & Date Header */}
      <header className="today-header-card">
        <div className="today-header-meta">
          <span className="today-date-badge">
            <CalendarDays size={14} />
            {formatDate(now)}
          </span>
          <h1>Fokus Kerja Hari Ini</h1>
          <p>Kelola agenda kerja, selesaikan tugas jatuh tempo, dan koordinasikan rapat harian.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="today-stats-grid">
          <div className="today-stat-pill">
            <span className="stat-label">Hari Ini</span>
            <strong>
              {completedTodayCount} / {todayTasks.length} selesai
            </strong>
          </div>
          {overdueTasks.length > 0 && (
            <div className="today-stat-pill alert-pill">
              <span className="stat-label">Perlu Diperhatikan</span>
              <strong>{overdueTasks.length} terlambat</strong>
            </div>
          )}
          <div className="today-stat-pill">
            <span className="stat-label">Agenda Rapat</span>
            <strong>{todayMeetings.length} rapat</strong>
          </div>
          <div className="today-stat-pill">
            <span className="stat-label">Menyusul 7 Hari</span>
            <strong>{upcomingTasks.length} tugas</strong>
          </div>
        </div>
      </header>

      {/* Quick Add Task Input Card */}
      <form className="today-quick-add-card" onSubmit={handleQuickAdd}>
        <div className="quick-add-input-wrap">
          <Plus size={18} className="quick-add-icon" />
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="Tambah tugas baru untuk hari ini, lalu tekan Enter…"
            disabled={busyId === 'quick-add'}
          />
        </div>
        <div className="quick-add-actions">
          <button
            type="submit"
            className="btn-quick-submit"
            disabled={!quickTitle.trim() || busyId === 'quick-add'}
          >
            {busyId === 'quick-add' ? 'Menyimpan…' : 'Tambah'}
          </button>
          <button
            type="button"
            className="btn-full-task-modal"
            onClick={() => setShowCreateModal(true)}
            title="Buka formulir lengkap dengan rincian"
          >
            + Form lengkap
          </button>
        </div>
      </form>

      {error && (
        <div className="notice error" role="alert">
          {error}
        </div>
      )}

      {/* 2-Column Responsive Layout */}
      <div className="today-grid-layout">
        {/* Left Primary Column: Today's Tasks & Overdue */}
        <main className="today-main-column">
          {/* Overdue Alert Section (Shown prominently when tasks are late) */}
          {overdueTasks.length > 0 && (
            <section className="today-card-section overdue-section">
              <div className="section-title-row">
                <div className="title-left">
                  <span className="section-alert-icon">
                    <AlertTriangle size={17} />
                  </span>
                  <h2>Tugas Terlambat</h2>
                </div>
                <span className="overdue-badge-count">{overdueTasks.length} tugas</span>
              </div>
              <p className="section-subtitle">
                Tugas dengan tenggat yang sudah terlewat. Jadwalkan ulang ke hari ini atau
                selesaikan.
              </p>

              <div className="today-task-cards-list">
                {overdueTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.data.workstream_id);
                  const isBusy = busyId === task.id;
                  return (
                    <div
                      key={task.id}
                      className={`today-task-card overdue-card ${isBusy ? 'is-busy' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setDetailTask(task)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setDetailTask(task);
                        }
                      }}
                    >
                      <button
                        type="button"
                        className="today-check-circle"
                        onClick={(e) => toggleComplete(task, e)}
                        title="Tandai selesai"
                      >
                        <Check size={14} className="check-mark" />
                      </button>

                      <div className="task-info-content">
                        <div className="task-title-row">
                          <strong className="task-title-text">
                            {String(task.data.title)}
                          </strong>
                          <span className="late-date-pill">
                            Lewat: {formatDate(String(task.data.due_date))}
                          </span>
                        </div>
                        <div className="task-tags-row">
                          {project && (
                            <span className="task-project-pill">
                              <span
                                className="project-color-dot"
                                style={{
                                  backgroundColor: String(project.data.color || 'var(--brand)'),
                                }}
                              />
                              {String(project.data.title)}
                            </span>
                          )}
                          <span
                            className={`task-priority-tag priority-${task.data.priority || 'sedang'}`}
                          >
                            {String(task.data.priority || 'sedang')}
                          </span>
                        </div>
                      </div>

                      <div className="task-actions-right">
                        <button
                          type="button"
                          className="btn-reschedule-today"
                          onClick={(e) => rescheduleToToday(task, e)}
                          title="Pindahkan tenggat ke hari ini"
                        >
                          <RotateCcw size={13} />
                          <span>Ke Hari Ini</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Today Tasks Section */}
          <section className="today-card-section">
            <div className="section-title-row">
              <div className="title-left">
                <span className="section-icon-pill">
                  <CalendarCheck size={18} />
                </span>
                <h2>Tugas Hari Ini</h2>
              </div>
              <span className="today-count-badge">
                {completedTodayCount} dari {todayTasks.length} selesai
              </span>
            </div>

            {todayTasks.length === 0 ? (
              <div className="today-empty-state">
                <CalendarDays size={32} />
                <h3>Belum ada tugas untuk hari ini</h3>
                <p>
                  Tambahkan tugas langsung lewat kolom di atas atau tentukan prioritas kerja Anda
                  hari ini.
                </p>
                <button
                  type="button"
                  className="btn-create-today"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={16} /> Tambah tugas baru
                </button>
              </div>
            ) : (
              <div className="today-task-cards-list">
                {todayTasks.map((task) => {
                  const isDone = task.data.status === 'selesai';
                  const project = projects.find((p) => p.id === task.data.workstream_id);
                  const subtasks = Array.isArray(task.data.subtasks)
                    ? (task.data.subtasks as { title: string; done: boolean }[])
                    : [];
                  const isBusy = busyId === task.id;

                  return (
                    <div
                      key={task.id}
                      className={`today-task-card ${isDone ? 'is-completed' : ''} ${isBusy ? 'is-busy' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setDetailTask(task)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setDetailTask(task);
                        }
                      }}
                    >
                      <button
                        type="button"
                        className={`today-check-circle ${isDone ? 'checked' : ''}`}
                        onClick={(e) => toggleComplete(task, e)}
                        title={isDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                      >
                        {isDone && <Check size={14} className="check-mark" />}
                      </button>

                      <div className="task-info-content">
                        <div className="task-title-row">
                          <strong className="task-title-text">{String(task.data.title)}</strong>
                        </div>
                        <div className="task-tags-row">
                          {project && (
                            <span className="task-project-pill">
                              <span
                                className="project-color-dot"
                                style={{
                                  backgroundColor: String(project.data.color || 'var(--brand)'),
                                }}
                              />
                              {String(project.data.title)}
                            </span>
                          )}
                          <span
                            className={`task-priority-tag priority-${task.data.priority || 'sedang'}`}
                          >
                            {String(task.data.priority || 'sedang')}
                          </span>
                          {subtasks.length > 0 && (
                            <span className="subtasks-summary-pill">
                              {subtasks.filter((s) => s.done).length}/{subtasks.length} subtugas
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="task-actions-right">
                        <ChevronRight size={18} className="chevron-open" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>

        {/* Right Sidebar Column: Meetings & Upcoming */}
        <aside className="today-side-column">
          {/* Today Meetings Section */}
          <section className="today-card-section meetings-section">
            <div className="section-title-row">
              <div className="title-left">
                <span className="section-icon-pill">
                  <Clock size={17} />
                </span>
                <h2>Rapat Hari Ini</h2>
              </div>
              <span className="meeting-count-badge">{todayMeetings.length}</span>
            </div>

            {todayMeetings.length === 0 ? (
              <div className="side-empty-note">
                <p>Tidak ada jadwal rapat untuk hari ini.</p>
              </div>
            ) : (
              <div className="today-meetings-list">
                {todayMeetings.map((meeting) => {
                  const mData = meeting.data;
                  const modeStr = String(mData.mode || 'tatap muka').toLowerCase();
                  const isOnline = modeStr === 'online';
                  const isHybrid = modeStr === 'hybrid';
                  const showLocation =
                    (modeStr === 'tatap muka' || isHybrid) && Boolean(mData.location);
                  const showOnlineLink = (isOnline || isHybrid) && Boolean(mData.meeting_url);
                  return (
                    <div key={meeting.id} className="today-meeting-card">
                      <div className="meeting-time-row">
                        <span className="meeting-time-pill">
                          <Clock size={12} />
                          {String(mData.time || 'Waktu belum diisi')} WIB
                        </span>
                        <span className="meeting-mode-pill">
                          {isOnline ? (
                            <Video size={12} />
                          ) : isHybrid ? (
                            <Globe size={12} />
                          ) : (
                            <MapPin size={12} />
                          )}
                          {isOnline ? 'Online' : isHybrid ? 'Hybrid' : 'Tatap muka'}
                        </span>
                      </div>

                      <strong className="meeting-title">{String(mData.title)}</strong>

                      {showLocation && (
                        <p className="meeting-location-text">
                          <MapPin size={13} /> {String(mData.location)}
                        </p>
                      )}

                      <div className="meeting-card-actions">
                        {showOnlineLink && (
                          <a
                            href={String(mData.meeting_url)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-join-meeting"
                          >
                            <ExternalLink size={13} /> Masuk Rapat
                          </a>
                        )}
                        <button
                          type="button"
                          className="btn-download-ics"
                          onClick={() => downloadMeeting(meeting)}
                          title="Unduh jadwal (.ics) ke kalender perangkat"
                        >
                          <Download size={13} /> Unduh (.ics)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Upcoming 7 Days Tasks Section */}
          <section className="today-card-section upcoming-section">
            <div className="section-title-row">
              <div className="title-left">
                <span className="section-icon-pill">
                  <CalendarDays size={17} />
                </span>
                <h2>Menyusul (7 Hari)</h2>
              </div>
              <span className="upcoming-count-badge">{upcomingTasks.length}</span>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="side-empty-note">
                <p>Tidak ada tugas berjadwal dalam 7 hari ke depan.</p>
              </div>
            ) : (
              <div className="upcoming-tasks-mini-list">
                {upcomingTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.data.workstream_id);
                  return (
                    <div
                      key={task.id}
                      className="upcoming-mini-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => setDetailTask(task)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setDetailTask(task);
                        }
                      }}
                    >
                      <span className="upcoming-date-tag">
                        {formatDate(String(task.data.due_date))}
                      </span>
                      <strong className="upcoming-task-title">{String(task.data.title)}</strong>
                      {project && (
                        <span className="upcoming-project-tag">{String(project.data.title)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </aside>
      </div>

      {/* Task Detail Drawer */}
      {detailTask && (
        <TaskDetailDrawer
          key={detailTask.id}
          task={
            (workspace['work-items'] || []).find((item) => item.id === detailTask.id) || detailTask
          }
          workspace={workspace}
          onClose={() => setDetailTask(null)}
          onUpdated={refresh}
        />
      )}

      {/* Modal Add Task */}
      {showCreateModal && (
        <Editor
          entity="work-items"
          workspace={workspace}
          item={{
            id: '',
            created_at: '',
            updated_at: '',
            data: {
              ...schemas['work-items'].parse({
                title: '',
                due_date: now,
              }),
            },
          }}
          onClose={() => setShowCreateModal(false)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
