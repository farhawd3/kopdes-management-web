'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/features/catalog';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';
import { api, resetAuthNavigation } from '@/lib/client';
import { usePreference } from '@/lib/usePreference';
import {
  LayoutDashboard,
  Sun,
  CheckCheck,
  FolderKanban,
  Route,
  ClipboardCheck,
  Store,
  Users,
  MessagesSquare,
  Files,
  ShieldAlert,
  Contact,
  ChartNoAxesCombined,
  NotebookPen,
  Settings,
  CircleHelp,
  Plus,
  LockKeyhole,
  Menu,
  Search,
  Command,
  ArrowUpRight,
  Wallet,
  Package,
  BookOpen,
  X,
} from 'lucide-react';
const icons = [
  LayoutDashboard,
  Sun,
  CheckCheck,
  FolderKanban,
  Route,
  ClipboardCheck,
  Store,
  Users,
  MessagesSquare,
  Files,
  ShieldAlert,
  Contact,
  ChartNoAxesCombined,
  NotebookPen,
  Settings,
  CircleHelp,
  BookOpen,
  Users,
  Wallet,
  Package,
  ClipboardCheck,
];
const groups = [
  {
    name: 'Ruang kerja',
    paths: ['/beranda', '/hari-ini', '/proyek', '/tugas', '/roadmap', '/jurnal'],
  },
  { name: 'Koordinasi', paths: ['/rapat', '/dokumen', '/pemangku', '/tim'] },
  { name: 'Pemantauan', paths: ['/gerai', '/kesiapan', '/risiko', '/laporan'] },
  {
    name: 'Pencatatan',
    paths: ['/pencatatan', '/anggota', '/keuangan', '/barang', '/stok-opname'],
  },
  { name: 'Pengaturan', paths: ['/pengaturan', '/panduan'] },
];
function Frame({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    { preference, setTheme } = useTheme();
  const [menu, setMenu] = useState(false),
    [error, setError] = useState(''),
    [search, setSearch] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const [density, setDensity] = usePreference('hub-density', 'comfortable');
  const compact = density === 'compact';
  useEffect(() => {
    document.documentElement.dataset.density = compact ? 'compact' : 'comfortable';
  }, [compact]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        dialog.current?.showModal();
      }
      if (event.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  const current = navigation.find(([href]) => href === path)?.[1] || 'Beranda';
  return (
    <div className="shell studio-shell">
      <a className="skip" href="#main">
        Lewati navigasi
      </a>
      <aside className={menu ? 'sidebar open' : 'sidebar'} aria-label="Navigasi utama">
        <Link href="/beranda" className="brand">
          <span className="brand-icon">k.</span>
          <span>
            Kopdes<span className="brand-sub">MANAGEMENT</span>
          </span>
        </Link>
        <button className="sidebar-search" onClick={() => dialog.current?.showModal()}>
          <Search size={16} />
          <span>Cari halaman</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="sidebar-areas">
          <Link
            href="/proyek"
            onClick={() => setMenu(false)}
            aria-current={!groups[3].paths.includes(path) ? 'page' : undefined}
          >
            <FolderKanban size={15} />
            Kerja
          </Link>
          <Link
            href="/pencatatan"
            onClick={() => setMenu(false)}
            aria-current={groups[3].paths.includes(path) ? 'page' : undefined}
          >
            <BookOpen size={15} />
            Catat
          </Link>
        </div>
        <Link href="/tugas?baru=1" onClick={() => setMenu(false)} className="sidebar-create">
          <Plus size={17} />
          <span>Tugas baru</span>
        </Link>
        <nav>
          {groups.map((group) => (
            <details className="nav-group" key={group.name} open>
              <summary>{group.name}</summary>
              {group.paths.map((href) => {
                const index = navigation.findIndex((entry) => entry[0] === href),
                  entry = navigation[index],
                  Icon = icons[index];
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenu(false)}
                    aria-current={path === href ? 'page' : undefined}
                    title={entry[1]}
                  >
                    <Icon size={18} strokeWidth={1.7} />
                    <span>{entry[1]}</span>
                  </Link>
                );
              })}
            </details>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="workspace-avatar">K</span>
          <span>
            Kopdes Management
            <br />
            <strong>Ruang kerja pribadi</strong>
          </span>
        </div>
      </aside>
      {menu && (
        <button className="menu-shade" aria-label="Tutup menu" onClick={() => setMenu(false)} />
      )}
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-location">
            <button
              className="mobile-menu"
              aria-label="Buka navigasi"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Menu size={20} />
            </button>
            <span className="breadcrumb">
              Kopdes <span>/</span>
              <strong>{current}</strong>
            </span>
          </div>
          <div className="actions">
            <button
              className="search-trigger"
              aria-label="Cari halaman"
              onClick={() => dialog.current?.showModal()}
            >
              <Search size={18} />
              <span>Cari</span>
            </button>
            <label className="sr-only" htmlFor="theme">
              Tema
            </label>
            <select
              id="theme"
              value={preference}
              onChange={(event) => setTheme(event.target.value as 'system' | 'light' | 'dark')}
            >
              <option value="system">Sistem</option>
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
            </select>
            <button
              className="density-toggle"
              aria-pressed={compact}
              onClick={() => setDensity(compact ? 'comfortable' : 'compact')}
            >
              Ringkas
            </button>
            <button
              aria-label="Kunci aplikasi"
              onClick={async () => {
                try {
                  await api('auth/pin', { action: 'logout' });
                  resetAuthNavigation('/pin');
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            >
              <LockKeyhole size={16} />
            </button>
          </div>
        </header>
        {error && (
          <p role="alert" className="notice error">
            {error}
          </p>
        )}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
      <nav className="bottom-nav" aria-label="Navigasi ponsel">
        <Link href="/beranda" aria-current={path === '/beranda' ? 'page' : undefined}>
          <LayoutDashboard size={20} />
          <span>Beranda</span>
        </Link>
        <Link href="/proyek" aria-current={path === '/proyek' ? 'page' : undefined}>
          <FolderKanban size={20} />
          <span>Proyek</span>
        </Link>
        <Link className="add" href="/tugas?baru=1" aria-label="Tambah tugas">
          <Plus size={24} />
        </Link>
        <Link href="/pencatatan" aria-current={groups[3].paths.includes(path) ? 'page' : undefined}>
          <BookOpen size={20} />
          <span>Catat</span>
        </Link>
        <button aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </nav>
      <dialog className="command-dialog" ref={dialog} aria-labelledby="command-title">
        <div className="section-head">
          <h2 id="command-title">
            <Command size={18} />
            Pindah halaman
          </h2>
          <button aria-label="Tutup pencarian" onClick={() => dialog.current?.close()}>
            <X size={18} />
          </button>
        </div>
        <label>
          <span className="sr-only">Cari halaman</span>
          <input
            autoFocus
            type="search"
            value={search}
            placeholder="Proyek, rapat, buku kas…"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <div className="command-results">
          {navigation
            .filter(([, label]) =>
              label.toLocaleLowerCase('id').includes(search.toLocaleLowerCase('id')),
            )
            .map(([href, label]) => (
              <Link
                href={href}
                key={href}
                onClick={() => {
                  dialog.current?.close();
                  setMenu(false);
                }}
              >
                <span>{label}</span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          {!navigation.some(([, label]) =>
            label.toLocaleLowerCase('id').includes(search.toLocaleLowerCase('id')),
          ) && <p>Tidak ada halaman yang cocok.</p>}
        </div>
        <small>Ctrl / ⌘ K untuk membuka · Esc untuk menutup</small>
      </dialog>
    </div>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Frame>{children}</Frame>
    </ThemeProvider>
  );
}
