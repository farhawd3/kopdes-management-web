import { useState } from 'react';
import { api, resetAuthNavigation } from '@/lib/client';
import Link from 'next/link';
import { useTheme, COLOR_STYLES } from '@/lib/ThemeContext';
import { usePreference } from '@/lib/usePreference';
import { Check } from 'lucide-react';

export function Settings({ refresh }: { refresh: () => Promise<void> }) {
  const { colorStyle, setColorStyle, preference, setTheme } = useTheme();
  const [density, setDensity] = usePreference('hub-density', 'comfortable');
  const [motion, setMotion] = usePreference('hub-motion', 'system');
  const [navStyle, setNavStyle] = usePreference('hub-nav-style', 'soft');
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
      <section className="card appearance-settings">
        <h2>Tampilan</h2>
        <p>Sesuaikan warna, jarak, dan gerakan di layar.</p>
        <label>
          Mode layar
          <select
            value={preference}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          >
            <option value="system">Ikuti perangkat</option>
            <option value="light">Terang</option>
            <option value="dark">Gelap</option>
          </select>
        </label>
        <label>
          Jarak isi
          <select value={density} onChange={(e) => setDensity(e.target.value)}>
            <option value="comfortable">Nyaman</option>
            <option value="compact">Ringkas untuk tabel desktop</option>
          </select>
        </label>
        <label>
          Animasi
          <select value={motion} onChange={(e) => setMotion(e.target.value)}>
            <option value="system">Ikuti perangkat</option>
            <option value="minimal">Minimal</option>
          </select>
        </label>
        <label>
          Warna menu samping
          <select value={navStyle} onChange={(e) => setNavStyle(e.target.value)}>
            <option value="soft">Lembut</option>
            <option value="ink">Arang</option>
          </select>
        </label>
        <button
          onClick={() => {
            setTheme('system');
            setColorStyle('lime');
            setDensity('comfortable');
            setMotion('system');
            setNavStyle('soft');
          }}
        >
          Kembalikan tampilan awal
        </button>
      </section>
      <section className="card color-style-card">
        <span className="eyebrow">TEMA & TAMPILAN</span>
        <h2>Warna ruang kerja</h2>
        <p>Pilih warna yang nyaman. Pengaturan tampilan disimpan di browser ini.</p>
        <div className="color-swatches-grid">
          {COLOR_STYLES.map((c) => {
            const isSelected = colorStyle === c.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`color-swatch-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setColorStyle(c.id)}
                aria-pressed={isSelected}
              >
                <div className="swatch-preview" style={{ background: c.soft, color: '#29312d' }}>
                  <span className="swatch-demo-line" style={{ background: c.primary }}>
                    Tugas hari ini
                  </span>
                  {isSelected && <Check size={14} className="swatch-check" />}
                </div>
                <div className="swatch-info">
                  <strong>{c.name}</strong>
                  <small>{c.desc}</small>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card">
        <span className="eyebrow">RUANG KERJA</span>
        <h2>Pengaturan</h2>
        <p>Kelola proyek, jadwal kerja, dan data koperasi.</p>
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
