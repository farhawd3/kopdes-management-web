'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FolderOpen, ArrowUpRight, Plus, FileText, Flag } from 'lucide-react';
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
            <section className="card">
              <h3>
                <FileText size={18} /> Catatan proyek
              </h3>
              <p className="record-text">
                {String(
                  selected.data.notes ||
                    'Simpan ringkasan, hasil diskusi, dan keputusan penting melalui Ubah proyek.',
                )}
              </p>
            </section>
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
                Kelola di roadmap →
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
          <div className="project-grid">
            {projects
              .filter((row) =>
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
                    <span className="eyebrow">{String(row.data.code)}</span>
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
              <p>Buat proyek pertama, atau pasang template 90 hari di Pengaturan.</p>
              <Link className="text-link" href="/pengaturan">
                Buka pengaturan →
              </Link>
            </div>
          )}
          {projects.length > 0 &&
            !projects.some((row) =>
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
