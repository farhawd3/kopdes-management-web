'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/* ─── WeekBarChart ─────────────────────────────────────────── */
interface BarData {
  label: string;
  value: number;
  isToday?: boolean;
  dateLabel?: string;
  date?: string;
}

export function WeekBarChart({
  data,
  selectedDate,
  onSelect,
}: {
  data: BarData[];
  selectedDate?: string;
  onSelect?: (date: string) => void;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((sum, day) => sum + day.value, 0);
  const avgPerDay = (total / 7).toFixed(1);
  const peakDay = [...data].sort((a, b) => b.value - a.value)[0];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const activeDay = data.find((d) => d.date === selectedDate);

  return (
    <div className="dash-chart-wrap week-barchart-modern">
      <div className="week-barchart-header">
        <div className="week-barchart-metric">
          <div className="week-metric-main">
            <span className="week-metric-num">{total}</span>
            <div className="week-metric-text-group">
              <span className="week-metric-title">Tugas Tuntas</span>
              <small className="week-metric-sub">7 hari terakhir</small>
            </div>
          </div>
          <div className="week-metric-pills">
            <span className="week-metric-pill" title="Rata-rata penyelesaian per hari">
              ⌀ {avgPerDay}/hari
            </span>
            {total > 0 && peakDay && peakDay.value > 0 && (
              <span className="week-metric-pill peak-pill" title={`Tertinggi: ${peakDay.label} (${peakDay.value} tugas)`}>
                Puncak: {peakDay.label} ({peakDay.value})
              </span>
            )}
          </div>
        </div>
        {selectedDate && (
          <button
            type="button"
            className="week-filter-reset-chip"
            onClick={() => onSelect?.('')}
            title="Klik untuk tampilkan semua tugas"
          >
            <span>{activeDay?.dateLabel || selectedDate}</span>
            <span className="reset-x">✕</span>
          </button>
        )}
      </div>

      <div
        className="dash-bar-chart"
        role="group"
        aria-label={data.map((d) => `${d.dateLabel || d.label}: ${d.value} selesai`).join(', ')}
      >
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          const isSelected = !!d.date && selectedDate === d.date;
          const dayNum = d.date ? Number(d.date.slice(-2)) : '';

          return (
            <button
              type="button"
              aria-pressed={isSelected}
              aria-label={(d.dateLabel || d.label) + ': ' + d.value + ' selesai'}
              onClick={() => {
                if (d.date) {
                  onSelect?.(selectedDate === d.date ? '' : d.date);
                }
              }}
              key={d.date || d.label}
              className={`dash-bar-col${d.isToday ? ' bar-today' : ''}${isSelected ? ' is-selected-bar' : ''}`}
              title={`${d.dateLabel || d.label}: ${d.value} tugas selesai (klik untuk filter)`}
            >
              <span className={`dash-bar-count ${d.value > 0 ? 'has-value' : 'zero-value'}`}>
                {d.value > 0 ? d.value : '0'}
              </span>
              <div className="dash-bar-track">
                <div
                  className="dash-bar-fill"
                  style={{
                    height: mounted ? `${Math.max(pct, d.value > 0 ? 14 : 4)}%` : '4%',
                    transitionDelay: `${i * 35}ms`,
                  }}
                />
              </div>
              <div className="dash-bar-labels-wrap">
                <span className="dash-bar-label">{d.label}</span>
                {dayNum && <span className="dash-bar-daynum">{dayNum}</span>}
              </div>
              {d.isToday && <span className="today-badge-dot" title="Hari ini" />}
            </button>
          );
        })}
      </div>
      <div className="week-barchart-footer">
        <p className="dash-chart-caption">
          {selectedDate
            ? `Menampilkan tugas tuntas pada ${activeDay?.dateLabel || selectedDate}. Klik lagi untuk melepas filter.`
            : total === 0
              ? 'Belum ada tugas diselesaikan dalam 7 hari terakhir. Tuntaskan tugas dari daftar untuk melihat tren.'
              : `${total} tugas diselesaikan manajer dalam 7 hari terakhir dengan ritme kerja teratur.`}
        </p>
      </div>
    </div>
  );
}

/* ─── TaskDonutChart ──────────────────────────────────────── */
interface DonutSlice {
  label: string;
  value: number;
  color: string;
  cls: string;
}

