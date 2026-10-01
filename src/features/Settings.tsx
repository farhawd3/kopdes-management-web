'use client';
import Link from 'next/link';
import { useState } from 'react';
import { api, resetAuthNavigation } from '@/lib/client';
import { useTheme, COLOR_STYLES } from '@/lib/ThemeContext';
import { usePreference } from '@/lib/usePreference';
import {
  Check,
  Palette,
  ShieldCheck,
  Database,
  Building,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  KeyRound,
} from 'lucide-react';
import { Select } from '@/components/ui/Select';

export function Settings({ refresh }: { refresh: () => Promise<void> }) {
  const { colorStyle, setColorStyle, preference, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'tampilan' | 'profil' | 'keamanan' | 'cadangan'>('tampilan');
  const [density, setDensity] = usePreference('hub-density', 'comfortable');
  const [motion, setMotion] = usePreference('hub-motion', 'system');
  const [navStyle, setNavStyle] = usePreference('hub-nav-style', 'soft');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const selectedPalette = COLOR_STYLES.find((c) => c.id === colorStyle) || COLOR_STYLES[0];

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
    <div className="settings-container">
      {/* ── Settings Subnavigation Tabs ─────────────────────────── */}
      <div className="settings-tabs-row" role="tablist" aria-label="Kategori Pengaturan">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tampilan'}
          className={`settings-tab-btn ${activeTab === 'tampilan' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('tampilan')}
        >
          <Palette size={16} />
          <span>Tampilan & Tema</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'profil'}
          className={`settings-tab-btn ${activeTab === 'profil' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('profil')}
        >
          <Building size={16} />
          <span>Profil Koperasi</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'keamanan'}
          className={`settings-tab-btn ${activeTab === 'keamanan' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('keamanan')}
        >
          <ShieldCheck size={16} />
          <span>Keamanan PIN</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'cadangan'}
          className={`settings-tab-btn ${activeTab === 'cadangan' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('cadangan')}
        >
          <Database size={16} />
          <span>Cadangan & Pemulihan</span>
        </button>
      </div>

      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}

      {/* ── TAB 1: TAMPILAN & TEMA ───────────────────────────────── */}
      {activeTab === 'tampilan' && (
        <div className="settings-content-grid">
          {/* Color Palettes Selection */}
          <section className="card color-style-card">
            <span className="eyebrow">PALET RUANG KERJA</span>
            <h2>Pilihan Tema Warna</h2>
            <p>Pilih nuansa warna kerja yang nyaman dan sesuai pencahayaan ruangan Anda.</p>

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
                    <div className="swatch-preview" style={{ background: c.soft }}>
                      <span className="swatch-demo-line" style={{ background: c.primary, color: '#1a1f16' }}>
                        ● {c.name.split(' ')[0]}
                      </span>
                      <span className="swatch-companion-dot" style={{ background: c.companion }} title="Aksen pendamping" />
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

          {/* Live Component Preview Card */}
          <section className="card theme-live-preview-card">
            <span className="eyebrow">PRATINJAU LANGSUNG</span>
            <h2>Pratinjau Komponen Tema</h2>
            <p>Berikut tampilan tombol, kartu tugas, dan indikator dengan tema <strong>{selectedPalette.name}</strong>:</p>

            <div className="theme-preview-stage" style={{ background: 'var(--canvas)', borderColor: 'var(--line)' }}>
              {/* Preview Button & Chip */}
              <div className="preview-row">
                <button
                  type="button"
                  className="preview-primary-btn"
                  style={{ background: 'var(--brand)', color: 'var(--brand-text)' }}
                >
                  <Sparkles size={14} />
                  <span>+ Aksi Cepat</span>
                </button>
                <span
                  className="preview-companion-chip"
                  style={{ background: 'var(--brand-soft)', borderColor: 'var(--brand-soft-border)', color: 'var(--ink-heading)' }}
                >
                  3 Tugas Hari Ini
                </span>
                <span className="preview-status-pill">
                  Selesai Tepat Waktu
                </span>
              </div>

              {/* Preview Task Card */}
              <div className="preview-task-card" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
                <div className="preview-task-header">
                  <div className="preview-checkbox" style={{ borderColor: 'var(--brand)', background: 'var(--brand)' }}>
                    <Check size={12} color="var(--brand-text)" />
                  </div>
                  <div className="preview-task-text">
                    <strong>Pemeriksaan Kesiapan Gerai Toko KDMP</strong>
                    <small>Tenggat: Hari ini · Proyek: Persiapan Gerai</small>
                  </div>
                  <span className="preview-tag-high">Prioritas Tinggi</span>
                </div>
                <div className="preview-progress-track">
                  <div className="preview-progress-fill" style={{ width: '75%', background: 'var(--brand)' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Display & Motion Controls */}
          <section className="card appearance-settings">
            <h2>Mode Layar & Tata Letak</h2>
            <p>Sesuaikan pencahayaan, kerapatan tabel, dan kenyamanan visual layar.</p>

            <div className="settings-fields-grid">
              <label className="field-group">
                <span className="field-caption">Mode Layar</span>
                <Select
                  value={preference}
                  onChange={(val) => setTheme(val as 'light' | 'dark' | 'system')}
                  options={[
                    { value: 'system', label: 'Ikuti Perangkat (Otomatis)' },
                    { value: 'light', label: 'Terang (Light Mode)' },
                    { value: 'dark', label: 'Gelap (Dark Mode)' },
                  ]}
                  ariaLabel="Mode layar"
                />
              </label>

              <label className="field-group">
                <span className="field-caption">Kerapatan Jarak Isi</span>
                <Select
                  value={density}
                  onChange={setDensity}
                  options={[
                    { value: 'comfortable', label: 'Nyaman (Bawaan)' },
                    { value: 'compact', label: 'Ringkas untuk tabel desktop' },
                  ]}
                  ariaLabel="Kerapatan isi"
                />
              </label>

              <label className="field-group">
                <span className="field-caption">Animasi & Transisi</span>
                <Select
                  value={motion}
                  onChange={setMotion}
                  options={[
                    { value: 'system', label: 'Ikuti Perangkat' },
                    { value: 'minimal', label: 'Minimal (Reduced Motion)' },
                  ]}
                  ariaLabel="Animasi layar"
                />
              </label>

              <label className="field-group">
                <span className="field-caption">Gaya Navigasi Samping</span>
                <Select
                  value={navStyle}
                  onChange={setNavStyle}
                  options={[
                    { value: 'soft', label: 'Lembut Selaras Tema' },
                    { value: 'ink', label: 'Arang Gelap Elegan' },
                  ]}
                  ariaLabel="Gaya menu samping"
                />
              </label>
            </div>

            <div className="settings-reset-row">
              <button
                type="button"
                className="btn-reset-appearance"
                onClick={() => {
                  setTheme('system');
                  setColorStyle('lime');
                  setDensity('comfortable');
                  setMotion('system');
                  setNavStyle('soft');
                  setMessage('Tampilan berhasil dikembalikan ke pengaturan awal.');
                }}
              >
                <RotateCcw size={15} />
                <span>Kembalikan Tampilan Awal</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ── TAB 2: PROFIL KOPERASI ──────────────────────────────── */}
      {activeTab === 'profil' && (
        <div className="settings-content-grid">
          <section className="card">
            <span className="eyebrow">IDENTITAS OPERASIONAL</span>
            <h2>Profil Manajer & Koperasi</h2>
            <p>Data identitas resmi yang dicantumkan pada kop surat, laporan kerja, dan berkas koordinasi.</p>

            <div className="profile-identity-card">
              <div className="profile-avatar-circle">
                <span>KD</span>
              </div>
              <div className="profile-details">
                <h3>Koperasi Desa Merdeka Puntukrejo (KDMP)</h3>
                <p>Badan Hukum Koperasi Konsumen Desa Puntukrejo</p>
                <small>Kecamatan Ngargoyoso, Kabupaten Karanganyar, Jawa Tengah</small>
              </div>
            </div>

            <div className="profile-actions-strip">
              <Link className="button primary" href="/pengaturan?bagian=organization">
                Perbarui Data Profil Koperasi
              </Link>
              <Link className="button" href="/laporan">
                Pratinjau Lembar Kop Laporan Resmi ↗
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* ── TAB 3: KEAMANAN PIN ─────────────────────────────────── */}
      {activeTab === 'keamanan' && (
        <div className="settings-content-grid">
          <section className="card security-settings-card">
            <div className="section-head-with-icon">
              <KeyRound size={20} className="text-brand" />
              <div>
                <h2>Ubah PIN Masuk</h2>
                <p>PIN digunakan untuk mengamankan ruang kerja pribadi manajer di perangkat ini.</p>
              </div>
            </div>

            <form
              className="security-pin-form"
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
                }, 'PIN berhasil diubah. Silakan masuk kembali dengan PIN baru.');
              }}
            >
              <label className="field-group">
                <span className="field-caption">PIN Saat Ini</span>
                <input
                  name="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]{6,12}"
                  placeholder="Masukkan 6-12 digit PIN lama"
                  required
                  autoComplete="current-password"
                  className="text-input"
                />
              </label>

              <label className="field-group">
                <span className="field-caption">PIN Baru</span>
                <input
                  name="newPin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]{6,12}"
                  placeholder="Masukkan 6-12 digit PIN baru"
                  required
                  autoComplete="new-password"
                  className="text-input"
                />
              </label>

              <div className="form-actions">
                <button disabled={busy} type="submit" className="primary">
                  {busy ? 'Menyimpan PIN…' : 'Simpan PIN Baru'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* ── TAB 4: CADANGAN & PEMULIHAN ─────────────────────────── */}
      {activeTab === 'cadangan' && (
        <div className="settings-content-grid">
          <section className="card backup-settings-card">
            <h2>Cadangan Data Mandiri</h2>
            <p>
              Simpan salinan data kerja secara lokal dalam format JSON terenkripsi. Unduh cadangan secara berkala
              agar Anda dapat memulihkan seluruh proyek, buku kas, anggota, dan catatan rapat kapan saja.
            </p>

            <div className="backup-action-boxes">
              <div className="backup-box">
                <div className="box-head">
                  <Download size={18} />
                  <strong>Unduh Cadangan</strong>
                </div>
                <p>Mengunduh seluruh 20 domain pencatatan, proyek, tugas, dan snapshot laporan.</p>
                <a className="button primary" href="/api/backup" download>
                  Unduh Berkas JSON (.json)
                </a>
              </div>

              <div className="backup-box restore-box">
                <div className="box-head">
                  <Upload size={18} />
                  <strong>Pulihkan Data Cadangan</strong>
                </div>
                <p>Memulihkan seluruh catatan dari berkas JSON hasil unduhan sebelumnya.</p>
                <label className="button restore-upload-label">
                  Pilih Berkas Cadangan JSON
                  <input
                    type="file"
                    accept=".json,application/json"
                    disabled={busy}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5_000_000) {
                        setMessage('Berkas maksimal 5 MB.');
                        return;
                      }
                      if (
                        !confirm(
                          'PERINGATAN: Pemulihan akan menggantikan seluruh catatan kerja saat ini dengan data dari cadangan. Lanjutkan?',
                        )
                      )
                        return;
                      void run(
                        async () => api('backup', JSON.parse(await file.text())),
                        'Data ruang kerja berhasil dipulihkan secara penuh.',
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
