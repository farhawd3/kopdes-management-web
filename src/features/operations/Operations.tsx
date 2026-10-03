'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowUpRight,
  Plus,
  Users,
  User,
  Wallet,
  Package,
  ClipboardCheck,
  Download,
  Search,
  FilePenLine,
} from 'lucide-react';
import { Editor } from '../Editor';
import { catalog, labels, formatChoiceLabel } from '../catalog';
import { type Entity, type Item } from '../schemas';
import type { Workspace } from '../workspace/useWorkspace';
import { cashSummary, csvCell, rupiah, stockDifference } from './ledger';
import { formatDate, today } from '@/lib/date';
import { Select } from '@/components/ui/Select';
const INDO_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function getIndonesianMonthOptions(dates: string[]): { value: string; label: string }[] {
  const current = new Date();
  const monthsSet = new Set<string>();

  for (let i = 0; i < 12; i++) {
    const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthsSet.add(key);
  }

  for (let i = 1; i <= 2; i++) {
    const d = new Date(current.getFullYear(), current.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthsSet.add(key);
  }

  dates.forEach((d) => {
    if (d && typeof d === 'string' && /^\d{4}-\d{2}/.test(d)) {
      monthsSet.add(d.slice(0, 7));
    }
  });

  const thisMonthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
  const sorted = Array.from(monthsSet).sort().reverse();

  return [
    { value: '', label: 'Semua Bulan' },
    ...sorted.map((key) => {
      const [y, m] = key.split('-');
      const monthName = INDO_MONTHS[parseInt(m, 10) - 1] || m;
      const isCurrent = key === thisMonthKey;
      return {
        value: key,
        label: `${monthName} ${y}${isCurrent ? ' (Bulan Ini)' : ''}`,
      };
    }),
  ];
}

const modules = [
  {
    path: 'anggota',
    entity: 'members',
    title: 'Anggota',
    description: 'Nama, nomor anggota, dan status keanggotaan.',
    Icon: Users,
  },
  {
    path: 'keuangan',
    entity: 'cash-entries',
    title: 'Buku kas',
    description: 'Uang masuk, uang keluar, dan bukti transaksi.',
    Icon: Wallet,
  },
  {
    path: 'barang',
    entity: 'inventory-items',
    title: 'Barang',
    description: 'Kode barang, satuan, dan stok buku.',
    Icon: Package,
  },
  {
    path: 'stok-opname',
    entity: 'stock-counts',
    title: 'Stok opname',
    description: 'Hasil hitung fisik dan selisih stok.',
    Icon: ClipboardCheck,
  },
] as const;
export const recordingPaths = ['pencatatan', ...modules.map((entry) => entry.path)];
export function Operations({
  slug,
  data,
  ready,
  refresh,
}: {
  slug: string;
  data: Workspace;
  ready: boolean;
  refresh: () => Promise<void>;
}) {
  const book = modules.find((entry) => entry.path === slug);
  const query = useSearchParams();
  const router = useRouter();
  const [edit, setEdit] = useState<Item | null | undefined>(() => {
    const requested = book && data[book.entity]?.find((row) => row.id === query.get('record'));
    if (ready && requested) return requested;
    const product = data['inventory-items']?.find((row) => row.id === query.get('barang'));
    if (ready && slug === 'stok-opname' && product) {
      return {
        id: '',
        created_at: '',
        updated_at: '',
        data: {
          title: `Opname ${product.data.title}`,
          item_id: product.id,
          date: today(),
          book_quantity: product.data.book_quantity,
          assignee: '',
          notes: '',
        },
      };
    }
    if (ready && book && query.get('baru') === '1') {
      return {
        id: '',
        created_at: '',
        updated_at: '',
        data: {
          title: '',
          date: today(),
          ...(book.entity === 'cash-entries'
            ? { direction: query.get('arah') === 'keluar' ? 'keluar' : 'masuk' }
            : {}),
        },
      };
    }
    return undefined;
  });

  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [filter, setFilter] = useState('');
  const [unit, setUnit] = useState('');
  const [captureEntity, setCaptureEntity] = useState<Entity>();
  const entity = book?.entity || captureEntity;
  const recent = modules
    .flatMap((entry) => (data[entry.entity] || []).map((row) => ({ row, entry })))
    .filter(({ row, entry }) =>
      `${row.data.title} ${entry.title}`
        .toLocaleLowerCase('id')
        .includes(search.toLocaleLowerCase('id')),
    )
    .sort((a, b) => b.row.updated_at.localeCompare(a.row.updated_at))
    .slice(0, 8);
  const all = entity ? data[entity] || [] : [];
  const rows = all
    .filter(
      (row) =>
        JSON.stringify(row.data).toLocaleLowerCase('id').includes(search.toLocaleLowerCase('id')) &&
        (!month || String(row.data.date).startsWith(month)) &&
        (!filter || row.data.status === filter || row.data.direction === filter) &&
        (!unit ||
          row.data.unit_id === unit ||
          data['inventory-items']?.find((item) => item.id === row.data.item_id)?.data.unit_id ===
            unit),
    )
    .sort((a, b) =>
      String(b.data.date || b.updated_at).localeCompare(String(a.data.date || a.updated_at)),
    );
  const allDates = all.map((r) => String(r.data.date || r.data.created_at || ''));
  const monthOptions = getIndonesianMonthOptions(allDates);
  const summary = cashSummary(entity === 'cash-entries' ? rows : []);

  function display(row: Item, field: string) {
    if (field === 'amount') return rupiah(Number(row.data.amount));
    if (field === 'price') return rupiah(Number(row.data.price || 0));
    if (field === 'date') return formatDate(String(row.data.date));
    if (field === 'item_id')
      return String(
        data['inventory-items']?.find((item) => item.id === row.data.item_id)?.data.title ||
          'Barang tidak ditemukan',
      );
    if (field === 'unit_id')
      return String(
        data.units?.find((item) => item.id === row.data.unit_id)?.data.title || 'Tidak ditentukan',
      );
    if (field === 'difference') return stockDifference(row).toLocaleString('id-ID');
    if (field === 'cash_summary') {
      const memberEntries = (data['cash-entries'] || []).filter((c) => c.data.member_id === row.id);
      return `${memberEntries.length} transaksi`;
    }
    if (field === 'relation') {
      const m = row.data.member_id ? data.members?.find((x) => x.id === row.data.member_id) : null;
      const i = row.data.item_id
        ? data['inventory-items']?.find((x) => x.id === row.data.item_id)
        : null;
      return (
        [m ? `Anggota: ${m.data.title}` : '', i ? `Barang: ${i.data.title}` : '']
          .filter(Boolean)
          .join('; ') || '—'
      );
    }
    if (field === 'stock_status') {
      const qty = Number(row.data.book_quantity || 0);
      const min = Number(row.data.minimum_quantity || 0);
      return qty <= 0 ? 'Habis' : qty <= min ? 'Menipis' : 'Aman';
    }
    return String(row.data[field] ?? '—');
  }

  function getColumnClass(field: string): string {
    if (
      [
        'amount',
        'book_quantity',
        'minimum_quantity',
        'counted_quantity',
        'difference',
        'price',
      ].includes(field)
    ) {
      return 'col-num';
    }
    if (['direction', 'status', 'stock_status'].includes(field)) {
      return 'col-badge';
    }
    if (field === 'date') {
      return 'col-date';
    }
    if (field === 'sku' || field === 'member_number') {
      return 'col-code';
    }
    if (field === 'cash_summary' || field === 'relation') {
      return 'col-relation';
    }
    return 'col-text';
  }

  function renderCell(row: Item, field: string) {
    if (field === 'title') {
      const member = row.data.member_id
        ? data.members?.find((m) => m.id === row.data.member_id)
        : null;
      const item = row.data.item_id
        ? data['inventory-items']?.find((i) => i.id === row.data.item_id)
        : null;
      return (
        <button
          type="button"
          className="table-title"
          onClick={() => setEdit(row)}
          title="Klik untuk mengubah catatan"
        >
          <span className="table-title-text">{display(row, field)}</span>
          {entity === 'cash-entries' && (member || item) && (
            <span className="table-title-subtitle">
              {member && (
                <span className="inline-flex items-center gap-1">
                  <User size={12} className="inline-icon" />
                  {String(member.data.title)}
                </span>
              )}
              {member && item && ' · '}
              {item && (
                <span className="inline-flex items-center gap-1">
                  <Package size={12} className="inline-icon" />
                  {String(item.data.title)}
                </span>
              )}
            </span>
          )}
        </button>
      );
    }
    if (field === 'status' && entity === 'members') {
      const isAktif = row.data.status === 'aktif';
      return (
        <span className={`table-badge ${isAktif ? 'badge-active' : 'badge-inactive'}`}>
          {isAktif ? 'Aktif' : 'Nonaktif'}
        </span>
      );
    }
    if (field === 'cash_summary' && entity === 'members') {
      const memberEntries = (data['cash-entries'] || []).filter((c) => c.data.member_id === row.id);
      const totalIn = memberEntries
        .filter((c) => c.data.direction === 'masuk')
        .reduce((sum, c) => sum + Number(c.data.amount || 0), 0);
      return (
        <div className="table-cash-summary">
          <span className="cash-count-badge">
            {memberEntries.length ? `${memberEntries.length} transaksi` : 'Belum ada'}
          </span>
          {totalIn > 0 && <small className="cash-sum-val">{rupiah(totalIn)}</small>}
        </div>
      );
    }
    if (field === 'direction' && entity === 'cash-entries') {
      const isMasuk = row.data.direction === 'masuk';
      return (
        <span className={`table-badge ${isMasuk ? 'badge-income' : 'badge-expense'}`}>
          {isMasuk ? '+ Masuk' : '- Keluar'}
        </span>
      );
    }
    if (field === 'amount' && entity === 'cash-entries') {
      const isMasuk = row.data.direction === 'masuk';
      return (
        <span className={`table-amount ${isMasuk ? 'amount-in' : 'amount-out'}`}>
          {isMasuk ? '+ ' : '- '}
          {rupiah(Number(row.data.amount))}
        </span>
      );
    }
    if (field === 'relation' && entity === 'cash-entries') {
      const member = row.data.member_id
        ? data.members?.find((m) => m.id === row.data.member_id)
        : null;
      const item = row.data.item_id
        ? data['inventory-items']?.find((i) => i.id === row.data.item_id)
        : null;
      if (!member && !item) {
        return <span className="relation-empty">—</span>;
      }
      return (
        <div className="table-relations-pill-group">
          {member && (
            <span className="relation-pill member-pill" title={`Anggota: ${member.data.title}`}>
              <Users size={12} />
              <span>{String(member.data.title)}</span>
            </span>
          )}
          {item && (
            <span className="relation-pill item-pill" title={`Barang: ${item.data.title}`}>
              <Package size={12} />
              <span>{String(item.data.title)}</span>
            </span>
          )}
        </div>
      );
    }
    if (field === 'price' && entity === 'inventory-items') {
      const priceVal = Number(row.data.price || 0);
      return <span className="table-price-val">{priceVal > 0 ? rupiah(priceVal) : '—'}</span>;
    }
    if (field === 'stock_status' && entity === 'inventory-items') {
      const qty = Number(row.data.book_quantity || 0);
      const minQty = Number(row.data.minimum_quantity || 0);
      const lastOpname = (data['stock-counts'] || [])
        .filter((c) => c.data.item_id === row.id)
        .sort((a, b) =>
          String(b.data.date || b.updated_at).localeCompare(String(a.data.date || a.updated_at)),
        )[0];

      let statusBadge = null;
      if (qty <= 0) {
        statusBadge = <span className="table-badge badge-diff-minus">Habis (0)</span>;
      } else if (qty <= minQty) {
        statusBadge = <span className="table-badge badge-warning">Menipis (≤ {minQty})</span>;
      } else {
        statusBadge = <span className="table-badge badge-active">Aman</span>;
      }

      return (
        <div className="table-stock-status">
          {statusBadge}
          {lastOpname && (
            <small className="last-opname-hint">
              Opname:{' '}
              {stockDifference(lastOpname) === 0
                ? 'Sesuai'
                : stockDifference(lastOpname) > 0
                  ? `+${stockDifference(lastOpname)}`
                  : stockDifference(lastOpname)}
            </small>
          )}
        </div>
      );
    }
    if (field === 'item_id' && entity === 'stock-counts') {
      const product = data['inventory-items']?.find((item) => item.id === row.data.item_id);
      return (
        <div className="table-opname-item">
          <strong>{product ? String(product.data.title) : 'Barang tidak ditemukan'}</strong>
          {product && (
            <small className="opname-item-sku">
              {String(product.data.sku || '—')} · Satuan:{' '}
              {String(product.data.measurement || 'unit')}
            </small>
          )}
        </div>
      );
    }
    if (field === 'difference' && entity === 'stock-counts') {
      const diff = stockDifference(row);
      if (diff === 0) {
        return <span className="table-badge badge-diff-zero">Sesuai (0)</span>;
      }
      if (diff < 0) {
        return (
          <span className="table-badge badge-diff-minus">
            Kurang ({diff.toLocaleString('id-ID')})
          </span>
        );
      }
      return (
        <span className="table-badge badge-diff-plus">Lebih (+{diff.toLocaleString('id-ID')})</span>
      );
    }
    if (field === 'sku' || field === 'member_number') {
      return <code className="table-code">{display(row, field)}</code>;
    }
    if (['book_quantity', 'minimum_quantity', 'counted_quantity'].includes(field)) {
      const qty = Number(row.data[field] ?? 0);
      const isLowStock =
        entity === 'inventory-items' &&
        field === 'book_quantity' &&
        qty <= Number(row.data.minimum_quantity);
      return (
        <span className={`table-num ${isLowStock ? 'num-warning' : ''}`}>
          {qty.toLocaleString('id-ID')}
          {isLowStock && (
            <span className="low-stock-dot" title="Stok mencapai batas minimum">
              {' '}
              !
            </span>
          )}
        </span>
      );
    }
    if (field === 'date') {
      return <span className="table-date">{display(row, field)}</span>;
    }
    if (field === 'account') {
      return <span className="table-account-tag">{display(row, field)}</span>;
    }
    return display(row, field);
  }

  const columns =
    entity === 'members'
      ? ['title', 'member_number', 'date', 'contact', 'cash_summary', 'status']
      : entity === 'cash-entries'
        ? ['date', 'title', 'direction', 'amount', 'account', 'relation', 'unit_id']
        : entity === 'inventory-items'
          ? ['title', 'sku', 'unit_id', 'measurement', 'price', 'book_quantity', 'stock_status']
          : ['date', 'item_id', 'book_quantity', 'counted_quantity', 'difference', 'assignee'];
  function exportCsv() {
    const text = [
      columns.map((field) => csvCell(field === 'difference' ? 'Selisih' : labels[field])).join(','),
      ...rows.map((row) => columns.map((field) => csvCell(display(row, field))).join(',')),
    ].join('\r\n');
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + text], { type: 'text/csv;charset=utf-8;' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${slug}-${today()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <nav className="recording-tabs" aria-label="Halaman pencatatan">
        <Link href="/pencatatan" aria-current={!book ? 'page' : undefined}>
          Ringkasan
        </Link>
        {modules.map(({ path, title, Icon }) => (
          <Link key={path} href={'/' + path} aria-current={path === slug ? 'page' : undefined}>
            <Icon size={16} />
            {title}
          </Link>
        ))}
      </nav>
      {!ready && (
        <section className="activation-notice">
          <FilePenLine size={24} />
          <div>
            <h2>Pencatatan belum diaktifkan</h2>
            <p>
              Halaman sudah tersedia. Database perlu diperbarui sebelum Anda dapat menyimpan
              anggota, transaksi, barang, dan opname.
            </p>
            <small>
              Panduan aktivasi: docs/PENCATATAN.md · Data proyek dan tugas tetap dapat digunakan.
            </small>
          </div>
        </section>
      )}
      {!book ? (
        <>
          <div className="notebook-toolbar">
            <div>
              <h2>Buku pencatatan</h2>
              <p>Anggota, kas, dan persediaan.</p>
            </div>
            <label className="notebook-search">
              <Search size={16} />
              <input
                aria-label="Cari catatan terakhir"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari catatan terakhir…"
              />
            </label>
          </div>
          <div className="notebook-layout">
            <section className="notebook-index" aria-label="Buku pencatatan">
              {modules.map(({ path, entity, title, description, Icon }, index) => (
                <article className="notebook-row" key={path}>
                  <Link className="notebook-link" href={'/' + path} title={`Buka buku ${title}`}>
                    <div className={`notebook-spine spine-${index}`}>
                      <Icon size={22} />
                    </div>
                    <div className="notebook-text">
                      <div className="notebook-title-wrap">
                        <strong className="notebook-card-title">{title}</strong>
                        <span className="notebook-count">
                          {ready ? `${(data[entity] || []).length} data` : '—'}
                        </span>
                      </div>
                      <small className="notebook-desc">{description}</small>
                    </div>
                  </Link>

                  <div className="notebook-actions">
                    <button
                      className="notebook-add-btn"
                      disabled={
                        !ready || (entity === 'stock-counts' && !data['inventory-items']?.length)
                      }
                      title={
                        entity === 'stock-counts' && !data['inventory-items']?.length
                          ? 'Tambahkan barang terlebih dahulu'
                          : 'Tambah catatan'
                      }
                      aria-label={'Tambah ' + title.toLowerCase()}
                      onClick={() => {
                        setCaptureEntity(entity);
                        setEdit(null);
                      }}
                    >
                      <Plus size={15} />
                      <span>Tambah</span>
                    </button>
                    <Link
                      className="notebook-open-btn"
                      href={'/' + path}
                      title={`Buka buku ${title}`}
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
              <details className="notebook-help">
                <summary>Cara mencatat stok opname</summary>
                <p>
                  Tambahkan barang, pilih Hitung stok, lalu isi hasil hitung fisik. Koreksi stok
                  buku dilakukan terpisah.
                </p>
              </details>
            </section>
            <aside className="recent-notes">
              <div className="section-head">
                <h3>Terakhir diubah</h3>
                <span className="badge">{recent.length}</span>
              </div>
              {recent.length ? (
                recent.map(({ row, entry }) => (
                  <button
                    className="recent-note"
                    key={row.id}
                    onClick={() => {
                      setCaptureEntity(entry.entity);
                      setEdit(row);
                    }}
                  >
                    <span className="recent-icon">
                      <entry.Icon size={16} />
                    </span>
                    <span className="recent-text">
                      <strong>{String(row.data.title)}</strong>
                      <small>
                        <span className="recent-tag">{entry.title}</span> ·{' '}
                        {formatDate(row.updated_at)}
                      </small>
                    </span>
                    <ArrowUpRight size={14} className="recent-arrow" />
                  </button>
                ))
              ) : (
                <div className="recent-empty">
                  <FilePenLine size={22} />
                  <p>
                    {search
                      ? 'Tidak ada catatan yang cocok.'
                      : ready
                        ? 'Catatan yang Anda ubah akan muncul di sini.'
                        : 'Pencatatan belum aktif.'}
                  </p>
                </div>
              )}
            </aside>
          </div>
        </>
      ) : (
        <>
          <div className="section-head">
            <div>
              <h2>{book.title}</h2>
              <p>{catalog[entity!].description}</p>
            </div>
            <div className="actions">
              <button disabled={!ready || !rows.length} onClick={exportCsv}>
                <Download size={16} />
                CSV
              </button>
              <button
                className="primary"
                disabled={!ready || (entity === 'stock-counts' && !data['inventory-items']?.length)}
                onClick={() => setEdit(null)}
              >
                <Plus size={16} />
                Tambah{' '}
                {entity === 'cash-entries'
                  ? 'transaksi'
                  : entity === 'stock-counts'
                    ? 'opname'
                    : book.title.toLowerCase()}
              </button>
            </div>
          </div>
          {entity === 'stock-counts' && ready && !data['inventory-items']?.length && (
            <p className="notice">
              Daftarkan barang terlebih dahulu di <Link href="/barang">halaman Barang →</Link>
            </p>
          )}
          {ready && (
            <div className="recording-metrics">
              {(entity === 'cash-entries'
                ? [
                    ['Masuk', rupiah(summary.incoming), 'income'],
                    ['Keluar', rupiah(summary.outgoing), 'expense'],
                    ['Selisih kas tercatat', rupiah(summary.net), 'net'],
                  ]
                : entity === 'members'
                  ? [
                      ['Total Anggota', rows.length, 'total'],
                      ['Aktif', rows.filter((row) => row.data.status === 'aktif').length, 'active'],
                      [
                        'Simpanan Anggota Tercatat',
                        rupiah(
                          (data['cash-entries'] || [])
                            .filter(
                              (c) =>
                                rows.some((m) => m.id === c.data.member_id) &&
                                c.data.direction === 'masuk',
                            )
                            .reduce((sum, c) => sum + Number(c.data.amount || 0), 0),
                        ),
                        'income',
                      ],
                    ]
                  : entity === 'inventory-items'
                    ? [
                        ['Jenis Barang', rows.length, 'total'],
                        [
                          'Estimasi Nilai Persediaan',
                          rupiah(
                            rows.reduce(
                              (sum, r) =>
                                sum + Number(r.data.book_quantity || 0) * Number(r.data.price || 0),
                              0,
                            ),
                          ),
                          'income',
                        ],
                        [
                          'Stok Menipis / Perlu Belanja',
                          rows.filter(
                            (row) =>
                              Number(row.data.book_quantity) <= Number(row.data.minimum_quantity),
                          ).length,
                          'warning',
                        ],
                      ]
                    : [
                        ['Pemeriksaan', rows.length, 'total'],
                        [
                          'Ada selisih',
                          rows.filter((row) => stockDifference(row) !== 0).length,
                          'warning',
                        ],
                        [
                          'Stok fisik sesuai',
                          rows.filter((row) => stockDifference(row) === 0).length,
                          'active',
                        ],
                      ]
              ).map(([label, value, type]) => (
                <div key={label} className={`metric-card metric-${type}`}>
                  <small className="metric-label">{label}</small>
                  <strong className="metric-value">{value}</strong>
                </div>
              ))}
            </div>
          )}
          <div className="filters">
            <label>
              <span className="field-caption">
                <Search size={14} />
                Cari catatan
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nama, nomor, atau catatan…"
              />
            </label>
            {entity !== 'inventory-items' && (
              <label>
                <span className="field-caption">Bulan</span>
                <Select
                  value={month}
                  onChange={setMonth}
                  options={monthOptions}
                  ariaLabel="Pilih Bulan"
                />
              </label>
            )}
            {['members', 'cash-entries'].includes(entity!) && (
              <label>
                <span className="field-caption">
                  {entity === 'members' ? 'Status' : 'Transaksi'}
                </span>
                <Select
                  value={filter}
                  onChange={setFilter}
                  options={[
                    { value: '', label: `Semua ${entity === 'members' ? 'Status' : 'Transaksi'}` },
                    ...(entity === 'members' ? ['aktif', 'nonaktif'] : ['masuk', 'keluar']).map(
                      (value) => ({
                        value,
                        label: formatChoiceLabel(value),
                      }),
                    ),
                  ]}
                  ariaLabel={entity === 'members' ? 'Status' : 'Transaksi'}
                />
              </label>
            )}
            {entity !== 'members' && (
              <label>
                <span className="field-caption">Gerai</span>
                <Select
                  value={unit}
                  onChange={setUnit}
                  options={[
                    { value: '', label: 'Semua Gerai' },
                    ...(data.units || []).map((row) => ({
                      value: row.id,
                      label: String(row.data.title),
                    })),
                  ]}
                  ariaLabel="Gerai"
                />
              </label>
            )}
            <button
              type="button"
              className="btn-clear-filters"
              onClick={() => {
                setSearch('');
                setMonth('');
                setFilter('');
                setUnit('');
              }}
            >
              Hapus filter
            </button>
          </div>
          {ready && (
            <>
              <p className="result-count">
                {rows.length} dari {all.length} catatan
                {entity === 'cash-entries'
                  ? ' · Ringkasan mengikuti filter; bukan saldo rekening atau laporan laba rugi.'
                  : ''}
              </p>
              <div className="ledger-wrap">
                <table className="ledger-table">
                  <thead>
                    <tr>
                      {columns.map((field) => (
                        <th key={field} className={getColumnClass(field)}>
                          {field === 'difference' ? 'Selisih' : labels[field]}
                        </th>
                      ))}
                      <th className="col-action">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        {columns.map((field) => (
                          <td key={field} className={getColumnClass(field)}>
                            {renderCell(row, field)}
                          </td>
                        ))}
                        <td className="col-action">
                          <div className="table-actions">
                            <button
                              type="button"
                              className="table-btn-edit"
                              onClick={() => setEdit(row)}
                              title="Ubah data"
                            >
                              Ubah
                            </button>
                            {entity === 'members' && (
                              <button
                                type="button"
                                className="table-btn-action table-btn-cash"
                                title="Catat kas untuk anggota ini"
                                onClick={() => {
                                  setCaptureEntity('cash-entries');
                                  setEdit({
                                    id: '',
                                    created_at: '',
                                    updated_at: '',
                                    data: {
                                      title: `Setoran kas: ${row.data.title}`,
                                      date: today(),
                                      direction: 'masuk',
                                      account: 'Kas Utama Koperasi',
                                      amount: 0,
                                      member_id: row.id,
                                      item_id: '',
                                      unit_id: '',
                                      notes: `Transaksi untuk anggota ${row.data.title} (${row.data.member_number || ''})`,
                                    },
                                  });
                                }}
                              >
                                <Wallet size={12} />
                                <span>+ Kas</span>
                              </button>
                            )}
                            {entity === 'inventory-items' && (
                              <>
                                <button
                                  type="button"
                                  className="table-btn-action table-btn-buy"
                                  title="Catat pengeluaran kas pembelian barang ini"
                                  onClick={() => {
                                    setCaptureEntity('cash-entries');
                                    setEdit({
                                      id: '',
                                      created_at: '',
                                      updated_at: '',
                                      data: {
                                        title: `Beli Stok: ${row.data.title}`,
                                        date: today(),
                                        direction: 'keluar',
                                        account: 'Pengadaan Barang & Persediaan',
                                        amount: Number(row.data.price || 0) * 10,
                                        item_id: row.id,
                                        member_id: '',
                                        unit_id: row.data.unit_id || '',
                                        notes: `Pembelian stok untuk ${row.data.title} (${row.data.sku || ''})`,
                                      },
                                    });
                                  }}
                                >
                                  <Wallet size={12} />
                                  <span>+ Beli</span>
                                </button>
                                <Link
                                  className="table-btn-action"
                                  href={`/stok-opname?barang=${row.id}`}
                                  title="Hitung fisik opname"
                                >
                                  Opname
                                </Link>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!rows.length && (
                  <div className="table-empty-state">
                    <div className="empty-icon-wrap">
                      <book.Icon size={30} />
                    </div>
                    <h3>
                      {all.length
                        ? 'Tidak ada data yang cocok'
                        : `Belum ada catatan ${book.title.toLowerCase()}`}
                    </h3>
                    <p>
                      {all.length
                        ? 'Coba kata pencarian atau bersihkan filter di atas.'
                        : `Gunakan tombol Tambah di atas untuk mengisi catatan ${book.title.toLowerCase()} pertama.`}
                    </p>
                    {all.length ? (
                      <button
                        type="button"
                        className="btn-clear-filters"
                        onClick={() => {
                          setSearch('');
                          setMonth('');
                          setFilter('');
                          setUnit('');
                        }}
                      >
                        Hapus filter
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      {edit !== undefined && entity && (
        <OperationEditor
          entity={entity}
          item={edit || undefined}
          data={data}
          refresh={refresh}
          close={() => {
            setEdit(undefined);
            const next = new URLSearchParams(query.toString());
            ['baru', 'record', 'barang', 'arah'].forEach((key) => next.delete(key));
            router.replace('/' + slug + (next.size ? '?' + next : ''));
          }}
        />
      )}
    </>
  );
}
function OperationEditor({
  entity,
  item,
  data,
  refresh,
  close,
}: {
  entity: Entity;
  item?: Item;
  data: Workspace;
  refresh: () => Promise<void>;
  close: () => void;
}) {
  return <Editor entity={entity} item={item} workspace={data} onSaved={refresh} onClose={close} />;
}
