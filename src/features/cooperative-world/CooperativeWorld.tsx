'use client';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import './world.css';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCheck,
  ChevronRight,
  Cloud,
  CloudRain,
  Compass,
  Dumbbell,
  Expand,
  House,
  Layers3,
  Map,
  MessageCircle,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Store,
  Sun,
  Truck,
  Users,
  X,
  BookOpen,
  Play,
  Pause,
} from 'lucide-react';
import { getMinuteFromPreset } from './world-lighting';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { usePreference } from '@/lib/usePreference';
import { api, invalidateCache } from '@/lib/client';
import type { Workspace } from '../workspace/useWorkspace';
import {
  getWorldHour,
  getWorldModel,
  worldPreferencesSchema,
  worldStations,
  worldVehicles,
  type CharacterActivity,
  type WorldLocation,
  type WorldPreferences,
} from './world-model';
import { recordHref } from '../workspace/workspace-navigation';
const WorldScene = dynamic(() => import('./WorldScene').then((module) => module.WorldScene), {
  ssr: false,
  loading: () => <div className="cw-loading">Menyiapkan lingkungan 3D…</div>,
});
const activityNames: Record<string, string> = {
  idle: 'Bersantai',
  meeting: 'Duduk rapat',
  work: 'Mengerjakan tugas',
  gym: 'Berolahraga',
  greet: 'Menyapa',
  walk: 'Berkeliling',
  talk: 'Berkoordinasi',
};
type Props = {
  data: Workspace;
  preview?: boolean;
  loading?: boolean;
  error?: string;
  refresh?: () => Promise<void>;
  partial?: boolean;
};

