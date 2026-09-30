'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FolderOpen, ArrowUpRight, Plus, Flag } from 'lucide-react';
import { ProjectNotes } from './ProjectNotes';
import { Editor } from './Editor';
import { Records } from './Records';
import { schemas, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { scopeProgress } from '@/lib/progress';
import { formatDate } from '@/lib/date';
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
            <p>
              {String(
                selected.data.description ||
                  'Tambahkan tujuan proyek agar setiap tugas memiliki arah yang jelas.',
              )}
            </p>
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
            <ProjectNotes key={selected.id} project={selected} refresh={refresh} />
            <section className="card">
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
              <span className="eyebrow">DARI RENCANA KE HASIL</span>
              <h2>Setiap proyek, satu ruang kerja.</h2>
              <p>
                Hubungkan tujuan, catatan, dan tugas. Mulai dari satu langkah yang bisa dikerjakan.
              </p>
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
                    <p>
                      {String(
                        row.data.description || 'Tujuan, catatan, dan seluruh pekerjaan terkait.',
                      )}
                    </p>
                    <Meter value={scopeProgress(tasks)} />
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
              <h3>Ruang untuk rencana berikutnya</h3>
              <p>Tentukan nama, tujuan, dan tanggal proyek Anda. Tambahkan tugas kapan saja.</p>
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