export function TaskDonutChart({
  slices,
  total,
  selected,
  onSelect,
}: {
  slices: DonutSlice[];
  total: number;
  selected?: string;
  onSelect?: (status: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const R = 44;
  const C = 2 * Math.PI * R;

  const paths = slices.map((slice, index) => {
    const fraction = total > 0 ? slice.value / total : 0;
    const dash = mounted ? fraction * C : 0;
    const gap = C - dash;
    const rotateOffset =
      total > 0
        ? (-slices.slice(0, index).reduce((sum, item) => sum + item.value, 0) / total) * C
        : 0;
    return { ...slice, dash, gap, rotateOffset };
  });

  return (
    <div className="dash-donut-wrap">
      <div className="dash-donut-svg-wrap">
        <svg viewBox="0 0 120 120" className="dash-donut-svg" aria-hidden="true">
          <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="14" />
          {paths.map((p) => (
            <circle
              key={p.label}
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={p.color}
              strokeWidth="14"
              strokeDasharray={`${p.dash} ${p.gap}`}
              strokeDashoffset={p.rotateOffset}
              strokeLinecap="butt"
              transform="rotate(-90 60 60)"
              className="donut-segment"
            />
          ))}
        </svg>
        <div className="dash-donut-center">
          <strong>{total}</strong>
          <span>tugas</span>
        </div>
      </div>
      <div className="dash-donut-legend">
        {slices.map((s) => (
          <button
            type="button"
            key={s.label}
            className="donut-legend-row"
            aria-pressed={
              selected ===
              {
                Selesai: 'selesai',
                Dikerjakan: 'proses',
                Rencana: 'rencana',
                Dibatalkan: 'dibatalkan',
              }[s.label]
            }
            onClick={() =>
              onSelect?.(
                {
                  Selesai: 'selesai',
                  Dikerjakan: 'proses',
                  Rencana: 'rencana',
                  Dibatalkan: 'dibatalkan',
                }[s.label] || 'aktif',
              )
            }
          >
            <span className="donut-dot" style={{ background: s.color }} />
            <span className="donut-legend-label">{s.label}</span>
            <strong className="donut-legend-val">{s.value}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── AnimatedCounter ─────────────────────────────────────── */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <>
      {prefix}
      {value.toLocaleString('id-ID')}
      {suffix}
    </>
  );
}

/* ─── SparkLine ───────────────────────────────────────────── */
export function SparkLine({ data, color = 'var(--brand)' }: { data: number[]; color?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);
  if (data.length < 2) return null;
  const W = 120,
    H = 36;
  const max = Math.max(1, ...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (v / max) * (H - 6) - 3,
    v,
  }));
  const polyline = pts.map((p) => `${p.x},${mounted ? p.y : H}`).join(' ');
  const flatline = pts.map((p) => `${p.x},${H}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dash-sparkline" aria-hidden="true">
      <polyline
        points={mounted ? polyline : flatline}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'points 0.65s cubic-bezier(0.34,1.56,0.64,1)' }}
      />
      {pts.map((p, i) =>
        p.v > 0 ? (
          <circle
            key={i}
            cx={p.x}
            cy={mounted ? p.y : H}
            r="2.5"
            fill={color}
            style={{ transition: `cy 0.65s cubic-bezier(0.34,1.56,0.64,1) ${i * 40}ms` }}
          />
        ) : null,
      )}
    </svg>
  );
}

/* ─── RadialProgressRing ──────────────────────────────────── */
export function RadialProgressRing({
  percentage,
  size = 46,
  strokeWidth = 5,
  color,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePct = Math.min(100, Math.max(0, percentage));
  const offset = circumference - ((mounted ? safePct : 0) / 100) * circumference;

  return (
    <div className="stat-radial-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="stat-radial-svg" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="color-mix(in srgb, currentColor 15%, transparent)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color || 'currentColor'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="stat-radial-circle"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <span className="stat-radial-val">{percentage}%</span>
    </div>
  );
}

/* ─── StatCard ────────────────────────────────────────────── */
export function StatCard({
  label,
  value,
  sub,
  accent = false,
  variant,
  percentage,
  icon,
  sparkData,
  href,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
  variant?: 'emerald' | 'blue' | 'rose' | 'purple';
  percentage?: number;
  icon?: React.ReactNode;
  sparkData?: number[];
  href?: string;
}) {
  const isPercent = percentage !== undefined || (typeof value === 'string' && value.endsWith('%'));
  const pctVal =
    percentage ?? (typeof value === 'string' && value.endsWith('%') ? parseInt(value, 10) || 0 : 0);

  const variantClass = variant
    ? `stat-variant-${variant}`
    : accent
    ? 'dash-stat-accent stat-variant-emerald'
    : '';

  const Inner = (
    <div className={`dash-stat-card ${variantClass}`}>
      <div className="dash-stat-top">
        <span className="dash-stat-label">{label}</span>
        {isPercent ? (
          <RadialProgressRing
            percentage={pctVal}
            color={
              variant === 'emerald' || accent
                ? '#059669'
                : variant === 'blue'
                ? '#2563eb'
                : variant === 'rose'
                ? '#e11d48'
                : variant === 'purple'
                ? '#7c3aed'
                : 'var(--brand)'
            }
          />
        ) : icon ? (
          <div className="dash-stat-icon-wrap">{icon}</div>
        ) : sparkData && Math.max(0, ...sparkData) > 0 ? (
          <SparkLine data={sparkData} color={accent ? 'var(--brand-text)' : 'var(--brand)'} />
        ) : null}
      </div>
      <strong className="dash-stat-value">
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </strong>
      {sub && <span className="dash-stat-sub">{sub}</span>}
    </div>
  );
  return href ? (
    <Link href={href} className="dash-stat-link">
      {Inner}
    </Link>
  ) : (
    Inner
  );
}

/* ─── ProjectProgressBar ──────────────────────────────────── */
export function ProjectProgressBar({
  label,
  pct,
  href,
  index = 0,
}: {
  label: string;
  pct: number;
  href: string;
  index?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120 + index * 90);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <Link className="dash-proj-bar-row" href={href}>
      <div className="dash-proj-bar-meta">
        <span className="dash-proj-bar-label">{label}</span>
        <span className="dash-proj-bar-pct">{pct}%</span>
      </div>
      <div className="dash-proj-bar-track">
        <div
          className="dash-proj-bar-fill"
          style={{ width: mounted ? `${pct}%` : '0%', transitionDelay: `${index * 90}ms` }}
        />
      </div>
    </Link>
  );
}