export function CooperativeWorld({
  data,
  preview = false,
  loading = false,
  error = '',
  refresh,
  partial = false,
}: Props) {
  const [now, setNow] = useState(() => new Date());
  const [location, setLocation] = useState<WorldLocation>('luar');
  const [savedPreferences, savePreferences] = usePreference('hub-world-preferences-v1', '{}');
  const preferences = useMemo(() => {
    try {
      const result = worldPreferencesSchema.safeParse(JSON.parse(savedPreferences));
      if (result.success) return result.data;
    } catch {
      /* Invalid device preferences fall back without affecting workspace data. */
    }
    return worldPreferencesSchema.parse({});
  }, [savedPreferences]);
  const [selected, setSelected] = useState('kawasan');
  const [panelOpen, setPanelOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [warehouseTab, setWarehouseTab] = useState<'dermaga' | 'mitra'>('dermaga');
  const [rehearsal, setRehearsal] = useState<CharacterActivity | 'otomatis'>('otomatis');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [staffLoading, setStaffLoading] = useState(false);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;
    setStaffLoading(true);
    try {
      await api('staff', {
        data: {
          title: newStaffName.trim(),
          role: newStaffRole.trim() || 'Staf Operasional',
          status: 'aktif',
        },
      });
      invalidateCache('staff');
      setNewStaffName('');
      setNewStaffRole('');
      setIsAddingStaff(false);
      window.location.reload();
    } catch {
      /* Graceful handle */
    } finally {
      setStaffLoading(false);
    }
  };
  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(tick);
  }, []);
  const model = useMemo(() => getWorldModel(data, now), [data, now]);
  // Geometry is independent of the clock: minute ticks must not reset the camera.
  const sceneModel = useMemo(() => getWorldModel(data, new Date()), [data]);
  const [suasanaOpen, setSuasanaOpen] = useState(false);
  const [simulationMinute, setSimulationMinute] = useState<number>(() => {
    const d = new Date();
    return getMinuteFromPreset(preferences.time, d.getHours(), d.getMinutes());
  });
  const [isPlayingTime, setIsPlayingTime] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<'slow' | 'fast'>('slow');
  const [isPausedAnimation, setIsPausedAnimation] = useState(false);

  useEffect(() => {
    if (!isPlayingTime) return;
    const interval = playSpeed === 'fast' ? 66 : 200; // Fast: 1 jam ~ 4s, Slow: 1 jam ~ 12s
    const timer = window.setInterval(() => {
      setSimulationMinute((prev) => (prev + 1) % 1440);
    }, interval);
    return () => clearInterval(timer);
  }, [isPlayingTime, playSpeed]);

  const liveMinute = now.getHours() * 60 + now.getMinutes();
  const effectiveMinute =
    preferences.time === 'otomatis'
      ? liveMinute
      : simulationMinute;
  const simHour = Math.floor(effectiveMinute / 60);
  const simMin = effectiveMinute % 60;
  const simulationClock = `${String(simHour).padStart(2, '0')}.${String(simMin).padStart(2, '0')}`;

  const hour = getWorldHour(preferences.time, now);
  const activity = rehearsal === 'otomatis' ? model.activity : rehearsal;
  const plot = model.plots.find((item) => item.id === selected);
  const station = worldStations.find((item) => item.id === selected);
  const vehicle = worldVehicles.find((item) => item.id === selected);
  const clock = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
  const dateLabel = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(now);
  const weatherIcon =
    preferences.weather === 'hujan' ? (
      <CloudRain size={18} />
    ) : preferences.weather === 'berawan' ? (
      <Cloud size={18} />
    ) : hour >= 19 || hour < 6 ? (
      <Moon size={18} />
    ) : (
      <Sun size={18} />
    );
  const bubble =
    rehearsal !== 'otomatis'
      ? `Pratinjau animasi: ${activityNames[activity].toLowerCase()}.`
      : model.currentMeeting
        ? `Ada rapat: "${String(model.currentMeeting.data.title)}"!`
        : model.activities.length
          ? 'Ada kegiatan hari ini di jurnal. Semangat beraktivitas!'
          : model.tasks.length
            ? `Ada tugas yang perlu ditinjau hari ini? (${model.tasks.length} tugas)`
            : 'Kawasan tertata rapi. Klik kantor koperasi untuk melihat interior!';
  function enter(next: WorldLocation) {
    setLocation(next);
    setSelected(next === 'luar' ? 'kawasan' : 'rapat');
    setZoom(1);
    setRotation(0);
    setPanelOpen(true);
  }
  function select(id: string) {
    if (id === 'koperasi') enter('dalam');
    else {
      setSelected(id);
      setPanelOpen(true);
    }
  }
  function preference<K extends keyof WorldPreferences>(key: K, value: WorldPreferences[K]) {
    savePreferences(JSON.stringify({ ...preferences, [key]: value }));
  }
  const count = (value: number) => (loading || error ? '—' : value);
  const title =
    selected === 'manajer'
      ? model.manager || 'Manajer Koperasi'
      : vehicle
        ? vehicle.name
        : selected === 'lingkungan'
          ? 'Suasana & karakter'
          : selected === 'logistik' || selected === 'gudang'
            ? 'Gudang Logistik'
            : selected === 'karakter'
              ? 'Tim & Staf Koperasi'
              : plot
                ? plot.unit
                  ? String(plot.unit.data.title)
                  : `Lahan ${selected.split('-')[1]}`
                : station
                  ? station.title
                  : 'Kawasan koperasi';
  return (
    <main className={`cooperative-world ${hour >= 19 || hour < 6 ? 'cw-night' : ''}`}>
      <header className="cw-topbar">
        <Link className="cw-brand" href="/beranda" title="Kembali ke Beranda">
          <span className="cw-brand-icon">
            <Layers3 size={23} />
          </span>
          <span>
            Dunia<span className="cw-brand-light">Koperasi</span>
            <small>RUANG KERJA INTERAKTIF</small>
          </span>
        </Link>
        <div className="cw-search">
          <Search size={16} />
          <Input
            aria-label="Cari gerai atau ruangan"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected('kawasan');
              setPanelOpen(true);
            }}
            placeholder="Cari gerai, ruangan…"
          />
          <kbd>/</kbd>
        </div>
        <div className="cw-top-location">
          <span className="cw-location-icon">
            {location === 'luar' ? <Map size={18} /> : <Building2 size={18} />}
          </span>
          <span>
            <strong>{model.title}</strong>
            <small>
              {location === 'luar' ? 'Kawasan • 7 lahan gerai' : 'Interior • 4 area kerja'}
            </small>
          </span>
        </div>
        <Button
          className={`cw-live ${preferences.time !== 'otomatis' ? 'is-simulation' : ''}`}
          onClick={() => setSuasanaOpen(true)}
          aria-label="Buka pengaturan suasana dan waktu"
          suppressHydrationWarning
        >
          <i />
          {preferences.time === 'otomatis' ? `${clock} WIB` : `Simulasi ${simulationClock}`}
        </Button>
        <Button
          className="cw-icon-button"
          aria-label="Pengaturan suasana"
          onClick={() => setSuasanaOpen(true)}
        >
          <Settings2 size={18} />
        </Button>
        <div className="cw-profile">
          <span>{model.manager.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{model.manager}</strong>
            <small>Ruang pribadi</small>
          </div>
        </div>
      </header>

      <section className="cw-viewport" aria-label="Dunia koperasi interaktif">
        <WorldScene
          model={sceneModel}
          location={location}
          weather={preferences.weather}
          hour={hour}
          minuteOfDay={effectiveMinute}
          isPaused={isPausedAnimation}
          outfit={preferences.outfit}
          activity={activity}
          zoom={zoom}
          rotation={rotation}
          selected={selected}
          bubble={bubble}
          onSelect={select}
        />

        {suasanaOpen && (
          <div
            className="cw-suasana-popover cw-glass"
            role="dialog"
            aria-label="Pengaturan Suasana dan Waktu"
          >
            <div className="cw-suasana-header">
              <div className="cw-suasana-title">
                <Sun size={18} className="cw-accent-icon" />
                <strong>Pengaturan Suasana</strong>
              </div>
              <Button
                className="cw-icon-button cw-close-btn"
                aria-label="Tutup pengaturan suasana"
                onClick={() => setSuasanaOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>

            <div className="cw-suasana-body">
              {/* Mode Waktu */}
              <div className="cw-suasana-section">
                <span className="cw-suasana-section-label">MODE WAKTU</span>
                <div className="cw-suasana-segmented">
                  <Button
                    className={`cw-seg-btn ${preferences.time === 'otomatis' ? 'is-active' : ''}`}
                    onClick={() => preference('time', 'otomatis')}
                  >
                    Live WIB
                  </Button>
                  <Button
                    className={`cw-seg-btn ${preferences.time !== 'otomatis' ? 'is-active' : ''}`}
                    onClick={() => {
                      if (preferences.time === 'otomatis') {
                        preference('time', 'siang');
                      }
                    }}
                  >
                    Simulasi
                  </Button>
                </div>
              </div>

              {/* Slider & Pintasan jika Simulasi */}
              {preferences.time !== 'otomatis' && (
                <div className="cw-suasana-section cw-simulation-box">
                  <div className="cw-suasana-row-between">
                    <span className="cw-suasana-sublabel">Waktu Simulasi</span>
                    <strong className="cw-time-display">{simulationClock} WIB</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1439"
                    step="15"
                    value={simulationMinute}
                    onChange={(e) => {
                      const m = parseInt(e.target.value, 10);
                      setSimulationMinute(m);
                      if (m < 360 || m >= 1140) preference('time', 'malam');
                      else if (m < 600) preference('time', 'pagi');
                      else if (m < 1020) preference('time', 'siang');
                      else preference('time', 'senja');
                    }}
                    className="cw-time-slider"
                    aria-label="Slider waktu simulasi"
                  />
                  <div className="cw-quick-chips">
                    <Button
                      className={`cw-chip-btn ${preferences.time === 'pagi' ? 'is-active' : ''}`}
                      aria-label="Waktu pagi"
                      aria-pressed={preferences.time === 'pagi'}
                      onClick={() => {
                        preference('time', 'pagi');
                        setSimulationMinute(420);
                      }}
                    >
                      Pagi 07:00
                    </Button>
                    <Button
                      className={`cw-chip-btn ${preferences.time === 'siang' ? 'is-active' : ''}`}
                      aria-label="Waktu siang"
                      aria-pressed={preferences.time === 'siang'}
                      onClick={() => {
                        preference('time', 'siang');
                        setSimulationMinute(720);
                      }}
                    >
                      Siang 12:00
                    </Button>
                    <Button
                      className={`cw-chip-btn ${preferences.time === 'senja' ? 'is-active' : ''}`}
                      aria-label="Waktu senja"
                      aria-pressed={preferences.time === 'senja'}
                      onClick={() => {
                        preference('time', 'senja');
                        setSimulationMinute(1065);
                      }}
                    >
                      Senja 17:45
                    </Button>
                    <Button
                      className={`cw-chip-btn ${preferences.time === 'malam' ? 'is-active' : ''}`}
                      aria-label="Waktu malam"
                      aria-pressed={preferences.time === 'malam'}
                      onClick={() => {
                        preference('time', 'malam');
                        setSimulationMinute(1230);
                      }}
                    >
                      Malam 20:30
                    </Button>
                  </div>

                  {/* Putar Otomatis */}
                  <div className="cw-suasana-row-between cw-autopilot-row">
                    <span className="cw-suasana-sublabel">Putar Waktu</span>
                    <div className="cw-autopilot-controls">
                      <Button
                        className={`cw-chip-btn ${isPlayingTime ? 'is-active' : ''}`}
                        onClick={() => setIsPlayingTime(!isPlayingTime)}
                      >
                        {isPlayingTime ? <Pause size={13} /> : <Play size={13} />}
                        <span>{isPlayingTime ? 'Jeda' : 'Putar'}</span>
                      </Button>
                      <Button
                        className={`cw-chip-btn ${playSpeed === 'fast' ? 'is-active' : ''}`}
                        onClick={() => setPlaySpeed(playSpeed === 'slow' ? 'fast' : 'slow')}
                      >
                        {playSpeed === 'slow' ? '1x (Pelan)' : '3x (Cepat)'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pilihan Cuaca */}
              <div className="cw-suasana-section">
                <span className="cw-suasana-section-label">KONDISI CUACA</span>
                <div className="cw-suasana-weather-chips">
                  {(['cerah', 'berawan', 'hujan'] as const).map((w) => (
                    <Button
                      key={w}
                      className={`cw-weather-chip ${preferences.weather === w ? 'is-active' : ''}`}
                      aria-label={`Cuaca ${w}`}
                      aria-pressed={preferences.weather === w}
                      onClick={() => preference('weather', w)}
                    >
                      {w === 'cerah' ? <Sun size={15} /> : w === 'berawan' ? <Cloud size={15} /> : <CloudRain size={15} />}
                      <span>{w.charAt(0).toUpperCase() + w.slice(1)}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Aksesibilitas */}
              <div className="cw-suasana-section">
                <span className="cw-suasana-section-label">AKSESIBILITAS</span>
                <label className="cw-toggle-label">
                  <input
                    type="checkbox"
                    checked={isPausedAnimation}
                    onChange={(e) => setIsPausedAnimation(e.target.checked)}
                    aria-label="Jeda animasi dunia"
                  />
                  <span>Jeda semua animasi</span>
                </label>
              </div>

              {/* Reset to live */}
              {preferences.time !== 'otomatis' && (
                <Button
                  className="cw-reset-live-btn"
                  onClick={() => {
                    preference('time', 'otomatis');
                    setIsPlayingTime(false);
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Kembali ke Waktu Live WIB</span>
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="cw-stat-row">
          <Link href="/gerai" className="cw-glass cw-stat">
            <span className="cw-stat-icon">
              <Store size={20} />
            </span>
            <div>
              <small>Gerai tercatat</small>
              <strong>
                {count(model.units.length)} <em>/ 7 lahan</em>
              </strong>
              <span>
                {loading
                  ? 'Memuat data…'
                  : error
                    ? 'Data belum tersedia'
                    : 'Terhubung ke Unit Gerai'}
              </span>
            </div>
          </Link>
          <Link href="/tugas" className="cw-glass cw-stat">
            <span className="cw-stat-icon">
              <CheckCheck size={20} />
            </span>
            <div>
              <small>Tugas terbuka</small>
              <strong>{count(model.tasks.length)}</strong>
              <span>Pekerjaan yang dimuat</span>
            </div>
          </Link>
          <Link href="/rapat" className="cw-glass cw-stat">
            <span className="cw-stat-icon">
              <Users size={20} />
            </span>
            <div>
              <small>Rapat hari ini</small>
              <strong>{count(model.meetings.length)}</strong>
              <span>{model.currentMeeting ? 'Dalam waktu rapat' : 'Sesuai jadwal tersimpan'}</span>
            </div>
          </Link>
        </div>
        <div className="cw-location-breadcrumb">
          <Button onClick={() => enter('luar')} aria-label="Lihat kawasan">
            <House size={14} />
            Kawasan
          </Button>
          {location === 'dalam' && (
            <>
              <ChevronRight size={13} />
              <span>Kantor koperasi</span>
            </>
          )}
        </div>
        {(preview || partial || error || loading) && (
          <div className="cw-data-notice" role={error ? 'alert' : 'status'}>
            {preview
              ? 'Pratinjau desain · tanpa data operasional'
              : error
                ? `Data tidak dapat dimuat. ${error}`
                : loading
                  ? 'Memuat catatan koperasi…'
                  : 'Menampilkan catatan yang sudah dimuat.'}
            {error && refresh && <Button onClick={() => void refresh()}>Coba lagi</Button>}
          </div>
        )}
        <div className="cw-camera-tools cw-glass" aria-label="Kontrol kamera">
          <Button
            aria-label="Perbesar"
            disabled={zoom >= 2.2}
            onClick={() => setZoom((value) => Math.min(2.2, value + 0.2))}
          >
            <Plus size={18} />
          </Button>
          <Button
            aria-label="Perkecil"
            disabled={zoom <= 0.7}
            onClick={() => setZoom((value) => Math.max(0.7, value - 0.2))}
          >
            <Minus size={18} />
          </Button>
          <span />
          <Button
            aria-label="Putar kamera"
            onClick={() => setRotation((value) => value + Math.PI / 2)}
          >
            <RotateCcw size={17} />
          </Button>
          <Button
            aria-label="Atur ulang kamera"
            onClick={() => {
              setZoom(1);
              setRotation((value) => (value === 0 ? Math.PI * 2 : 0));
            }}
          >
            <Expand size={17} />
          </Button>
        </div>
        {!panelOpen && (
          <Button className="cw-open-panel cw-glass" onClick={() => setPanelOpen(true)}>
            <Layers3 size={17} />
            Detail kawasan
          </Button>
        )}
        {panelOpen && (
          <aside className="cw-detail cw-glass" aria-label="Detail lokasi">
            <div className="cw-detail-heading">
              <span className="cw-detail-icon">
                {selected === 'manajer' ? (
                  <Users size={24} />
                ) : vehicle ? (
                  <Truck size={24} />
                ) : plot ? (
                  <Store size={24} />
                ) : selected === 'lingkungan' ? (
                  weatherIcon
                ) : selected === 'karakter' ? (
                  <Users size={22} />
                ) : (
                  <Building2 size={24} />
                )}
              </span>
              <div>
                <span className="cw-eyebrow">
                  {selected === 'manajer'
                    ? 'PROFIL MANAJER'
                    : vehicle
                      ? 'ARMADA • SIMULASI'
                      : selected === 'gudang' || selected === 'logistik'
                        ? 'PUSAT DISTRIBUSI & LOGISTIK'
                        : selected === 'karakter'
                          ? 'SUMBER DAYA MANUSIA'
                          : location === 'luar'
                            ? 'DUNIA KOPERASI'
                            : 'KANTOR • INTERIOR'}
                </span>
                <h1>{title}</h1>
                <p>
                  {selected === 'manajer'
                    ? 'Penanggung jawab ruang kerja dan kawasan'
                    : vehicle
                      ? 'Kendaraan suasana kawasan'
                      : selected === 'gudang' || selected === 'logistik'
                        ? 'Pusat penerimaan pasokan dan bongkar muat mitra'
                        : plot
                          ? plot.unit
                            ? 'Terhubung ke catatan gerai'
                            : 'Bidang tersedia untuk gerai baru'
                          : selected === 'karakter'
                            ? 'Petugas dan anggota tim ruang kerja'
                            : location === 'luar'
                              ? 'Lingkungan dan ruang kerja'
                              : 'Pilih area untuk membuka catatan'}
                </p>
              </div>
              <Button
                className="cw-panel-close"
                aria-label="Tutup detail"
                onClick={() => setPanelOpen(false)}
              >
                <X size={17} />
              </Button>
            </div>
            <div className="cw-detail-body">
              {vehicle ? (
                <>
                  <div className="cw-planning-icon">
                    <Truck size={44} />
                  </div>
                  <span className="cw-status cw-status-muted">Simulasi lingkungan</span>
                  <p className="cw-panel-note">{vehicle.description}</p>
                  <div className="cw-vehicle-badge-row">
                    <span className="cw-badge-pill">{vehicle.kind}</span>
                    <span className="cw-badge-pill cw-badge-ambient">Suasana kawasan</span>
                  </div>
                  {vehicle.id === 'kendaraan-truk-mitra' && (
                    <div className="cw-partner-info-box" style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--cw-line)', marginTop: '10px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--cw-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mitra Ekspedisi</span>
                      <strong style={{ display: 'block', fontSize: '14px', color: 'var(--cw-ink)', marginTop: '2px' }}>
                        {String(model.stakeholders?.find((s) => String(s.data.category || '').toLowerCase().includes('suplier') || String(s.data.category || '').toLowerCase().includes('distributor'))?.data.title || 'PT Distribusi Puntukrejo Sejahtera (Simulasi)')}
                      </strong>
                      <span style={{ display: 'block', fontSize: '12px', color: 'var(--cw-muted)', marginTop: '2px' }}>
                        Dermaga 3 · Status: Bongkar muat pasokan (peragaan visual)
                      </span>
                      <small style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                        Muatan: Belum ada data muatan langsung
                      </small>
                    </div>
                  )}
                  <p className="cw-panel-note">
                    Kendaraan adalah visualisasi suasana kawasan, bukan data transaksi atau pengiriman nyata.
                  </p>
                  <Button
                    className="cw-secondary-link"
                    onClick={() => {
                      setSelected('kawasan');
                    }}
                  >
                    Kembali ke kawasan <ArrowRight size={14} />
                  </Button>
                </>
              ) : selected === 'lingkungan' ? (
                <>
                  <p className="cw-panel-note">
                    Atur suasana visual. Cuaca adalah simulasi, bukan prakiraan cuaca setempat.
                  </p>
                  <label className="cw-field">
                    Cuaca
                    <Select
                      ariaLabel="Cuaca simulasi"
                      value={preferences.weather}
                      onChange={(value) =>
                        preference('weather', value as WorldPreferences['weather'])
                      }
                      options={['cerah', 'berawan', 'hujan']}
                    />
                  </label>
                  <label className="cw-field">
                    Waktu & pencahayaan
                    <Select
                      ariaLabel="Waktu pencahayaan"
                      value={preferences.time}
                      onChange={(value) => preference('time', value as WorldPreferences['time'])}
                      options={[
                        { value: 'otomatis', label: 'Otomatis · WIB' },
                        'pagi',
                        'siang',
                        'senja',
                        'malam',
                      ]}
                    />
                  </label>
                  <label className="cw-field">
                    Pakaian maskot
                    <Select
                      ariaLabel="Warna pakaian maskot"
                      value={preferences.outfit}
                      onChange={(value) =>
                        preference('outfit', value as WorldPreferences['outfit'])
                      }
                      options={['biru', 'lavender', 'hijau']}
                    />
                  </label>
                  <p className="cw-panel-note">Pilihan suasana disimpan di perangkat ini.</p>
                </>
              ) : selected === 'manajer' ? (
                <>
                  <div className="cw-character-portrait">
                    <span className="cw-portrait-head">
                      <i />
                      <i />
                      <b />
                    </span>
                    <span className="cw-portrait-shirt" style={{ background: '#1e3a8a' }} />
                  </div>
                  <span className="cw-status">Manajer KDMP Puntukrejo</span>
                  <p className="cw-panel-note">
                    Penanggung jawab operasional harian, koordinasi tim, dan peninjauan berkala unit usaha koperasi.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '12px 0' }}>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--cw-line)' }}>
                      <small style={{ display: 'block', fontSize: '11px', color: 'var(--cw-muted)' }}>Tugas Terbuka</small>
                      <strong style={{ fontSize: '16px', color: 'var(--cw-ink)' }}>{model.tasks.length}</strong>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--cw-line)' }}>
                      <small style={{ display: 'block', fontSize: '11px', color: 'var(--cw-muted)' }}>Rapat Hari Ini</small>
                      <strong style={{ fontSize: '16px', color: 'var(--cw-ink)' }}>{model.meetings.length}</strong>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--cw-line)' }}>
                      <small style={{ display: 'block', fontSize: '11px', color: 'var(--cw-muted)' }}>Gerai Tercatat</small>
                      <strong style={{ fontSize: '16px', color: 'var(--cw-ink)' }}>{model.units.length} / 7</strong>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--cw-line)' }}>
                      <small style={{ display: 'block', fontSize: '11px', color: 'var(--cw-muted)' }}>Aktivitas Visual</small>
                      <strong style={{ fontSize: '13px', color: 'var(--cw-ink)' }}>{activityNames[activity]}</strong>
                    </div>
                  </div>
                  <Link className="cw-primary-link" href="/pengaturan">
                    Buka pengaturan profil <ArrowRight size={15} />
                  </Link>
                  <Link className="cw-secondary-link" href="/tugas">
                    Kelola tugas manajer <ArrowRight size={14} />
                  </Link>
                </>
              ) : selected === 'karakter' ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="cw-status">Daftar Anggota Tim ({model.staff?.length || 0})</span>
                    <Button
                      style={{ fontSize: '11px', padding: '4px 8px', background: 'var(--cw-primary)', color: '#fff', borderRadius: '6px' }}
                      onClick={() => setIsAddingStaff(!isAddingStaff)}
                    >
                      {isAddingStaff ? 'Batal' : '+ Tambah Anggota'}
                    </Button>
                  </div>
                  {isAddingStaff && (
                    <form onSubmit={handleAddStaff} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--cw-line)', marginBottom: '12px' }}>
                      <label className="cw-field" style={{ marginBottom: '8px' }}>
                        Nama Anggota Tim
                        <Input
                          value={newStaffName}
                          onChange={(e) => setNewStaffName(e.target.value)}
                          placeholder="Nama lengkap..."
                          required
                        />
                      </label>
                      <label className="cw-field" style={{ marginBottom: '10px' }}>
                        Peran / Jabatan
                        <Input
                          value={newStaffRole}
                          onChange={(e) => setNewStaffRole(e.target.value)}
                          placeholder="contoh: Staf Kasir / Operasional"
                        />
                      </label>
                      <Button
                        type="submit"
                        disabled={staffLoading || !newStaffName.trim()}
                        style={{ width: '100%', background: 'var(--cw-primary)', color: '#fff', padding: '8px', borderRadius: '6px' }}
                      >
                        {staffLoading ? 'Menyimpan...' : 'Simpan Anggota Tim'}
                      </Button>
                    </form>
                  )}
                  {model.staff && model.staff.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                      {model.staff.map((s) => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: '#fff', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                          <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                            {String(s.data.title || 'S').slice(0, 1).toUpperCase()}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: '12px', color: 'var(--cw-ink)' }}>{String(s.data.title)}</strong>
                            <small style={{ display: 'block', fontSize: '11px', color: 'var(--cw-muted)' }}>{String(s.data.role || 'Staf')} · {String(s.data.status || 'aktif')}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="cw-panel-note">
                      Belum ada anggota tim terdaftar. Karakter default mengisi suasana ruang kerja dan plaza.
                    </p>
                  )}
                  <div style={{ marginTop: '12px' }}>
                    <label className="cw-field">
                      Pratinjau gerakan
                      <Select
                        ariaLabel="Pratinjau gerakan karakter"
                        value={rehearsal}
                        onChange={(value) => {
                          setRehearsal(value as CharacterActivity | 'otomatis');
                          if (value !== 'idle' && value !== 'otomatis') setLocation('dalam');
                        }}
                        options={[
                          { value: 'otomatis', label: 'Ikuti data ruang kerja' },
                          ...Object.entries(activityNames).map(([value, label]) => ({
                            value,
                            label,
                          })),
                        ]}
                      />
                    </label>
                  </div>
                </>
              ) : selected === 'logistik' || selected === 'gudang' ? (
                <>
                  <div className="cw-planning-icon">
                    <Truck size={44} />
                  </div>
                  <span className="cw-status">Beroperasi · simulasi</span>
                  <p className="cw-panel-note">
                    Pusat distribusi dan penerimaan pasokan barang dari suplier. 3 dermaga aktif melayani armada internal dan truk ekspedisi mitra.
                  </p>

                  {/* Tab Dermaga | Mitra Ekspedisi */}
                  <div className="cw-warehouse-card-tabs" style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '4px', marginBottom: '10px' }}>
                      <button
                        type="button"
                        className={`ui-btn cw-seg-btn ${warehouseTab === 'dermaga' ? 'is-active' : ''}`}
                        onClick={() => setWarehouseTab('dermaga')}
                      >
                        Dermaga (3 Slot)
                      </button>
                      <button
                        type="button"
                        className={`ui-btn cw-seg-btn ${warehouseTab === 'mitra' ? 'is-active' : ''}`}
                        onClick={() => setWarehouseTab('mitra')}
                      >
                        Mitra Ekspedisi
                      </button>
                    </div>

                    {warehouseTab === 'dermaga' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ padding: '8px 10px', background: '#fff', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--cw-ink)' }}>Dermaga 1</strong>
                            <span style={{ fontSize: '10px', padding: '2px 6px', background: '#f1f5f9', color: '#64748b', borderRadius: '4px', fontWeight: 600 }}>Tertutup</span>
                          </div>
                          <small style={{ fontSize: '11px', color: 'var(--cw-muted)', display: 'block', marginTop: '2px' }}>Gudang transit stok & penyimpanan tertutup</small>
                        </div>
                        <div style={{ padding: '8px 10px', background: '#fff', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--cw-ink)' }}>Dermaga 2</strong>
                            <span style={{ fontSize: '10px', padding: '2px 6px', background: '#dbeafe', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>Aktif Muat</span>
                          </div>
                          <small style={{ fontSize: '11px', color: 'var(--cw-muted)', display: 'block', marginTop: '2px' }}>Pintu terbuka · Patroli forklift & tumpukan palet</small>
                        </div>
                        <div style={{ padding: '8px 10px', background: '#fff', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--cw-ink)' }}>Dermaga 3</strong>
                            <span style={{ fontSize: '10px', padding: '2px 6px', background: '#ccfbf1', color: '#0f766e', borderRadius: '4px', fontWeight: 600 }}>Truk Bersandar</span>
                          </div>
                          <small style={{ fontSize: '11px', color: 'var(--cw-muted)', display: 'block', marginTop: '2px' }}>Truk Ekspedisi Mitra bersandar di bawah kanopi</small>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {model.stakeholders && model.stakeholders.length > 0 ? (
                          model.stakeholders.map((s) => (
                            <div key={s.id} style={{ padding: '8px 10px', background: '#fff', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                              <strong style={{ fontSize: '12px', color: 'var(--cw-ink)', display: 'block' }}>{String(s.data.title)}</strong>
                              <small style={{ fontSize: '11px', color: 'var(--cw-muted)', display: 'block' }}>{String(s.data.category || 'Mitra')} · Terhubung</small>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '10px', background: '#f8fafc', border: '1px solid var(--cw-line)', borderRadius: '6px' }}>
                            <small style={{ fontSize: '11px', color: 'var(--cw-muted)' }}>Belum ada data mitra khusus. Ekspedisi umum melayani operasional kawasan secara simulasi.</small>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Link className="cw-primary-link" href="/mitra" style={{ marginTop: '12px' }}>
                    Kelola mitra & suplier <ArrowRight size={15} />
                  </Link>
                </>
              ) : plot ? (
                <>
                  <span className={`cw-status ${plot.unit ? '' : 'cw-status-muted'}`}>
                    {plot.unit ? String(plot.unit.data.status) : 'Lahan kosong'}
                  </span>
                  <div className="cw-plot-diagram">
                    <Store size={48} strokeWidth={1} />
                    <span>
                      {plot.unit
                        ? String(plot.unit.data.kind || 'Unit gerai')
                        : 'Siap ditempati gerai'}
                    </span>
                  </div>
                  <p className="cw-panel-note">
                    {plot.unit
                      ? String(plot.unit.data.location || 'Lokasi belum diisi pada catatan gerai.')
                      : 'Tambahkan unit pada halaman Gerai. Bangunan akan muncul otomatis pada lahan yang tersedia setelah data dimuat ulang.'}
                  </p>
                  <Link
                    className="cw-primary-link"
                    href={plot.unit ? recordHref('units', plot.unit) : '/gerai'}
                  >
                    {plot.unit ? 'Buka catatan gerai' : 'Tambahkan gerai'}
                    <ArrowRight size={15} />
                  </Link>
                </>
              ) : station ? (
                <>
                  <span className="cw-status">Ruang kerja</span>
                  <p className="cw-panel-note">{station.description}</p>
                  <div className="cw-room-links">
                    {worldStations
                      .filter((item) => item.scope === 'kantor')
                      .map((item) => (
                        <Button
                          key={item.id}
                          aria-pressed={selected === item.id}
                          onClick={() => select(item.id)}
                        >
                        {item.id === 'rapat' ? (
                          <Users size={17} />
                        ) : item.id === 'tugas' ? (
                          <CheckCheck size={17} />
                        ) : item.id === 'kegiatan' ? (
                          <Dumbbell size={17} />
                        ) : (
                          <BookOpen size={17} />
                        )}
                        {item.title}
                        <ChevronRight size={14} />
                      </Button>
                    ))}
                  </div>
                  <Link className="cw-primary-link" href={station.href}>
                    Buka {station.title.toLowerCase()}
                    <ArrowRight size={15} />
                  </Link>
                  {selected === 'dokumen' && (
                    <Link className="cw-secondary-link" href="/pencatatan">
                      Buka buku pencatatan <ArrowRight size={14} />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <div className="cw-status-line">
                    <span className="cw-status">
                      {error ? 'Data tidak tersedia' : 'Kawasan interaktif'}
                    </span>
                    <small>7 bidang lahan</small>
                  </div>
                  <div className="cw-detail-metrics">
                    <div>
                      <small>Gerai terisi</small>
                      <strong>
                        {count(Math.min(model.units.length, 7))}
                        <span> / 7</span>
                      </strong>
                      <div className="cw-capacity">
                        <i
                          style={{
                            width: `${error || loading ? 0 : (Math.min(model.units.length, 7) / 7) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <small>Area kantor</small>
                      <strong>
                        4<span> ruangan</span>
                      </strong>
                      <div className="cw-capacity cw-purple">
                        <i />
                      </div>
                    </div>
                  </div>
                  <h2>
                    Lokasi <span>{location === 'luar' ? 'Kawasan' : 'Kantor'}</span>
                  </h2>
                  <div className="cw-location-list">
                    {(!query || 'kantor koperasi'.includes(query.toLowerCase())) && (
                      <Button onClick={() => enter('dalam')}>
                        <span className="cw-list-icon">
                          <Building2 size={18} />
                        </span>
                        <span>
                          <strong>Kantor koperasi</strong>
                          <small>Rapat, tugas, kegiatan & arsip</small>
                        </span>
                        <ChevronRight size={15} />
                      </Button>
                    )}
                    {model.plots
                      .filter((item) =>
                        `${item.unit?.data.title || item.id}`
                          .toLowerCase()
                          .includes(query.toLowerCase()),
                      )
                      .map((item, index) => (
                        <Button key={item.id} onClick={() => select(item.id)}>
                          <span className={`cw-list-icon ${!item.unit ? 'cw-empty-icon' : ''}`}>
                            {item.unit ? <Store size={17} /> : <Plus size={17} />}
                          </span>
                          <span>
                            <strong>
                              {item.unit
                                ? String(item.unit.data.title)
                                : `Lahan gerai ${item.id.split('-')[1]}`}
                            </strong>
                            <small>
                              {item.unit ? String(item.unit.data.status) : 'Belum ada bangunan'}
                            </small>
                          </span>
                          <span className="cw-slot-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </Button>
                      ))}
                    {query &&
                      !model.plots.some((item) =>
                        `${item.unit?.data.title || item.id}`
                          .toLowerCase()
                          .includes(query.toLowerCase()),
                      ) &&
                      !'kantor koperasi'.includes(query.toLowerCase()) &&
                      !worldVehicles.some((v) => v.name.toLowerCase().includes(query.toLowerCase())) && (
                        <p className="cw-panel-note">Lokasi tidak ditemukan.</p>
                      )}
                  </div>
                  {(!query || 'armada kendaraan mobil van truk'.includes(query.toLowerCase())) && (
                    <div className="cw-vehicle-nav-group">
                      <span className="cw-section-title">Armada & Kendaraan</span>
                      {worldVehicles.map((v) => (
                        <Button key={v.id} onClick={() => select(v.id)}>
                          <span className="cw-list-icon">
                            <Truck size={17} />
                          </span>
                          <span className="cw-item-text">
                            <strong>{v.name}</strong>
                            <small>{v.kind} · simulasi</small>
                          </span>
                          <ChevronRight size={14} />
                        </Button>
                      ))}
                    </div>
                  )}
                  {model.overflow > 0 && (
                    <p className="cw-panel-note">
                      {model.overflow} gerai lainnya tersedia di daftar Gerai; kawasan ini memiliki
                      tujuh lahan.
                    </p>
                  )}
                  <Button className="cw-logistics-link" onClick={() => select('logistik')}>
                    <Truck size={17} />
                    <span>Suplier & ekspedisi</span>
                    <small>Rencana</small>
                    <ChevronRight size={14} />
                  </Button>
                </>
              )}
            </div>
            <footer className="cw-detail-footer">
              <span>
                <i />
                {preview ? 'Pratinjau desain' : error ? 'Koneksi bermasalah' : 'Data ruang kerja'}
              </span>
              <Button
                onClick={() => {
                  setSelected('kawasan');
                  setQuery('');
                }}
              >
                Semua lokasi <ArrowRight size={13} />
              </Button>
            </footer>
          </aside>
        )}

        <div className="cw-bottom-left">
          <div className="cw-weather cw-glass">
            <span className="cw-weather-symbol">{weatherIcon}</span>
            <div>
              <strong>
                {preferences.weather === 'cerah'
                  ? 'Cerah'
                  : preferences.weather === 'berawan'
                    ? 'Berawan'
                    : 'Hujan'}
              </strong>
              <small>
                Cuaca simulasi · {preferences.time === 'otomatis' ? 'waktu WIB' : preferences.time}
              </small>
            </div>
            <Button aria-label="Atur cuaca dan waktu" onClick={() => setSuasanaOpen(true)}>
              <Settings2 size={15} />
            </Button>
          </div>
          <div className="cw-activity-card cw-glass">
            <div className="cw-activity-title">
              <span>
                <span className="cw-pulse" />
                Ruang kerja hari ini
              </span>
              <small>{dateLabel}</small>
            </div>
            <div className="cw-activity-steps">
              {[
                {
                  icon: <CheckCheck size={16} />,
                  label: 'Tugas',
                  value: count(model.tasks.length),
                  href: '/tugas',
                },
                {
                  icon: <Users size={16} />,
                  label: 'Rapat',
                  value: count(model.meetings.length),
                  href: '/rapat',
                },
                {
                  icon: <Dumbbell size={16} />,
                  label: 'Kegiatan',
                  value: count(model.activities.length),
                  href: '/jurnal',
                },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <span>{item.icon}</span>
                  <strong>{item.label}</strong>
                  <small>{item.value} catatan</small>
                </Link>
              ))}
              <Button className="cw-mascot-action" onClick={() => select('manajer')}>
                <Users size={18} />
                <span className="cw-item-text">
                  <strong>{model.manager || 'Manajer'}</strong>
                  <small>{activityNames[activity]}</small>
                </span>
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </div>
        <div className="cw-compass">
          <Compass size={32} strokeWidth={1.2} />
          <span>U</span>
        </div>
        <div className="cw-scene-hint">Geser untuk memutar · Cubit / gulir untuk zoom</div>
      </section>
      <nav className="cw-dock" aria-label="Navigasi dunia koperasi">
        <Link href="/beranda" aria-label="Kembali ke Beranda">
          <ArrowLeft size={18} />
          <span>Beranda</span>
        </Link>
        <i />
        <Button aria-pressed={location === 'luar'} onClick={() => enter('luar')}>
          <Map size={19} />
          <span>Kawasan</span>
        </Button>
        <Button aria-pressed={location === 'dalam'} onClick={() => enter('dalam')}>
          <Building2 size={19} />
          <span>Kantor</span>
        </Button>
        <Button aria-pressed={selected === 'karakter'} onClick={() => select('karakter')}>
          <MessageCircle size={19} />
          <span>Karakter</span>
        </Button>
        <Button
          aria-pressed={suasanaOpen}
          onClick={() => {
            select('lingkungan');
            setSuasanaOpen((prev) => !prev);
          }}
        >
          <Sun size={19} />
          <span>Suasana</span>
        </Button>
      </nav>
    </main>
  );
}
