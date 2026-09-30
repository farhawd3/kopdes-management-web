'use client';
import { useState } from 'react';
import { api, resetAuthNavigation } from '@/lib/client';
import Link from 'next/link';
export function Settings({ refresh }: { refresh: () => Promise<void> }) {
  const [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false);
  const run = async (action: () => Promise<unknown>, success: string) => {
    setBusy(true);
    setMessage('');
    try {
      await action();
      setMessage(success);
      await refresh();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="dashboard-grid">
      <section className="card">
        <span className="eyebrow">WORKSPACE FLEKSIBEL</span>
        <h2>Atur ruang kerja Anda</h2>
        <p>
          Buat proyek dengan tujuan, tanggal, dan catatan sendiri. Kelola pekerjaan melalui daftar,
          papan, kalender, atau Gantt.
        </p>
        <Link className="primary" href="/proyek">
          Buka proyek
        </Link>
      </section>
      <section className="card">
        <h2>Cadangan data kerja</h2>
        <p>
          Unduh cadangan sebelum memulihkan data. Pemulihan mengganti seluruh catatan kerja.
          Snapshot laporan ikut dicadangkan.
        </p>
        <a className="button" href="/api/backup" download>
          Unduh JSON
        </a>
        <label>
          Pulihkan JSON
          <input
            type="file"
            accept=".json,application/json"
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5_000_000) {
                setMessage('Berkas maksimal 5 MB.');
                return;
              }
              if (
                !confirm(
                  'Pemulihan mengganti semua catatan kerja. Sudah mengunduh cadangan terbaru?',
                )
              )
                return;
              void run(
                async () => api('backup', JSON.parse(await file.text())),
                'Data berhasil dipulihkan.',
              );
            }}
          />
        </label>
      </section>
      <section className="card">
        <h2>Ubah PIN</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            void run(async () => {
              await api('auth/pin', {
                action: 'change',
                pin: form.get('pin'),
                newPin: form.get('newPin'),
              });
              resetAuthNavigation('/pin');
            }, 'PIN diubah. Masuk kembali.');
          }}
        >
          <label>
            PIN saat ini
            <input
              name="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{6,12}"
              required
              autoComplete="current-password"
            />
          </label>
          <label>
            PIN baru
            <input
              name="newPin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{6,12}"
              required
              autoComplete="new-password"
            />
          </label>
          <button disabled={busy}>Simpan PIN baru</button>
        </form>
      </section>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
