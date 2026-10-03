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
  Search,
  X,
  Layers,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { ProjectNotes } from './ProjectNotes';
import { Editor } from '../Editor';
import { Records } from '../Records';
import { schemas, type Item } from '../schemas';
import type { Workspace } from '../workspace/useWorkspace';
import { scopeProgress } from '@/lib/progress';
import { formatDate, today } from '@/lib/date';
import { Meter } from '@/components/charts/Charts';
import { EmptyState } from '@/components/ui/EmptyState';
import { recordHref } from '../workspace/workspace-navigation';

export function Projects({ data, refresh }: { data: Workspace; refresh: () => Promise<void> }) {
  const query = useSearchParams(),
    router = useRouter();
  const [edit, setEdit] = useState<Item | null | undefined>();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const projects = data.workstreams || [];
  const selected = projects.find((row) => row.id === query.get('id'));
  const projectTasks = selected
    ? (data['work-items'] || []).filter((row) => row.data.workstream_id === selected.id)
    : [];
  // These domains link through tasks, rather than having a project field of their own.
  const relatedDocuments = (data.documents || []).filter((row) =>
    projectTasks.some((task) => task.data.document_id === row.id),
  );
  const relatedDecisions = (data.decisions || []).filter(
    (row) =>
      row.data.meeting_id &&
      projectTasks.some((task) => task.data.meeting_id === row.data.meeting_id),
  );
  const relatedIssues = (data.issues || []).filter((row) =>
    projectTasks.some((task) => task.data.issue_id === row.id),
  );

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

          <nav className="project-section-nav" aria-label="Bagian proyek">
            <a href="#project-tasks">
              Tugas <span>{tasksFor(selected.id).length}</span>
            </a>
            <a href="#project-notes">Catatan</a>
            <a href="#project-milestones">Milestone</a>
            <a href="#project-documents">Dokumen</a>
            <a href="#project-decisions">Keputusan</a>
            <a href="#project-obstacles">
              Kendala <span>{relatedIssues.length}</span>
            </a>
          </nav>

          <details className="card project-next-actions">
            <summary>Langkah berikutnya</summary>
            <p>
              <small>
                Tiga tugas aktif dengan tenggat terdekat dari catatan proyek yang dimuat.
              </small>
            </p>
            {[...projectTasks]
              .filter((row) => !['selesai', 'dibatalkan'].includes(String(row.data.status)))
              .sort((a, b) =>
                String(a.data.due_date || '9999').localeCompare(String(b.data.due_date || '9999')),
              )
              .slice(0, 3)
              .map((row) => (
                <Link key={row.id} href={recordHref('work-items', row)}>
                  <strong>{String(row.data.title)}</strong>
                  <small>
                    {row.data.due_date ? formatDate(String(row.data.due_date)) : 'Tanpa tenggat'}
                  </small>
                </Link>
              ))}
            {!projectTasks.some(
              (row) => !['selesai', 'dibatalkan'].includes(String(row.data.status)),
            ) && (
              <p>
                Belum ada tugas aktif.{' '}
                <a href="#project-tasks">Tambah tugas di bagian tugas proyek →</a>
              </p>
            )}
          </details>

          <div className="project-context">
            {/* Project Notes */}
            <div id="project-notes" className="project-section-anchor">
              <ProjectNotes key={selected.id} project={selected} refresh={refresh} />
            </div>

            {/* Related Milestones */}
            <section
              id="project-milestones"
              className="card project-related-card project-section-anchor"
            >
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
            <section
              id="project-documents"
              className="card project-related-card project-section-anchor"
            >
              <h3>
                <FileText size={18} /> Dokumen & Perizinan Terkait
              </h3>
              {relatedDocuments.length ? (
                relatedDocuments.map((row) => (
                  <div className="attention doc-item-row" key={row.id}>
                    <div>
                      <Link href={recordHref('documents', row)}>
                        <strong>{String(row.data.title)}</strong>
                      </Link>
                      <small>{String(row.data.category || 'Dokumen')}</small>
                    </div>
                    {Boolean(row.data.link) && (
                      <a
                        href={String(row.data.link)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
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
            <section
              id="project-decisions"
              className="card project-related-card project-section-anchor"
            >
              <h3>
                <Scale size={18} /> Keputusan Strategis
              </h3>
              {relatedDecisions.length ? (
                relatedDecisions.map((row) => (
                  <div className="attention decision-item-row" key={row.id}>
                    <Link href={recordHref('decisions', row)}>
                      <strong>{String(row.data.title)}</strong>
                    </Link>
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
            <section
              id="project-obstacles"
              className="card project-related-card project-section-anchor"
            >
              <h3>
                <ShieldCheck size={18} /> Kendala terkait tugas
              </h3>
              {relatedIssues.map((row) => (
                <Link
                  className="project-obstacle-link"
                  key={row.id}
                  href={recordHref('issues', row)}
                >
                  <span>
                    <strong>{String(row.data.title)}</strong>
                    <small>Kendala · {String(row.data.status || 'Belum ditentukan')}</small>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ))}
              {!relatedIssues.length && (
                <p>Belum ada kendala yang ditautkan melalui tugas proyek ini.</p>
              )}
              <Link className="text-link" href="/risiko">
                Kelola kendala & risiko →
              </Link>
            </section>
          </div>

          <div id="project-tasks" className="project-section-anchor">
            <Records
              key={selected.id}
              entity="work-items"
              workspace={data}
              refresh={refresh}
              scopeId={selected.id}
            />
          </div>
        </>
      ) : (
        <>
          <section className="workspace-intro projects-intro-banner">
            <div>
              <span className="eyebrow">Ruang proyek</span>
              <h2>Proyek Anda</h2>
              <p>Tugas, milestone, dan catatan untuk setiap proyek.</p>
            </div>
            <button className="primary" onClick={() => setEdit(null)}>
              <Plus size={18} /> Proyek baru
            </button>
          </section>

          {/* Project Summary KPI Bar */}
          <div className="projects-kpi-grid">
            <div className="project-kpi-card">
              <span className="kpi-icon-wrap">
                <FolderOpen size={18} />
              </span>
              <div className="kpi-info">
                <strong>{projects.length}</strong>
                <small>Total Proyek</small>
              </div>
            </div>
            <div className="project-kpi-card">
              <span className="kpi-icon-wrap kpi-active">
                <Clock size={18} />
              </span>
              <div className="kpi-info">
                <strong>
                  {projects.filter((p) => (p.data.status || 'rencana') === 'aktif').length}
                </strong>
                <small>Proyek Berjalan</small>
              </div>
            </div>
            <div className="project-kpi-card">
              <span className="kpi-icon-wrap kpi-done">
                <CheckCircle2 size={18} />
              </span>
              <div className="kpi-info">
                <strong>{projects.filter((p) => p.data.status === 'selesai').length}</strong>
                <small>Proyek Selesai</small>
              </div>
            </div>
            <div className="project-kpi-card">
              <span className="kpi-icon-wrap kpi-tasks">
                <Layers size={18} />
              </span>
              <div className="kpi-info">
                <strong>
                  {(data['work-items'] || []).filter((t) => Boolean(t.data.workstream_id)).length}
                </strong>
                <small>Tugas Terhubung</small>
              </div>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="projects-toolbar-row">
            <div className="project-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama atau tujuan proyek..."
                aria-label="Cari proyek"
              />
              {Boolean(search) && (
                <button
                  type="button"
                  className="btn-clear-search"
                  title="Hapus pencarian"
                  onClick={() => setSearch('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="project-status-tabs" aria-label="Filter status proyek">
              {[
                ['', 'Semua'],
                ['aktif', 'Aktif'],
                ['rencana', 'Rencana'],
                ['ditunda', 'Ditunda'],
                ['selesai', 'Selesai'],
                ['diarsipkan', 'Arsip'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={status === value}
                  onClick={() => setStatus(value)}
                >
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
                  (issue) =>
                    issue.data.status !== 'ditutup' &&
                    (data['work-items'] || []).some(
                      (task) =>
                        task.data.workstream_id === row.id && task.data.issue_id === issue.id,
                    ),
                );
                const nextTask = tasks
                  .filter((t) => !['selesai', 'dibatalkan'].includes(t.status) && t.due_date >= now)
                  .sort((a, b) => a.due_date.localeCompare(b.due_date))[0];
                const progress = scopeProgress(tasks);
                const projectStatus = String(row.data.status || 'rencana');
                const pastelTone =
                  projectStatus === 'selesai'
                    ? 'pastel-emerald'
                    : projectStatus === 'aktif'
                      ? 'pastel-blue'
                      : projectStatus === 'ditunda'
                        ? 'pastel-amber'
                        : 'pastel-purple';

                return (
                  <Link
                    className={`project-card project-card-compact ${pastelTone}`}
                    href={`/proyek?id=${row.id}`}
                    key={row.id}
                  >
                    <div className="project-card-header">
                      <div className="project-badge-cluster">
                        <span className="project-code-tag">{String(row.data.code || 'PRJ')}</span>
                        <span className={`project-status-badge status-${projectStatus}`}>
                          {projectStatus}
                        </span>
                      </div>
                      <ArrowUpRight size={17} className="project-card-arrow" />
                    </div>

                    <div className="project-card-body">
                      <h3 className="project-compact-title">{String(row.data.title)}</h3>
                      {Boolean(row.data.description) && (
                        <p className="project-compact-desc">{String(row.data.description)}</p>
                      )}
                    </div>

                    {/* Compact Single-line Progress */}
                    <div className="project-compact-progress-wrap">
                      <div className="project-compact-bar-track">
                        <div
                          className="project-compact-bar-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="project-compact-progress-label">{progress}%</span>
                    </div>

                    {/* Compact Stats Row */}
                    <div className="project-compact-meta-row">
                      <span className="project-meta-pill">
                        <CheckCircle2 size={12} />
                        <span>
                          {tasks.filter((task) => task.status === 'selesai').length} /{' '}
                          {tasks.filter((task) => task.status !== 'dibatalkan').length} tugas
                          selesai
                        </span>
                      </span>
                      {openIssues.length > 0 ? (
                        <span className="project-meta-pill issue-warning">
                          <AlertCircle size={12} /> {openIssues.length} kendala
                        </span>
                      ) : (
                        <span className="project-meta-pill issue-ok">
                          <ShieldCheck size={12} /> Terkendali
                        </span>
                      )}
                      {Boolean(row.data.target_date) && (
                        <span className="project-meta-pill date-pill">
                          <Calendar size={12} /> {formatDate(String(row.data.target_date))}
                        </span>
                      )}
                    </div>

                    {nextTask && (
                      <div className="project-compact-next">
                        <span className="next-label">Langkah berikut:</span>
                        <strong className="next-title">{nextTask.title}</strong>
                        <small className="next-date">({formatDate(nextTask.due_date)})</small>
                      </div>
                    )}
                  </Link>
                );
              })}
          </div>

          {!projects.length ? (
            <EmptyState
              icon={<FolderOpen size={28} />}
              title="Belum ada proyek kerja"
              description="Buat proyek untuk mengelompokkan tugas, milestone, dan dokumen inisiatif koperasi secara teratur."
              pastelVariant="blue"
              action={{
                label: 'Buat Proyek Pertama',
                onClick: () => setEdit(null),
                icon: <Plus size={16} />,
              }}
            />
          ) : !projects.some(
              (row) =>
                (!status || (row.data.status || 'rencana') === status) &&
                `${row.data.title} ${row.data.description || ''}`
                  .toLocaleLowerCase('id')
                  .includes(search.toLocaleLowerCase('id')),
            ) ? (
            <EmptyState
              icon={<Search size={26} />}
              title="Tidak ada proyek yang cocok"
              description="Coba gunakan kata kunci lain atau bersihkan penyaring status proyek."
              pastelVariant="amber"
              action={{
                label: 'Tampilkan Semua Proyek',
                onClick: () => {
                  setSearch('');
                  setStatus('');
                },
              }}
            />
          ) : null}
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
