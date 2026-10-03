'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWorkspace } from './useWorkspace';
import { pages, catalog } from './catalog';
import { Records } from './Records';
import { Dashboard } from './Dashboard';
import { Editor } from './Editor';
import { Operations, recordingPaths } from './Operations';
import { useRouter, useSearchParams } from 'next/navigation';
import { FollowUps } from './FollowUps';
import { TodayView } from './TodayView';
import type { Entity, Item } from './schemas';
import { schemas } from './schemas';
import { today } from '@/lib/date';
import { SkeletonLoading } from '@/components/ui/SkeletonLoading';
import { pageEntities } from './workspace-scope';
const Roadmap = dynamic(() => import('./Roadmap').then((module) => module.Roadmap), {
  loading: () => <SkeletonLoading slug="roadmap" />,
});
const Settings = dynamic(() => import('./Settings').then((module) => module.Settings), {
  loading: () => <SkeletonLoading slug="pengaturan" />,
});
const Reports = dynamic(() => import('./Reports').then((module) => module.Reports), {
  loading: () => <SkeletonLoading slug="laporan" />,
});
const Projects = dynamic(() => import('./Projects').then((module) => module.Projects), {
  loading: () => <SkeletonLoading slug="proyek" />,
});
export function WorkspacePage({ slug }: { slug: string }) {
  const query = useSearchParams();
  const router = useRouter();
  const requestedSection = query.get('bagian');
  const taskScope = ['selesai', 'dibatalkan'].includes(query.get('status') || '')
    ? 'history'
    : 'current';
  const requestedRecord =
    query.get('record') || query.get('task') || (slug === 'proyek' ? query.get('id') : null);
  const selectedEntity = (
    query.get('task')
      ? 'work-items'
      : slug === 'proyek' && query.get('id')
        ? 'workstreams'
        : query.get('bagian') || pages[slug]?.[0]
  ) as Entity | undefined;
  const detail =
    requestedRecord &&
    selectedEntity &&
    pageEntities(slug).includes(selectedEntity) &&
    /^[a-f\d-]{36}$/i.test(requestedRecord)
      ? { entity: selectedEntity, id: requestedRecord }
      : undefined;
  const { data, loading, error, refresh, operations, more, loadMore, fetching } = useWorkspace(
      slug,
      { scope: taskScope },
      detail,
    ),
    [tabChoice, setTabChoice] = useState<{ section: string | null; index: number } | null>(null),
    [draft, setDraft] = useState<Item>();
  useEffect(() => {
    const callback = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setDraft({
        id: '',
        created_at: '',
        updated_at: '',
        data: schemas['work-items'].parse({ title: 'Tugas baru', ...detail, due_date: today() }),
      });
    };
    window.addEventListener('hub-task', callback);
    return () => window.removeEventListener('hub-task', callback);
  }, []);
  const sectionIndex = pages[slug]?.findIndex((entity) => entity === requestedSection) ?? -1;
  const tab = tabChoice?.section === requestedSection ? tabChoice.index : Math.max(0, sectionIndex);
  if (loading) return <SkeletonLoading slug={slug} />;
  if (error)
    return (
      <section className="card empty">
        <h1>Ruang kerja belum dapat dimuat</h1>
        <p role="alert">{error}</p>
        <button onClick={() => void refresh()}>Coba lagi</button>
        <p>
          Data kosong tidak ditampilkan sebagai capaian. Periksa koneksi dan konfigurasi server.
        </p>
      </section>
    );
  return (
    <div className={`workspace-page page-${slug}`}>
      {slug === 'tugas' && (
        <div className="workspace-scope-control" role="group" aria-label="Rentang tugas">
          <button
            type="button"
            aria-pressed={taskScope === 'current'}
            onClick={() => {
              const next = new URLSearchParams(query.toString());
              next.delete('status');
              router.replace(`/tugas${next.size ? '?' + next.toString() : ''}`);
            }}
          >
            Aktif dan terbaru
          </button>
          <button
            type="button"
            aria-pressed={taskScope === 'history'}
            onClick={() => {
              const next = new URLSearchParams(query.toString());
              next.set('status', 'selesai');
              router.replace(`/tugas?${next.toString()}`);
            }}
          >
            Riwayat selesai
          </button>
        </div>
      )}
      {Object.keys(more).length > 0 && (
        <p className="workspace-partial-note">
          Menampilkan catatan yang sudah dimuat. Angka pada halaman ini dapat bertambah saat Anda
          memuat catatan lain.
        </p>
      )}
      {slug === 'tindak-lanjut' && <FollowUps data={data} />}
      {slug === 'beranda' && <Dashboard data={data} />}
      {slug === 'proyek' && <Projects data={data} refresh={refresh} />}
      {recordingPaths.includes(slug) && (
        <Operations
          key={slug + query.toString()}
          slug={slug}
          data={data}
          ready={operations}
          refresh={refresh}
        />
      )}
      {slug === 'roadmap' && <Roadmap data={data} refresh={refresh} />}
      {slug === 'laporan' && <Reports />}
      {slug === 'pengaturan' && <Settings refresh={refresh} />}
      {slug === 'hari-ini' && <TodayView workspace={data} refresh={refresh} />}
      {pages[slug] && (
        <>
          {pages[slug].length > 1 && (
            <div className="tabs" role="tablist" aria-label="Bagian halaman">
              {pages[slug].map((entity, index) => (
                <button
                  role="tab"
                  aria-selected={tab === index}
                  key={entity}
                  onClick={() => setTabChoice({ section: requestedSection, index })}
                >
                  {entity === 'organization'
                    ? 'Profil koperasi'
                    : entity === 'workstreams'
                      ? 'Bidang kerja'
                      : entity === 'decisions'
                        ? 'Keputusan'
                        : entity === 'meetings'
                          ? 'Rapat'
                          : entity === 'issues'
                            ? 'Isu lapangan'
                            : entity === 'risks'
                              ? 'Risiko'
                              : entity === 'interactions'
                                ? 'Riwayat interaksi'
                                : entity === 'trainings'
                                  ? 'Pelatihan'
                                  : entity === 'staff'
                                    ? 'Tim'
                                    : 'Mitra & kontak'}
                </button>
              ))}
            </div>
          )}
          <Records
            key={pages[slug][tab] + (query.get('record') || '') + (query.get('task') || '')}
            entity={pages[slug][tab]}
            workspace={data}
            refresh={refresh}
          />
          {more[pages[slug][tab]] !== undefined && (
            <button
              className="workspace-load-more"
              type="button"
              disabled={fetching !== null}
              onClick={() => void loadMore(pages[slug][tab])}
            >
              {fetching === pages[slug][tab]
                ? 'Memuat…'
                : `Muat 50 ${pages[slug][tab] === 'work-items' ? 'tugas' : 'catatan'} lagi`}
            </button>
          )}
        </>
      )}
      {slug === 'beranda' && more['work-items'] !== undefined && (
        <button
          className="workspace-load-more"
          type="button"
          disabled={fetching !== null}
          onClick={() => void loadMore('work-items')}
        >
          {fetching === 'work-items' ? 'Memuat…' : 'Muat 50 tugas lagi'}
        </button>
      )}
      {!pages[slug] && slug !== 'beranda' && Object.keys(more).length > 0 && (
        <details className="workspace-more-details">
          <summary>Catatan lain yang belum dimuat</summary>
          <div className="workspace-more-actions">
            {(Object.keys(more) as Entity[]).map((entity) => (
              <button
                className="workspace-load-more"
                key={entity}
                type="button"
                disabled={fetching !== null}
                onClick={() => void loadMore(entity)}
              >
                {fetching === entity
                  ? 'Memuat…'
                  : `Muat 50 ${catalog[entity].title.toLowerCase()} lagi`}
              </button>
            ))}
          </div>
        </details>
      )}
      {slug === 'panduan' && (
        <section className="card prose">
          <h2>Mulai dalam empat langkah</h2>
          <ol>
            <li>Buka Pengaturan, isi profil dan tanggal mulai kerja.</li>
            <li>
              Buat proyek sendiri. Tambahkan tujuan, catatan, dan tugas dengan jadwal pilihan Anda.
            </li>
            <li>Buka Hari Ini setiap pagi. Tuntaskan atau jadwalkan ulang tugas.</li>
            <li>Simpan snapshot laporan mingguan dan unduh cadangan JSON.</li>
          </ol>
          <h2>Koordinasi yang tercatat</h2>
          <p>
            Catat rapat dan keputusan, lalu gunakan tombol Tindak lanjut untuk membuat tugas. Simpan
            tautan dokumen, bukti kesiapan, serta mitigasi risiko.
          </p>
          <h2>Menjaga data</h2>
          <p>
            PIN tidak disimpan di browser. Kunci aplikasi setelah selesai. Jangan membagikan token
            pengaturan atau kunci server. Cadangan JSON mencakup catatan kerja dan snapshot laporan.
            Simpan juga laporan penting sebagai PDF.
          </p>
          <h2>Lingkup awal</h2>
          <p>
            Buka Gantt untuk memilih rentang dan skala. Seret batang atau ubah tanggal melalui nama
            tugas, lalu simpan jadwal. Catatan proyek mendukung judul, daftar, checklist, dan
            kutipan. Baseline, jalur kritis otomatis, kolaborasi real-time, dan offline belum
            tersedia.
          </p>
        </section>
      )}
      {draft && (
        <Editor
          entity="work-items"
          item={draft}
          workspace={data}
          onClose={() => setDraft(undefined)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
