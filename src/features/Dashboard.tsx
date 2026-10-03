'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  Clock,
  BookOpen,
  Video,
  CheckCircle2,
  CheckSquare,
  SlidersHorizontal,
  Plus,
  Trash2,
  RotateCcw,
  X,
} from 'lucide-react';
import { FollowUps } from './FollowUps';
import { recordHref } from './workspace-navigation';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { planProgress, taskProgress, isOverdue, scopeProgress } from '@/lib/progress';
import { today, addDays, formatDate } from '@/lib/date';
import { cashSummary, rupiah } from './ledger';
import { meetingJoinUrl } from './meeting';
import { formatDisplayCode } from './task-code';
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

  const meetingOnlineUrl = meetingJoinUrl(meeting);

  // Rutinitas harian manajer gerai KDMP Puntukrejo
  const ROUTINE_CONFIG_KEY = 'kdmp_manager_routine_config';
  const ROUTINE_KEY = `kdmp_manager_routine_${now}`;
  const DEFAULT_ROUTINES = [
    { id: 'kas-awal', time: '07:30', title: 'Buka gerai & cek kas modal awal' },
    { id: 'briefing', time: '08:30', title: 'Briefing singkat petugas kasir/toko' },
    { id: 'cek-rak', time: '10:00', title: 'Cek persediaan barang rak & stok menipis' },
    { id: 'rekap-siang', time: '13:00', title: 'Rekapitulasi setoran anggota & kas tengah hari' },
    { id: 'tutup-buku', time: '16:30', title: 'Tutup buku kas harian & hitung fisik uang kasir' },
    { id: 'kunci-toko', time: '17:00', title: 'Cek keamanan, inventaris, dan kunci gerai' },
  ];

  const [routines, setRoutines] = useState(DEFAULT_ROUTINES);
  const [completedRoutines, setCompletedRoutines] = useState<string[]>([]);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [newRoutineTime, setNewRoutineTime] = useState('08:00');
  const [newRoutineTitle, setNewRoutineTitle] = useState('');

  useEffect(() => {
    try {
      const configStored = localStorage.getItem(ROUTINE_CONFIG_KEY);
      if (configStored) {
        const parsed = JSON.parse(configStored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRoutines(parsed);
        }
      }
    } catch {
      // ignore
    }

    try {
      const stored = localStorage.getItem(ROUTINE_KEY);
      if (stored) {
        setCompletedRoutines(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [ROUTINE_KEY]);

  function saveRoutines(items: typeof DEFAULT_ROUTINES) {
    setRoutines(items);
    try {
      localStorage.setItem(ROUTINE_CONFIG_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  function handleAddRoutine(e: React.FormEvent) {
    e.preventDefault();
    if (!newRoutineTitle.trim()) return;
    const newItem = {
      id: `routine-${Date.now()}`,
      time: newRoutineTime.trim() || '08:00',
      title: newRoutineTitle.trim(),
    };
    const updated = [...routines, newItem].sort((a, b) => a.time.localeCompare(b.time));
    saveRoutines(updated);
    setNewRoutineTitle('');
  }

  function handleDeleteRoutine(id: string) {
    const updated = routines.filter((r) => r.id !== id);
    saveRoutines(updated);
  }

  function handleResetRoutines() {
    saveRoutines(DEFAULT_ROUTINES);
  }

  function toggleRoutine(id: string) {
    setCompletedRoutines((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(ROUTINE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

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
  const journalRecent = [...(data.journal || [])]
    .sort((a, b) => String(b.data.date || '').localeCompare(String(a.data.date || '')))
    .slice(0, 5);
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
          <span className="home-eyebrow">Ruang kerja</span>
          <h1>Ringkasan pekerjaan</h1>
        </div>
        <div className="home-heading-actions">
          <Link href="/tugas?baru=1" className="home-action-btn">
            + Buat tugas
          </Link>
          <Link href="/jurnal?baru=1" className="home-action-btn home-action-btn-soft">
            Catat kegiatan
          </Link>
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
        {/* ── Left Column: Task Focus & Daily Routine ───────── */}
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
            {meetingOnlineUrl ? (
              <a
                href={meetingOnlineUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-join-meeting-direct"
                onClick={(e) => e.stopPropagation()}
                title="Buka ruang rapat daring langsung"
              >
                <Video size={14} />
                <span>Gabung ↗</span>
              </a>
            ) : (
              <span className="round-arrow">
                <ArrowRight size={22} />
              </span>
            )}
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

        {/* ── Right Column: Daily Routine, Journal & Projects ─────────────── */}
        <aside className="home-overview">
          {/* Rutinitas Kerja Manajer (Sisi Kanan) */}
          <div className="home-routine-card">
            <div className="routine-head">
              <div className="routine-title-wrap">
                <Clock size={16} className="routine-icon" />
                <div>
                  <h3>Rutinitas Manajer</h3>
                  <small>Checklist operasional harian gerai</small>
                </div>
              </div>
              <div className="routine-head-actions">
                <button
                  type="button"
                  className="btn-routine-config"
                  onClick={() => setShowRoutineModal(true)}
                  title="Atur checklist rutinitas harian"
                  aria-label="Atur rutinitas"
                >
                  <SlidersHorizontal size={12} />
                  <span>Atur</span>
                </button>
                <span className="routine-progress-pill">
                  {completedRoutines.length}/{routines.length} selesai
                </span>
              </div>
            </div>
            <div className="routine-list">
              {routines.map((item) => {
                const isChecked = completedRoutines.includes(item.id);
                return (
                  <label key={item.id} className={`routine-item ${isChecked ? 'is-done' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRoutine(item.id)}
                    />
                    <span className="routine-time">{item.time}</span>
                    <span className="routine-text">{item.title}</span>
                  </label>
                );
              })}
              {routines.length === 0 && (
                <p className="routine-empty-text">
                  Belum ada rutinitas. Klik tombol <strong>Atur</strong> untuk menambahkan rutinitas harian gerai.
                </p>
              )}
            </div>
          </div>

          {/* Kegiatan Terbaru: Kronologi kejadian lapangan */}
          <section className="home-journal" aria-label="Kegiatan terbaru">
            <div className="section-head">
              <div className="journal-head-title">
                <BookOpen size={18} />
                <h2>Kegiatan terbaru</h2>
              </div>
              <Link href="/jurnal" className="journal-view-all">
                Semua kegiatan <ArrowUpRight size={14} />
              </Link>
            </div>
            {journalRecent.length === 0 ? (
              <div className="home-empty">
                <p>Belum ada kegiatan dicatat. Catat kunjungan, koordinasi, atau hasil lapangan.</p>
                <Link href="/jurnal?baru=1">+ Catat kegiatan</Link>
              </div>
            ) : (
              <ul className="journal-recent-list">
                {journalRecent.map((row) => {
                  const linkedMeeting = (data.meetings || []).find(
                    (m) => m.id === row.data.meeting_id,
                  );
                  const joinUrl = meetingJoinUrl(linkedMeeting);
                  const stakeholder = (data.stakeholders || []).find(
                    (s) => s.id === row.data.stakeholder_id,
                  );
                  const unit = (data.units || []).find((u) => u.id === row.data.unit_id);
                  return (
                    <li key={row.id} className="journal-recent-card">
                      <div className="journal-recent-top">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span className="task-code-tag">
                            {formatDisplayCode(
                              row.data.code ? String(row.data.code) : undefined,
                              'journal',
                              row.id,
                            )}
                          </span>
                          <time>{formatDate(String(row.data.date || ''))}</time>
                        </div>
                        {joinUrl && (
                          <a
                            href={joinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="journal-join-chip"
                            title="Gabung rapat daring"
                          >
                            <Video size={11} />
                            <span>Gabung rapat ↗</span>
                          </a>
                        )}
                      </div>
                      <Link href={recordHref('journal', row)} className="journal-card-link">
                        <strong>{String(row.data.title || '')}</strong>
                        {Boolean(row.data.notes) && (
                          <p>{String(row.data.notes).slice(0, 100)}</p>
                        )}
                      </Link>
                      <div className="journal-card-tags">
                        {unit && <span className="j-tag j-unit">{String(unit.data.title)}</span>}
                        {stakeholder && (
                          <span className="j-tag j-stakeholder">
                            {String(stakeholder.data.title)}
                          </span>
                        )}
                        {linkedMeeting && (
                          <span className="j-tag j-meeting">
                            {String(linkedMeeting.data.title)}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
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

      {/* ── Compact Analytics Row (Side by Side) ──────────── */}
      <div className="dash-analytics-row">
        <section className="home-panel analytics-panel">
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

        <section className="home-panel analytics-panel">
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
      </div>

      {/* ── Records Section ───────────────────────────────── */}
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

      {/* ── Modal Atur Rutinitas Manajer ─────────────────── */}
      {showRoutineModal && (
        <div className="sprint-modal-backdrop" onClick={() => setShowRoutineModal(false)}>
          <div
            className="sprint-modal-card routine-config-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="routine-config-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sprint-modal-head">
              <div className="title-with-badge">
                <div className="sprint-icon-pill">
                  <Clock size={20} />
                </div>
                <div>
                  <h2 id="routine-config-title">Atur Rutinitas Harian</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--ink-muted)' }}>
                    Checklist operasional manajer gerai KDMP Puntukrejo
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowRoutineModal(false)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="routine-config-body">
              <form onSubmit={handleAddRoutine} className="routine-add-form">
                <div className="routine-add-inputs">
                  <input
                    type="time"
                    value={newRoutineTime}
                    onChange={(e) => setNewRoutineTime(e.target.value)}
                    className="routine-time-input"
                    title="Waktu rutinitas"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Tambah rutinitas baru (misal: Cek suhu showcase)..."
                    value={newRoutineTitle}
                    onChange={(e) => setNewRoutineTitle(e.target.value)}
                    className="routine-title-input"
                    maxLength={120}
                    required
                  />
                </div>
                <button type="submit" className="btn-add-routine">
                  <Plus size={15} />
                  <span>Tambah</span>
                </button>
              </form>

              <div className="routine-config-list">
                {routines.map((item) => (
                  <div key={item.id} className="routine-config-item">
                    <span className="routine-time-badge">{item.time}</span>
                    <span className="routine-config-title">{item.title}</span>
                    <button
                      type="button"
                      className="btn-delete-routine"
                      onClick={() => handleDeleteRoutine(item.id)}
                      title="Hapus rutinitas ini"
                      aria-label={`Hapus ${item.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
                {routines.length === 0 && (
                  <p className="routine-empty-hint">Belum ada rutinitas yang diatur.</p>
                )}
              </div>
            </div>

            <div className="routine-modal-footer">
              <button
                type="button"
                className="btn-reset-routine"
                onClick={handleResetRoutines}
                title="Kembalikan ke rutinitas standar KDMP"
              >
                <RotateCcw size={13} />
                <span>Kembalikan Bawaan</span>
              </button>
              <button
                type="button"
                className="btn-primary-finish"
                onClick={() => setShowRoutineModal(false)}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
