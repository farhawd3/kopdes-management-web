import { managerActions, reportingProgress, type DashboardSummary } from './manager-summary';
import { formatRupiah } from './utils';

/** Ringkasan untuk ditinjau manusia, bukan analisis AI atau laporan akuntansi. */
export function managerBriefing(data: DashboardSummary, organization: string): string {
  const progress = reportingProgress(data);
  const actions = managerActions(data);
  return [
    `RINGKASAN MANAJER — ${organization}`,
    `Tanggal kerja: ${data.businessDate ?? 'Belum tersedia'} (WIB)`,
    '',
    `Omset bulan berjalan: ${formatRupiah(data.monthRevenue)}`,
    `Pengeluaran tercatat: ${formatRupiah(data.monthExpenses)}`,
    `Selisih operasional: ${formatRupiah(data.monthProfit)}`,
    progress.total ? `Pelaporan hari ini: ${progress.reported}/${progress.total} gerai aktif` : 'Pelaporan hari ini: belum ada gerai aktif',
    `Tugas belum selesai: ${data.activeTasks}`,
    `Stok perlu perhatian: ${data.lowStockCount ?? 0} barang`,
    '',
    'CUPLIKAN TINDAK LANJUT',
    ...actions.slice(0, 8).map((action, index) => `${index + 1}. [${action.label}] ${action.title} — ${action.detail}`),
    ...(actions.length > 8 ? [`Masih ada ${actions.length - 8} tindak lanjut lain pada dashboard.`] : []),
    ...(actions.length === 0 ? ['Belum ada tindak lanjut pada cuplikan data. Tetap periksa kelengkapan rekap.'] : []),
    '',
    'Sumber: rekap tersimpan saat ringkasan dibuka. Data yang belum diisi bukan berarti nol kegiatan.',
    'Selisih operasional bukan saldo kas, laba bersih, atau SHU resmi. Periksa angka dan penerima sebelum membagikan.',
  ].join('\n');
}
