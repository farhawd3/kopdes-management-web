import { addDays, today, formatDate } from '@/lib/date';
import type { Item } from '@/features/schemas';
export function Burnup({ tasks }: { tasks: Item[] }) {
  const now = today();
  const points = Array.from({ length: 8 }, (_, index) => {
    const end = addDays(now, (index - 7) * 7),
      start = addDays(end, -6);
    return {
      date: end,
      done: tasks.filter(
        (row) =>
          row.data.status === 'selesai' &&
          String(row.data.completed_at) >= start &&
          String(row.data.completed_at) <= end,
      ).length,
    };
  });
  const max = Math.max(1, ...points.map((point) => point.done));
  return (
    <section className="card completion-chart">
      <span className="eyebrow">RITME KERJA</span>
      <h2>Penyelesaian delapan minggu terakhir</h2>
      <div
        className="completion-bars"
        role="img"
        aria-label={points
          .map((point) => `${formatDate(point.date)}: ${point.done} selesai`)
          .join(', ')}
      >
        {points.map((point) => (
          <div key={point.date}>
            <strong>{point.done}</strong>
            <div>
              <span style={{ height: `${(point.done / max) * 100}%` }} />
            </div>
            <small>{formatDate(point.date).replace(/ \d{4}$/, '')}</small>
          </div>
        ))}
      </div>
      <p>
        Jumlah tugas berstatus selesai menurut tanggal penyelesaiannya. Berubah mengikuti catatan
        saat ini.
      </p>
    </section>
  );
}
