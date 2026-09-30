import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, formatDate, today } from '@/lib/date';
import type { Item } from './schemas';
export function TaskCalendar({
  items,
  render,
}: {
  items: Item[];
  render: (item: Item) => React.ReactNode;
}) {
  const [month, setMonth] = useState(today().slice(0, 7));
  const [selected, setSelected] = useState<string | null>(null);
  const monthItems = items.filter((item) => String(item.data.due_date).startsWith(month));
  const monthLabel = new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(month + '-01T12:00:00Z'));
  function moveMonth(offset: number) {
    const date = new Date(month + '-01T12:00:00Z');
    date.setUTCMonth(date.getUTCMonth() + offset);
    setMonth(date.toISOString().slice(0, 7));
    setSelected(null);
  }
  const first = month + '-01',
    weekday = (new Date(first + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const start = addDays(first, -weekday),
    days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  return (
    <section className="task-calendar">
      <header className="calendar-toolbar">
        <div className="calendar-title">
          <span className="calendar-symbol">
            <CalendarDays size={22} />
          </span>
          <div>
            <h3 aria-live="polite">{monthLabel}</h3>
            <small>{monthItems.length} tugas bulan ini</small>
          </div>
        </div>
        <div className="calendar-controls">
          <button type="button" aria-label="Bulan sebelumnya" onClick={() => moveMonth(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              setMonth(today().slice(0, 7));
              setSelected(today());
            }}
          >
            Hari ini
          </button>
          <button type="button" aria-label="Bulan berikutnya" onClick={() => moveMonth(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
        <label className="calendar-month">
          Bulan
          <input
            aria-label="Bulan kalender"
            type="month"
            value={month}
            onChange={(e) => {
              if (e.target.value) {
                setMonth(e.target.value);
                setSelected(null);
              }
            }}
          />
        </label>
      </header>
      <div className="calendar-grid">
        <div className="calendar-week">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
            <strong key={day}>{day}</strong>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((date) => (
            <section
              key={date}
              className={`${date === today() ? 'calendar-today' : ''} ${date.slice(0, 7) !== month ? 'calendar-outside' : ''}`}
            >
              <button
                type="button"
                className="calendar-day-number"
                aria-label={formatDate(date)}
                aria-pressed={selected === date}
                aria-current={date === today() ? 'date' : undefined}
                onClick={() => {
                  setMonth(date.slice(0, 7));
                  setSelected(date);
                }}
              >
                {Number(date.slice(-2))}
              </button>
              {items
                .filter((item) => item.data.due_date === date)
                .map((item) => (
                  <button
                    type="button"
                    className="calendar-event"
                    data-status={String(item.data.status)}
                    key={item.id}
                    onClick={() => {
                      setMonth(date.slice(0, 7));
                      setSelected(date);
                    }}
                  >
                    {String(item.data.title)}
                  </button>
                ))}
            </section>
          ))}
        </div>
      </div>
      <div className="calendar-agenda">
        <div className="section-head">
          <h3>{selected ? formatDate(selected) : 'Agenda bulan ini'}</h3>
          {selected && (
            <button type="button" onClick={() => setSelected(null)}>
              Semua tanggal
            </button>
          )}
        </div>
        {(selected
          ? !items.some((item) => item.data.due_date === selected)
          : !monthItems.length) && (
          <p className="calendar-empty">
            {selected ? 'Tidak ada tugas pada tanggal ini.' : 'Belum ada tugas bulan ini.'}
          </p>
        )}
        {Array.from(
          new Set(
            items
              .filter((item) =>
                selected
                  ? item.data.due_date === selected
                  : String(item.data.due_date).startsWith(month),
              )
              .map((item) => String(item.data.due_date)),
          ),
        )
          .sort()
          .map((date) => (
            <section key={date}>
              <h3>{formatDate(date)}</h3>
              <div className="records">
                {items.filter((item) => item.data.due_date === date).map(render)}
              </div>
            </section>
          ))}
      </div>
    </section>
  );
}
