'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Repeat,
  ChevronLeft,
  ChevronRight,
  X,
  Edit2,
  Plus,
  Send,
  Trash2,
  Calendar,
  Flag,
  ExternalLink,
} from 'lucide-react';
import { schemas, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { api } from '@/lib/client';
import { formatDate, today } from '@/lib/date';
import { RecursiveScheduleModal } from './RecursiveScheduleModal';

type ActivityItem = {
  id: string;
  user: string;
  role?: string;
  text: string;
  created_at: string;
  type: 'log' | 'comment' | 'status_change' | 'creation';
};

export function TaskDetailDrawer({
  task,
  workspace,
  onClose,
  onUpdated,
  onPrev,
  onNext,
}: {
  task: Item;
  workspace: Workspace;
  onClose: () => void;
  onUpdated: () => Promise<void>;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  const data = task.data;
  const isComplete = data.status === 'selesai';

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(String(data.title || ''));
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [description, setDescription] = useState(String(data.description || ''));
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const subtasks = Array.isArray(data.subtasks)
    ? (data.subtasks as { title: string; done: boolean; code?: string }[])
    : [];

  const completedSubtasks = subtasks.filter((s) => s.done).length;
  const subtasksPercent =
    subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;

  // Activities & coordination comments
  const activities: ActivityItem[] =
    Array.isArray(data.activities) && data.activities.length > 0
      ? (data.activities as ActivityItem[])
      : [];

  const project = workspace.workstreams?.find((w) => w.id === data.workstream_id);
  const stakeholder = workspace.stakeholders?.find((row) => row.id === data.stakeholder_id);
  const document = workspace.documents?.find((row) => row.id === data.document_id);
  const managerName = String(workspace.organization?.[0]?.data?.manager || 'Manajer');

  async function saveChanges(changes: Record<string, unknown>, activityMsg?: string) {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const updatedActivities = [...activities];
      if (activityMsg) {
        updatedActivities.push({
          id: crypto.randomUUID(),
          user: managerName,
          role: 'Pelaksana Utama',
          text: activityMsg,
          created_at: new Date().toISOString(),
          type: activityMsg.startsWith('menambahkan catatan:') ? 'comment' : 'status_change',
        });
      }

      const updatedPayload = {
        ...data,
        ...changes,
        activities: updatedActivities,
      };

      const parsed = schemas['work-items'].parse(updatedPayload);
      await api('work-items', { id: task.id, data: parsed });
      await onUpdated();
      return true;
    } catch (err) {
      setError((err as Error).message || 'Gagal memperbarui tugas.');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function toggleComplete() {
    const nextStatus = isComplete ? 'rencana' : 'selesai';
    await saveChanges(
      {
        status: nextStatus,
        completed_at: nextStatus === 'selesai' ? today() : '',
      },
      nextStatus === 'selesai'
        ? 'telah menandai tugas ini selesai'
        : 'membuka kembali status tugas',
    );
  }

  async function handleAddSubtask(e: React.FormEvent) {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const nextSubtasks = [...subtasks, { title: newSubtaskTitle.trim(), done: false }];
    setNewSubtaskTitle('');
    await saveChanges(
      { subtasks: nextSubtasks },
      `menambahkan subtugas: "${newSubtaskTitle.trim()}"`,
    );
  }

  async function toggleSubtask(index: number) {
    const nextSubtasks = subtasks.map((s, idx) => (idx === index ? { ...s, done: !s.done } : s));
    await saveChanges({ subtasks: nextSubtasks });
  }

  async function removeSubtask(index: number) {
    const nextSubtasks = subtasks.filter((_, idx) => idx !== index);
    await saveChanges({ subtasks: nextSubtasks });
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const msg = `menambahkan catatan: "${newCommentText.trim()}"`;
    if (await saveChanges({}, msg)) setNewCommentText('');
  }

  return (
    <dialog
      ref={dialog}
      className="task-detail-drawer"
      aria-label="Detail Tugas"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="task-detail-backdrop" onClick={onClose} />
      <div className="task-detail-panel">
        {/* Top Control Bar */}
        <div className="drawer-top-bar">
          <div className="left-controls">
            <button
              type="button"
              className={`btn-mark-complete ${isComplete ? 'completed' : ''}`}
              onClick={toggleComplete}
              disabled={busy}
            >
              <Check size={16} />
              <span>{isComplete ? 'Selesai' : 'Tandai Selesai'}</span>
            </button>
            <button
              type="button"
              className="btn-icon"
              title="Jadwal Berkala"
              onClick={() => setShowScheduleModal(true)}
            >
              <Repeat size={16} />
            </button>
          </div>

          <div className="right-controls">
            {onPrev && (
              <button type="button" className="btn-icon" title="Tugas Sebelumnya" onClick={onPrev}>
                <ChevronLeft size={18} />
              </button>
            )}
            {onNext && (
              <button type="button" className="btn-icon" title="Tugas Berikutnya" onClick={onNext}>
                <ChevronRight size={18} />
              </button>
            )}
            <button
              type="button"
              className="btn-icon close-drawer-btn"
              title="Tutup"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {error && (
          <div className="drawer-error" role="alert">
            {error}
          </div>
        )}

        {/* Task Title & Code Header */}
        <div className="drawer-header-section">
          <div className="header-meta-row">
            {Boolean(data.code) && (
              <span
                className="task-code-badge"
                title="Kode tugas dibuat otomatis saat tugas disimpan"
              >
                {String(data.code)}
              </span>
            )}
            {project && (
              <Link
                href={`/proyek?id=${project.id}`}
                className="project-badge project-badge-link"
                style={{ borderColor: String(project.data.color || '#d5f935') }}
                title={`Buka proyek ${String(project.data.title)}`}
              >
                {String(project.data.title)}
              </Link>
            )}
            <span className={`priority-badge priority-${data.priority || 'normal'}`}>
              <Flag size={12} /> {String(data.priority || 'normal')}
            </span>
          </div>

          {isEditingTitle ? (
            <div className="title-edit-form">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                className="title-input-field"
              />
              <div className="inline-actions">
                <button
                  type="button"
                  className="btn-tiny-save"
                  onClick={async () => {
                    setIsEditingTitle(false);
                    if (title !== data.title) {
                      await saveChanges({ title }, `mengubah judul menjadi "${title}"`);
                    }
                  }}
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn-tiny-cancel"
                  onClick={() => {
                    setTitle(String(data.title));
                    setIsEditingTitle(false);
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <h2 className="task-detail-title" onClick={() => setIsEditingTitle(true)}>
              <span>{String(data.title)}</span>
              <button type="button" className="inline-edit-icon" title="Ubah Judul">
                <Edit2 size={16} />
              </button>
            </h2>
          )}

          {/* Description Section */}
          <div className="drawer-description-box">
            <div className="box-title-row">
              <span className="section-label">Deskripsi</span>
              {!isEditingDesc && (
                <button
                  type="button"
                  className="edit-pencil-btn"
                  onClick={() => setIsEditingDesc(true)}
                  title="Ubah Deskripsi"
                >
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            {isEditingDesc ? (
              <div className="desc-edit-form">
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahkan detail tugas..."
                  className="desc-textarea-field"
                />
                <div className="inline-actions">
                  <button
                    type="button"
                    className="btn-tiny-save"
                    onClick={async () => {
                      setIsEditingDesc(false);
                      if (description !== data.description) {
                        await saveChanges({ description });
                      }
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn-tiny-cancel"
                    onClick={() => {
                      setDescription(String(data.description || ''));
                      setIsEditingDesc(false);
                    }}
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <p className="task-desc-text" onClick={() => setIsEditingDesc(true)}>
                {String(data.description || 'Klik di sini untuk menambahkan deskripsi tugas.')}
              </p>
            )}
          </div>
        </div>

        {/* 3-Column Metadata Row (Assigned By, Assigned To, Followers) */}
        <div className="metadata-cards-grid">
          <div className="meta-card">
            <span className="meta-label">DIBUAT OLEH</span>
            <div className="user-profile-row">
              <span className="meta-avatar manager-avatar">M</span>
              <div className="user-info">
                <strong>{managerName}</strong>
                <small>Catatan pribadi</small>
              </div>
            </div>
          </div>

          <div className="meta-card">
            <span className="meta-label">PENANGGUNG JAWAB</span>
            <div className="user-profile-row">
              <span className="meta-avatar assignee-avatar">
                {String(data.assignee || managerName)
                  .charAt(0)
                  .toUpperCase()}
              </span>
              <div className="user-info">
                <strong>{String(data.assignee || managerName)}</strong>
                <small>Pelaksana Utama</small>
              </div>
            </div>
          </div>
        </div>

        {/* Due Date & Recurrence Row */}
        <div className="date-properties-strip">
          <div className="prop-item">
            <Calendar size={15} />
            <span>
              Tenggat: <strong>{formatDate(String(data.due_date))}</strong>
            </span>
          </div>
          {Boolean(data.recurrence && data.recurrence !== 'tidak') && (
            <div className="prop-item">
              <Repeat size={15} />
              <span>
                Perulangan: <strong>{String(data.recurrence)}</strong>
              </span>
            </div>
          )}
          {stakeholder && (
            <div className="prop-item">
              <span>
                Mitra atau kontak: <strong>{String(stakeholder.data.title)}</strong>
              </span>
            </div>
          )}
          {document && (
            <a href={`/dokumen?record=${encodeURIComponent(document.id)}`} className="prop-link">
              <ExternalLink size={14} /> Dokumen: {String(document.data.title)}
            </a>
          )}
          {Boolean(data.link) && (
            <a href={String(data.link)} target="_blank" rel="noreferrer" className="prop-link">
              <ExternalLink size={14} /> Tautan berkas
            </a>
          )}
        </div>

        {/* Subtasks Section with Tree & Checklist */}
        <div className="subtasks-section">
          <div className="subtasks-header">
            <h4>
              Subtugas ({completedSubtasks}/{subtasks.length})
            </h4>
            {subtasks.length > 0 && (
              <span className="subtasks-progress-badge">{subtasksPercent}%</span>
            )}
          </div>

          {subtasks.length > 0 && (
            <div className="subtasks-progress-bar">
              <div className="bar-fill" style={{ width: `${subtasksPercent}%` }} />
            </div>
          )}

          <div className="subtasks-tree-list">
            {subtasks.map((sub, idx) => (
              <div key={idx} className={`subtask-tree-row ${sub.done ? 'completed' : ''}`}>
                <span className="tree-connector-line">└──</span>
                <button
                  type="button"
                  className={`subtask-check-circle ${sub.done ? 'checked' : ''}`}
                  onClick={() => toggleSubtask(idx)}
                >
                  {sub.done && <Check size={12} />}
                </button>
                {sub.code && <span className="subtask-code-pill">{sub.code}</span>}
                <span className="subtask-title-text" onClick={() => toggleSubtask(idx)}>
                  {sub.title}
                </span>
                <button
                  type="button"
                  className="subtask-delete-btn"
                  title="Hapus Subtugas"
                  onClick={() => removeSubtask(idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddSubtask} className="add-subtask-form">
            <Plus size={15} />
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Tambah subtugas baru, lalu tekan Enter…"
              className="inline-subtask-input"
            />
            {newSubtaskTitle.trim() && (
              <button type="submit" className="btn-add-subtask">
                Tambah
              </button>
            )}
          </form>
        </div>

        {/* Summary & Activity Timeline */}
        <div className="activity-summary-section">
          <h4>Catatan dan riwayat tugas</h4>
          <div className="timeline-feed">
            {activities.map((act) => (
              <div key={act.id} className="timeline-event">
                <span className="event-avatar">{act.user.charAt(0).toUpperCase()}</span>
                <div className="event-content">
                  <p className="event-text">
                    <strong>{act.user}</strong> {act.text}
                  </p>
                  <span className="event-time">
                    {new Intl.DateTimeFormat('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'Asia/Jakarta',
                    }).format(new Date(act.created_at))}{' '}
                    WIB
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Rich Message / Comment Editor */}
        <div className="comment-composer-box">
          <form onSubmit={handleAddComment} className="composer-input-row">
            <input
              aria-label="Catatan tugas"
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Tulis catatan tugas…"
              className="composer-input-field"
            />
            <button
              type="submit"
              disabled={busy || !newCommentText.trim()}
              className="btn-send-comment"
            >
              <Send size={15} />
              <span>Simpan catatan</span>
            </button>
          </form>
        </div>
      </div>

      {showScheduleModal && (
        <RecursiveScheduleModal
          currentType={String(data.recurrence || 'tidak')}
          currentTime={String(data.recurrence_time || '09:00')}
          currentEndDate={String(data.recurrence_end_date || '')}
          onClose={() => setShowScheduleModal(false)}
          onSave={async (sched) => {
            await saveChanges(sched, `memperbarui jadwal berkala: ${sched.recurrence}`);
          }}
        />
      )}
    </dialog>
  );
}
