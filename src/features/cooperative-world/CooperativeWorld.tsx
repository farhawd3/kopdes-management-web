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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { usePreference } from '@/lib/usePreference';
import type { Workspace } from '../workspace/useWorkspace';
import {
  getWorldHour,
  getWorldModel,
  worldPreferencesSchema,
  worldStations,
  type CharacterActivity,
  type WorldLocation,
  type WorldPreferences,
} from './world-model';
import { recordHref } from '../workspace/workspace-navigation';
const WorldScene = dynamic(() => import('./WorldScene').then((module) => module.WorldScene), {
  ssr: false,
  loading: () => <div className="cw-loading">Menyiapkan lingkungan 3D…</div>,
});
const activityNames = {
  idle: 'Bersantai',
  meeting: 'Duduk rapat',
  work: 'Mengerjakan tugas',
  gym: 'Berolahraga',
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
  const [rehearsal, setRehearsal] = useState<CharacterActivity | 'otomatis'>('otomatis');
  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(tick);
  }, []);
  const model = useMemo(() => getWorldModel(data, now), [data, now]);
  // Geometry is independent of the clock: minute ticks must not reset the camera.
  const sceneModel = useMemo(() => getWorldModel(data, new Date()), [data]);
  const hour = getWorldHour(preferences.time, now);
  const activity = rehearsal === 'otomatis' ? model.activity : rehearsal;
  const plot = model.plots.find((item) => item.id === selected);
  const station = worldStations.find((item) => item.id === selected);
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
        ? `Ada rapat: ${String(model.currentMeeting.data.title)}.`
        : model.tasks.length
          ? `${model.tasks.length} tugas masih terbuka. Mari lihat meja tugas!`
          : 'Klik gedung koperasi untuk masuk. Kita bisa melihat ruang rapat dan meja tugas!';
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
    selected === 'lingkungan'
      ? 'Suasana & karakter'
      : selected === 'logistik'
        ? 'Area pengembangan'
        : selected === 'karakter'
          ? 'Maskot koperasi'
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
        <span className="cw-live">
          <i />
          {clock} WIB
        </span>
        <Button
          className="cw-icon-button"
          aria-label="Pengaturan suasana"
          onClick={() => select('lingkungan')}
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
          outfit={preferences.outfit}
          activity={activity}
          zoom={zoom}
          rotation={rotation}
          selected={selected}
          bubble={bubble}
          onSelect={select}
        />
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
                {plot ? (
                  <Store size={24} />
                ) : selected === 'lingkungan' ? (
                  weatherIcon
                ) : selected === 'karakter' ? (
                  <MessageCircle size={22} />
                ) : (
                  <Building2 size={24} />
                )}
              </span>
              <div>
                <span className="cw-eyebrow">
                  {location === 'luar' ? 'DUNIA KOPERASI' : 'KANTOR • INTERIOR'}
                </span>
                <h1>{title}</h1>
                <p>
                  {plot
                    ? plot.unit
                      ? 'Terhubung ke catatan gerai'
                      : 'Bidang tersedia untuk gerai baru'
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
              {selected === 'lingkungan' ? (
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
              ) : selected === 'karakter' ? (
                <>
                  <div className="cw-character-portrait">
                    <span className="cw-portrait-head">
                      <i />
                      <i />
                      <b />
                    </span>
                    <span className="cw-portrait-shirt" />
                  </div>
                  <span className="cw-status">{activityNames[activity]}</span>
                  <p className="cw-panel-note">
                    Maskot visual ruang kerja. Animasi mengikuti jadwal rapat, kegiatan hari ini,
                    lalu tugas dalam proses.
                  </p>
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
                  {rehearsal !== 'otomatis' && (
                    <p className="cw-panel-note">
                      Mode pratinjau; tidak mengubah data rapat atau kegiatan.
                    </p>
                  )}
                </>
              ) : selected === 'logistik' ? (
                <>
                  <div className="cw-planning-icon">
                    <Truck size={44} />
                  </div>
                  <span className="cw-status cw-status-muted">Rencana pengembangan</span>
                  <p className="cw-panel-note">
                    Area bongkar muat telah disiapkan di tepi jalan. Tahap berikutnya: data suplier,
                    jadwal pengiriman, mobil ekspedisi, dan status kedatangan.
                  </p>
                  <Link className="cw-primary-link" href="/mitra">
                    Lihat mitra & kontak <ArrowRight size={15} />
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
                    {worldStations.map((item) => (
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
                      !'kantor koperasi'.includes(query.toLowerCase()) && (
                        <p className="cw-panel-note">Lokasi tidak ditemukan.</p>
                      )}
                  </div>
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
            <Button aria-label="Atur cuaca dan waktu" onClick={() => select('lingkungan')}>
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
              <Button className="cw-mascot-action" onClick={() => select('karakter')}>
                <MessageCircle size={20} />
                <span>
                  Maskot<small>{activityNames[activity]}</small>
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
        <Button aria-pressed={selected === 'lingkungan'} onClick={() => select('lingkungan')}>
          <Sun size={19} />
          <span>Suasana</span>
        </Button>
      </nav>
    </main>
  );
}
