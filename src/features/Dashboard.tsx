'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Plus,
  Calendar,
  CheckCircle2,
  BarChart3,
  Zap,
  Clock,
  ArrowRight,
  FolderKanban,
  Wallet,
  Users,
  Package,
} from 'lucide-react';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { planProgress, isOverdue, scopeProgress } from '@/lib/progress';
import { ProgressRing } from '@/components/charts/Charts';
import { today, addDays, formatDate } from '@/lib/date';
import { cashSummary, rupiah } from './ledger';

export function Dashboard({ data }: { data: Workspace }) {
  const tasks = (data['work-items'] || []).map((row) => ({
    ...schemas['work-items'].parse(row.data),
    id: row.id,
  }));
  const now = today();
  const profile = data.organization?.[0]?.data;
  const projects = data.workstreams || [];
  const openTasks = tasks.filter((t) => !['selesai', 'dibatalkan'].includes(t.status));
  const doneTasks = tasks.filter((t) => t.status === 'selesai');
  const percentDone = planProgress(tasks);

  const cash = cashSummary(data['cash-entries'] || []);
  const members = data.members || [];
  const items = data['inventory-items'] || [];
  const lowStock = items.filter(
    (i) => Number(i.data.book_quantity) <= Number(i.data.minimum_quantity),
  );

  // Month and calendar state for Card 3
  const [activeCalFilter, setActiveCalFilter] = useState<'all' | 'tasks' | 'meetings'>('all');
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(
    new Date(now + 'T12:00:00Z'),
  );

  return (
    <div className="dash-container" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 4 MAIN DASHBOARD CARDS (Matching Reference Design) */}
      <div className="dash-cards-grid">
        {/* CARD 1: Schedule / Mini Timeline Card (Reference Top Left) */}
        <div className="dash-card dash-schedule-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span className="dash-icon-circle">
                <Clock size={16} strokeWidth={2.5} />
              </span>
              <h3 className="dash-card-title">Schedule</h3>
            </div>
            <div className="dash-header-actions">
              <span className="dash-stepper-text">‹ {monthName} ›</span>
              <div className="dash-avatars-stack" style={{ marginLeft: 6 }}>
                <span className="dash-avatar-circle">M</span>
                <span className="dash-avatar-circle" style={{ background: '#d4f933', color: '#111' }}>
                  +2
                </span>
              </div>
              <Link href="/tugas?baru=1" className="dash-pill-btn" style={{ marginLeft: 6 }}>
                <Plus size={14} /> Add
              </Link>
            </div>
          </div>

          <div className="dash-schedule-split">
            {/* Left Sub-Column */}
            <div className="dash-schedule-left">
              <Link href="/tugas" className="dash-stat-bubble" style={{ textDecoration: 'none' }}>
                <div>
                  <small style={{ fontSize: 10.5, color: 'var(--ink-muted)' }}>Upcoming</small>
                  <strong>{openTasks.length} Tasks</strong>
                </div>
                <span className="dash-arrow-circle">
                  <ArrowUpRight size={14} />
                </span>
              </Link>

              <div className="dash-process-pills">
                <span className="dash-status-pill dark">Process</span>
                <span className="dash-status-pill outline">In Review</span>
                <span className="dash-status-pill outline">Completed</span>
              </div>

              <div className="dash-schedule-legend">
                <span>● Done ({doneTasks.length})</span>
                <span>○ In Progress ({openTasks.length})</span>
              </div>
            </div>

            {/* Right Timeline Sub-Column */}
            <div className="dash-timeline-right">
              {/* Day numbers chips */}
              <div className="dash-days-row">
                {Array.from({ length: 9 }).map((_, i) => {
                  const dayDate = addDays(now, i - 1);
                  const isCurrent = dayDate === now;
                  const dayNum = Number(dayDate.slice(8, 10));
                  return (
                    <span
                      key={i}
                      className={`dash-day-chip ${isCurrent ? 'active' : ''}`}
                      title={formatDate(dayDate)}
                    >
                      {dayNum}
                    </span>
                  );
                })}
              </div>

              {/* Task timeline bars */}
              <div className="dash-task-bars-list">
                {openTasks.slice(0, 3).map((task, idx) => (
                  <Link
                    key={task.id}
                    href="/tugas"
                    className={`dash-timeline-bar ${idx === 0 ? 'highlight' : ''}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <span className="bar-avatar">
                      {String(task.assignee || 'M')[0]?.toUpperCase()}
                    </span>
                    <span className="truncate" style={{ maxWidth: 160 }}>
                      {task.title}
                    </span>
                    <span className="bar-percent-pill">
                      {task.status === 'selesai' ? '100%' : idx === 0 ? '60%' : '40%'}
                    </span>
                  </Link>
                ))}
                {openTasks.length === 0 && (
                  <div style={{ padding: '16px 8px', color: 'var(--ink-muted)', fontSize: 12 }}>
                    Tidak ada jadwal mendesak hari ini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Task Completed / Bar Chart Card (Reference Top Right) */}
        <div className="dash-card dash-chart-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span className="dash-icon-circle">
                <BarChart3 size={16} strokeWidth={2.5} />
              </span>
              <h3 className="dash-card-title">Task Completed</h3>
            </div>
            <div className="dash-header-actions">
              <div className="dash-progress-ring-badge" title="Penyelesaian Tugas">
                <ProgressRing value={percentDone} label="Penyelesaian tugas" />
              </div>
              <span className="dash-pill-btn">Yearly ↗</span>
            </div>
          </div>

          {/* Bar Chart Columns */}
          <div className="dash-chart-bars">
            {[
              { month: 'Jan', height: '48%', trend: '+2%', type: 'striped' },
              { month: 'Feb', height: '90%', trend: '+6%', type: 'solid-dark' },
              { month: 'Mar', height: '38%', trend: '-4%', type: 'striped' },
              { month: 'Apr', height: '62%', trend: '+2%', type: 'striped' },
              { month: 'Mei', height: '78%', trend: '+3%', type: 'striped' },
            ].map((col) => (
              <div key={col.month} className="dash-chart-col">
                <span
                  className={`dash-trend-tag ${
                    col.trend.startsWith('+') ? 'positive' : 'negative'
                  }`}
                >
                  {col.trend}
                </span>
                <div
                  className={`dash-bar-track ${col.type}`}
                  style={{ height: col.height }}
                />
                <span className="dash-col-month">{col.month}</span>
              </div>
            ))}
          </div>

          {/* Full-width Download Report Button (Reference Image) */}
          <Link href="/laporan" className="dash-download-btn">
            <span>Download report</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* CARD 3: Calendar Card (Reference Bottom Left) */}
        <div className="dash-card dash-calendar-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span className="dash-icon-circle">
                <Calendar size={16} strokeWidth={2.5} />
              </span>
              <h3 className="dash-card-title">Calendar</h3>
            </div>
            <Link href="/tugas?view=kalender" className="dash-arrow-circle" title="Buka Kalender Penuh">
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="dash-cal-pills">
            {(['all', 'tasks', 'meetings'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`dash-cal-pill-item ${activeCalFilter === mode ? 'active' : ''}`}
                onClick={() => setActiveCalFilter(mode)}
              >
                {mode === 'all' ? 'Yours' : mode === 'tasks' ? 'Tugas' : 'Rapat'}
              </button>
            ))}
            <span className="dash-cal-pill-item">Pengurus</span>
            <span className="dash-cal-pill-item">Gerai</span>
          </div>

          {/* Calendar Days Header */}
          <div className="dash-cal-days-header">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <span key={idx}>{day}</span>
            ))}
          </div>

          {/* Calendar Circular Numbers Matrix */}
          <div className="dash-cal-grid">
            {Array.from({ length: 28 }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === Number(now.slice(8, 10));
              const isLime = [3, 4, 7, 9, 10, 11, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 27, 28].includes(dayNum);
              const isBlack = [5, 6, 8, 12, 14, 18, 21, 26].includes(dayNum);

              return (
                <button
                  key={i}
                  type="button"
                  className={`cal-day-btn ${
                    isToday ? 'dark' : isBlack ? 'dark' : isLime ? 'lime' : 'outline'
                  }`}
                  title={`Tanggal ${dayNum}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'auto' }}>
            <span className="dash-stepper-text">‹ {monthName} ›</span>
          </div>
        </div>

        {/* CARD 4: Projects Horizontal Cards (Reference Bottom Right) */}
        <div className="dash-card dash-projects-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span className="dash-icon-circle">
                <Zap size={16} strokeWidth={2.5} />
              </span>
              <h3 className="dash-card-title">Projects</h3>
            </div>
            <Link href="/proyek" className="dash-pill-btn">
              <Plus size={14} /> Add
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="dash-projects-horizontal">
              {projects.slice(0, 3).map((project) => {
                const projectTasks = tasks.filter((t) => t.workstream_id === project.id);
                const projectProgress = scopeProgress(projectTasks);

                return (
                  <Link
                    key={project.id}
                    href={`/proyek?id=${encodeURIComponent(project.id)}`}
                    className="dash-project-mini"
                  >
                    <h4>{String(project.data.title)}</h4>
                    <p>{String(project.data.description || 'Target operasional gerai & koperasi.')}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <span className="dash-prog-text">{projectProgress}% Complete</span>
                      <div className="dash-striped-bar" style={{ marginTop: 4 }}>
                        <div
                          className="dash-striped-bar-fill"
                          style={{ width: `${projectProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="dash-project-foot">
                      <span className="dash-date-badge">📅 {formatDate(now).slice(0, 6)}</span>
                      <div className="dash-avatars-stack">
                        <span className="dash-avatar-circle">M</span>
                        <span className="dash-avatar-circle" style={{ background: '#d4f933', color: '#111' }}>
                          KD
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 16px',
                textAlign: 'center',
                background: 'var(--canvas)',
                borderRadius: 'var(--radius-lg)',
                margin: 'auto 0',
              }}
            >
              <FolderKanban size={28} style={{ color: 'var(--ink-muted)', marginBottom: 8 }} />
              <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 750 }}>Belum ada proyek</h4>
              <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--ink-muted)' }}>
                Buat proyek pertama Anda untuk mulai mengelola jadwal dan operasional koperasi.
              </p>
              <Link href="/proyek" className="primary" style={{ padding: '8px 20px', fontSize: 12.5 }}>
                <Plus size={15} /> Buat proyek
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* COOPERATIVE OPERATIONAL QUICK PULSE (Khusus Manajer Koperasi) */}
      <div
        className="coop-quick-strip"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          background: 'var(--surface)',
          padding: '18px 22px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Link
          href="/keuangan"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}
        >
          <div className="dash-icon-circle" style={{ background: '#ecfdf5', color: '#059669' }}>
            <Wallet size={18} />
          </div>
          <div>
            <small style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)' }}>SALDO KAS TERCATAT</small>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{rupiah(cash.net)}</div>
          </div>
        </Link>

        <Link
          href="/anggota"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}
        >
          <div className="dash-icon-circle" style={{ background: 'var(--brand-soft)', color: '#111' }}>
            <Users size={18} />
          </div>
          <div>
            <small style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)' }}>ANGGOTA KOPERASI</small>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{members.length} Orang Terdaftar</div>
          </div>
        </Link>

        <Link
          href="/barang"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}
        >
          <div className="dash-icon-circle" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Package size={18} />
          </div>
          <div>
            <small style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)' }}>STOK BARANG GERAI</small>
            <div style={{ fontSize: 15, fontWeight: 800 }}>
              {items.length} Barang {lowStock.length > 0 && `(⚠️ ${lowStock.length} menipis)`}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
