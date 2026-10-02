'use client';
import Link from 'next/link';
import { WeeklyReview } from './WeeklyReview';
import { useState } from 'react';
import { ArrowUpRight, ListFilter, ShieldCheck } from 'lucide-react';
import { getFollowUps } from './workspace-navigation';
import type { Workspace } from './useWorkspace';
import { today } from '@/lib/date';
import { Select } from '@/components/ui/Select';

export function FollowUps({ data, compact = false }: { data: Workspace; compact?: boolean }) {
  const [kind, setKind] = useState('');
  const items = getFollowUps(data, today());
  const distinctKinds = [...new Set(items.map((item) => item.kind))];
  const visible = items.filter((item) => !kind || item.kind === kind);

  return (
    <div className="follow-up-wrapper">
      <section className="follow-up-panel" aria-label="Perlu perhatian">
        <div className="section-head">
          <div>
            <span className="panel-badge-subtle">
              {compact ? 'TINDAK LANJUT' : 'PRIORITAS EVALUASI'}
            </span>
            <h2>
              {compact ? 'Perlu perhatian' : 'Catatan Perlu Perhatian'}{' '}
              <span className="count-pill">{items.length}</span>
            </h2>
          </div>
          {compact && (
            <Link href="/tindak-lanjut" className="follow-up-all-link">
              Lihat semua <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
        <p className="follow-up-description">
          Tugas, dokumen, kendala, dan persediaan yang memerlukan pemeriksaan atau tindakan manajer.
        </p>

        {!compact && (
          <div className="follow-up-toolbar">
            <div className="follow-up-filter-group">
              <span className="follow-up-filter-label">
                <ListFilter size={14} /> Jenis catatan
              </span>
              <Select
                value={kind}
                onChange={setKind}
                options={[
                  { value: '', label: 'Semua Catatan' },
                  ...distinctKinds.map((k) => ({ value: k, label: k })),
                ]}
                ariaLabel="Pilih jenis catatan"
              />
            </div>
            <span className="follow-up-count-badge">
              {visible.length} dari {items.length} catatan
            </span>
          </div>
        )}

        <div className="follow-up-list">
          {(compact ? visible.slice(0, 4) : visible).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`follow-up-row ${item.urgent ? 'is-urgent' : ''}`}
            >
              <span className="follow-up-marker" aria-hidden="true" />
              <div className="follow-up-row-content">
                <small className="follow-up-kind">{item.kind}</small>
                <strong className="follow-up-title">{item.title}</strong>
                <span className="follow-up-reason">{item.reason}</span>
              </div>
              <ArrowUpRight size={18} className="follow-up-arrow" />
            </Link>
          ))}
        </div>

        {!visible.length && (
          <div className="follow-up-empty-card">
            <div className="follow-up-empty-icon">
              <ShieldCheck size={26} />
            </div>
            <div className="follow-up-empty-text">
              <strong>Belum ada tindak lanjut pada catatan yang dimuat</strong>
              <p>Periksa riwayat dan muat catatan lain bila Anda mencari pekerjaan lama.</p>
            </div>
          </div>
        )}

        {!compact && (
          <div className="follow-up-footer-note">
            <small>
              Daftar mengikuti data tersimpan. Selisih opname tidak mengubah stok buku secara
              otomatis.
            </small>
          </div>
        )}
      </section>

      {!compact && <WeeklyReview data={data} />}
    </div>
  );
}
