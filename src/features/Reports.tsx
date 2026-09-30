'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/client';
import { today, addDays, formatDate } from '@/lib/date';
import type { ReportSnapshot } from './report-snapshot';
type Report = {
  id: string;
  title: string;
  period_start: string;
  period_end: string;
  snapshot: ReportSnapshot;
};
const sections = {
  completed: 'Capaian',
  milestones: 'Milestone tercapai',
  overdue: 'Tugas terlambat',
  decisions: 'Keputusan',
  risks: 'Risiko terbuka',
  next: 'Rencana 7 hari berikutnya',
} as const;
export function Reports() {
  const [reports, setReports] = useState<Report[]>([]),
    [selected, setSelected] = useState<Report>(),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    api<Report[]>('reports')
      .then(setReports)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <section className="card no-print">
        <h2>Susun laporan manajer</h2>
        <p>
          Snapshot memakai kondisi data saat laporan disimpan, dengan capaian sesuai tanggal
          penyelesaian. Laporan lama tetap sama ketika tugas berubah.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError('');
            const form = new FormData(e.currentTarget);
            try {
              const report = await api<Report>('reports', {
                title: form.get('title'),
                start: form.get('start'),
                end: form.get('end'),
                notes: form.get('notes'),
              });
              setReports([report, ...reports]);
              setSelected(report);
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="form-grid">
            <label>
              Judul
              <input name="title" defaultValue="Laporan mingguan manajer" required />
            </label>
            <label>
              Dari
              <input name="start" type="date" defaultValue={addDays(today(), -6)} required />
            </label>
            <label>
              Sampai
              <input name="end" type="date" defaultValue={today()} required />
            </label>
            <label>
              Catatan manajer
              <textarea name="notes" />
            </label>
          </div>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan snapshot laporan'}
          </button>
        </form>
        {error && <p role="alert">{error}</p>}
      </section>
      <div className="actions no-print">
        {reports.map((report) => (
          <button key={report.id} onClick={() => setSelected(report)}>
            {report.title} · {formatDate(report.period_end)}
          </button>
        ))}
      </div>
      {selected && (
        <article className="card report">
          <div className="no-print actions">
            <button onClick={() => window.print()}>Cetak / simpan PDF</button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${selected.title}\n${selected.snapshot.organization}\n${selected.period_start} — ${selected.period_end}\n\n${Object.entries(
                      sections,
                    )
                      .map(
                        ([key, title]) =>
                          title +
                          ':\n' +
                          selected.snapshot[key as keyof typeof sections]
                            .map((line) => '• ' + line)
                            .join('\n'),
                      )
                      .join('\n\n')}\n\n${selected.snapshot.notes}`,
                  );
                  setError('Teks laporan disalin.');
                } catch {
                  setError(
                    'Tidak dapat mengakses papan klip. Gunakan cetak atau pilih teks laporan.',
                  );
                }
              }}
            >
              Salin teks WhatsApp
            </button>
          </div>
          <span className="eyebrow">{String(selected.snapshot.organization)}</span>
          <h1>{selected.title}</h1>
          <p>
            {formatDate(selected.period_start)} — {formatDate(selected.period_end)}
          </p>
          {Object.entries(sections).map(([key, title]) => (
            <section key={key}>
              <h2>{title}</h2>
              {selected.snapshot[key as keyof typeof sections].length ? (
                <ul>
                  {selected.snapshot[key as keyof typeof sections].map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>Belum ada catatan pada bagian ini.</p>
              )}
            </section>
          ))}
          <h2>Catatan manajer</h2>
          <p>{selected.snapshot.notes || '—'}</p>
        </article>
      )}
    </>
  );
}
