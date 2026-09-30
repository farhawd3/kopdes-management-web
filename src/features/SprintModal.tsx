'use client';
import { useState } from 'react';
import { X, Target, Calendar, Clock } from 'lucide-react';
import { addDays, today } from '@/lib/date';
import { api } from '@/lib/client';
import { schemas, type Item } from './schemas';

export function SprintModal({
  sprint,
  onClose,
  onSaved,
}: {
  sprint?: Item | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [title, setTitle] = useState(String(sprint?.data.title || 'Sprint 1'));
  const [goal, setGoal] = useState(String(sprint?.data.goal || ''));
  const [duration, setDuration] = useState(
    (sprint?.data.duration as '1 minggu' | '2 minggu' | '1 bulan' | 'kustom') || '2 minggu',
  );
  const [startDate, setStartDate] = useState(String(sprint?.data.start_date || today()));
  const [endDate, setEndDate] = useState(
    String(sprint?.data.end_date || addDays(today(), 14)),
  );
  const [status, setStatus] = useState(
    (sprint?.data.status as 'aktif' | 'rencana' | 'selesai') || 'aktif',
  );
  const [notes, setNotes] = useState(String(sprint?.data.notes || ''));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function handleDurationChange(val: '1 minggu' | '2 minggu' | '1 bulan' | 'kustom') {
    setDuration(val);
    if (val === '1 minggu') setEndDate(addDays(startDate, 7));
    else if (val === '2 minggu') setEndDate(addDays(startDate, 14));
    else if (val === '1 bulan') setEndDate(addDays(startDate, 30));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Nama target periode wajib diisi');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const payload = schemas.sprints.parse({
        title,
        goal,
        duration,
        start_date: startDate,
        end_date: endDate,
        status,
        notes,
      });
      await api('sprints', { id: sprint?.id || undefined, data: payload });
      await onSaved();
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Gagal menyimpan target periode.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="sprint-modal-backdrop" role="dialog" aria-labelledby="sprint-modal-title">
      <div className="sprint-modal-card">
        <header className="sprint-modal-head">
          <div className="title-with-badge">
            <span className="sprint-icon-pill">
              <Target size={18} />
            </span>
            <h2 id="sprint-modal-title">
              {sprint?.id ? 'Ubah Target Periode' : 'Target Periode (Sprint)'}
            </h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Tutup modal">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="sprint-form">
          <label className="field-group">
            <span className="field-label">Nama Periode / Sprint *</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Sprint 1 — Persiapan Operasional Gerai"
              className="text-input"
            />
          </label>

          <label className="field-group">
            <span className="field-label">Tujuan / Goal Sprint</span>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Contoh: Kesiapan rak, pasokan barang utama & opname awal"
              className="text-input"
            />
          </label>

          <div className="form-row-2">
            <label className="field-group">
              <span className="field-label">
                <Clock size={14} /> Durasi
              </span>
              <select
                value={duration}
                onChange={(e) =>
                  handleDurationChange(
                    e.target.value as '1 minggu' | '2 minggu' | '1 bulan' | 'kustom',
                  )
                }
                className="select-input"
              >
                <option value="1 minggu">01 Minggu</option>
                <option value="2 minggu">02 Minggu</option>
                <option value="1 bulan">01 Bulan</option>
                <option value="kustom">Kustom</option>
              </select>
            </label>

            <label className="field-group">
              <span className="field-label">Status</span>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'aktif' | 'rencana' | 'selesai')
                }
                className="select-input"
              >
                <option value="aktif">Aktif</option>
                <option value="rencana">Rencana</option>
                <option value="selesai">Selesai</option>
              </select>
            </label>
          </div>

          <div className="form-row-2">
            <label className="field-group">
              <span className="field-label">
                <Calendar size={14} /> Tanggal Mulai
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (duration === '1 minggu') setEndDate(addDays(e.target.value, 7));
                  else if (duration === '2 minggu') setEndDate(addDays(e.target.value, 14));
                  else if (duration === '1 bulan') setEndDate(addDays(e.target.value, 30));
                }}
                className="text-input"
              />
            </label>

            <label className="field-group">
              <span className="field-label">
                <Calendar size={14} /> Tanggal Selesai
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-input"
              />
            </label>
          </div>

          <label className="field-group">
            <span className="field-label">Catatan Tambahan</span>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan koordinasi sprint..."
              className="text-input"
            />
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="sprint-form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={busy}>
              Batal
            </button>
            <button type="submit" className="btn-save-sprint" disabled={busy}>
              {busy ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
