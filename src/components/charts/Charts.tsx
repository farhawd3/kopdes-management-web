import type { Item } from '@/features/schemas';
export function ProgressRing({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress-ring" role="img" aria-label={`${label}: ${value}%`}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="48" fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="10"
          strokeDasharray={`${value * 3.016} 301.6`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <strong>{value}%</strong>
      <span>{label}</span>
    </div>
  );
}
export function Meter({ value }: { value: number | null }) {
  return (
    <div className="meter-row">
      <div className="meter">
        <span style={{ width: `${value || 0}%` }} />
      </div>
      <strong>{value === null ? 'Belum dinilai' : `${value}%`}</strong>
    </div>
  );
}
export function RiskMatrix({ items }: { items: Item[] }) {
  return (
    <section className="card">
      <h2>Matriks risiko</h2>
      <p>Peluang ↑ · Dampak → · angka menunjukkan jumlah risiko terbuka.</p>
      <div className="risk-matrix">
        {[5, 4, 3, 2, 1].flatMap((p) =>
          [1, 2, 3, 4, 5].map((i) => {
            const count = items.filter(
              (row) =>
                row.data.status !== 'ditutup' &&
                row.data.probability === p &&
                row.data.impact === i,
            ).length;
            return (
              <div
                key={`${p}-${i}`}
                className={p * i >= 15 ? 'risk-high' : p * i >= 8 ? 'risk-medium' : 'risk-low'}
                title={`Peluang ${p}, dampak ${i}`}
              >
                <small>
                  {p}×{i}
                </small>
                <strong>{count || '—'}</strong>
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
}
