import type { Item } from '@/features/schemas';

const QUADRANTS: [boolean, boolean, string, string, string][] = [
  [
    true,
    true,
    'Tokoh Penentu & Pengurus Inti',
    'Wajib Diajak Musyawarah',
    'Tokoh pemegang wewenang kebijakan dan kelancaran koperasi. Selalu libatkan dan minta arahan dalam keputusan penting. Contoh: Kepala Desa, Ketua BPD, Ketua Pengawas, Pengurus Koperasi.',
  ],
  [
    true,
    false,
    'Aparat Keamanan & Pembina',
    'Jaga Koordinasi & Silaturahmi',
    'Instansi pengayom ketertiban dan aturan dinas. Pastikan rutin terinformasi agar operasional koperasi berjalan aman dan tertib. Contoh: Babinsa (TNI), Bhabinkamtibmas (Polri), Camat, Dinas Koperasi.',
  ],
  [
    false,
    true,
    'Anggota Koperasi & Warga Desa',
    'Beri Kabar & Serap Aspirasi',
    'Basis utama anggota dan penggerak ekonomi desa. Berikan info perkembangan secara rutin dan dengarkan kebutuhan lapangan. Contoh: Kelompok Tani (Gapoktan), Petani, Pedagang Desa, Anggota Koperasi.',
  ],
  [
    false,
    false,
    'Mitra Usaha & Pemasok',
    'Pantau Kerja Sama & Efisiensi',
    'Pihak pendukung pasokan barang atau jasa. Cukup dipantau kelancaran transaksi, harga, dan mutu barang tanpa membebani koordinasi. Contoh: Distributor sembako, jasa angkutan, vendor perlengkapan.',
  ],
];

export function InfluenceMap({ items }: { items: Item[] }) {
  return (
    <section className="card influence-map-section">
      <div className="section-head">
        <div>
          <h2>Peta Pengaruh–Minat & Hubungan Tokoh</h2>
          <p className="influence-subtitle">
            Panduan koordinasi praktis bagi manajer dengan Pemerintah Desa, Pengawas, Aparat Keamanan, Warga, dan Mitra Usaha.
          </p>
        </div>
        <span className="badge">{items.length} pemangku terdata</span>
      </div>
      <div className="influence-map">
        {QUADRANTS.map(([highInfluence, highInterest, title, badge, guide]) => {
          const selected = items.filter(
            (row) =>
              Number(row.data.influence || 3) >= 3 === highInfluence &&
              Number(row.data.interest || 3) >= 3 === highInterest,
          );
          return (
            <div
              key={title}
              className={`influence-quadrant ${
                highInfluence && highInterest
                  ? 'quadrant-manage'
                  : highInfluence
                    ? 'quadrant-satisfy'
                    : highInterest
                      ? 'quadrant-inform'
                      : 'quadrant-monitor'
              }`}
            >
              <div className="quadrant-head">
                <div>
                  <h3>{title}</h3>
                  <span className="quadrant-tag">{badge}</span>
                </div>
                <small className="quadrant-levels">
                  Wewenang {highInfluence ? 'tinggi' : 'biasa'} · Keterlibatan{' '}
                  {highInterest ? 'aktif' : 'berkala'}
                </small>
              </div>
              <p className="quadrant-guide">{guide}</p>
              <div className="quadrant-members">
                {selected.length ? (
                  selected.map((row) => (
                    <div key={row.id} className="stakeholder-chip">
                      <strong>{String(row.data.title)}</strong>
                      {Boolean(row.data.category) && (
                        <span className="stakeholder-chip-cat">{String(row.data.category)}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="quadrant-empty">Belum ada tokoh/mitra di kelompok ini</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="influence-legend">Wewenang: kemampuan memberi izin/dukungan · Keterlibatan: seberapa sering perlu berkoordinasi.</p>
    </section>
  );
}

