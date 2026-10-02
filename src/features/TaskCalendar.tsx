import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { addDays, formatDate, today } from '@/lib/date';
import type { Item } from './schemas';
export function TaskCalendar({
  items,
  render,
  onCreate,
  onEdit,
}: {
  items: Item[];
  onCreate?: (date: string) => void;
  onEdit?: (item: Item) => void;
  render: (item: Item) => React.ReactNode;
}) {
  const [month, setMonth] = useState(today().slice(0, 7));
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<'month' | 'week' | 'day'>('month');
  const [anchor, setAnchor] = useState(today());
  const monthItems = items.filter((item) => String(item.data.due_date).startsWith(month));
  const monthLabel = new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(month + '-01T12:00:00Z'));
  function moveMonth(offset: number) {
    if (mode !== 'month') {
      const next = addDays(anchor, offset * (mode === 'week' ? 7 : 1));
      setAnchor(next);
      setMonth(next.slice(0, 7));
      setSelected(null);
      return;
    }
    const date = new Date(month + '-01T12:00:00Z');
    date.setUTCMonth(date.getUTCMonth() + offset);
    setMonth(date.toISOString().slice(0, 7));
    setAnchor(date.toISOString().slice(0, 10));
    setSelected(null);
  }
  const first = month + '-01',
    weekday = (new Date(first + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const start = addDays(first, -weekday),
    days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  const weekStart = addDays(anchor, -((new Date(anchor + 'T12:00:00Z').getUTCDay() + 6) % 7));
  const visibleDays =
    mode === 'month'
      ? days
      : mode === 'day'
        ? [anchor]
        : Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const periodItems =
    mode === 'month'
      ? monthItems
      : items.filter((item) => visibleDays.includes(String(item.data.due_date)));
  return (
    <section className={`task-calendar calendar-mode-${mode}`}>
      <header className="calendar-toolbar">
        <div className="calendar-title">
          <span className="calendar-symbol">
            <CalendarDays size={22} />
          </span>
          <div>
            <h3 aria-live="polite">
              {mode === 'day'
                ? formatDate(anchor)
                : mode === 'week'
                  ? `${formatDate(weekStart)} – ${formatDate(addDays(weekStart, 6))}`
                  : monthLabel}
            </h3>
            <small>{periodItems.length} tugas · pribadi</small>
          </div>
        </div>
        <div className="calendar-controls">
          <button
            type="button"
            aria-label={
              mode === 'month'
                ? 'Bulan sebelumnya'
                : mode === 'week'
                  ? 'Minggu sebelumnya'
                  : 'Hari sebelumnya'
            }
            onClick={() => moveMonth(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              setMonth(today().slice(0, 7));
              setSelected(today());
              setAnchor(today());
            }}
          >
            Hari ini
          </button>
          <button
            type="button"
            aria-label={
              mode === 'month'
                ? 'Bulan berikutnya'
                : mode === 'week'
                  ? 'Minggu berikutnya'
                  : 'Hari berikutnya'
            }
            onClick={() => moveMonth(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="calendar-modes" aria-label="Rentang kalender">
          {(['month', 'week', 'day'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => {
                setMode(value);
                setSelected(null);
              }}
            >
              {value === 'month' ? 'Bulan' : value === 'week' ? 'Minggu' : 'Hari'}
            </button>
          ))}
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
                setAnchor(e.target.value + '-01');
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
          {visibleDays.map((date) => {
            const isSelected = selected === date;
            const isToday = date === today();
            const isOutside = date.slice(0, 7) !== month;
            const dayTasks = items.filter((item) => item.data.due_date === date);
            const hasTasks = dayTasks.length > 0;

            return (
              <section
                key={date}
                className={`calendar-day-cell ${hasTasks ? 'calendar-has-tasks' : ''} ${isToday ? 'calendar-today' : ''} ${isOutside ? 'calendar-outside' : ''} ${isSelected ? 'calendar-selected' : ''}`}
                onClick={() => {
                  setMonth(date.slice(0, 7));
                  setSelected(date);
                  setAnchor(date);
                }}
              >
                <div className="calendar-day-header">
                  <button
                    type="button"
                    className="calendar-day-number"
                    aria-label={formatDate(date)}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMonth(date.slice(0, 7));
                      setSelected(date);
                      setAnchor(date);
                    }}
                  >
                    {Number(date.slice(-2))}
                  </button>
                  {onCreate && (
                    <button
                      className="calendar-add"
                      type="button"
                      title={`Tambah tugas ${formatDate(date)}`}
                      aria-label={`Tambah tugas ${formatDate(date)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreate(date);
                      }}
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  )}
                </div>
                <div className="calendar-events-wrap">
                  {dayTasks.map((item) => (
                    <button
                      type="button"
                      className="calendar-event"
                      data-status={String(item.data.status)}
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMonth(date.slice(0, 7));
                        setSelected(date);
                        onEdit?.(item);
                      }}
                    >
                      {Boolean(item.data.code) && (
                        <span className="cal-task-code">{String(item.data.code)}</span>
                      )}
                      <span className="cal-task-title">{String(item.data.title)}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div className="calendar-agenda">
        <div className="section-head">
          <h3>
            {selected
              ? formatDate(selected)
              : mode === 'month'
                ? 'Agenda bulan ini'
                : mode === 'week'
                  ? 'Agenda minggu ini'
                  : 'Agenda hari ini'}
          </h3>
          {onCreate && (
            <button
              type="button"
              className="calendar-agenda-add-btn"
              onClick={() => onCreate(selected || anchor)}
            >
              <Plus size={15} strokeWidth={2.2} />
              <span>Tambah tugas</span>
            </button>
          )}
          {selected && (
            <button type="button" onClick={() => setSelected(null)}>
              Semua tanggal
            </button>
          )}
        </div>
        {(selected
          ? !items.some((item) => item.data.due_date === selected)
          : !periodItems.length) && (
          <p className="calendar-empty">
            {selected
              ? 'Tidak ada tugas pada tanggal ini.'
              : mode === 'month'
                ? 'Belum ada tugas bulan ini.'
                : 'Belum ada tugas pada rentang ini.'}
          </p>
        )}
        {Array.from(
          new Set(
            periodItems
              .filter((item) => (selected ? item.data.due_date === selected : true))
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
