import type { Checklist } from '@/features/schemas';
import { readiness } from '@/lib/progress';
const dimensions = ['legalitas', 'fisik', 'sdm', 'sop', 'sistem'] as const;
export function ReadinessRadar({ items }: { items: Checklist[] }) {
  const values = dimensions.map((dimension) =>
    readiness(items.filter((item) => item.dimension === dimension)),
  );
  const point = (index: number, radius: number) =>
    `${100 + Math.sin((index * Math.PI * 2) / 5) * radius},${90 - Math.cos((index * Math.PI * 2) / 5) * radius}`;
  return (
    <details>
      <summary>Kesiapan lima dimensi</summary>
      <svg
        className="radar"
        viewBox="0 0 200 180"
        role="img"
        aria-label="Radar legalitas, fisik, SDM, SOP, sistem"
      >
        <polygon
          points={dimensions.map((_, index) => point(index, 70)).join(' ')}
          fill="none"
          stroke="var(--line)"
        />
        {dimensions.map((_, index) => (
          <line
            key={index}
            x1="100"
            y1="90"
            x2={100 + Math.sin((index * Math.PI * 2) / 5) * 70}
            y2={90 - Math.cos((index * Math.PI * 2) / 5) * 70}
            stroke="var(--line)"
          />
        ))}
        <polygon
          points={values.map((value, index) => point(index, (value || 0) * 0.7)).join(' ')}
          fill="var(--brand-soft)"
          stroke="var(--brand)"
          strokeWidth="2"
        />
      </svg>
      <ul>
        {dimensions.map((dimension, index) => (
          <li key={dimension}>
            {dimension.toUpperCase()}:{' '}
            {values[index] === null ? 'Belum dinilai' : `${values[index]}%`}
          </li>
        ))}
      </ul>
    </details>
  );
}
