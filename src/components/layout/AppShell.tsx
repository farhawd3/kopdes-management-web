'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';
import { api, resetAuthNavigation } from '@/lib/client';
import { navigation } from '@/features/catalog';
import type { Workspace } from '@/features/useWorkspace';
import {
  House,
  CheckCheck,
  BookOpen,
  Menu,
  Search,
  Plus,
  Moon,
  Sun,
  LockKeyhole,
  X,
  ArrowUpRight,
  FolderKanban,
  Milestone,
  Users,
  FileText,
  Briefcase,
  Store,
  CheckCircle2,
  ShieldAlert,
  BarChart3,
  Landmark,
  UserCheck,
  Wallet,
  Boxes,
  ClipboardList,
  Settings,
  HelpCircle,
  SunMedium,
  Sparkles,
  ArrowRightCircle,
} from 'lucide-react';
import { usePreference } from '@/lib/usePreference';
import { searchWorkspace } from '@/features/workspace-navigation';
import { Star, ChevronDown } from 'lucide-react';
import { ManagerActionModal } from './ManagerActionModal';

const navIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  '/beranda': House,
  '/tindak-lanjut': ArrowRightCircle,
  '/hari-ini': SunMedium,
  '/tugas': CheckCheck,
  '/proyek': FolderKanban,
  '/roadmap': Milestone,
  '/jurnal': BookOpen,
  '/rapat': Users,
  '/dokumen': FileText,
  '/mitra': Briefcase,
  '/tim': UserCheck,
  '/gerai': Store,
  '/kesiapan': CheckCircle2,
  '/risiko': ShieldAlert,
  '/laporan': BarChart3,
  '/pencatatan': Landmark,
  '/anggota': Users,
  '/keuangan': Wallet,
  '/barang': Boxes,
  '/stok-opname': ClipboardList,
  '/pengaturan': Settings,
  '/panduan': HelpCircle,
};

