import { addDays } from '@/lib/date';
import type { Item } from '@/features/schemas';
export function Burnup({ tasks, start }: { tasks: Item[]; start: string }) {
  const points = Array.from({ length: 13 }, (_, index) => {
    const date = addDays(start, index * 7 + 6);
    const active = tasks.filter(
      (row) => row.data.status !== 'dibatalkan' && row.created_at.slice(0, 10) <= date,
    );
    return {
      date,
      total: active.length,
      done: active.filter(
        (row) =>
          row.data.status === 'selesai' &&
          row.data.completed_at &&
          String(row.data.completed_at) <= date,
      ).length,
    };
  });
  const max = Math.max(1, ...points.map((row) => row.total));
  const line = (key: 'total' | 'done') =>
    points.map((row, i) => `${20 + i * 30},${140 - (row[key] / max) * 115}`).join(' ');
  return (
    <section className="card">
      <h2>Perkembangan penyelesaian</h2>
      <svg viewBox="0 0 400 165" role="img" aria-label="Cakupan tugas dan penyelesaian per minggu">
        <line x1="20" x2="380" y1="140" y2="140" stroke="var(--line)" />
        <polyline
          points={line('total')}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <polyline points={line('done')} fill="none" stroke="var(--brand)" strokeWidth="3" />
        {points.map((row, i) => (
          <text
            key={row.date}
            x={20 + i * 30}
            y="159"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="8"
          >
            M{i + 1}
          </text>
        ))}
      </svg>
      <p>
        Garis penuh: selesai. Putus-putus: cakupan. Dihitung dari tugas saat ini dan tanggal
        selesai; bukan arsip perubahan cakupan.
      </p>
      <details>
        <summary>Angka per minggu</summary>
        <ul>
          {points.map((row, i) => (
            <li key={row.date}>
              Minggu {i + 1}: {row.done} selesai / {row.total} tugas.
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
