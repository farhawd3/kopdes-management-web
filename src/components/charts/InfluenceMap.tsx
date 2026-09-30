import type { Item } from '@/features/schemas';
export function InfluenceMap({ items }: { items: Item[] }) {
  return (
    <section className="card">
      <h2>Peta pengaruh–minat</h2>
      <div className="influence-map">
        {[
          [true, false, 'Jaga dukungan'],
          [true, true, 'Libatkan erat'],
          [false, false, 'Pantau'],
          [false, true, 'Beri informasi'],
        ].map(([highInfluence, highInterest, title]) => {
          const selected = items.filter(
            (row) =>
              Number(row.data.influence) >= 3 === highInfluence &&
              Number(row.data.interest) >= 3 === highInterest,
          );
          return (
            <div key={String(title)}>
              <h3>{String(title)}</h3>
              <small>
                Pengaruh {highInfluence ? 'tinggi' : 'rendah'} · Minat{' '}
                {highInterest ? 'tinggi' : 'rendah'}
              </small>
              <p>
                {selected.map((row) => String(row.data.title)).join(', ') || 'Belum ada kontak'}
              </p>
            </div>
          );
        })}
      </div>
      <p>Nilai 3–5 dikelompokkan tinggi, 1–2 rendah.</p>
    </section>
  );
}
