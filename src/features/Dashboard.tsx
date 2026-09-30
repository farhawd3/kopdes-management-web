import Link from 'next/link';
import {
  ArrowUpRight,
  FolderKanban,
  ListTodo,
  NotebookPen,
  Plus,
  ArrowRight,
  Clock3,
  CheckCheck,
  Flag,
  Sparkles,
} from 'lucide-react';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { planProgress, isOverdue, scopeProgress } from '@/lib/progress';
import { Burnup } from '@/components/charts/Burnup';
import { today, addDays, formatDate } from '@/lib/date';
import { ProgressRing, Meter } from '@/components/charts/Charts';
export function Dashboard({ data }: { data: Workspace }) {
  const tasks = (data['work-items'] || []).map((row) => ({
    ...schemas['work-items'].parse(row.data),
    id: row.id,
  }));
  const now = today(),
    profile = data.organization?.[0]?.data,
    projects = data.workstreams || [];
  const open = tasks.filter((task) => !['selesai', 'dibatalkan'].includes(task.status));
  const late = open.filter((task) => isOverdue(task, now));
  const upcoming = open
    .filter((task) => task.due_date <= addDays(now, 7))
    .sort((a, b) => a.due_date.localeCompare(b.due_date));
  const milestones = (data.milestones || [])
    .filter((row) => !row.data.actual_date)
    .sort((a, b) => String(a.data.due_date).localeCompare(String(b.data.due_date)));
  return (
    <>
      <div className="home-heading">
        <div>
          <span className="eyebrow">BERANDA</span>
          <h1>
            Selamat datang{profile?.manager ? `, ${profile.manager}` : ''}
            <span>.</span>
          </h1>
          <p>Lihat jadwal dan tugas yang perlu ditangani.</p>
        </div>
        <span className="date-chip">{formatDate(now)}</span>
      </div>
      <section className="workspace-banner">
        <div>
          <span className="banner-tag">
            <Sparkles size={14} />
            Ruang kerja Anda
          </span>
          <h2>
            Proyek dan tugas,
            <br />
            dalam satu tempat.
          </h2>
          <p>
            {String(profile?.title || 'Lengkapi profil koperasi di Pengaturan.')}
            <br />
            Lihat jadwal, tugas yang tertunda, dan catatan rapat.
          </p>
          <div className="actions">
            <Link className="primary" href="/proyek">
              <Plus size={16} />
              Kelola proyek
            </Link>
            <Link className="button" href="/roadmap">
              Buka Gantt
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="banner-progress">
          <ProgressRing value={planProgress(tasks)} label="Penyelesaian tugas" />
          <small>
            {tasks.filter((task) => task.status === 'selesai').length} selesai · {open.length}{' '}
            tersisa
          </small>
        </div>
      </section>
      <div className="metrics workspace-metrics">
        {[
          {
            label: 'Proyek',
            value: projects.length,
            detail: 'Proyek yang tercatat',
            href: '/proyek',
            Icon: FolderKanban,
          },
          {
            label: 'Sedang berjalan',
            value: tasks.filter((task) => task.status === 'proses').length,
            detail: 'Tugas dalam proses',
            href: '/tugas?status=proses',
            Icon: ListTodo,
          },
          {
            label: 'Perlu perhatian',
            value: late.length,
            detail: 'Tugas melewati tenggat',
            href: '/tugas?status=terlambat',
            Icon: Clock3,
          },
          {
            label: 'Tugas selesai',
            value: tasks.filter((task) => task.status === 'selesai').length,
            detail: 'Tugas berstatus selesai',
            href: '/tugas?status=selesai',
            Icon: CheckCheck,
          },
        ].map(({ label, value, detail, href, Icon }) => (
          <Link className="card" href={href} key={label}>
            <div className="metric-label">
              <span>{label}</span>
              <Icon size={19} />
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </Link>
        ))}
      </div>
      <section className="home-projects">
        <div className="section-head">
          <div>
            <span className="eyebrow">RUANG PROYEK</span>
            <h2>Lanjutkan pekerjaan Anda</h2>
          </div>
          <Link className="text-link" href="/proyek">
            Semua proyek
            <ArrowRight size={16} />
          </Link>
        </div>
        {projects.length ? (
          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <Link className="project-card" href={`/proyek?id=${project.id}`} key={project.id}>
                <span className="project-symbol">
                  <FolderKanban size={23} />
                </span>
                <h3>{String(project.data.title)}</h3>
                <p>
                  {String(project.data.description || 'Buka tugas, catatan, dan timeline proyek.')}
                </p>
                <Meter
                  value={scopeProgress(tasks.filter((task) => task.workstream_id === project.id))}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="onboarding-card">
            <span className="project-symbol">
              <FolderKanban size={25} />
            </span>
            <div>
              <h3>Belum ada proyek</h3>
              <p>Buat proyek, lalu tambahkan tugas dan jadwalnya.</p>
            </div>
            <Link className="primary" href="/proyek">
              Buat proyek
              <Plus size={16} />
            </Link>
          </div>
        )}
      </section>
      <div className="dashboard-grid">
        <section className="card focus-card">
          <div className="section-head">
            <h2>
              <Clock3 size={19} />
              Tenggat terdekat
            </h2>
            <Link className="text-link" href="/hari-ini">
              Hari ini →
            </Link>
          </div>
          {upcoming.length ? (
            upcoming.slice(0, 6).map((task) => (
              <Link className="attention" href="/tugas" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>{task.assignee || 'Penanggung jawab belum diisi'}</small>
                </div>
                <span className={isOverdue(task, now) ? 'late' : 'badge'}>
                  {formatDate(task.due_date)}
                </span>
              </Link>
            ))
          ) : (
            <div className="empty">
              <CheckCheck size={28} className="empty-icon" />
              <h3>Tidak ada tenggat dekat</h3>
              <p>Belum ada tugas jatuh tempo dalam tujuh hari ke depan.</p>
              <Link className="text-link" href="/tugas?baru=1">
                Tambahkan tugas →
              </Link>
            </div>
          )}
        </section>
        <section className="card">
          <div className="section-head">
            <h2>
              <Flag size={19} />
              Milestone berikutnya
            </h2>
            <Link className="text-link" href="/roadmap">
              Gantt →
            </Link>
          </div>
          {milestones.length ? (
            milestones.slice(0, 5).map((row) => (
              <div className="milestone-item" key={row.id}>
                <span>◇</span>
                <div>
                  <strong>{String(row.data.title)}</strong>
                  <small>{formatDate(String(row.data.due_date))}</small>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">
              <Flag size={28} className="empty-icon" />
              <h3>Tentukan hasil penting</h3>
              <p>Tambahkan milestone pada halaman Gantt untuk memantau target proyek.</p>
            </div>
          )}
        </section>
        <Burnup tasks={data['work-items'] || []} />
        <section className="card notebook-card">
          <NotebookPen size={28} />
          <h2>Jurnal kerja</h2>
          <p>
            Catat hasil kunjungan, pembahasan, dan pekerjaan harian. Simpan tindak lanjut di tugas
            terkait.
          </p>
          <Link className="button" href="/jurnal">
            Buka jurnal
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
