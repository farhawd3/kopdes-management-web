'use client';
import Link from 'next/link';
import { WeeklyReview } from './WeeklyReview';
import { useState } from 'react';
import { ArrowUpRight, CircleCheck, ListFilter } from 'lucide-react';
import { getFollowUps } from './workspace-navigation';
import type { Workspace } from './useWorkspace';
import { today } from '@/lib/date';

export function FollowUps({ data, compact = false }: { data: Workspace; compact?: boolean }) {
  const [kind, setKind] = useState('');
  const items = getFollowUps(data, today());
  const visible = items.filter((item) => !kind || item.kind === kind);
  return (
    <div>
      <section className="follow-up-panel" aria-label="Perlu perhatian">
        <div className="section-head">
          <div>
            <small>TINDAK LANJUT</small>
            <h2>
              Perlu perhatian <span className="count-pill">{items.length}</span>
            </h2>
          </div>
          {compact && (
            <Link href="/tindak-lanjut">
              Lihat semua <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
        <p>Tugas, dokumen, kendala, dan persediaan yang perlu diperiksa.</p>
        {!compact && (
          <label className="follow-up-filter">
            <ListFilter size={16} /> Jenis catatan
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="">Semua</option>
              {[...new Set(items.map((item) => item.kind))].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
        <div className="follow-up-list">
          {(compact ? visible.slice(0, 4) : visible).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`follow-up-row ${item.urgent ? 'is-urgent' : ''}`}
            >
              <span className="follow-up-marker" aria-hidden="true" />
              <div>
                <small>{item.kind}</small>
                <strong>{item.title}</strong>
                <span>{item.reason}</span>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
        {!visible.length && (
          <div className="follow-up-empty">
            <CircleCheck size={24} />
            <span>Tidak ada catatan yang perlu diperiksa saat ini.</span>
          </div>
        )}
        {!compact && (
          <small>
            Daftar mengikuti data tersimpan. Selisih opname tidak mengubah stok buku secara
            otomatis.
          </small>
        )}
      </section>
      {!compact && <WeeklyReview data={data} />}
    </div>
  );
}
