'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  Building2,
  CheckCheck,
  FolderKanban,
  BookOpen,
  Users,
  Store,
  Truck,
  Landmark,
  Settings,
  Search,
  Plus,
  Minus,
  RotateCcw,
  ArrowLeft,
  X,
  CloudSun,
  List,
  Map,
  Moon,
  Sun,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { Editor } from '../Editor';
import type { Workspace } from '../workspace/useWorkspace';
import { searchWorkspace, recordHref, getFollowUps } from '../workspace/workspace-navigation';
import { today } from '@/lib/date';
import { useTheme } from '@/lib/ThemeContext';
import { usePreference } from '@/lib/usePreference';
import { worldModel } from './world-model';
import { WorldScene, type WorldSelection } from './WorldScene';
import lighting from './lighting-weather-tokens.json';
import { drawChar } from './character';

const worldNav = [
  ['/dunia-koperasi', 'Dunia', Building2],
  ['/beranda', 'Beranda', Landmark],
  ['/proyek', 'Proyek', FolderKanban],
  ['/tugas', 'Tugas', CheckCheck],
  ['/jurnal', 'Kegiatan', BookOpen],
  ['/rapat', 'Rapat', Users],
  ['/gerai', 'Gerai', Store],
  ['/suplier', 'Suplier', Truck],
  ['/pencatatan', 'Buku', Landmark],
  ['/pengaturan', 'Pengaturan', Settings],
] as const;
const weatherOptions = ['Cerah', 'Berawan', 'Hujan ringan', 'Hujan lebat', 'Badai', 'Berkabut'];
function clockHour(now: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(now)
    .split(':')
    .map(Number);
  return parts[0] + parts[1] / 60;
}
function interpolateColor(a: string, b: string, t: number) {
  return (
    '#' +
    [1, 3, 5]
      .map((index) =>
        Math.round(
          parseInt(a.slice(index, index + 2), 16) * (1 - t) +
            parseInt(b.slice(index, index + 2), 16) * t,
        )
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
export function worldLight(hour: number) {
  hour = Number.isFinite(hour) ? Math.max(0, Math.min(24, hour)) : 12;
  const anchors = [0, 5, 6 + 20 / 60, 9, 12, 15.5, 17.5, 18 + 40 / 60, 20 + 10 / 60, 24];
  const phases = [...lighting.fase_waktu, lighting.fase_waktu[0]];
  const index = Math.max(
    0,
    anchors.findIndex(
      (value, i) => i < anchors.length - 1 && hour >= value && hour <= anchors[i + 1],
    ),
  );
  const raw = (hour - anchors[index]) / (anchors[index + 1] - anchors[index]);
  const t = raw * raw * (3 - 2 * raw),
    a = phases[index],
    b = phases[index + 1];
  return {
    name: t < 0.5 ? a.nama : b.nama,
    sky: a.langit.map((color, i) => interpolateColor(color, b.langit[i], t)),
    lamps: a.lampu * (1 - t) + b.lampu * t,
    tint: interpolateColor(a.tint, b.tint, t),
    alpha: a.tint_alpha * (1 - t) + b.tint_alpha * t,
  };
}
export function CooperativeWorld({
  data,
  refresh,
  operations,
  supplierReady,
  partial = false,
}: {
  data: Workspace;
  refresh: () => Promise<void>;
  operations: boolean;
  supplierReady: boolean;
  partial?: boolean;
}) {
  const [inside, setInside] = useState(false),
    [selection, setSelection] = useState<WorldSelection | null>(null),
    [adding, setAdding] = useState(false);
  const [search, setSearch] = useState(''),
    [zoom, setZoom] = useState(1),
    [offset, setOffset] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState<Date | null>(null),
    [online, setOnline] = useState(true),
    [hidden, setHidden] = useState(false);
  const [weather, setWeather] = usePreference('hub-world-weather', 'Cerah'),
    [quality, setQuality] = usePreference('hub-world-quality', 'Sedang');
  const [fixed, setFixed] = usePreference('hub-world-hour', ''),
    [view, setView] = usePreference('hub-world-view', 'dunia');
  const [shirt, setShirt] = usePreference('hub-character-shirt', '#2F5BEA'),
    [skin, setSkin] = usePreference('hub-character-skin', '#FBE3D0');
  const [hair] = usePreference('hub-character-hair', 'pendek'),
    [accessory] = usePreference('hub-character-accessory', '');
  const [weatherPanel, setWeatherPanel] = useState(false);
  const [bubble, setBubble] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null),
    viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    origin: { x: number; y: number };
    moved: boolean;
  } | null>(null);
  const { theme, toggleTheme } = useTheme();
  const model = worldModel(data, time ? today() : '');
  const hour = fixed === '' ? (time ? clockHour(time) : 12) : Number(fixed);
  const light = worldLight(hour),
    rainy = weather.includes('Hujan') || weather === 'Badai';
  const results = searchWorkspace(data, search);
  const followUps = getFollowUps(data, time ? today() : '');
  const organization = data.organization?.[0];
  useEffect(() => {
    const update = () => {
      setTime(new Date());
      setOnline(navigator.onLine);
      setHidden(document.hidden);
    };
    update();
    const timer = window.setInterval(update, 30000);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearInterval(timer);
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]')) return;
      if (event.key === 'Escape') {
        if (selection) setSelection(null);
        else if (weatherPanel) setWeatherPanel(false);
        else setInside(false);
      }
      if (
        event.key === '/' &&
        !(
          event.target instanceof Element &&
          event.target.closest('input, textarea, [contenteditable]')
        )
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [selection, weatherPanel]);
  useEffect(() => {
    if (hidden || adding || selection || weatherPanel) return;
    const show = window.setInterval(() => {
      setBubble(true);
      window.setTimeout(() => setBubble(false), 4000);
    }, 18000);
    return () => clearInterval(show);
  }, [hidden, adding, selection, weatherPanel]);
  function select(next: WorldSelection) {
    if (drag.current?.moved) return;
    setWeatherPanel(false);
    setSelection(next);
  }
  const selectedUnit = selection?.kind === 'unit' ? model.slots[selection.index] : undefined;
  const selectedVehicle =
    selection?.kind === 'vehicle' ? model.vehicles[selection.index] : undefined;
  const selectedDesk = selection?.kind === 'desk' ? model.desks[selection.index] : undefined;
  const elevation = Math.max(0, Math.sin((Math.PI * (hour - 6)) / 12));
  const worldStyle = {
    '--world-sky-top': light.sky[0],
    '--world-sky-bottom': light.sky[1],
    '--world-tint': light.tint,
    '--world-tint-alpha': inside ? light.alpha * 0.4 : light.alpha,
    '--world-shadow-opacity': elevation * (weather === 'Cerah' ? 0.22 : 0.1),
    '--world-shadow-scale': (hour < 12 ? -1 : 1) * (1.15 - 0.95 * elevation),
  } as CSSProperties;
  return (
    <section
      className="cooperative-world"
      style={worldStyle}
      data-weather={weather}
      data-quality={quality}
      data-paused={hidden}
    >
      <header className="world-top world-card">
        <Link href="/dunia-koperasi" className="world-brand">
          <span>
            <Building2 size={23} />
          </span>
          <strong>{String(organization?.data.title || 'Dunia Koperasi')}</strong>
        </Link>
        <div className="world-search">
          <Search size={18} />
          <Input
            ref={searchRef}
            aria-label="Cari catatan dunia koperasi"
            placeholder="Cari tugas, gerai, mitra, suplier…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <kbd>/</kbd>
          {search && (
            <div className="world-search-results world-card">
              {results.length ? (
                results.map((result) => (
                  <Link key={result.id} href={result.href}>
                    <small>{result.kind}</small>
                    {result.title}
                  </Link>
                ))
              ) : (
                <p>Catatan yang dicari belum ditemukan pada data dimuat.</p>
              )}
            </div>
          )}
        </div>
        {model.units.length > 0 && (
          <div className="world-site-picker">
            <Select
              ariaLabel="Fokus gerai"
              value={selectedUnit?.row?.id || ''}
              onChange={(id) => {
                const index = model.slots.findIndex((slot) => slot.row?.id === id);
                if (index >= 0) {
                  setInside(false);
                  setSelection({ kind: 'unit', index });
                }
              }}
              options={[
                { value: '', label: 'Semua gerai' },
                ...model.slots
                  .filter((slot) => slot.row)
                  .map((slot) => ({ value: slot.row!.id, label: String(slot.row!.data.title) })),
              ]}
            />
          </div>
        )}
        <span className="world-clock" data-online={online}>
          {online ? 'Terhubung' : 'Offline'} ·{' '}
          {time
            ? new Intl.DateTimeFormat('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta',
              }).format(time)
            : '—'}
        </span>
        <Link
          href="/tindak-lanjut"
          className="world-alerts"
          aria-label={`${followUps.length} catatan perlu perhatian`}
        >
          <Bell size={19} />
          {followUps.length > 0 && <span>{followUps.length}</span>}
        </Link>
        <Button iconOnly aria-label="Ganti tema" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </Button>
        <Link href="/pengaturan" className="world-profile">
          <svg viewBox="-30 -70 60 80" width="42" height="48" aria-hidden="true">
            <g
              dangerouslySetInnerHTML={{
                __html: drawChar({
                  shirt: /^#[a-f0-9]{6}$/i.test(shirt) ? shirt : '#2F5BEA',
                  skin: /^#[a-f0-9]{6}$/i.test(skin) ? skin : '#FBE3D0',
                  acc:
                    'blazer lanyard' +
                    (hair === 'kerudung' ? ' hijab' : '') +
                    (['glasses', 'cap', 'helmet'].includes(accessory) ? ' ' + accessory : ''),
                }),
              }}
            />
          </svg>
          <span>
            <strong>{String(organization?.data.manager || 'Profil manajer')}</strong>
            <small>Manajer koperasi</small>
          </span>
        </Link>
      </header>
      <nav className="world-nav world-card" aria-label="Navigasi Dunia Koperasi">
        {worldNav.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            aria-current={href === '/dunia-koperasi' ? 'page' : undefined}
            title={label}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="world-content">
        <div className="world-kpis">
          {[
            ['Tugas aktif', model.tasks.length, CheckCheck],
            ['Terlambat', model.overdue.length, FolderKanban],
            ['Gerai aktif', model.units.filter((row) => row.data.status === 'aktif').length, Store],
          ].map(([label, count, Icon]) => {
            const MetricIcon = Icon as typeof CheckCheck;
            return (
              <article key={String(label)} className="world-card world-kpi">
                <span>
                  <MetricIcon size={21} />
                </span>
                <div>
                  <small>{String(label)}</small>
                  <strong>{String(count)}</strong>
                  <small>{partial ? 'Dari catatan dimuat' : 'Dari catatan tersimpan'}</small>
                </div>
              </article>
            );
          })}
        </div>
        <div className="world-controls">
          <Button
            onClick={() => {
              setInside(false);
              setSelection(null);
            }}
            disabled={!inside}
          >
            <ArrowLeft size={17} /> Kembali ke luar
          </Button>
          <Button
            aria-pressed={view === 'daftar'}
            onClick={() => setView(view === 'dunia' ? 'daftar' : 'dunia')}
          >
            {view === 'dunia' ? <List size={17} /> : <Map size={17} />}
            {view === 'dunia' ? 'Daftar saja' : 'Tampilkan dunia'}
          </Button>
          <Button onClick={() => void refresh()} aria-label="Muat ulang data">
            <RefreshCw size={17} />
          </Button>
          <Button
            onClick={() => {
              setWeatherPanel(!weatherPanel);
              setSelection(null);
            }}
          >
            <CloudSun size={18} />
            {weather} · {light.name}
          </Button>
        </div>
        {view === 'dunia' ? (
          <div
            ref={viewportRef}
            className="world-viewport"
            onPointerDown={(event) => {
              if ((event.target as Element).closest('[role="button"]')) return;
              drag.current = { x: event.clientX, y: event.clientY, origin: offset, moved: false };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const start = drag.current;
              if (!start) return;
              const dx = event.clientX - start.x,
                dy = event.clientY - start.y;
              if (Math.abs(dx) + Math.abs(dy) > 5) start.moved = true;
              setOffset({
                x: Math.max(-500, Math.min(500, start.origin.x + dx)),
                y: Math.max(-350, Math.min(350, start.origin.y + dy)),
              });
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            {!inside && (
              <div className="world-sky-details" aria-hidden="true">
                {light.lamps > 0.6 ? (
                  <>
                    <span className="world-moon" />
                    {Array.from({ length: 18 }, (_, index) => (
                      <i
                        key={index}
                        style={{
                          left: `${(index * 17 + 9) % 100}%`,
                          top: `${(index * 23 + 5) % 40}%`,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <span className="world-sun" />
                )}
                {weather !== 'Cerah' && <span className="world-cloud" />}
              </div>
            )}
            <div
              className="world-camera"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
            >
              <WorldScene
                model={model}
                inside={inside}
                enter={() => {
                  setInside(true);
                  setSelection(null);
                  setOffset({ x: 0, y: 0 });
                }}
                select={select}
                lamps={light.lamps}
                shirt={shirt}
                skin={skin}
                rainy={rainy}
              />
            </div>
            <div className="world-tint" />
            {weather === 'Berkabut' && <div className="world-fog" />}
            {rainy && !inside && <div className="world-rain" />}
            {bubble && !selection && !adding && !weatherPanel && (
              <div className="world-bubble">
                {model.overdue.length
                  ? `${model.overdue.length} tugas tenggat terlewat`
                  : 'Periksa agenda kerja'}
              </div>
            )}
            <div className="world-zoom world-card">
              <Button
                iconOnly
                aria-label="Perbesar dunia"
                disabled={zoom >= 1.4}
                onClick={() => setZoom(Math.min(1.4, zoom + 0.1))}
              >
                <Plus size={20} />
              </Button>
              <Button
                iconOnly
                aria-label="Perkecil dunia"
                disabled={zoom <= 0.8}
                onClick={() => setZoom(Math.max(0.8, zoom - 0.1))}
              >
                <Minus size={20} />
              </Button>
              <Button
                iconOnly
                aria-label="Reset kamera"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
              >
                <RotateCcw size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="world-list world-card">
            <h1>Dunia Koperasi</h1>
            <Button onClick={() => setInside(!inside)}>
              {inside ? 'Keluar kantor' : 'Masuk kantor'}
            </Button>
            {model.slots.map(({ row, index }) => (
              <Button key={row?.id || index} onClick={() => select({ kind: 'unit', index })}>
                {row ? String(row.data.title) : `Slot ${index + 1} — tambahkan gerai`}
              </Button>
            ))}
            {model.desks.map((desk, index) => (
              <Button key={desk.entity} onClick={() => select({ kind: 'desk', index })}>
                {desk.title} · {desk.rows.length} catatan
              </Button>
            ))}
            <Button onClick={() => select({ kind: 'warehouse', index: 0 })}>Gudang</Button>
            {model.vehicles.map(({ row }, index) => (
              <Button key={row.id} onClick={() => select({ kind: 'vehicle', index })}>
                {String(row.data.title)}
              </Button>
            ))}
          </div>
        )}
        {(selection || weatherPanel) && (
          <aside className="world-detail world-card" aria-label="Rincian objek">
            <div className="world-detail-heading">
              <small>
                {weatherPanel
                  ? 'TAMPILAN DUNIA'
                  : selection?.kind === 'desk'
                    ? 'KANTOR'
                    : 'DUNIA KOPERASI'}
              </small>
              <Button
                iconOnly
                aria-label="Tutup rincian"
                onClick={() => {
                  setSelection(null);
                  setWeatherPanel(false);
                }}
              >
                <X size={19} />
              </Button>
            </div>
            {selectedUnit && (
              <>
                <h2>
                  {String(selectedUnit.row?.data.title || `Slot Gerai ${selectedUnit.index + 1}`)}
                </h2>
                {selectedUnit.row ? (
                  <>
                    <span className="world-chip">{String(selectedUnit.row.data.status)}</span>
                    <dl>
                      <dt>Kesiapan</dt>
                      <dd>
                        {selectedUnit.readiness === null
                          ? 'Belum dinilai'
                          : `${selectedUnit.readiness}%`}
                      </dd>
                      <dt>Penanggung jawab</dt>
                      <dd>{String(selectedUnit.row.data.assignee || 'Belum diisi')}</dd>
                      <dt>Tugas aktif</dt>
                      <dd>
                        {
                          model.tasks.filter((row) => row.data.unit_id === selectedUnit.row?.id)
                            .length
                        }
                      </dd>
                    </dl>
                    <Link className="world-action" href={recordHref('units', selectedUnit.row)}>
                      Buka gerai
                    </Link>
                    <Link className="world-action" href="/kesiapan">
                      Buka kesiapan
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Slot belum terisi. Tambahkan gerai sesuai rencana koperasi.</p>
                    <Button primary onClick={() => setAdding(true)}>
                      <Plus size={18} />
                      Tambah gerai
                    </Button>
                  </>
                )}
              </>
            )}
            {selection?.kind === 'warehouse' && (
              <>
                <h2>Gudang</h2>
                {operations ? (
                  <>
                    <p>
                      {model.critical.length} barang berada pada atau di bawah batas minimum dari
                      catatan dimuat.
                    </p>
                    <Link className="world-action" href="/barang">
                      Buka daftar barang
                    </Link>
                    <Link className="world-action" href="/stok-opname">
                      Buka stok opname
                    </Link>
                  </>
                ) : (
                  <p>Pencatatan belum aktif. Stok belum dapat diperiksa.</p>
                )}
              </>
            )}
            {selectedVehicle && (
              <>
                <h2>{String(selectedVehicle.row.data.title)}</h2>
                <span className="world-chip">{selectedVehicle.supplier ? 'Suplier' : 'Mitra'}</span>
                <p>{String(selectedVehicle.row.data.contact || 'Kontak belum diisi')}</p>
                <Link
                  className="world-action"
                  href={recordHref(
                    selectedVehicle.supplier ? 'supplier' : 'stakeholders',
                    selectedVehicle.row,
                  )}
                >
                  Buka catatan
                </Link>
              </>
            )}
            {selectedDesk && (
              <>
                <h2>Meja {selectedDesk.title}</h2>
                <p>
                  {selectedDesk.rows.length
                    ? `${selectedDesk.rows.length} catatan dimuat.`
                    : 'Meja kosong. Belum ada catatan yang sesuai.'}
                </p>
                {selectedDesk.rows.slice(0, 3).map((row) => (
                  <Link
                    className="world-row"
                    key={row.id}
                    href={recordHref(selectedDesk.entity, row)}
                  >
                    {String(row.data.title)}
                  </Link>
                ))}
                <Link className="world-action" href={selectedDesk.href}>
                  Buka {selectedDesk.title.toLowerCase()}
                </Link>
              </>
            )}
            {(weatherPanel || selection?.kind === 'manager') && (
              <>
                <h2>{weatherPanel ? 'Cuaca & waktu' : 'Karakter manajer'}</h2>
                <p>Preferensi disimpan pada perangkat ini. Cuaca manual adalah efek visual.</p>
                <label>
                  Cuaca
                  <Select
                    ariaLabel="Cuaca dunia"
                    value={weather}
                    onChange={setWeather}
                    options={weatherOptions}
                  />
                </label>
                <label>
                  Kualitas efek
                  <Select
                    ariaLabel="Kualitas efek"
                    value={quality}
                    onChange={setQuality}
                    options={['Rendah', 'Sedang', 'Tinggi']}
                  />
                </label>
                <label>
                  Waktu
                  <Select
                    ariaLabel="Waktu dunia"
                    value={fixed}
                    onChange={setFixed}
                    options={[
                      { value: '', label: 'Ikuti waktu Jakarta' },
                      ...Array.from({ length: 24 }, (_, i) => ({
                        value: String(i),
                        label: `${String(i).padStart(2, '0')}.00`,
                      })),
                    ]}
                  />
                </label>
                <label>
                  Seragam
                  <Select
                    ariaLabel="Warna seragam"
                    value={shirt}
                    onChange={setShirt}
                    options={[
                      '#2F5BEA',
                      '#BFE8D2',
                      '#FBD9C3',
                      '#FCEBB5',
                      '#F8CFE0',
                      '#B9C4F2',
                      '#5B84F5',
                      '#E9C9A0',
                    ].map((value, i) => ({
                      value,
                      label: [
                        'Biru koperasi',
                        'Mint',
                        'Peach',
                        'Butter',
                        'Pink',
                        'Lavender',
                        'Biru lembut',
                        'Kayu',
                      ][i],
                    }))}
                  />
                </label>
                <label>
                  Warna kulit
                  <Select
                    ariaLabel="Warna kulit karakter"
                    value={skin}
                    onChange={setSkin}
                    options={['#FBE3D0', '#F3CEAF', '#E8B896', '#D49A78', '#B97856', '#87563E'].map(
                      (value, i) => ({ value, label: `Pilihan ${i + 1}` }),
                    )}
                  />
                </label>
              </>
            )}
          </aside>
        )}
        <div className="world-bottom">
          <article className="world-card world-work">
            <h2>Alur pekerjaan</h2>
            {model.tasks.length ? (
              model.tasks.slice(0, 3).map((row) => (
                <Link key={row.id} href={recordHref('work-items', row)} className="world-row">
                  <span className="world-task-dot" />
                  <span>
                    <strong>{String(row.data.title)}</strong>
                    <small>
                      {String(row.data.status)} · Tenggat {String(row.data.due_date)}
                    </small>
                  </span>
                </Link>
              ))
            ) : (
              <EmptyState
                title="Belum ada tugas aktif"
                description="Buat tugas untuk mulai mengisi meja kerja."
                tone="blue"
              />
            )}
            <Link className="world-action" href="/tugas">
              Buka tugas
            </Link>
          </article>
          <article className="world-card world-directory">
            <h2>{inside ? 'Meja kerja' : 'Gerai & mitra'}</h2>
            {inside ? (
              model.desks.map((desk, index) => (
                <Button
                  className="world-row"
                  key={desk.entity}
                  onClick={() => select({ kind: 'desk', index })}
                >
                  {desk.title}
                  <span className="world-chip">
                    {desk.rows.length ? `${desk.rows.length} catatan` : 'Kosong'}
                  </span>
                </Button>
              ))
            ) : (
              <>
                <p>
                  {model.units.length} gerai tercatat · {model.vehicles.length} mitra/suplier dimuat
                </p>
                <p>
                  {7 - model.slots.filter((slot) => slot.row).length} slot tersedia
                  {model.units.length > 7 ? ' · Gerai lainnya dapat dibuka melalui menu Gerai' : ''}
                </p>
                <Link className="world-action" href="/gerai">
                  Daftar gerai
                </Link>
                <Link className="world-action" href="/mitra">
                  Daftar mitra
                </Link>
                {!supplierReady && <small>Suplier belum aktif di database.</small>}
              </>
            )}
          </article>
        </div>
        {partial && (
          <p className="world-partial">
            Ringkasan memakai catatan dimuat; muat catatan lain di bawah untuk memperluas cakupan.
          </p>
        )}
      </div>
      {adding && (
        <Editor
          entity="units"
          workspace={data}
          onClose={() => setAdding(false)}
          onSaved={async () => {
            setAdding(false);
            setSelection(null);
            await refresh();
          }}
        />
      )}
    </section>
  );
}
