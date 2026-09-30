'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';
import { api, resetAuthNavigation } from '@/lib/client';
import type { Workspace } from '@/features/useWorkspace';
import {
  Sparkles,
  Search,
  Sun,
  Moon,
  Paperclip,
  FolderKanban,
  FileText,
  PhoneCall,
  HelpCircle,
  Plus,
  ArrowUpRight,
  LogOut,
  X,
  Command,
} from 'lucide-react';

const TOP_NAV_LINKS = [
  { name: 'Dashboard', path: '/beranda' },
  { name: 'Tasks', path: '/tugas' },
  { name: 'Pencatatan', path: '/pencatatan' },
  { name: 'Projects', path: '/proyek' },
  { name: 'Settings', path: '/pengaturan' },
];

function ShellFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { preference, setTheme } = useTheme();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [projectSearch, setProjectSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const receive = (event: Event) =>
      setWorkspace((event as CustomEvent<Workspace | null>).detail);
    window.addEventListener('hub-workspace', receive);
    return () => window.removeEventListener('hub-workspace', receive);
  }, []);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchDialog.current?.showModal();
      }
      if (event.key === 'Escape') searchDialog.current?.close();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const managerName = String(
    workspace?.organization?.[0]?.data?.manager || 'Nicki',
  );

  const projects = (workspace?.workstreams || []).filter(
    (item) =>
      item.data.status !== 'diarsipkan' &&
      String(item.data.title)
        .toLocaleLowerCase('id')
        .includes(projectSearch.toLocaleLowerCase('id')),
  );

  return (
    <div className="hub-outer-shell">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="hub-topbar" role="banner">
        {/* Brand Pill (Reference Image top left) */}
        <Link href="/beranda" className="hub-brand-pill" aria-label="Task Hub Kopdes">
          <span className="hub-brand-icon">
            <Sparkles size={13} strokeWidth={3} />
          </span>
          <span>Task Hub</span>
        </Link>

        {/* Center Navigation Pills (Reference Image top center) */}
        <nav className="hub-nav-pills" aria-label="Navigasi Utama">
          {TOP_NAV_LINKS.map((link) => {
            const isActive =
              link.path === '/beranda'
                ? path === '/beranda' || path === '/'
                : path.startsWith(link.path);

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`hub-nav-pill ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Circle Buttons (Reference Image top right) */}
        <div className="hub-topbar-actions">
          <button
            type="button"
            className="hub-circle-btn"
            onClick={() => searchDialog.current?.showModal()}
            title="Cari (⌘K)"
            aria-label="Cari fitur atau data"
          >
            <Search size={17} />
          </button>

          <button
            type="button"
            className="hub-circle-btn"
            onClick={() => setTheme(preference === 'dark' ? 'light' : 'dark')}
            title="Ganti Tema"
            aria-label="Ganti Tema"
          >
            {preference === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="hub-circle-btn"
            onClick={async () => {
              if (!confirm('Kunci aplikasi dan keluar dari sesi manajer?')) return;
              try {
                await api('auth/pin', {}, 'DELETE');
              } finally {
                resetAuthNavigation('/pin');
              }
            }}
            title="Kunci & Keluar"
            aria-label="Kunci sesi manajer"
          >
            <LogOut size={16} />
          </button>

          {/* Profile Circle with Manager Initials */}
          <Link href="/pengaturan" className="hub-user-avatar" title={`Manajer: ${managerName}`}>
            {managerName[0]?.toUpperCase() || 'M'}
          </Link>
        </div>
      </header>

      {/* 2. MAIN TWO-COLUMN CONTAINER */}
      <div className="hub-main-container">
        {/* Left Sidebar */}
        <aside className="hub-sidebar" aria-label="Navigasi Sisi Kiri">
          {/* Manager Greeting */}
          <div className="hub-greeting">
            <h2>
              Welcome
              <br />
              Back, {managerName}!
            </h2>
          </div>

          {/* Projects Section (Reference Image: Projects with paperclip icons) */}
          <div className="hub-sidebar-section">
            <span className="hub-section-label">Projects</span>
            <div className="hub-sidebar-list">
              {projects.length > 0 ? (
                projects.slice(0, 5).map((project) => {
                  const isCurrent = path.includes(project.id);
                  const taskCount = (workspace?.['work-items'] || []).filter(
                    (t) =>
                      t.data.workstream_id === project.id &&
                      !['selesai', 'dibatalkan'].includes(String(t.data.status)),
                  ).length;

                  return (
                    <Link
                      key={project.id}
                      href={`/proyek?id=${encodeURIComponent(project.id)}`}
                      className={`hub-sidebar-item ${isCurrent ? 'active' : ''}`}
                    >
                      <span className="hub-item-icon">
                        <Paperclip size={15} />
                      </span>
                      <span className="truncate">{String(project.data.title)}</span>
                      {taskCount > 0 && (
                        <span className="hub-count-pill">
                          {taskCount.toString().padStart(2, '0')}
                        </span>
                      )}
                    </Link>
                  );
                })
              ) : (
                <Link href="/proyek" className="hub-sidebar-item">
                  <span className="hub-item-icon">
                    <Plus size={15} />
                  </span>
                  <span>Tambah Proyek</span>
                </Link>
              )}
            </div>
          </div>

          {/* Reports Section (Reference Image) */}
          <div className="hub-sidebar-section">
            <span className="hub-section-label">Reports</span>
            <div className="hub-sidebar-list">
              <Link
                href="/laporan"
                className={`hub-sidebar-item ${path === '/laporan' ? 'active' : ''}`}
              >
                <span className="hub-item-icon">
                  <FileText size={15} />
                </span>
                <span>Project Reports</span>
              </Link>
            </div>
          </div>

          {/* Other Section (Reference Image: Contact us & Help and Support) */}
          <div className="hub-sidebar-section">
            <span className="hub-section-label">Other</span>
            <div className="hub-sidebar-list">
              <Link
                href="/pemangku"
                className={`hub-sidebar-item ${path === '/pemangku' ? 'active' : ''}`}
              >
                <span className="hub-item-icon">
                  <PhoneCall size={15} />
                </span>
                <span>Contact us</span>
              </Link>
              <Link
                href="/panduan"
                className={`hub-sidebar-item ${path === '/panduan' ? 'active' : ''}`}
              >
                <span className="hub-item-icon">
                  <HelpCircle size={15} />
                </span>
                <span>Help and Support</span>
              </Link>
            </div>
          </div>

          {/* Bottom Card (Reference Image bottom left with lime gradient) */}
          <div className="hub-coop-card">
            <span className="hub-brand-icon" style={{ width: 28, height: 28, fontSize: 13 }}>
              KD
            </span>
            <div>
              <h4>KDMP Puntukrejo</h4>
              <p>Ruang Kerja Pribadi Manajer Koperasi Desa Merdeka.</p>
            </div>
            <Link href="/pencatatan" className="hub-coop-pill-btn">
              <span>Operasional Aktif</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>

        {/* Right Main Content Canvas */}
        <main className="hub-canvas-area" id="main">
          {children}
        </main>
      </div>

      {/* Quick Search Dialog (⌘K) */}
      <dialog ref={searchDialog} className="modal-dialog-box" style={{ maxWidth: 520, borderRadius: 24, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 750 }}>Cari Cepat (⌘K)</h3>
          <button
            type="button"
            onClick={() => searchDialog.current?.close()}
            style={{ background: 'none', border: 0, cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--canvas)', borderRadius: 9999 }}>
          <Search size={16} />
          <input
            type="search"
            placeholder="Ketik tujuan: tugas, kas, anggota, proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 0, background: 'transparent', outline: 'none', width: '100%', fontSize: 13 }}
            autoFocus
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
          {[
            ['/beranda', 'Dashboard', 'Ringkasan operasional dan jadwal'],
            ['/tugas', 'Tugas & Jadwal', 'Daftar, papan scrum, dan harian'],
            ['/pencatatan', 'Pencatatan Koperasi', 'Buku kas, anggota, barang, opname'],
            ['/proyek', 'Proyek & Bidang Kerja', 'Tujuan dan target kerja koperasi'],
            ['/laporan', 'Laporan Kinerja', 'Rekap mingguan & bulanan manajer'],
          ]
            .filter(([, title, desc]) =>
              `${title} ${desc}`.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map(([link, title, desc]) => (
              <Link
                key={link}
                href={link}
                onClick={() => searchDialog.current?.close()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px 14px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                }}
              >
                <strong style={{ fontSize: 13.5 }}>{title}</strong>
                <small style={{ color: 'var(--ink-muted)', fontSize: 11.5 }}>{desc}</small>
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
