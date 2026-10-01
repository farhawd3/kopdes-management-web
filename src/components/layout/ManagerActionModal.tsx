'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Package,
  ClipboardCheck,
  CheckSquare,
  Calendar,
  BarChart3,
  ShieldAlert,
  X,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export type ActionItem = {
  id: string;
  title: string;
  desc: string;
  href: string;
  badge: string;
  badgeCls: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  keyShortcut: string;
};

const actions: ActionItem[] = [
  {
    id: 'cash-in',
    title: 'Catat Kas Masuk',
    desc: 'Simpanan anggota, penjualan tunai gerai, atau penerimaan dana.',
    href: '/keuangan?baru=1&arah=masuk',
    badge: 'Kas Masuk',
    badgeCls: 'badge-in',
    Icon: TrendingUp,
    keyShortcut: '1',
  },
  {
    id: 'cash-out',
    title: 'Catat Kas Keluar',
    desc: 'Belanja stok barang, biaya operasional toko, atau beban usaha.',
    href: '/keuangan?baru=1&arah=keluar',
    badge: 'Kas Keluar',
    badgeCls: 'badge-out',
    Icon: TrendingDown,
    keyShortcut: '2',
  },
  {
    id: 'add-member',
    title: 'Tambah Anggota Baru',
    desc: 'Catat nama, nomor anggota, dan status keanggotaan.',
    href: '/anggota?baru=1',
    badge: 'Keanggotaan',
    badgeCls: 'badge-member',
    Icon: Users,
    keyShortcut: '3',
  },
  {
    id: 'add-item',
    title: 'Tambah barang',
    desc: 'Catat barang, harga, dan batas stok minimum.',
    href: '/barang?baru=1',
    badge: 'Persediaan',
    badgeCls: 'badge-item',
    Icon: Package,
    keyShortcut: '4',
  },
  {
    id: 'stock-count',
    title: 'Hitung Stok Fisik (Opname)',
    desc: 'Catat hasil hitung fisik persediaan barang gerai toko.',
    href: '/stok-opname?baru=1',
    badge: 'Opname',
    badgeCls: 'badge-count',
    Icon: ClipboardCheck,
    keyShortcut: '5',
  },
  {
    id: 'add-task',
    title: 'Buat Tugas Baru',
    desc: 'Tugaskan pekerjaan penting dengan tenggat dan prioritas.',
    href: '/tugas?baru=1',
    badge: 'Pekerjaan',
    badgeCls: 'badge-task',
    Icon: CheckSquare,
    keyShortcut: '6',
  },
  {
    id: 'schedule-meeting',
    title: 'Jadwalkan Rapat',
    desc: 'Agenda koordinasi pengurus, pengawas, atau musyawarah warga.',
    href: '/rapat?baru=1',
    badge: 'Koordinasi',
    badgeCls: 'badge-meeting',
    Icon: Calendar,
    keyShortcut: '7',
  },
  {
    id: 'generate-report',
    title: 'Buat laporan',
    desc: 'Simpan ringkasan pekerjaan untuk periode pilihan.',
    href: '/laporan',
    badge: 'Laporan',
    badgeCls: 'badge-report',
    Icon: BarChart3,
    keyShortcut: '8',
  },
  {
    id: 'record-risk',
    title: 'Catat Risiko / Kendala',
    desc: 'Identifikasi potensi masalah di lapangan dan rencana mitigasinya.',
    href: '/risiko?baru=1',
    badge: 'Mitigasi',
    badgeCls: 'badge-risk',
    Icon: ShieldAlert,
    keyShortcut: '9',
  },
];

export function ManagerActionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      const match = actions.find((a) => a.keyShortcut === e.key);
      if (match && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onClose();
        router.push(match.href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, router]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <dialog
      ref={dialogRef}
      className="manager-action-dialog"
      aria-labelledby="action-modal-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onClose={onClose}
    >
      <div className="action-modal-container">
        <header className="action-modal-header">
          <div>
            <div className="action-modal-badge">Superapp KDMP Puntukrejo</div>
            <h2 id="action-modal-title">Tambah catatan</h2>
            <p>
              Pilih tindakan yang ingin segera dilakukan. Tekan angka <kbd>1</kbd> s.d. <kbd>9</kbd>{' '}
              untuk memilih instan.
            </p>
          </div>
          <button className="action-modal-close" onClick={onClose} aria-label="Tutup menu aksi">
            <X size={20} />
          </button>
        </header>

        <div className="action-modal-grid">
          {actions.map((item) => {
            const { id, title, desc, href, badge, badgeCls, Icon, keyShortcut } = item;
            return (
              <button
                key={id}
                type="button"
                className="action-card-btn"
                onClick={() => handleSelect(href)}
              >
                <div className="action-card-top">
                  <span className={`action-badge ${badgeCls}`}>{badge}</span>
                  <kbd className="action-key">{keyShortcut}</kbd>
                </div>
                <div className="action-card-main">
                  <div className="action-icon-squircle">
                    <Icon size={20} />
                  </div>
                  <div className="action-text">
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
                <div className="action-card-footer">
                  <span>Buka formulir</span>
                  <ArrowRight size={14} className="action-arrow" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </dialog>
  );
}
