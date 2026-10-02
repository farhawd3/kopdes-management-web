'use client';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, MoveHorizontal, Flag, Plus } from 'lucide-react';
import { addDays, daysBetween, formatDate, today } from '@/lib/date';
import { timelineBar, shiftSchedule, scheduleConflicts } from '@/lib/timeline';
import { api } from '@/lib/client';
import { schemas, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { Editor } from './Editor';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
export function TaskTimeline({
  items,
  workspace,
  refresh,
  scopeId,
}: {
  items: Item[];
  workspace: Workspace;
  refresh: () => Promise<void>;
  scopeId?: string;
}) {
  const [start, setStart] = useState(addDays(today(), -7));
  const [days, setDays] = useState(42);
  const [scale, setScale] = useState('minggu');
  const [edit, setEdit] = useState<Item | undefined>();
  const [pending, setPending] = useState<{
    item: Item;
    start_date: string;
    due_date: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [showMobileChart, setShowMobileChart] = useState(false);
  const drag = useRef<{ item: Item; x: number; width: number; resize: boolean } | null>(null);
  const end = addDays(start, days - 1);
  const allTasks = (workspace['work-items'] || []).map((item) => ({
    ...schemas['work-items'].parse(item.data),
    ...(pending?.item.id === item.id
      ? { start_date: pending.start_date, due_date: pending.due_date }
      : {}),
    id: item.id,
  }));
  const tasks = items
    .filter((item) => item.data.status !== 'dibatalkan')
    .map((item) => ({
      item,
      task: {
        ...schemas['work-items'].parse(item.data),
        ...(pending?.item.id === item.id
          ? { start_date: pending.start_date, due_date: pending.due_date }
          : {}),
        id: item.id,
      },
    }));
  const visible = tasks.filter(({ task }) => timelineBar(task, start, end));
  const dayWidth = scale === 'hari' ? 52 : scale === 'minggu' ? 24 : 9;
  const step = scale === 'hari' ? 1 : scale === 'minggu' ? 7 : 30;
  const milestones = (workspace.milestones || []).filter(
    (item) =>
      (!scopeId || item.data.workstream_id === scopeId) &&
      String(item.data.due_date) >= start &&
      String(item.data.due_date) <= end,
  );
  const conflictCount = tasks.filter(({ task }) => scheduleConflicts(task, allTasks).length).length;
  const newTask = () =>
    setEdit({
      id: '',
      created_at: '',
      updated_at: '',
      data: schemas['work-items'].parse({
        title: 'Tugas baru',
        start_date: today(),
        due_date: today(),
        workstream_id: scopeId || '',
      }),
    });
  return (
    <section className={`timeline-panel ${showMobileChart ? 'mobile-chart-open' : ''}`}>
      <div className="timeline-toolbar">
        <div className="actions">
          <button aria-label="Periode sebelumnya" onClick={() => setStart(addDays(start, -days))}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setStart(addDays(today(), -7))}>Hari ini</button>
          <button aria-label="Periode berikutnya" onClick={() => setStart(addDays(start, days))}>
            <ChevronRight size={16} />
          </button>
        </div>
        <label>
          Mulai
          <input
            aria-label="Awal rentang Gantt"
            type="date"
            value={start}
            onChange={(event) => {
              if (event.target.value) setStart(event.target.value);
            }}
          />
        </label>
        <label>
          Sampai
          <input
            aria-label="Akhir rentang Gantt"
            type="date"
            min={start}
            max={addDays(start, 365)}
            value={end}
            onChange={(event) => {
              const length = daysBetween(start, event.target.value) + 1;
              if (length >= 1 && length <= 366) setDays(length);
            }}
          />
        </label>
        <label>
          Skala
          <Select
            value={scale}
            onChange={setScale}
            options={[
              { value: 'hari', label: 'Hari' },
              { value: 'minggu', label: 'Minggu' },
              { value: 'bulan', label: 'Bulan' },
            ]}
            ariaLabel="Skala waktu"
          />
        </label>
        <button
          onClick={() => {
            if (!tasks.length) return;
            const dates = tasks
              .flatMap(({ task }) => [task.start_date || task.due_date, task.due_date])
              .sort();
            setStart(addDays(dates[0], -2));
            setDays(Math.min(366, daysBetween(dates[0], dates[dates.length - 1]) + 5));
            setMessage('Rentang disesuaikan, maksimal satu tahun per tampilan.');
          }}
        >
          Lihat jadwal
        </button>
        <button className="primary" onClick={newTask}>
          <Plus size={16} />
          Tugas
        </button>
      </div>
      <div className="timeline-legend">
        <span>
          <i className="status-dot proses" />
          Sedang berjalan
        </span>
        <span>
          <i className="status-dot selesai" />
          Selesai
        </span>
        <span>
          <i className="status-dot rencana" />
          Belum dimulai
        </span>
        <span>
          <Flag size={13} />
          Milestone
        </span>
      </div>
      {conflictCount > 0 && (
        <p className="notice">
          {conflictCount} tugas memiliki jadwal prasyarat yang bertabrakan. Tinjau sebelum menyimpan
          perubahan.
        </p>
      )}
      {pending && (
        <div className="schedule-review" role="status">
          <div>
            <strong>{String(pending.item.data.title)}</strong>
            <p>
              {formatDate(pending.start_date)} → {formatDate(pending.due_date)}
            </p>
            <small>Perubahan belum disimpan. Jadwal tugas lain tidak digeser otomatis.</small>
          </div>
          <div className="actions">
            <button disabled={busy} onClick={() => setPending(null)}>
              Batal
            </button>
            <button
              className="primary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setError('');
                try {
                  await api('work-items', {
                    id: pending.item.id,
                    data: {
                      ...pending.item.data,
                      start_date: pending.start_date,
                      due_date: pending.due_date,
                    },
                  });
                  setPending(null);
                  await refresh();
                  setMessage('Jadwal tersimpan.');
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? 'Menyimpan…' : 'Simpan jadwal'}
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="notice error" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="timeline-feedback" role="status">
          {message}
        </p>
      )}
      <button
        type="button"
        className="timeline-mobile-toggle"
        aria-expanded={showMobileChart}
        onClick={() => setShowMobileChart((value) => !value)}
      >
        {showMobileChart ? 'Lihat daftar jadwal' : 'Lihat bagan Gantt'}
      </button>
      <div
        className="timeline-scroll"
        tabIndex={0}
        aria-label="Gantt. Geser horizontal untuk melihat tanggal lain."
      >
        <div className="timeline-canvas" style={{ width: Math.max(700, days * dayWidth + 230) }}>
          <div className="timeline-line timeline-axis">
            <div className="timeline-name">
              Pekerjaan <small>{visible.length} ditampilkan</small>
            </div>
            <div className="timeline-track">
              {Array.from({ length: Math.ceil(days / step) }, (_, index) => (
                <span key={index} style={{ left: `${((index * step) / days) * 100}%` }}>
                  {formatDate(addDays(start, index * step)).replace(/ \d{4}$/, '')}
                </span>
              ))}
            </div>
          </div>
          {visible.map(({ item, task }) => {
            const bar = timelineBar(task, start, end)!;
            const conflicts = scheduleConflicts(task, allTasks);
            return (
              <div className="timeline-line" key={item.id}>
                <button className="timeline-name" onClick={() => setEdit(item)}>
                  <strong>{task.title}</strong>
                  <small>
                    {task.assignee || 'Tanpa PIC'}
                    {conflicts.length ? ' · Jadwal bertabrakan' : ''}
                  </small>
                </button>
                <div
                  className="timeline-track"
                  style={{ backgroundSize: `${(step / days) * 100}% 100%` }}
                >
                  {today() >= start && today() <= end && (
                    <span
                      className="today-line"
                      style={{ left: `${(daysBetween(start, today()) / days) * 100}%` }}
                    />
                  )}
                  <button
                    disabled={busy}
                    className={`timeline-bar ${task.status}`}
                    style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
                    aria-label={`${task.title}, ${formatDate(task.start_date || task.due_date)} sampai ${formatDate(task.due_date)}. Panah kiri atau kanan menggeser satu hari, Shift dan panah mengubah tenggat.`}
                    title={`${task.title} · ${formatDate(task.start_date || task.due_date)} – ${formatDate(task.due_date)}${bar.clipped ? ' · sebagian di luar rentang' : ''}`}
                    onDoubleClick={() => setEdit(item)}
                    onKeyDown={(event) => {
                      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                      event.preventDefault();
                      setPending({
                        item,
                        ...shiftSchedule(task, event.key === 'ArrowRight' ? 1 : -1, event.shiftKey),
                      });
                    }}
                    onPointerDown={(event) => {
                      if (event.pointerType === 'touch' || busy) return;
                      const target = event.target as HTMLElement;
                      drag.current = {
                        item: {
                          ...item,
                          data: {
                            ...item.data,
                            start_date: task.start_date,
                            due_date: task.due_date,
                          },
                        },
                        x: event.clientX,
                        width: event.currentTarget.parentElement!.getBoundingClientRect().width,
                        resize: target.dataset.resize === 'true',
                      };
                      event.currentTarget.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                      if (!drag.current) return;
                      const delta = Math.round(
                        ((event.clientX - drag.current.x) / drag.current.width) * days,
                      );
                      setPending({
                        item,
                        ...shiftSchedule(
                          schemas['work-items'].parse(drag.current.item.data),
                          delta,
                          drag.current.resize,
                        ),
                      });
                    }}
                    onPointerUp={() => {
                      drag.current = null;
                    }}
                    onPointerCancel={() => {
                      drag.current = null;
                    }}
                  >
                    <span>
                      {bar.clipped ? '↔ ' : ''}
                      {task.title}
                    </span>
                    <span data-resize="true" className="resize-grip" aria-hidden>
                      ⋮
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
          {milestones.map((item) => (
            <div className="timeline-line" key={item.id}>
              <button className="timeline-name" onClick={() => setEdit(item)}>
                <strong>◇ {String(item.data.title)}</strong>
                <small>{formatDate(String(item.data.due_date))}</small>
              </button>
              <div className="timeline-track">
                <span
                  className="milestone-pin"
                  style={{
                    left: `${(daysBetween(start, String(item.data.due_date)) / days) * 100}%`,
                  }}
                >
                  ◆
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!visible.length && (
        <EmptyState
          icon={<CalendarDays size={24} />}
          title={tasks.length ? 'Tidak ada tugas pada rentang ini' : 'Susun garis waktu pertama Anda'}
          description={
            tasks.length
              ? 'Ubah rentang tanggal atau pilih rentang waktu yang lebih luas.'
              : 'Tambahkan tugas dengan tanggal mulai dan tenggat untuk memvisualisasikan jadwal kerja.'
          }
          tone="purple"
        />
      )}
      <p className="timeline-help">
        <MoveHorizontal size={15} /> Seret batang untuk memindahkan jadwal; tarik ujung kanan untuk
        mengubah durasi. Klik nama tugas untuk mengedit tanggal di semua perangkat.
      </p>
      <div className="timeline-mobile-list">
        {visible.map(({ item, task }) => (
          <button key={item.id} onClick={() => setEdit(item)}>
            <span className={`status-dot ${task.status}`} />
            <span>
              <strong>{task.title}</strong>
              <small>
                {formatDate(task.start_date || task.due_date)} — {formatDate(task.due_date)}
              </small>
            </span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
      {edit && (
        <Editor
          entity={
            workspace.milestones?.some((item) => item.id === edit.id) ? 'milestones' : 'work-items'
          }
          item={edit}
          workspace={workspace}
          onClose={() => setEdit(undefined)}
          onSaved={refresh}
        />
      )}
    </section>
  );
}