const sections = [
  [
    'Pekerjaan',
    ['/beranda', '/tindak-lanjut', '/hari-ini', '/tugas', '/proyek', '/roadmap', '/jurnal'],
  ],
  ['Koordinasi', ['/rapat', '/dokumen', '/mitra', '/tim']],
  ['Operasional', ['/gerai', '/kesiapan', '/risiko', '/laporan']],
  ['Pencatatan', ['/pencatatan', '/anggota', '/keuangan', '/barang', '/stok-opname']],
  ['Lainnya', ['/pengaturan', '/panduan']],
] as const;
function ShellFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    query = useSearchParams();
  const [favoriteText, setFavoriteText] = usePreference('hub-favorites', '/hari-ini|/tugas');
  const [collapsedText, setCollapsedText] = usePreference('hub-nav-collapsed', '');
  const favorites = favoriteText
    .split('|')
    .filter((href) => navigation.some(([url]) => url === href));
  const collapsed = collapsedText.split('|').filter(Boolean);
  const { preference, setTheme } = useTheme();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [menu, setMenu] = useState(false),
    [search, setSearch] = useState(''),
    [error, setError] = useState(''),
    [actionModalOpen, setActionModalOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const receive = (event: Event) => setWorkspace((event as CustomEvent<Workspace | null>).detail);
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        dialog.current?.showModal();
      }
      if (event.key === 'Escape') {
        setMenu(false);
        document.querySelectorAll('details[open]').forEach((el) => el.removeAttribute('open'));
      }
    };
    const clickOutside = (event: MouseEvent) => {
      document.querySelectorAll('details[open]').forEach((el) => {
        if (!el.contains(event.target as Node)) {
          el.removeAttribute('open');
        }
      });
    };
    window.addEventListener('hub-workspace', receive);
    window.addEventListener('keydown', key);
    document.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('hub-workspace', receive);
      window.removeEventListener('keydown', key);
      document.removeEventListener('click', clickOutside);
    };
  }, []);
  const name = String(workspace?.organization?.[0]?.data.manager || 'Manajer');
  const current = navigation.find(([href]) => href === path)?.[1] || 'Beranda';
  return (
    <div className="manager-shell">
      <a className="skip" href="#main">
        Lewati navigasi
      </a>
      <header className="manager-topbar">
        <Link href="/pengaturan" className="manager-profile" aria-label={`Profil ${name}`}>
          <span>{name[0]}</span>
          <div>
            <small>Ruang kerja pribadi</small>
            <strong>{name}</strong>
          </div>
        </Link>
        <div className="manager-location-wrap">
          <span className="manager-location">{current}</span>
          <button
            type="button"
            className="topbar-fav-btn"
            aria-label={
              favorites.includes(path)
                ? 'Hapus halaman ini dari favorit'
                : 'Simpan halaman ini ke favorit'
            }
            title={favorites.includes(path) ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            onClick={() =>
              setFavoriteText(
                (favorites.includes(path)
                  ? favorites.filter((href) => href !== path)
                  : [...favorites, path]
                ).join('|'),
              )
            }
          >
            <Star
              size={15}
              fill={favorites.includes(path) ? '#f59e0b' : 'none'}
              color={favorites.includes(path) ? '#f59e0b' : 'var(--ink-muted)'}
            />
          </button>
        </div>
        <div className="manager-actions">
          <button
            type="button"
            className="quick-action-hub-btn"
            onClick={() => setActionModalOpen(true)}
            title="Tambah data / aksi cepat (Shortcut: 1-9)"
            aria-label="Pusat Aksi Manajer"
          >
            <Plus size={16} />
            <span className="hub-btn-label">Tambah</span>
          </button>
          <button aria-label="Cari halaman" onClick={() => dialog.current?.showModal()}>
            <Search size={19} />
          </button>

          <button
            aria-label="Ganti tema"
            onClick={() => setTheme(preference === 'dark' ? 'light' : 'dark')}
          >
            {preference === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="desktop-lock"
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
            <LockKeyhole size={18} />
          </button>
        </div>
      </header>
      <nav className="tablet-rail" aria-label="Navigasi tablet">
        <Link href="/beranda" aria-label="Beranda" title="Beranda">
          <House size={21} />
        </Link>
        <Link href="/hari-ini" aria-label="Hari Ini" title="Hari Ini">
          <SunMedium size={21} />
        </Link>
        <Link href="/tugas" aria-label="Tugas" title="Tugas">
          <CheckCheck size={21} />
        </Link>
        <Link href="/pencatatan" aria-label="Pencatatan" title="Pencatatan">
          <BookOpen size={21} />
        </Link>
        <button aria-label="Buka semua halaman" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Menu size={21} />
        </button>
      </nav>
      <aside className={`manager-sidebar ${menu ? 'is-open' : ''}`} aria-label="Semua halaman">
        <div className="manager-sidebar-brand">
          <Link href="/beranda" className="sidebar-brand-link" onClick={() => setMenu(false)}>
            <div className="sidebar-brand-emblem">
              <span>KD</span>
            </div>
            <div className="sidebar-brand-info">
              <strong>{String(workspace?.organization?.[0]?.data.title || 'Koperasi')}</strong>
              <small>Ruang Kerja Manajer</small>
            </div>
          </Link>
          <button
            className="close-navigation"
            aria-label="Tutup navigasi"
            onClick={() => setMenu(false)}
          >
            <X size={18} />
          </button>
        </div>

        <button
          type="button"
          className="sidebar-search-trigger"
          onClick={() => {
            setMenu(false);
            dialog.current?.showModal();
          }}
        >
          <Search size={14} />
          <span>Cari cepat...</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="manager-sidebar-nav-scroll">
          {favorites.length > 0 && (
            <section className="manager-sidebar-section sidebar-favorites-group">
              <h2 className="sidebar-section-title">
                <span>Favorit</span>
              </h2>
              <nav className="sidebar-nav-list">
                {favorites.map((href) => {
                  const FavIcon = navIcons[href] || ArrowUpRight;
                  const label = navigation.find(([url]) => url === href)?.[1] || href;
                  const isActive = path === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`sidebar-nav-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => setMenu(false)}
                    >
                      <span className="sidebar-item-icon">
                        <FavIcon size={16} />
                      </span>
                      <span className="sidebar-item-label">{label}</span>
                      <Star
                        size={11}
                        className="sidebar-item-star-badge"
                        fill="#f59e0b"
                        color="#f59e0b"
                      />
                    </Link>
                  );
                })}
              </nav>
            </section>
          )}
          {sections.map(([label, paths]) => (
            <section key={label} className="manager-sidebar-section">
              <h2 className="sidebar-section-title">
                <button
                  className="sidebar-group-toggle"
                  aria-expanded={!collapsed.includes(label)}
                  onClick={() =>
                    setCollapsedText(
                      (collapsed.includes(label)
                        ? collapsed.filter((value) => value !== label)
                        : [...collapsed, label]
                      ).join('|'),
                    )
                  }
                >
                  {label}
                  <ChevronDown size={14} />
                </button>
              </h2>
              <nav className="sidebar-nav-list" hidden={collapsed.includes(label)}>
                {paths.map((href) => {
                  const Icon = navIcons[href] || ArrowUpRight;
                  const isActive = path === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`sidebar-nav-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => setMenu(false)}
                    >
                      <span className="sidebar-item-icon">
                        <Icon size={16} />
                      </span>
                      <span className="sidebar-item-label">
                        {navigation.find(([url]) => url === href)?.[1]}
                      </span>
                      {isActive && <span className="sidebar-item-dot" />}
                    </Link>
                  );
                })}
              </nav>
            </section>
          ))}
          <section className="manager-sidebar-section">
            <div className="sidebar-section-head-row">
              <h2 className="sidebar-section-title">Proyek Saya</h2>
              <Link
                href="/proyek"
                className="sidebar-section-add"
                onClick={() => setMenu(false)}
                title="Buka Proyek"
                aria-label="Buka proyek"
              >
                <Plus size={14} />
              </Link>
            </div>
            {workspace ? (
              <div className="sidebar-projects-list">
                {(workspace.workstreams || [])
                  .filter((p) => p.data.status !== 'diarsipkan')
                  .map((p) => (
                    <Link
                      className="manager-project-link"
                      key={p.id}
                      href={`/proyek?id=${encodeURIComponent(p.id)}`}
                      onClick={() => setMenu(false)}
                    >
                      <span
                        className="project-dot"
                        style={{ backgroundColor: String(p.data.color || 'var(--brand)') }}
                      />
                      <span className="project-title">{String(p.data.title)}</span>
                    </Link>
                  ))}
              </div>
            ) : (
              <small className="sidebar-empty-note">Proyek belum dimuat.</small>
            )}
            {workspace && !workspace.workstreams?.length && (
              <small className="sidebar-empty-note">Belum ada proyek.</small>
            )}
          </section>
        </div>

        <div className="sidebar-footer-card">
          <div className="sidebar-profile-row">
            <span className="sidebar-avatar">{name[0]}</span>
            <div className="sidebar-profile-info">
              <strong>{name}</strong>
              <small>Manajer Koperasi</small>
            </div>
          </div>
        </div>
      </aside>
      {menu && (
        <button className="manager-shade" aria-label="Tutup menu" onClick={() => setMenu(false)} />
      )}
      <main className="manager-main" id="main" tabIndex={-1}>
        {error && (
          <p role="alert" className="notice error">
            {error}
          </p>
        )}
        {children}
      </main>
      <nav className="manager-dock" aria-label="Navigasi cepat">
        <Link
          href="/beranda"
          aria-label="Beranda"
          aria-current={path === '/beranda' ? 'page' : undefined}
        >
          <House size={19} />
          <span>Beranda</span>
        </Link>
        <Link
          href="/tugas"
          aria-label="Tugas"
          aria-current={path === '/tugas' && query.get('view') !== 'kalender' ? 'page' : undefined}
        >
          <CheckCheck size={19} />
          <span>Tugas</span>
        </Link>
        <button
          type="button"
          className="dock-center-action"
          onClick={() => setActionModalOpen(true)}
          aria-label="Aksi Manajer"
        >
          <span className="dock-center-circle">
            <Plus size={22} />
          </span>
          <span>Aksi</span>
        </button>
        <Link
          href="/pencatatan"
          aria-label="Buku Catatan"
          aria-current={path === '/pencatatan' ? 'page' : undefined}
        >
          <BookOpen size={19} />
          <span>Catat</span>
        </Link>
        <button aria-label="Semua halaman" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Menu size={19} />
          <span>Menu</span>
        </button>
      </nav>
      <ManagerActionModal open={actionModalOpen} onClose={() => setActionModalOpen(false)} />
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-labelledby="search-heading"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="section-head">
          <h2 id="search-heading">Cari di ruang kerja</h2>
          <button aria-label="Tutup pencarian" onClick={() => dialog.current?.close()}>
            <X size={18} />
          </button>
        </div>
        <div className="command-quick-actions-bar">
          <button
            type="button"
            className="command-open-hub-btn"
            onClick={() => {
              dialog.current?.close();
              setActionModalOpen(true);
            }}
          >
            <Sparkles size={14} />
            <span>Tambah tugas, rapat, atau catatan</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
        <input
          autoFocus
          aria-label="Cari halaman atau isi catatan"
          type="search"
          placeholder="Cari tugas, anggota, dokumen, atau halaman…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="command-results">
          {search.trim() && workspace && (
            <>
              <small className="search-group-label">Catatan</small>
              {searchWorkspace(workspace, search).map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => {
                    dialog.current?.close();
                    setMenu(false);
                  }}
                >
                  <span>
                    <strong>{result.title}</strong>
                    <small>{result.kind}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
              {!searchWorkspace(workspace, search).length && <p>Tidak ada catatan yang cocok.</p>}
            </>
          )}
          {search.trim() && !workspace && (
            <p>Catatan belum dimuat. Pencarian halaman tetap tersedia.</p>
          )}
          <small className="search-group-label">Halaman</small>
          {navigation
            .filter(([, label]) =>
              label.toLocaleLowerCase('id').includes(search.toLocaleLowerCase('id')),
            )
            .map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  dialog.current?.close();
                  setMenu(false);
                }}
              >
                {label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
        </div>
      </dialog>
    </div>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ShellFrame>{children}</ShellFrame>
    </ThemeProvider>
  );
}
