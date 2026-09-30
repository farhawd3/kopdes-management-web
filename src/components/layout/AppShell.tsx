'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  PanelLeft,
  Sparkles,
  Menu,
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
];
function Frame({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    { preference, setTheme } = useTheme();
  const [menu, setMenu] = useState(false),
    [error, setError] = useState('');
  const [density, setDensity] = usePreference('hub-density', 'comfortable');
  const compact = density === 'compact';
  const setCompact = (value: boolean) => setDensity(value ? 'compact' : 'comfortable');
  useEffect(() => {
    document.documentElement.dataset.density = compact ? 'compact' : 'comfortable';
  }, [compact]);
  return (
    <div className="shell">
      <a className="skip" href="#main">
        Lewati navigasi
      </a>
      <aside className={menu ? 'sidebar open' : 'sidebar'} aria-label="Navigasi utama">
        <Link href="/beranda" className="brand">
          <span className="brand-icon">K</span>
          <span>
            Kopdes<span className="brand-sub">MANAGER WORKSPACE</span>
          </span>
        </Link>
        <Link href="/tugas?baru=1" className="sidebar-create">
          <Plus size={17} />
          <span>Buat tugas baru</span>
        </Link>
        <nav>
          {navigation.map(([href, label], index) => {
            const Icon = icons[index];
            return (
              <div key={href}>
                {[0, 5, 14].includes(index) && (
                  <div className="nav-label">
                    {index === 0 ? 'WORKSPACE' : index === 5 ? 'OPERASIONAL' : 'PREFERENSI'}
                  </div>
                )}
                <Link
                  key={href}
                  onClick={() => setMenu(false)}
                  href={href}
                  aria-current={path === href ? 'page' : undefined}
                  title={label}
                >
                  <span aria-hidden>
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <span>{label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <Sparkles size={18} />
          <span>
            Ruang untuk tumbuh.
            <br />
            <strong>Satu langkah setiap hari.</strong>
          </span>
        </div>
      </aside>
      {menu && (
        <button className="menu-shade" aria-label="Tutup menu" onClick={() => setMenu(false)} />
      )}
      <div className="workspace">
        <header className="topbar">
          <span className="breadcrumb">
            <PanelLeft size={16} /> Ruang kerja <span>/</span>
            <strong>{navigation.find(([href]) => href === path)?.[1] || 'Beranda'}</strong>
          </span>
          <div className="actions">
            <label className="sr-only" htmlFor="theme">
              Tema
            </label>
            <select
              id="theme"
              value={preference}
              onChange={(e) => setTheme(e.target.value as 'system' | 'light' | 'dark')}
            >
              <option value="system">Tema sistem</option>
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
            </select>
            <button
              aria-pressed={compact}
              onClick={() => {
                setCompact(!compact);
              }}
            >
              Ringkas
            </button>
            <button
              onClick={async () => {
                try {
                  await api('auth/pin', { action: 'logout' });
                  resetAuthNavigation('/pin');
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            >
              <LockKeyhole size={15} />
              <span>Kunci</span>
            </button>
            <Link className="primary quick-add" href="/tugas?baru=1">
              <Plus size={16} /> Tugas
            </Link>
          </div>
        </header>
        {error && (
          <p role="alert" className="notice">
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
        <Link href="/tugas" aria-current={path === '/tugas' ? 'page' : undefined}>
          <CheckCheck size={20} />
          <span>Tugas</span>
        </Link>
        <button aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </nav>
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
