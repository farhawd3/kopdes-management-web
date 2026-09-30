'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/features/catalog';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';
import { api, resetAuthNavigation } from '@/lib/client';
import { usePreference } from '@/lib/usePreference';
import type { Workspace } from '@/features/useWorkspace';
import { today } from '@/lib/date';
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
  CalendarDays,
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
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [projectSearch, setProjectSearch] = useState('');
  const activeGroup = groups.find((group) => group.paths.includes(path)) || groups[0];
  useEffect(() => {
    const receive = (event: Event) => setWorkspace((event as CustomEvent<Workspace | null>).detail);
    window.addEventListener('hub-workspace', receive);
    return () => window.removeEventListener('hub-workspace', receive);
  }, []);
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
      <a className="skip" href="#main">
        Lewati navigasi
      </a>
      <nav className="app-rail" aria-label="Bagian aplikasi">
        <Link href="/beranda" className="rail-brand" aria-label="Beranda Kopdes">
          <span className="rail-brand-box">
            <CheckCheck size={24} strokeWidth={2.5} />
          </span>
        </Link>
        <Link href="/tugas" aria-label="Tugas & Daftar Harian" title="Tugas" aria-current={path === '/tugas' ? 'page' : undefined}>
          <CheckCheck size={20} />
        </Link>
        <Link href="/beranda" aria-label="Beranda" title="Beranda" aria-current={path === '/beranda' ? 'page' : undefined}>
          <LayoutDashboard size={20} />
        </Link>
        <Link href="/proyek" aria-label="Proyek" title="Proyek" aria-current={path === '/proyek' ? 'page' : undefined}>
          <FolderKanban size={20} />
        </Link>
        <Link href="/tugas?view=kalender" aria-label="Kalender Tugas" title="Kalender">
          <CalendarDays size={20} />
        </Link>
        <Link href="/laporan" aria-label="Laporan & Analitik" title="Laporan" aria-current={path === '/laporan' ? 'page' : undefined}>
          <ChartNoAxesCombined size={20} />
        </Link>
        <Link href="/rapat" aria-label="Rapat & Notulen" title="Rapat" aria-current={path === '/rapat' ? 'page' : undefined}>
          <MessagesSquare size={20} />
        </Link>
        <Link href="/pencatatan" aria-label="Pencatatan Koperasi" title="Pencatatan" aria-current={groups[3].paths.includes(path) ? 'page' : undefined}>
          <BookOpen size={20} />
        </Link>
        <Link href="/pengaturan" aria-label="Pengaturan" title="Pengaturan" aria-current={path === '/pengaturan' ? 'page' : undefined}>
          <Settings size={20} />
        </Link>
        <div className="rail-foot-profile">
          <span className="rail-user-avatar" title="Manajer KDMP Puntukrejo">M</span>
        </div>
      </nav>
      <aside className={menu ? 'sidebar open' : 'sidebar'} aria-label="Navigasi utama">
        {/* Workspace Card Selector */}
        <div className="sidebar-workspace-card">
          <div className="workspace-logo-box">
            <span>KD</span>
          </div>
          <div className="workspace-titles">
            <strong>KDMP Puntukrejo</strong>
            <small>Ruang Kerja Pribadi</small>
          </div>
        </div>

        <button className="sidebar-search" onClick={() => dialog.current?.showModal()}>
          <Search size={16} />
          <span>Cari halaman</span>
          <kbd>⌘ K</kbd>
        </button>

        <Link href="/tugas?baru=1" onClick={() => setMenu(false)} className="sidebar-create">
          <Plus size={17} />
          <span>Tugas baru</span>
        </Link>

        <nav>
          {/* Projects Section with Search */}
          <div className="sidebar-section-card">
            <div className="section-head">
              <h3>PROYEK</h3>
              <Link href="/proyek" aria-label="Semua proyek" className="section-head-link">
                <FolderKanban size={15} />
              </Link>
            </div>
            <div className="sidebar-search-box">
              <Search size={14} className="search-icon-inside" />
              <input
                aria-label="Cari proyek"
                type="search"
                placeholder="Cari proyek…"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
              />
            </div>
            <div className="sidebar-project-list">
              {workspace ? (
                (workspace.workstreams || [])
                  .filter(
                    (item) =>
                      item.data.status !== 'diarsipkan' &&
                      String(item.data.title)
                        .toLocaleLowerCase('id')
                        .includes(projectSearch.toLocaleLowerCase('id')),
                  )
                  .map((item) => {
                    const taskCount = (workspace['work-items'] || []).filter(
                      (task) =>
                        task.data.workstream_id === item.id &&
                        !['selesai', 'dibatalkan'].includes(String(task.data.status)),
                    ).length;
                    return (
                      <Link
                        key={item.id}
                        href={`/proyek?id=${encodeURIComponent(item.id)}`}
                        onClick={() => setMenu(false)}
                        className="sidebar-project-item"
                      >
                        <span
                          className="project-dot"
                          style={{ backgroundColor: String(item.data.color || '#ed7d3d') }}
                        />
                        <span className="project-title-text">{String(item.data.title)}</span>
                        <small className="project-count-pill">
                          {taskCount.toString().padStart(2, '0')}
                        </small>
                      </Link>
                    );
                  })
              ) : (
                <small className="muted-text">Memuat proyek…</small>
              )}
              {workspace && !(workspace.workstreams || []).length && (
                <p className="sidebar-empty-note">Belum ada proyek.</p>
              )}
            </div>
          </div>

          {/* Stakeholders / Contacts Section (Behance Reference) */}
          <div className="sidebar-section-card">
            <div className="section-head">
              <h3>PEMANGKU & KONTAK</h3>
              <span className="sidebar-pill-badge">Pengurus</span>
            </div>
            <div className="sidebar-members-list">
              {workspace?.stakeholders && workspace.stakeholders.length > 0 ? (
                workspace.stakeholders.slice(0, 4).map((sh) => (
                  <Link
                    key={sh.id}
                    href="/pemangku"
                    onClick={() => setMenu(false)}
                    className="sidebar-member-row"
                  >
                    <span className="member-avatar">
                      {String(sh.data.title).charAt(0).toUpperCase()}
                    </span>
                    <div className="member-info">
                      <span className="member-name">{String(sh.data.title)}</span>
                      <small className="member-role">{String(sh.data.category || 'Mitra')}</small>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/pemangku" onClick={() => setMenu(false)} className="sidebar-member-row">
                    <span className="member-avatar avatar-orange">KP</span>
                    <div className="member-info">
                      <span className="member-name">Ketua Pengurus</span>
                      <small className="member-role">Pengurus Koperasi</small>
                    </div>
                  </Link>
                  <Link href="/pemangku" onClick={() => setMenu(false)} className="sidebar-member-row">
                    <span className="member-avatar avatar-navy">BD</span>
                    <div className="member-info">
                      <span className="member-name">Bendahara</span>
                      <small className="member-role">Keuangan & Kas</small>
                    </div>
                  </Link>
                  <Link href="/pemangku" onClick={() => setMenu(false)} className="sidebar-member-row">
                    <span className="member-avatar avatar-slate">DK</span>
                    <div className="member-info">
                      <span className="member-name">Dinas Koperasi</span>
                      <small className="member-role">Pembina Wilayah</small>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* My To-Do List Shortcut (Behance Reference) */}
          <div className="sidebar-todo-shortcut">
            <Link href="/hari-ini" onClick={() => setMenu(false)} className="todo-shortcut-link">
              <div className="todo-shortcut-left">
                <Sun size={17} />
                <span>Tugas Hari Ini</span>
              </div>
              <small className="todo-count-badge">
                {
                  (workspace?.['work-items'] || []).filter(
                    (item) =>
                      item.data.due_date === today() &&
                      !['selesai', 'dibatalkan'].includes(String(item.data.status)),
                  ).length.toString().padStart(2, '0')
                }
              </small>
            </Link>
          </div>

          {/* Navigation Groups (Ruang Kerja, Koordinasi, Pemantauan, Pencatatan) */}
          {groups.map((group) => (
            <details
              className={`nav-group ${group === activeGroup ? 'active-group' : ''}`}
              key={group.name}
              open={group === activeGroup}
            >
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
                    <Icon size={17} strokeWidth={1.7} />
                    <span>{entry[1]}</span>
                  </Link>
                );
              })}
            </details>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="workspace-avatar">M</span>
          <span>
            KDMP Puntukrejo
            <br />
            <strong>Manajer Koperasi</strong>
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
