import { useState } from 'react';
import type { Workspace } from './useWorkspace';
import { schemas } from './schemas';
import { today, formatDate, daysBetween } from '@/lib/date';
import { dependencyConflict, planProgress } from '@/lib/progress';
import { Meter } from '@/components/charts/Charts';
import { Records } from './Records';
export function Roadmap({ data, refresh }: { data: Workspace; refresh: () => Promise<void> }) {
  const [zoom, setZoom] = useState('minggu');
  const tasks = (data['work-items'] || []).map((row) => ({
    ...schemas['work-items'].parse(row.data),
    id: row.id,
  }));
  const start = String(data.organization?.[0]?.data.start_date || today());
  return (
    <>
      <section className="card">
        <div className="section-head">
          <div>
            <h2>Garis waktu kerja</h2>
            <p>Hari ini {formatDate(today())}. Ubah tanggal tugas melalui menu Tugas.</p>
          </div>
          <label>
            Skala
            <select value={zoom} onChange={(e) => setZoom(e.target.value)}>
              <option>minggu</option>
              <option>bulan</option>
            </select>
          </label>
        </div>
        <div className="gantt">
          <div className="gantt-inner" style={{ minWidth: zoom === 'minggu' ? 1100 : 700 }}>
            <div className="gantt-axis">
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i}>M{i + 1}</span>
              ))}
            </div>
            {tasks.map((task) => (
              <div className="gantt-row" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>
                    {formatDate(task.start_date || task.due_date)} – {formatDate(task.due_date)}
                    {dependencyConflict(task, tasks) ? ' · ⚠ Prasyarat belum terpenuhi' : ''}
                  </small>
                </div>
                <div className="gantt-track">
                  <span
                    style={{
                      left: `${Math.max(0, Math.min(99, (daysBetween(start, task.start_date || task.due_date) / 90) * 100))}%`,
                      width: `${Math.max(1, Math.min(100, ((daysBetween(task.start_date || task.due_date, task.due_date) + 1) / 90) * 100))}%`,
                    }}
                    title={task.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mobile-timeline">
          {tasks.map((task) => (
            <div className="attention" key={task.id}>
              <strong>{task.title}</strong>
              <span>{formatDate(task.due_date)}</span>
            </div>
          ))}
        </div>
        {!tasks.length && <p>Tambahkan tugas untuk melihat garis waktu.</p>}
      </section>
      <section className="card">
        <h2>Capaian milestone</h2>
        {(data.milestones || []).map((row) => {
          const children = tasks.filter((item) => item.milestone_id === row.id);
          return (
            <div className="readiness-item" key={row.id}>
              <strong>{String(row.data.title)}</strong>
              <p>
                {formatDate(String(row.data.due_date))} ·{' '}
                {row.data.actual_date
                  ? 'Tercapai'
                  : String(row.data.due_date) < today()
                    ? 'Terlambat'
                    : 'Dalam rencana'}
              </p>
              <Meter value={children.length ? planProgress(children) : null} />
            </div>
          );
        })}
      </section>
      <Records entity="milestones" workspace={data} refresh={refresh} />
    </>
  );
}
