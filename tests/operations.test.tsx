import { afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { schemas, type Item } from '@/features/schemas';
import { cashSummary, csvCell, stockDifference } from '@/features/ledger';
import { meetingCalendar } from '@/features/meeting';
import { Operations } from '@/features/Operations';
import { DateField } from '@/components/ui/DateField';
import { Editor } from '@/features/Editor';
const mocked = vi.hoisted(() => ({ api: vi.fn() }));
vi.mock('@/lib/client', () => ({ api: mocked.api }));
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
  };
});
beforeEach(() => vi.clearAllMocks());
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
afterEach(cleanup);
const item = (data: Record<string, unknown>): Item => ({
  id: 'test',
  created_at: '',
  updated_at: '',
  data,
});
it('menolak nominal kosong, desimal, negatif, dan jumlah di luar batas', () => {
  for (const amount of ['', 0, -1, 1.5, 1e15, true, null])
    expect(
      schemas['cash-entries'].safeParse({
        title: 'Kas',
        date: '2026-10-01',
        direction: 'masuk',
        amount,
        category: 'Lainnya',
        account: 'Kas',
      }).success,
    ).toBe(false);
  expect(
    schemas['inventory-items'].safeParse({
      title: 'Barang',
      sku: 'A',
      measurement: 'pcs',
      book_quantity: '',
      minimum_quantity: 0,
    }).success,
  ).toBe(false);
});
it('menghitung kas masuk dan keluar tanpa menganggapnya laba', () => {
  expect(
    cashSummary([
      item({ direction: 'masuk', amount: 100000 }),
      item({ direction: 'keluar', amount: 25000 }),
    ]),
  ).toEqual({ incoming: 100000, outgoing: 25000, net: 75000 });
  expect(stockDifference(item({ book_quantity: 10, counted_quantity: 8 }))).toBe(-2);
});
it('ekspor CSV melindungi formula dan tanda kutip', () => {
  expect(csvCell('=HYPERLINK("x")')).toBe('"\'=HYPERLINK(""x"")"');
  expect(csvCell('  +12')).toBe('"\'  +12"');
  expect(csvCell('Nama, anggota')).toBe('"Nama, anggota"');
});
it('rapat lama kompatibel dan ekspor agenda memakai waktu WIB', () => {
  const meeting = item({
    title: 'Rapat\nBEGIN:VEVENT',
    date: '2026-10-01',
    time: '09:00',
    meeting_url: 'https://meet.google.com/example',
  });
  const ics = meetingCalendar(meeting, new Date('2026-10-01T00:00:00Z'));
  expect(ics).toContain('DTSTART:20261001T020000Z');
  expect(ics).toContain('DTEND:20261001T030000Z');
  expect(ics).toContain('SUMMARY:Rapat\\nBEGIN:VEVENT');
  expect(schemas.meetings.parse({ title: 'Lama', date: '2026-10-01' }).mode).toBe('tatap muka');
  expect(
    schemas.meetings.safeParse({ ...meeting.data, meeting_url: 'javascript:alert(1)' }).success,
  ).toBe(false);
});
it('modul belum diaktifkan tidak menampilkan saldo nol atau mengizinkan pencatatan', () => {
  render(<Operations slug="keuangan" data={{}} ready={false} refresh={vi.fn()} />);
  expect(screen.getByText('Pencatatan belum diaktifkan')).toBeTruthy();
  expect(
    (screen.getByRole('button', { name: 'Tambah transaksi' }) as HTMLButtonElement).disabled,
  ).toBe(true);
  expect(screen.queryByText('Selisih kas tercatat')).toBeNull();
});
it('ringkasan kas mengikuti filter bulan', () => {
  render(
    <Operations
      slug="keuangan"
      data={{
        'cash-entries': [
          {
            ...item({ title: 'Oktober', date: '2026-10-01', direction: 'masuk', amount: 100000 }),
            id: 'one',
          },
          {
            ...item({ title: 'November', date: '2026-11-01', direction: 'keluar', amount: 25000 }),
            id: 'two',
          },
        ],
      }}
      ready
      refresh={vi.fn()}
    />,
  );
  fireEvent.change(screen.getByLabelText('Bulan'), { target: { value: '2026-10' } });
  expect(screen.getByText('Oktober')).toBeTruthy();
  expect(screen.queryByText('November')).toBeNull();
  expect(screen.getByText(/1 dari 2 catatan/)).toBeTruthy();
});
it('pemilih tanggal menyimpan tanggal kabisat dalam form', () => {
  render(
    <form data-testid="form">
      <DateField name="date" label="Tanggal" defaultValue="2028-02-01" />
    </form>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Pilih tanggal' }));
  fireEvent.click(screen.getByRole('button', { name: '29 Feb 2028' }));
  expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('date')).toBe(
    '2028-02-29',
  );
  expect(screen.queryByRole('group', { name: 'Kalender Tanggal' })).toBeNull();
});
it('form kas menyimpan nominal angka dan menahan form ketika server gagal', async () => {
  mocked.api.mockRejectedValueOnce(new Error('Koneksi gagal'));
  const close = vi.fn(),
    refresh = vi.fn().mockResolvedValue(undefined);
  render(<Editor entity="cash-entries" workspace={{}} onClose={close} onSaved={refresh} />);
  for (const [label, value] of [
    ['Nama / judul', 'Beli alat'],
    ['Nominal (Rp)', '25000'],
    ['Kategori', 'Peralatan'],
    ['Kas / rekening', 'Kas gerai'],
  ])
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.change(screen.getByLabelText('Jenis transaksi'), { target: { value: 'keluar' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }).closest('form')!);
  await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Koneksi gagal'));
  expect(close).not.toHaveBeenCalled();
  expect(refresh).not.toHaveBeenCalled();
  mocked.api.mockResolvedValueOnce({});
  fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }).closest('form')!);
  await waitFor(() => expect(close).toHaveBeenCalledOnce());
  expect(mocked.api).toHaveBeenLastCalledWith(
    'cash-entries',
    expect.objectContaining({
      data: expect.objectContaining({ amount: 25000, direction: 'keluar', account: 'Kas gerai' }),
    }),
  );
});
it('memilih barang menyalin stok buku, tetapi hasil hitung wajib diisi sendiri', async () => {
  const product = {
    ...item({
      title: 'Beras',
      sku: 'BR',
      measurement: 'karung',
      book_quantity: 10,
      minimum_quantity: 2,
    }),
    id: 'c38c2d99-1f93-49f6-b0f8-9a3073a83dac',
  };
  mocked.api.mockResolvedValue({});
  render(
    <Editor
      entity="stock-counts"
      workspace={{ 'inventory-items': [product] }}
      onClose={vi.fn()}
      onSaved={vi.fn().mockResolvedValue(undefined)}
    />,
  );
  fireEvent.change(screen.getByLabelText('Barang'), { target: { value: product.id } });
  expect((screen.getByLabelText(/Stok buku/) as HTMLInputElement).value).toBe('10');
  expect((screen.getByLabelText('Hasil hitung fisik') as HTMLInputElement).value).toBe('');
  fireEvent.change(screen.getByLabelText('Nama / judul'), { target: { value: 'Opname Oktober' } });
  fireEvent.change(screen.getByLabelText('Hasil hitung fisik'), { target: { value: '8' } });
  fireEvent.change(screen.getByLabelText('Penanggung jawab'), { target: { value: 'Petugas uji' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }).closest('form')!);
  await waitFor(() =>
    expect(mocked.api).toHaveBeenCalledWith(
      'stock-counts',
      expect.objectContaining({
        data: expect.objectContaining({
          item_id: product.id,
          book_quantity: 10,
          counted_quantity: 8,
        }),
      }),
    ),
  );
});
it('tambah cepat dari ringkasan membuka buku yang dipilih', () => {
  render(<Operations slug="pencatatan" data={{}} ready refresh={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Tambah anggota' }));
  expect(screen.getByRole('dialog')).toBeTruthy();
  expect(screen.getByLabelText('Nama anggota')).toBeTruthy();
});
