'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  ArrowRight,
  Wallet,
  Users,
  Package,
  ClipboardCheck,
  FolderKanban,
  AlertTriangle,
  ListTodo,
  Calendar,
} from 'lucide-react';
import { FollowUps } from './FollowUps';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { planProgress, taskProgress, isOverdue, scopeProgress } from '@/lib/progress';
import { today, addDays, formatDate } from '@/lib/date';
import { cashSummary, rupiah } from './ledger';
import {
  WeekBarChart,
  TaskDonutChart,
  StatCard,
  ProjectProgressBar,
} from '@/components/charts/DashboardCharts';
import { Select } from '@/components/ui/Select';

export function Dashboard({ data }: { data: Workspace }) {
  const now = today();
  const [projectId, setProjectId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const allTasks = (data['work-items'] || []).map((row) => ({
    ...schemas['work-items'].parse(row.data),
    id: row.id,
  }));
  const tasks = allTasks.filter((task) => !projectId || task.workstream_id === projectId);
  const [filter, setFilter] = useState('aktif');
  const open = tasks.filter((t) => !['selesai', 'dibatalkan'].includes(t.status));
  const visible = tasks
    .filter((t) =>
      ['selesai', 'rencana', 'proses', 'dibatalkan'].includes(filter)
        ? t.status === filter
        : filter === 'terlambat'
          ? isOverdue(t, now)
          : !['selesai', 'dibatalkan'].includes(t.status),
    )
    .filter((t) => !selectedDate || (t.status === 'selesai' && t.completed_at === selectedDate))
    .sort((a, b) => a.due_date.localeCompare(b.due_date));

  const projects = data.workstreams || [];
  const meeting = (data.meetings || [])
    .filter(
      (m) =>
        String(m.data.date) >= now && m.data.status !== 'selesai' && m.data.status !== 'dibatalkan',
    )
    .sort((a, b) =>
      `${a.data.date}${a.data.time}`.localeCompare(`${b.data.date}${b.data.time}`),
    )[0];

  // Bar chart: 7-day completion
  const week = Array.from({ length: 7 }, (_, i) => addDays(now, i - 6));
  const doneCounts = week.map(
    (date) => tasks.filter((t) => t.status === 'selesai' && t.completed_at === date).length,
  );
  const barData = week.map((date, i) => ({
    label: new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(
      new Date(date + 'T12:00:00Z'),
    ),
    dateLabel: formatDate(date),
    date,
    value: doneCounts[i],
    isToday: date === now,
  }));

  // Donut chart: task status breakdown
  const totalTasks = tasks.length;
  const donutSlices = [
    {
      label: 'Selesai',
      value: tasks.filter((t) => t.status === 'selesai').length,
      color: 'var(--success)',
      cls: 'dot-done',
    },
    {
      label: 'Dikerjakan',
      value: tasks.filter((t) => t.status === 'proses').length,
      color: 'var(--brand)',
      cls: 'dot-active',
    },
    {
      label: 'Rencana',
      value: tasks.filter((t) => t.status === 'rencana').length,
      color: 'var(--lavender, #a899ea)',
      cls: 'dot-plan',
    },
    {
      label: 'Dibatalkan',
      value: tasks.filter((t) => t.status === 'dibatalkan').length,
      color: 'var(--danger)',
      cls: 'dot-late',
    },
  ];

  const cash = cashSummary(data['cash-entries'] || []);
  const inventory = data['inventory-items'] || [];
  const criticalStockItems = inventory.filter(
    (item) => Number(item.data.book_quantity || 0) <= Number(item.data.minimum_quantity || 0),
  );
  const outOfStockItems = inventory.filter((item) => Number(item.data.book_quantity || 0) <= 0);
  const completedCount = tasks.filter((t) => t.status === 'selesai').length;
  const overdueCount = tasks.filter((t) => isOverdue(t, now)).length;
  const todayMeetingCount = (data.meetings || []).filter((m) => String(m.data.date) === now).length;
  const completion = planProgress(tasks);

  return (
    <div className="manager-home">
      <header className="home-heading">
        <div>
          <span className="home-eyebrow">Ruang Kerja Manajer</span>
          <h1>Pekerjaan saya</h1>
        </div>
        <div className="home-heading-actions">
          <span className="home-date-chip">
            <CalendarDays size={14} />
            <span>{formatDate(now)}</span>
          </span>
        </div>
      </header>

      {/* ── Critical Stock Alert Banner ───────────────────────── */}
      {criticalStockItems.length > 0 && (
        <div className="stock-alert-banner">
          <div className="alert-content">
            <AlertTriangle size={18} className="text-warning" />
            <div>
              <strong>
                Peringatan Persediaan: {criticalStockItems.length} jenis barang menipis/habis
              </strong>
              <small>
                {outOfStockItems.length > 0
                  ? `${outOfStockItems.length} produk habis dan ${criticalStockItems.length - outOfStockItems.length} mendekati batas minimum gerai toko.`
                  : `${criticalStockItems.length} jenis barang berada di bawah batas stok minimum gerai.`}
              </small>
            </div>
          </div>
          <Link href="/barang" className="alert-action-link">
            Kelola Stok ↗
          </Link>
        </div>
      )}

      {/* ── Prioritas Utama: Perlu Perhatian (Follow-ups) ────── */}
      <FollowUps data={data} compact />

      <div className="dashboard-controls">
        <label>
          <span>Proyek</span>
          <Select
            value={projectId}
            onChange={(value) => {
              setProjectId(value);
              setSelectedDate('');
            }}
            options={[
              { value: '', label: 'Semua Proyek' },
              ...projects.map((project) => ({
                value: project.id,
                label: String(project.data.title),
              })),
            ]}
            ariaLabel="Proyek"
          />
        </label>
        <p>
          Grafik tugas mengikuti proyek pilihan. Klik status atau tanggal untuk melihat tugasnya.
        </p>
      </div>

      {/* ── Stat Cards Row ───────────────────────────────── */}
      <div className="dash-stats-row">
        <StatCard
          label="Tugas yang dimuat"
          value={`${completion}%`}
          percentage={completion}
          sub={`${completedCount} dari ${totalTasks} selesai · aktif/terbaru`}
          accent
          href="/tugas?status=selesai"
        />
        <StatCard
          label="Tugas aktif"
          value={open.length}
          sub="dari catatan yang dimuat"
          icon={<ListTodo size={18} />}
          href="/tugas"
        />
        <StatCard
          label="Terlambat"
          value={overdueCount}
          sub={overdueCount > 0 ? 'perlu diperhatikan' : 'tidak ada pada catatan yang dimuat'}
          icon={<AlertTriangle size={18} />}
          href="/tugas?status=terlambat"
        />
        <StatCard
          label="Rapat hari ini"
          value={todayMeetingCount}
          sub={meeting ? String(meeting.data.title) : 'tidak ada pada catatan yang dimuat'}
          icon={<Calendar size={18} />}
          href="/rapat"
        />
      </div>
      <div className="home-grid">
        {/* ── Left: Task Focus ─────────────────────────── */}
        <section className="home-work" aria-label="Tugas pilihan">
          <Link href="/rapat" className="next-meeting">
            <CalendarDays size={28} />
            <div>
              <small>{meeting ? 'Rapat berikutnya' : 'Agenda rapat'}</small>
              <strong>{meeting ? String(meeting.data.title) : 'Belum ada jadwal rapat'}</strong>
              {meeting && (
                <span>
                  {formatDate(String(meeting.data.date))} ·{' '}
                  {String(meeting.data.time || 'Waktu belum diisi')} ·{' '}
                  {String(meeting.data.mode || 'tatap muka')}
                </span>
              )}
            </div>
            <span className="round-arrow">
              <ArrowRight size={22} />
            </span>
          </Link>
          <div className="focus-filters" aria-label="Filter pekerjaan">
            {[
              ['aktif', 'Aktif', open.length],
              ['terlambat', 'Terlambat', tasks.filter((t) => isOverdue(t, now)).length],
              ['selesai', 'Selesai', tasks.filter((t) => t.status === 'selesai').length],
            ].map(([value, label, count]) => (
              <button
                key={String(value)}
                aria-pressed={filter === value}
                onClick={() => {
                  setFilter(String(value));
                  setSelectedDate('');
                }}
              >
                {label}
                <span>{count}</span>
              </button>
            ))}
          </div>
          {(selectedDate || ['rencana', 'proses', 'dibatalkan'].includes(filter)) && (
            <div className="dashboard-selection" role="status">
              <span>
                {selectedDate ? 'Selesai pada ' + formatDate(selectedDate) : 'Status: ' + filter}
              </span>
              <button
                onClick={() => {
                  setSelectedDate('');
                  setFilter('aktif');
                }}
              >
                Hapus pilihan
              </button>
            </div>
          )}
          <div className="focus-task-list">
            {visible.slice(0, 6).map((task, i) => (
              <Link
                href={`/tugas?task=${encodeURIComponent(task.id)}`}
                key={task.id}
                className={`focus-task tone-${i % 3}`}
              >
                <div className="focus-task-top">
                  <span>
                    {task.status === 'proses'
                      ? 'Sedang dikerjakan'
                      : task.status === 'selesai'
                        ? 'Selesai'
                        : task.status === 'dibatalkan'
                          ? 'Dibatalkan'
                          : 'Rencana'}
                  </span>
                  <span className="focus-open">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <h2>{task.title}</h2>
                <div className="focus-task-meta">
                  <span>
                    <CalendarDays size={14} />
                    {formatDate(task.due_date)}
                  </span>
                  <span className={`focus-priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                {task.subtasks.length > 0 && (
                  <div className="focus-progress">
                    <span style={{ width: `${taskProgress(task)}%` }} />
                    <small>
                      {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length} subtugas
                    </small>
                  </div>
                )}
              </Link>
            ))}
            {!visible.length && (
              <div className="home-empty">
                <CalendarDays size={26} />
                <h2>
                  {filter === 'selesai' ? 'Belum ada tugas selesai' : 'Tidak ada tugas di sini'}
                </h2>
                <p>
                  {filter === 'terlambat'
                    ? 'Tidak ada tenggat yang terlewat.'
                    : 'Tambahkan tugas dan pilih tanggal pengerjaannya.'}
                </p>
                <Link href="/tugas?baru=1">+ Tambah tugas</Link>
              </div>
            )}
          </div>
          <Link className="home-text-link" href="/tugas">
            Semua tugas <ArrowUpRight size={16} />
          </Link>
        </section>

        {/* ── Right: Charts & Projects ─────────────────── */}
        <aside className="home-overview">
          {/* Bar Chart: 7-day completions */}
          <section className="home-panel">
            <div className="section-head">
              <h2>Penyelesaian 7 hari</h2>
            </div>
            <WeekBarChart
              data={barData}
              selectedDate={selectedDate}
              onSelect={(date) => {
                setSelectedDate(selectedDate === date ? '' : date);
                setFilter('selesai');
              }}
            />
            <Link className="home-text-link" href="/laporan">
              Buka laporan <ArrowUpRight size={16} />
            </Link>
          </section>

          {/* Donut: task status */}
          <section className="home-panel">
            <div className="section-head">
              <h2>Distribusi status tugas</h2>
            </div>
            <TaskDonutChart
              slices={donutSlices}
              total={totalTasks}
              selected={filter}
              onSelect={(status) => {
                setFilter(status);
                setSelectedDate('');
              }}
            />
          </section>

          {/* Projects with progress bars */}
          <section className="home-panel">
            <div className="section-head">
              <h2>Proyek saya</h2>
              <Link href="/proyek" aria-label="Kelola proyek">
                <FolderKanban size={20} />
              </Link>
            </div>
            {projects.length ? (
              <div className="dash-proj-list">
                {projects
                  .filter(
                    (p) => p.data.status !== 'diarsipkan' && (!projectId || p.id === projectId),
                  )
                  .slice(0, 5)
                  .map((p, i) => (
                    <ProjectProgressBar
                      key={p.id}
                      label={String(p.data.title)}
                      pct={scopeProgress(tasks.filter((t) => t.workstream_id === p.id))}
                      href={`/proyek?id=${encodeURIComponent(p.id)}`}
                      index={i}
                    />
                  ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Belum ada proyek</p>
            )}
          </section>
        </aside>
      </div>

      {/* ── Records Section ───────────────────────────── */}
      <section className="home-records">
        <div className="section-head">
          <h2>Catatan koperasi</h2>
          <Link href="/pencatatan">
            Buka buku <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="home-record-links">
          <Link href="/anggota">
            <Users />
            <small>Anggota</small>
            <strong>{data.members ? data.members.length : 'Belum aktif'}</strong>
          </Link>
          <Link href="/keuangan">
            <Wallet />
            <small>Selisih kas tercatat</small>
            <strong>{data['cash-entries'] ? rupiah(cash.net) : 'Belum aktif'}</strong>
          </Link>
          <Link href="/barang">
            <Package />
            <small>Jenis barang</small>
            <strong>
              {data['inventory-items'] ? data['inventory-items'].length : 'Belum aktif'}
            </strong>
          </Link>
          <Link href="/stok-opname">
            <ClipboardCheck />
            <small>Stok opname</small>
            <strong>{data['stock-counts'] ? data['stock-counts'].length : 'Belum aktif'}</strong>
          </Link>
        </div>
      </section>
    </div>
  );
}
