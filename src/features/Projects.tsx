'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FolderOpen,
  ArrowUpRight,
  Plus,
  Flag,
  FileText,
  Scale,
  AlertCircle,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { ProjectNotes } from './ProjectNotes';
import { Editor } from './Editor';
import { Records } from './Records';
import { schemas, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { scopeProgress } from '@/lib/progress';
import { formatDate, today } from '@/lib/date';
import { Meter } from '@/components/charts/Charts';

export function Projects({ data, refresh }: { data: Workspace; refresh: () => Promise<void> }) {
  const query = useSearchParams(),
    router = useRouter();
  const [edit, setEdit] = useState<Item | null | undefined>();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const projects = data.workstreams || [];
  const selected = projects.find((row) => row.id === query.get('id'));

  const tasksFor = (id: string) =>
    (data['work-items'] || [])
      .filter((row) => row.data.workstream_id === id)
      .map((row) => ({ ...schemas['work-items'].parse(row.data), id: row.id }));

  const now = today();

  return (
    <>
      {selected ? (
        <>
          <button className="text-button" onClick={() => router.push('/proyek')}>
            ← Semua proyek
          </button>
          <section className="project-cover">
            <span className="project-symbol">
              <FolderOpen size={26} />
            </span>
            <div className="section-head">
              <div>
                <span className="eyebrow">{String(selected.data.code)}</span>
                <h2>{String(selected.data.title)}</h2>
              </div>
              <button onClick={() => setEdit(selected)}>Ubah proyek</button>
            </div>
            <p>{String(selected.data.description || 'Belum ada deskripsi proyek.')}</p>
            <div className="project-properties">
              <span>
                Status<strong className="badge">{String(selected.data.status || 'rencana')}</strong>
              </span>
              <span>
                Prioritas<strong>{String(selected.data.priority || 'normal')}</strong>
              </span>
              <span>
                Penanggung jawab{' '}
                <strong>{String(selected.data.assignee || 'Belum ditentukan')}</strong>
              </span>
              <span>
                Target{' '}
                <strong>
                  {selected.data.target_date
                    ? formatDate(String(selected.data.target_date))
                    : 'Belum ditentukan'}
                </strong>
              </span>
              <span>
                Tugas <strong>{tasksFor(selected.id).length} catatan</strong>
              </span>
            </div>
            <Meter value={scopeProgress(tasksFor(selected.id))} />
          </section>

          <div className="project-context">
            {/* Project Notes */}
            <ProjectNotes key={selected.id} project={selected} refresh={refresh} />

            {/* Related Milestones */}
            <section className="card project-related-card">
              <h3>
                <Flag size={18} /> Milestone terkait
              </h3>
              {(data.milestones || []).filter((row) => row.data.workstream_id === selected.id)
                .length ? (
                (data.milestones || [])
                  .filter((row) => row.data.workstream_id === selected.id)
                  .map((row) => (
                    <div className="attention" key={row.id}>
                      <strong>{String(row.data.title)}</strong>
                      <small>
                        {row.data.actual_date ? 'Tercapai' : formatDate(String(row.data.due_date))}
                      </small>
                    </div>
                  ))
              ) : (
                <p>Belum ada milestone untuk proyek ini.</p>
              )}
              <Link className="text-link" href="/roadmap">
                Kelola di Gantt →
              </Link>
            </section>

            {/* Related Documents */}
            <section className="card project-related-card">
              <h3>
                <FileText size={18} /> Dokumen & Perizinan Terkait
              </h3>
              {(data.documents || []).filter((row) => row.data.workstream_id === selected.id)
                .length ? (
                (data.documents || [])
                  .filter((row) => row.data.workstream_id === selected.id)
                  .map((row) => (
                    <div className="attention doc-item-row" key={row.id}>
                      <div>
                        <strong>{String(row.data.title)}</strong>
                        <small>{String(row.data.category || 'Dokumen')}</small>
                      </div>
                      {Boolean(row.data.link) && (
                        <a href={String(row.data.link)} target="_blank" rel="noreferrer" className="text-link">
                          Buka berkas ↗
                        </a>
                      )}
                    </div>
                  ))
              ) : (
                <p>Belum ada dokumen yang ditautkan ke proyek ini.</p>
              )}
              <Link className="text-link" href="/dokumen">
                Buka arsip dokumen →
              </Link>
            </section>

            {/* Related Decisions */}
            <section className="card project-related-card">
              <h3>
                <Scale size={18} /> Keputusan Strategis
              </h3>
              {(data.decisions || []).filter((row) => row.data.workstream_id === selected.id)
                .length ? (
                (data.decisions || [])
                  .filter((row) => row.data.workstream_id === selected.id)
                  .map((row) => (
                    <div className="attention decision-item-row" key={row.id}>
                      <strong>{String(row.data.title)}</strong>
                      {Boolean(row.data.reason) && <small>{String(row.data.reason)}</small>}
                    </div>
                  ))
              ) : (
                <p>Belum ada keputusan formal yang dicatat untuk proyek ini.</p>
              )}
              <Link className="text-link" href="/rapat?bagian=decisions">
                Buka buku keputusan →
              </Link>
            </section>
          </div>

          <Records
            key={selected.id}
            entity="work-items"
            workspace={data}
            refresh={refresh}
            scopeId={selected.id}
          />
        </>
      ) : (
        <>
          <section className="workspace-intro">
            <div>
              <span className="eyebrow">PROYEK</span>
              <h2>Proyek Anda</h2>
              <p>Atur tujuan, tugas, kendala, dan progres setiap inisiatif kerja.</p>
            </div>
            <button className="primary" onClick={() => setEdit(null)}>
              <Plus size={18} /> Proyek baru
            </button>
          </section>
          <label className="project-search">
            Cari proyek
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nama atau tujuan proyek…"
            />
          </label>
          <div className="project-status-tabs" aria-label="Filter status proyek">
            {[
              ['', 'Semua'],
              ['aktif', 'Aktif'],
              ['rencana', 'Rencana'],
              ['ditunda', 'Ditunda'],
              ['selesai', 'Selesai'],
              ['diarsipkan', 'Arsip'],
            ].map(([value, label]) => (
              <button key={value} aria-pressed={status === value} onClick={() => setStatus(value)}>
                {label}
                <small>
                  {
                    projects.filter((row) => !value || (row.data.status || 'rencana') === value)
                      .length
                  }
                </small>
              </button>
            ))}
          </div>
          <div className="project-grid">
            {projects
              .filter(
                (row) =>
                  (!status || (row.data.status || 'rencana') === status) &&
                  `${row.data.title} ${row.data.description || ''}`
                    .toLocaleLowerCase('id')
                    .includes(search.toLocaleLowerCase('id')),
              )
              .map((row) => {
                const tasks = tasksFor(row.id);
                const openIssues = (data.issues || []).filter(
                  (i) => i.data.workstream_id === row.id && i.data.status !== 'ditutup',
                );
                const nextTask = tasks
                  .filter((t) => !['selesai', 'dibatalkan'].includes(t.status) && t.due_date >= now)
                  .sort((a, b) => a.due_date.localeCompare(b.due_date))[0];

                return (
                  <Link className="project-card" href={`/proyek?id=${row.id}`} key={row.id}>
                    <div className="section-head">
                      <span
                        className="project-symbol"
                        style={{ borderColor: String(row.data.color) }}
                      >
                        <FolderOpen size={24} />
                      </span>
                      <ArrowUpRight size={19} />
                    </div>
                    <div className="record-meta">
                      <span className="eyebrow">{String(row.data.code)}</span>
                      <span className="badge">{String(row.data.status || 'rencana')}</span>
                    </div>
                    <h3>{String(row.data.title)}</h3>
                    <p>{String(row.data.description || 'Belum ada deskripsi tujuan proyek.')}</p>

                    {/* Progress Meter */}
                    <div className="project-progress-wrap">
                      <div className="project-progress-head">
                        <small>Progres Penyelesaian</small>
                        <strong>{scopeProgress(tasks)}%</strong>
                      </div>
                      <Meter value={scopeProgress(tasks)} />
                    </div>

                    {/* Obstacles & Next Steps */}
                    <div className="project-card-highlights">
                      <div className="project-highlight-item">
                        {openIssues.length > 0 ? (
                          <span className="issue-warning-badge">
                            <AlertCircle size={13} /> {openIssues.length} kendala aktif
                          </span>
                        ) : (
                          <span className="issue-clear-badge">
                            <CheckCircle2 size={13} /> Kendala terkendali
                          </span>
                        )}
                      </div>
                      {nextTask && (
                        <div className="project-next-step">
                          <Calendar size={13} />
                          <span>Langkah berikut: {nextTask.title} ({formatDate(nextTask.due_date)})</span>
                        </div>
                      )}
                    </div>

                    <div className="project-card-foot">
                      <span>
                        {tasks.filter((task) => task.status === 'selesai').length} /{' '}
                        {tasks.filter((task) => task.status !== 'dibatalkan').length} tugas selesai
                      </span>
                      <span>Buka proyek →</span>
                    </div>
                  </Link>
                );
              })}
          </div>
          {!projects.length && (
            <div className="empty card">
              <FolderOpen className="empty-icon" size={36} />
              <h3>Belum ada proyek</h3>
              <p>Buat proyek untuk mengelompokkan tugas dan jadwal.</p>
              <button className="primary" onClick={() => setEdit(null)}>
                Buat proyek pertama
              </button>
            </div>
          )}
          {projects.length > 0 &&
            !projects.some(
              (row) =>
                (!status || (row.data.status || 'rencana') === status) &&
                `${row.data.title} ${row.data.description || ''}`
                  .toLocaleLowerCase('id')
                  .includes(search.toLocaleLowerCase('id')),
            ) && <p className="empty">Tidak ada proyek yang sesuai pencarian.</p>}
        </>
      )}
      {edit !== undefined && (
        <Editor
          entity="workstreams"
          item={edit || undefined}
          workspace={data}
          onClose={() => setEdit(undefined)}
          onSaved={refresh}
        />
      )}
    </>
  );
}
