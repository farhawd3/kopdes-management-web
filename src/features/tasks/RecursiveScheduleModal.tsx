'use client';
import { useState, useEffect } from 'react';
import { X, Repeat, Clock, Calendar } from 'lucide-react';
import { Select } from '@/components/ui/Select';

export function RecursiveScheduleModal({
  currentType = 'tidak',
  currentTime = '09:00',
  currentEndDate = '',
  onClose,
  onSave,
}: {
  currentType?: string;
  currentTime?: string;
  currentEndDate?: string;
  onClose: () => void;
  onSave: (schedule: {
    recurrence: string;
    recurrence_time: string;
    recurrence_end_date: string;
  }) => void;
}) {
  const [repeatType, setRepeatType] = useState(
    ['harian', 'mingguan', 'bulanan'].includes(currentType) ? currentType : 'tidak',
  );
  const [time, setTime] = useState(currentTime || '09:00');
  const [endDate, setEndDate] = useState(currentEndDate);
  const enabled = repeatType !== 'tidak';

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      recurrence: repeatType,
      recurrence_time: enabled ? time : '09:00',
      recurrence_end_date: enabled ? endDate : '',
    });
    onClose();
  }

  return (
    <div
      className="sprint-modal-backdrop"
      role="dialog"
      aria-labelledby="recursive-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sprint-modal-card">
        <header className="sprint-modal-head">
          <div className="title-with-badge">
            <span className="sprint-icon-pill">
              <Repeat size={18} />
            </span>
            <h2 id="recursive-title">Jadwal berulang</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="sprint-form">
          <label className="field-group">
            <span className="field-label">Ulangi tugas</span>
            <Select
              value={repeatType}
              onChange={setRepeatType}
              options={[
                { value: 'tidak', label: 'Tidak berulang' },
                { value: 'harian', label: 'Setiap hari' },
                { value: 'mingguan', label: 'Setiap minggu' },
                { value: 'bulanan', label: 'Setiap bulan' },
              ]}
              ariaLabel="Tipe Perulangan"
            />
          </label>

          <label className="field-group">
            <span className="field-label">
              <Clock size={16} aria-hidden="true" /> Jam catatan (WIB)
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-input"
              disabled={!enabled}
              required={enabled}
            />
          </label>

          <label className="field-group">
            <span className="field-label">
              <Calendar size={16} aria-hidden="true" /> Batas pengulangan (opsional)
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-input"
              disabled={!enabled}
            />
          </label>

          <p className="recurrence-explanation">
            {enabled
              ? 'Tugas berikutnya dibuat saat tugas ini ditandai selesai. Jam hanya catatan, bukan pengingat otomatis.'
              : 'Pilih pola pengulangan untuk mengatur jam dan batas tanggal.'}
          </p>
          <div className="sprint-form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-save-sprint">
              Simpan pengulangan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
