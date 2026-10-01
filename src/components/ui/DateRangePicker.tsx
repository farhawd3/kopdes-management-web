'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { addDays, daysBetween, formatDate, today } from '@/lib/date';

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function DateRangePicker({
  startDate = '',
  endDate = '',
  onChange,
  onClose,
}: {
  startDate?: string;
  endDate?: string;
  onChange: (start: string, end: string) => void;
  onClose?: () => void;
}) {
  const [selectedStart, setSelectedStart] = useState<string>(startDate);
  const [selectedEnd, setSelectedEnd] = useState<string>(endDate);
  const [activeMonthYear, setActiveMonthYear] = useState(() => {
    const base = startDate || today();
    return {
      year: Number(base.slice(0, 4)),
      month: Number(base.slice(5, 7)) - 1,
    };
  });

  const currentYear = activeMonthYear.year;
  const currentMonth = activeMonthYear.month;

  // Month string for calendar display
  const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const firstDay = `${monthStr}-01`;
  const offset = (new Date(firstDay + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const daysInGrid = Array.from({ length: 42 }, (_, i) => addDays(firstDay, i - offset));

  const daysCount =
    selectedStart && selectedEnd && selectedEnd >= selectedStart
      ? daysBetween(selectedStart, selectedEnd) + 1
      : selectedStart
        ? 1
        : 0;

  function handleDateClick(date: string) {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd('');
    } else {
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
        onChange(date, selectedStart);
      } else {
        setSelectedEnd(date);
        onChange(selectedStart, date);
      }
    }
  }

  function handleMonthSelect(monthIndex: number) {
    setActiveMonthYear((prev) => ({ ...prev, month: monthIndex }));
  }

  function changeYear(amount: number) {
    setActiveMonthYear((prev) => ({ ...prev, year: prev.year + amount }));
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose?.();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="date-range-picker-modal"
      role="dialog"
      aria-label="Pemilih Rentang Tanggal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="date-range-picker-card">
        <div className="range-picker-body">
          {/* Left Month List Sidebar */}
          <aside className="range-picker-months" aria-label="Daftar Bulan">
            <div className="year-stepper">
              <button
                type="button"
                aria-label="Tahun sebelumnya"
                onClick={() => changeYear(-1)}
              >
                <ChevronLeft size={16} />
              </button>
              <span>{currentYear}</span>
              <button
                type="button"
                aria-label="Tahun berikutnya"
                onClick={() => changeYear(1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <ul className="month-list">
              {MONTH_NAMES.map((name, index) => {
                const isActive = index === currentMonth;
                return (
                  <li key={name}>
                    <button
                      type="button"
                      className={`month-tab ${isActive ? 'active' : ''}`}
                      onClick={() => handleMonthSelect(index)}
                    >
                      {isActive && <span className="active-indicator" />}
                      <span>{name}</span>
                      <small className="month-year-badge">{currentYear}</small>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Right Days Matrix */}
          <section className="range-picker-calendar">
            <header className="calendar-month-head">
              <h3>
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h3>
              {onClose && (
                <button
                  type="button"
                  className="close-picker-btn"
                  onClick={onClose}
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>
              )}
            </header>

            <div className="range-weekdays">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="range-days-grid">
              {daysInGrid.map((date) => {
                const isOutside = date.slice(0, 7) !== monthStr;
                const isStart = date === selectedStart;
                const isEnd = date === selectedEnd;
                const isInRange =
                  selectedStart &&
                  selectedEnd &&
                  date > selectedStart &&
                  date < selectedEnd;
                const isToday = date === today();

                let cellClass = 'range-day-cell';
                if (isOutside) cellClass += ' outside';
                if (isToday) cellClass += ' today';
                if (isStart) cellClass += ' range-start';
                if (isEnd) cellClass += ' range-end';
                if (isInRange) cellClass += ' in-range';

                return (
                  <button
                    key={date}
                    type="button"
                    className={cellClass}
                    onClick={() => handleDateClick(date)}
                    aria-label={formatDate(date)}
                  >
                    <span className="day-number">{Number(date.slice(-2))}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Bar: Days Count & Clear Action */}
            <footer className="range-picker-foot">
              <div className="range-summary">
                {daysCount > 0 ? (
                  <span className="days-counter">
                    <strong>{daysCount} hari</strong> ({formatDate(selectedStart)}
                    {selectedEnd ? ` – ${formatDate(selectedEnd)}` : ''})
                  </span>
                ) : (
                  <span className="days-counter-empty">Pilih tanggal awal dan akhir</span>
                )}
              </div>
              <div className="range-actions">
                <button
                  type="button"
                  className="btn-clear-range"
                  onClick={() => {
                    setSelectedStart('');
                    setSelectedEnd('');
                    onChange('', '');
                  }}
                >
                  Hapus rentang
                </button>
                {onClose && (
                  <button
                    type="button"
                    className="btn-apply-range"
                    onClick={onClose}
                  >
                    Terapkan
                  </button>
                )}
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
