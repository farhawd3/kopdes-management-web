import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { managerBriefing } from '@/lib/manager-briefing';
import { ManagerBriefing } from '@/components/dashboard/ManagerBriefing';
import type { DashboardSummary } from '@/lib/manager-summary';

const summary: DashboardSummary = {
  businessDate: '2026-09-29', totalUnits: 1, activeUnits: 0, totalMembers: 0,
  activeTasks: 0, urgentTasks: 0, urgentTaskList: [], todayReports: 0,
  monthRevenue: 100, monthExpenses: 200, monthProfit: -100,
  dailyTrend: [], unreportedUnits: [], businessStatus: 'persiapan',
};

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('Ringkasan koordinasi manajer', () => {
  it('memakai nama organisasi, tanggal data, dan selisih negatif tanpa mengklaim SHU', () => {
    const text = managerBriefing(summary, 'Koperasi Pilihan');
    expect(text).toContain('Koperasi Pilihan');
    expect(text).toContain('2026-09-29');
    expect(text).toMatch(/Selisih operasional: -Rp\s?100/);
    expect(text).toContain('belum ada gerai aktif');
    expect(text).toContain('bukan saldo kas, laba bersih, atau SHU resmi');
  });

  it('membatasi cuplikan tindak lanjut dengan keterangan sisa', () => {
    const text = managerBriefing({ ...summary, unreportedUnits: Array.from({ length: 10 }, (_, i) => ({ id: String(i), name: `Gerai ${i}` })) }, 'Koperasi');
    expect(text).toContain('Masih ada 2 tindak lanjut lain');
    expect(text).not.toContain('10. [Belum lapor]');
  });

  it('menyalin hanya setelah manajer membuka dan menekan tombol salin', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<ManagerBriefing data={summary} organization="Koperasi" />);
    fireEvent.click(screen.getByRole('button', { name: 'Ringkasan harian' }));
    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Salin ringkasan' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('disalin'));
    expect(writeText).toHaveBeenCalledWith(managerBriefing(summary, 'Koperasi'));
  });

  it('menawarkan salin manual ketika clipboard ditolak', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    render(<ManagerBriefing data={summary} organization="Koperasi" />);
    fireEvent.click(screen.getByRole('button', { name: 'Ringkasan harian' }));
    fireEvent.click(screen.getByRole('button', { name: 'Salin ringkasan' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('salin secara manual'));
  });
});
