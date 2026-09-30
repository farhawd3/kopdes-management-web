'use client';
import { useEffect, useState } from 'react';
import { useWorkspace } from './useWorkspace';
import { pages, navigation } from './catalog';
import { Records } from './Records';
import { Dashboard } from './Dashboard';
import { Roadmap } from './Roadmap';
import { Settings } from './Settings';
import { Reports } from './Reports';
import { Editor } from './Editor';
import { Projects } from './Projects';
import { Operations, recordingPaths } from './Operations';
import type { Item } from './schemas';
import { schemas } from './schemas';
import { today, addDays } from '@/lib/date';
import { SkeletonLoading } from '@/components/ui/SkeletonLoading';
export function WorkspacePage({ slug }: { slug: string }) {
  const { data, loading, error, refresh, operations } = useWorkspace(),
    [tab, setTab] = useState(0),
    [draft, setDraft] = useState<Item>();
  useEffect(() => {
    const callback = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setDraft({
        id: '',
        created_at: '',
        updated_at: '',
        data: schemas['work-items'].parse({ ...detail, due_date: today() }),
      });
    };
    window.addEventListener('hub-task', callback);
    return () => window.removeEventListener('hub-task', callback);
  }, []);
  const title = navigation.find(([path]) => path === `/${slug}`)?.[1] || 'Ruang kerja';
  if (loading) return <SkeletonLoading />;
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
    <>
      {slug !== 'beranda' && (
        <div className="page-heading">
          <span className="eyebrow">
            {recordingPaths.includes(slug) ? 'PENCATATAN' : 'RUANG KERJA'} / {title.toUpperCase()}
          </span>
          <h1>{title}</h1>
        </div>
      )}
      {slug === 'beranda' && <Dashboard data={data} />}
      {slug === 'proyek' && <Projects data={data} refresh={refresh} />}
      {recordingPaths.includes(slug) && (
        <Operations key={slug} slug={slug} data={data} ready={operations} refresh={refresh} />
      )}
      {slug === 'roadmap' && <Roadmap data={data} refresh={refresh} />}
      {slug === 'laporan' && <Reports />}
      {slug === 'pengaturan' && <Settings refresh={refresh} />}
      {slug === 'hari-ini' && (
        <>
          {[
            ['Terlambat', (value: string) => value < today()],
            ['Hari ini', (value: string) => value === today()],
            ['Menyusul 7 hari', (value: string) => value > today() && value <= addDays(today(), 7)],
          ].map(([label, predicate]) => (
            <section key={String(label)}>
              <h2>{String(label)}</h2>
              <Records
                entity="work-items"
                workspace={{
                  ...data,
                  'work-items': (data['work-items'] || []).filter(
                    (row) =>
                      !['selesai', 'dibatalkan'].includes(String(row.data.status)) &&
                      (predicate as (v: string) => boolean)(String(row.data.due_date)),
                  ),
                }}
                refresh={refresh}
              />
            </section>
          ))}
          <h2>Agenda rapat hari ini</h2>
          <Records
            entity="meetings"
            workspace={{
              ...data,
              meetings: (data.meetings || []).filter((row) => row.data.date === today()),
            }}
            refresh={refresh}
          />
        </>
      )}
      {pages[slug] && (
        <>
          {pages[slug].length > 1 && (
            <div className="tabs" role="tablist" aria-label="Bagian halaman">
              {pages[slug].map((entity, index) => (
                <button
                  role="tab"
                  aria-selected={tab === index}
                  key={entity}
                  onClick={() => setTab(index)}
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
                                    : 'Pemangku kepentingan'}
                </button>
              ))}
            </div>
          )}
          <Records
            key={pages[slug][tab]}
            entity={pages[slug][tab]}
            workspace={data}
            refresh={refresh}
          />
        </>
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
    </>
  );
}
