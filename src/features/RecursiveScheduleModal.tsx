'use client';
import { useState } from 'react';
import { X, Repeat, Clock, Calendar } from 'lucide-react';
import { addDays, today } from '@/lib/date';

export function RecursiveScheduleModal({
  currentType = 'mingguan',
  currentTime = '09:00',
  currentEndDate = '',
  onClose,
  onSave,
}: {
  currentType?: string;
  currentTime?: string;
  currentEndDate?: string;
  onClose: () => void;
  onSave: (schedule: { recurrence: string; recurrence_time: string; recurrence_end_date: string }) => void;
}) {
  const [repeatType, setRepeatType] = useState(
    ['harian', 'mingguan', 'bulanan'].includes(currentType) ? currentType : 'mingguan',
  );
  const [time, setTime] = useState(currentTime || '09:00');
  const [endDate, setEndDate] = useState(currentEndDate || addDays(today(), 60));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      recurrence: repeatType,
      recurrence_time: time,
      recurrence_end_date: endDate,
    });
    onClose();
  }

  return (
    <div className="sprint-modal-backdrop" role="dialog" aria-labelledby="recursive-title">
      <div className="sprint-modal-card">
        <header className="sprint-modal-head">
          <div className="title-with-badge">
            <span className="sprint-icon-pill">
              <Repeat size={18} />
            </span>
            <h2 id="recursive-title">Jadwal Berkala (Recursive)</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="sprint-form">
          <label className="field-group">
            <span className="field-label">Tipe Perulangan</span>
            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value)}
              className="select-input"
            >
              <option value="harian">Setiap Hari (Harian)</option>
              <option value="mingguan">Setiap Minggu (Mingguan)</option>
              <option value="bulanan">Setiap Bulan (Bulanan)</option>
            </select>
          </label>

          <label className="field-group">
            <span className="field-label">
              <Clock size={14} /> Jam Eksekusi (WIB)
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-input"
            />
          </label>

          <label className="field-group">
            <span className="field-label">
              <Calendar size={14} /> Berakhir Pada Tanggal (Opsional)
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-input"
            />
          </label>

          <div className="sprint-form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                onSave({ recurrence: 'tidak', recurrence_time: '09:00', recurrence_end_date: '' });
                onClose();
              }}
            >
              Nonaktifkan
            </button>
            <button type="submit" className="btn-save-sprint">
              Simpan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
