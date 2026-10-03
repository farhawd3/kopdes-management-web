'use client';
import Link from 'next/link';

const steps = [
  ['/pengaturan', 'Lengkapi profil', 'Isi identitas koperasi dan penanggung jawab.'],
  ['/proyek', 'Susun proyek', 'Tulis tujuan, lalu hubungkan tugas dan milestone.'],
  [
    '/hari-ini',
    'Jalankan pekerjaan',
    'Periksa tenggat, perbarui status, dan catat hasil kegiatan.',
  ],
  [
    '/laporan',
    'Tinjau dan laporkan',
    'Simpan snapshot laporan; unduh cadangan melalui Pengaturan.',
  ],
] as const;

export function ManagerGuide() {
  return (
    <section className="manager-guide" aria-labelledby="manager-guide-title">
      <header className="card">
        <span className="eyebrow">Panduan penggunaan</span>
        <h2 id="manager-guide-title">Onboarding Manajer</h2>
        <p>Mulai dari profil dan proyek, lalu gunakan Hari Ini untuk pekerjaan harian.</p>
      </header>
      <ol className="guide-steps">
        {steps.map(([href, title, description], index) => (
          <li key={href} className="card">
            <span className="guide-step-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link className="button" href={href}>
                Buka {title.toLowerCase()} →
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <details className="card guide-details">
        <summary>Koordinasi dan keamanan data</summary>
        <p>
          Catat rapat dan keputusan, lalu buat tugas tindak lanjut. Kegiatan mencatat hasil
          pekerjaan; dokumen menyimpan tautan bukti.
        </p>
        <p>
          Kunci aplikasi setelah selesai. Simpan cadangan JSON secara pribadi dan uji pemulihan pada
          lingkungan terpisah. Jangan membagikan PIN, token pengaturan atau kunci server.
        </p>
        <p>
          Gantt membantu mengatur tanggal. Kolaborasi real-time, offline, baseline dan jalur kritis
          otomatis belum tersedia.
        </p>
      </details>
    </section>
  );
}
