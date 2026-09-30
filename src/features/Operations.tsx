'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowUpRight,
  Plus,
  Users,
  Wallet,
  Package,
  ClipboardCheck,
  Download,
  Search,
  FilePenLine,
} from 'lucide-react';
import { Editor } from './Editor';
import { catalog, labels } from './catalog';
import { type Entity, type Item } from './schemas';
import type { Workspace } from './useWorkspace';
import { cashSummary, csvCell, rupiah, stockDifference } from './ledger';
import { formatDate, today } from '@/lib/date';
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
  const [edit, setEdit] = useState<Item | null | undefined>(() => {
    const product = data['inventory-items']?.find((row) => row.id === query.get('barang'));
    return ready && slug === 'stok-opname' && product
      ? {
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
        }
      : undefined;
  });
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [filter, setFilter] = useState('');
  const [unit, setUnit] = useState('');
  const entity = book?.entity;
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
  const summary = cashSummary(entity === 'cash-entries' ? rows : []);
  function display(row: Item, field: string) {
    if (field === 'amount') return rupiah(Number(row.data.amount));
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
    return String(row.data[field] ?? '—');
  }
  const columns =
    entity === 'members'
      ? ['title', 'member_number', 'date', 'contact', 'status']
      : entity === 'cash-entries'
        ? ['date', 'title', 'direction', 'amount', 'account', 'unit_id']
        : entity === 'inventory-items'
          ? ['title', 'sku', 'unit_id', 'measurement', 'book_quantity', 'minimum_quantity']
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
          <div className="recording-heading">
            <span className="eyebrow">PENCATATAN HARIAN</span>
            <h2>Apa yang ingin dicatat?</h2>
            <p>Pilih buku pencatatan di bawah. Proyek dan tugas tetap ada di bagian Ruang kerja.</p>
          </div>
          <div className="recording-grid">
            {modules.map(({ path, entity, title, description, Icon }) => (
              <Link href={'/' + path} className="recording-card" key={path}>
                <div className="section-head">
                  <span className="module-icon">
                    <Icon size={24} />
                  </span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>
                  {ready ? `${(data[entity] || []).length} catatan` : 'Menunggu aktivasi'}{' '}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
          <section className="card recording-guide">
            <h3>Urutan stok opname</h3>
            <ol>
              <li>Daftarkan barang dan stok bukunya.</li>
              <li>Buka Barang, lalu pilih Hitung stok.</li>
              <li>Masukkan hasil hitung fisik dan catatan selisih.</li>
            </ol>
            <p>
              Opname menyimpan stok buku saat pemeriksaan. Koreksi stok dilakukan terpisah di
              halaman Barang.
            </p>
          </section>
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
                    ['Masuk', rupiah(summary.incoming)],
                    ['Keluar', rupiah(summary.outgoing)],
                    ['Selisih kas tercatat', rupiah(summary.net)],
                  ]
                : entity === 'members'
                  ? [
                      ['Anggota ditampilkan', rows.length],
                      ['Aktif', rows.filter((row) => row.data.status === 'aktif').length],
                      ['Nonaktif', rows.filter((row) => row.data.status === 'nonaktif').length],
                    ]
                  : entity === 'inventory-items'
                    ? [
                        ['Jenis barang', rows.length],
                        [
                          'Stok rendah',
                          rows.filter(
                            (row) =>
                              Number(row.data.book_quantity) <= Number(row.data.minimum_quantity),
                          ).length,
                        ],
                      ]
                    : [
                        ['Pemeriksaan', rows.length],
                        ['Ada selisih', rows.filter((row) => stockDifference(row) !== 0).length],
                      ]
              ).map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
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
                Bulan
                <input
                  type="month"
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                />
              </label>
            )}
            {['members', 'cash-entries'].includes(entity!) && (
              <label>
                {entity === 'members' ? 'Status' : 'Transaksi'}
                <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                  <option value="">Semua</option>
                  {(entity === 'members' ? ['aktif', 'nonaktif'] : ['masuk', 'keluar']).map(
                    (value) => (
                      <option key={value}>{value}</option>
                    ),
                  )}
                </select>
              </label>
            )}
            {entity !== 'members' && (
              <label>
                Gerai
                <select value={unit} onChange={(event) => setUnit(event.target.value)}>
                  <option value="">Semua gerai</option>
                  {data.units?.map((row) => (
                    <option value={row.id} key={row.id}>
                      {String(row.data.title)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
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
                        <th key={field}>{field === 'difference' ? 'Selisih' : labels[field]}</th>
                      ))}
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        {columns.map((field) => (
                          <td
                            key={field}
                            className={
                              field === 'difference' && stockDifference(row) !== 0
                                ? 'late'
                                : undefined
                            }
                          >
                            {field === 'title' ? (
                              <button className="table-title" onClick={() => setEdit(row)}>
                                {display(row, field)}
                              </button>
                            ) : (
                              display(row, field)
                            )}
                          </td>
                        ))}
                        <td>
                          <button onClick={() => setEdit(row)}>Ubah</button>
                          {entity === 'inventory-items' && (
                            <Link className="button" href={`/stok-opname?barang=${row.id}`}>
                              Hitung stok
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!rows.length && (
                  <div className="empty">
                    <book.Icon size={28} />
                    <h3>{all.length ? 'Tidak ada yang cocok' : 'Belum ada catatan'}</h3>
                    <p>
                      {all.length
                        ? 'Coba kata pencarian atau filter lain.'
                        : 'Gunakan tombol Tambah untuk mengisi catatan pertama.'}
                    </p>
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
          close={() => setEdit(undefined)}
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
