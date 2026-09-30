import { useState } from 'react';
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
  const first = month + '-01',
    weekday = (new Date(first + 'T12:00:00Z').getUTCDay() + 6) % 7;
  const start = addDays(first, -weekday),
    days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  return (
    <section>
      <label className="calendar-month">
        Bulan
        <input
          aria-label="Bulan kalender"
          type="month"
          value={month}
          onChange={(e) => {
            if (e.target.value) setMonth(e.target.value);
          }}
        />
      </label>
      <div className="calendar-grid">
        <div className="calendar-week">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
            <strong key={day}>{day}</strong>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((date) => (
            <section key={date} className={date === today() ? 'calendar-today' : ''}>
              <strong className={date.slice(0, 7) !== month ? 'muted' : ''}>
                {Number(date.slice(-2))}
              </strong>
              {items
                .filter((item) => item.data.due_date === date)
                .map((item) => (
                  <div className="calendar-event" key={item.id}>
                    {String(item.data.title)}
                  </div>
                ))}
            </section>
          ))}
        </div>
      </div>
      <div className="calendar-agenda">
        {Array.from(
          new Set(
            items
              .filter((item) => String(item.data.due_date).startsWith(month))
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
