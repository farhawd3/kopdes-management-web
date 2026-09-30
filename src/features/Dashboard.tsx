import Link from 'next/link';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { planProgress, readiness, isOverdue, scopeProgress } from '@/lib/progress';
import { Burnup } from '@/components/charts/Burnup';
import { today, addDays, daysBetween, formatDate } from '@/lib/date';
import { ProgressRing, Meter } from '@/components/charts/Charts';
import { ArrowUpRight, FolderKanban, ListTodo, NotebookPen } from 'lucide-react';
export function Dashboard({ data }: { data: Workspace }) {
  const tasks = (data['work-items'] || []).map((row) => ({
      ...schemas['work-items'].parse(row.data),
      id: row.id,
    })),
    now = today(),
    profile = data.organization?.[0]?.data;
  const late = tasks.filter((row) => isOverdue(row, now)),
    week = tasks.filter(
      (row) =>
        !['selesai', 'dibatalkan'].includes(row.status) &&
        row.due_date >= now &&
        row.due_date <= addDays(now, 7),
    );
  const risks = (data.risks || []).filter(
    (row) =>
      row.data.status !== 'ditutup' && Number(row.data.probability) * Number(row.data.impact) >= 15,
  );
  const next = (data.milestones || [])
    .filter((row) => !row.data.actual_date)
    .sort((a, b) => String(a.data.due_date).localeCompare(String(b.data.due_date)))[0];
  return (
    <>
      <div className="home-heading">
        <div>
          <span className="eyebrow">WORKSPACE MANAJER</span>
          <h1>
            Ruang kerja Anda<span>.</span>
          </h1>
        </div>
        <span className="date-chip">{formatDate(now)}</span>
      </div>
      <section className="hero">
        <div>
          <span className="eyebrow">RENCANAKAN. KERJAKAN. TUMBUH.</span>
          <h2>
            Langkah besar dimulai
            <br />
            dari tugas kecil.
          </h2>
          <p>
            {profile?.manager ? `Selamat bekerja, ${profile.manager}. ` : ''}
            {String(profile?.title || 'Selamat datang di ruang kerja koperasi Anda.')}
            <br />
            Lihat prioritas, jaga koordinasi, tuntaskan satu per satu.
          </p>
          <Link className="primary" href="/hari-ini">
            Lihat pekerjaan hari ini →
          </Link>
        </div>
        <ProgressRing value={planProgress(tasks)} label="Rencana 90 hari" />
      </section>
      <div className="workspace-shortcuts">
        <Link href="/proyek">
          <FolderKanban size={22} />
          <div>
            <strong>Proyek saya</strong>
            <small>Tujuan, catatan & progres</small>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link href="/tugas">
          <ListTodo size={22} />
          <div>
            <strong>Semua tugas</strong>
            <small>Daftar, papan & kalender</small>
          </div>
          <ArrowUpRight size={18} />
        </Link>
        <Link href="/jurnal">
          <NotebookPen size={22} />
          <div>
            <strong>Jurnal kerja</strong>
            <small>Catat hal yang penting</small>
          </div>
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="metrics">
        <Link className="card" href="/tugas?status=terlambat">
          <span>Tugas terlambat</span>
          <strong className="late">{late.length}</strong>
          <small>Perlu ditindaklanjuti</small>
        </Link>
        <Link className="card" href="/hari-ini">
          <span>Jatuh tempo 7 hari</span>
          <strong>{week.length}</strong>
          <small>Rencanakan minggu ini</small>
        </Link>
        <Link className="card" href="/risiko">
          <span>Risiko tinggi terbuka</span>
          <strong>{risks.length}</strong>
          <small>Skor 15 atau lebih</small>
        </Link>
        <Link className="card" href="/roadmap">
          <span>Perjalanan 90 hari</span>
          <strong>
            {profile?.start_date
              ? Math.max(0, daysBetween(String(profile.start_date), now) + 1)
              : '—'}
            <small> / 90</small>
          </strong>
          <small>{next ? `Berikut: ${next.data.title}` : 'Milestone belum ditentukan'}</small>
        </Link>
      </div>
      <div className="dashboard-grid">
        <Burnup tasks={data['work-items'] || []} start={String(profile?.start_date || now)} />
        <section className="card">
          <div className="section-head">
            <h2>Perlu perhatian</h2>
            <Link href="/hari-ini">Lihat semua →</Link>
          </div>
          {!tasks.length ? (
            <div className="empty">
              <h3>Mulai dengan rencana 90 hari</h3>
              <p>Template berisi rencana awal yang dapat Anda sesuaikan.</p>
              <Link href="/pengaturan">Lengkapi profil & gunakan template →</Link>
            </div>
          ) : ![...late, ...week].length ? (
            <p>Tidak ada tugas mendesak. Tinjau roadmap untuk langkah berikutnya.</p>
          ) : (
            [...late, ...week].slice(0, 7).map((row) => (
              <Link className="attention" href="/tugas" key={row.id}>
                <div>
                  <strong>{row.title}</strong>
                  <small>{row.assignee || 'Penanggung jawab belum ditentukan'}</small>
                </div>
                <span className={isOverdue(row, now) ? 'late' : ''}>
                  {formatDate(row.due_date)}
                </span>
              </Link>
            ))
          )}
        </section>
        <section className="card">
          <h2>Kesiapan gerai</h2>
          {!(data.units || []).length ? (
            <p>Gerai belum ditambahkan.</p>
          ) : (
            (data.units || []).map((row) => (
              <div className="readiness-item" key={row.id}>
                <Link href="/gerai">{String(row.data.title)}</Link>
                <Meter
                  value={readiness(
                    (data.checklist || [])
                      .filter((item) => item.data.unit_id === row.id)
                      .map((item) => schemas.checklist.parse(item.data)),
                  )}
                />
              </div>
            ))
          )}
        </section>
        <section className="card">
          <h2>Progres bidang kerja</h2>
          {(data.workstreams || []).map((row) => (
            <div className="readiness-item" key={row.id}>
              <strong>{String(row.data.title)}</strong>
              <Meter value={scopeProgress(tasks.filter((item) => item.workstream_id === row.id))} />
            </div>
          ))}
        </section>
        <section className="card">
          <h2>Distribusi tugas</h2>
          {['rencana', 'proses', 'selesai', 'dibatalkan'].map((status) => (
            <div className="attention" key={status}>
              <span>{status}</span>
              <strong>{tasks.filter((row) => row.status === status).length}</strong>
            </div>
          ))}
          <p>Progres rencana menghitung tugas selesai dari seluruh tugas yang tidak dibatalkan.</p>
        </section>
      </div>
    </>
  );
}
