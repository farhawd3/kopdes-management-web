'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { addDays, formatDate, today } from '@/lib/date';
export function DateField({
  name,
  label,
  defaultValue = '',
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const id = useId(),
    root = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(defaultValue),
    [open, setOpen] = useState(false),
    [month, setMonth] = useState((defaultValue || today()).slice(0, 7));
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  const first = month + '-01';
  const offset = (new Date(first + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const days = Array.from({ length: 42 }, (_, index) => addDays(first, index - offset));
  function move(amount: number) {
    const date = new Date(first + 'T12:00:00Z');
    date.setUTCMonth(date.getUTCMonth() + amount);
    setMonth(date.toISOString().slice(0, 7));
  }
  function choose(date: string) {
    setValue(date);
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <div
      className="date-field"
      ref={root}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <label htmlFor={id}>{label}</label>
      <div className="date-input">
        <input
          id={id}
          aria-label={label}
          name={name}
          type="date"
          required={required}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (event.target.value) setMonth(event.target.value.slice(0, 7));
          }}
        />
        <button
          type="button"
          ref={trigger}
          aria-label={`Pilih ${label.toLowerCase()}`}
          aria-expanded={open}
          aria-controls={id + '-picker'}
          onClick={() => {
            setMonth((value || today()).slice(0, 7));
            setOpen(!open);
          }}
        >
          <CalendarDays size={18} />
        </button>
      </div>
      {open && (
        <div
          id={id + '-picker'}
          className="date-picker"
          role="group"
          aria-label={`Kalender ${label}`}
        >
          <div className="date-picker-head">
            <button type="button" aria-label="Bulan sebelumnya" onClick={() => move(-1)}>
              <ChevronLeft size={16} />
            </button>
            <strong aria-live="polite">
              {new Intl.DateTimeFormat('id-ID', {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(first + 'T12:00:00Z'))}
            </strong>
            <button type="button" aria-label="Bulan berikutnya" onClick={() => move(1)}>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="date-picker-week">
            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, index) => (
              <span key={index}>{day}</span>
            ))}
          </div>
          <div className="date-picker-days">
            {days.map((date) => (
              <button
                type="button"
                key={date}
                aria-label={formatDate(date)}
                aria-pressed={date === value}
                aria-current={date === today() ? 'date' : undefined}
                data-outside={date.slice(0, 7) !== month}
                onClick={() => choose(date)}
              >
                {Number(date.slice(-2))}
              </button>
            ))}
          </div>
          <div className="date-picker-footer">
            <button type="button" onClick={() => choose(today())}>
              Hari ini
            </button>
            {!required && (
              <button type="button" onClick={() => choose('')}>
                Kosongkan
              </button>
            )}
            <button
              type="button"
              aria-label="Tutup kalender"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
