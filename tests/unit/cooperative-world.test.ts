import { describe, expect, it } from 'vitest';
import {
  getWorldHour,
  getWorldModel,
  worldPreferencesSchema,
} from '@/features/cooperative-world/world-model';
import type { Item } from '@/features/schemas';
const row = (
  id: string,
  data: Record<string, unknown>,
  created = '2026-10-01T00:00:00Z',
): Item => ({ id, data, created_at: created, updated_at: created });
describe('pemetaan dunia koperasi', () => {
  it('menyediakan tujuh lahan kosong tanpa mengarang unit atau identitas', () => {
    const result = getWorldModel({}, new Date('2026-10-04T05:00:00Z'));
    expect(result.plots).toHaveLength(7);
    expect(result.plots.every((plot) => !plot.unit)).toBe(true);
    expect(result.manager).toBe('Manajer');
    expect(result.activity).toBe('idle');
  });
  it('penempatan stabil terhadap urutan respons dan melaporkan gerai di luar tujuh slot', () => {
    const units = Array.from({ length: 9 }, (_, i) => row(`unit-${i}`, { title: `Gerai ${i}` }));
    const first = getWorldModel({ units }, new Date());
    const reversed = getWorldModel({ units: [...units].reverse() }, new Date());
    expect(first.plots.map((plot) => plot.unit?.id)).toEqual(
      reversed.plots.map((plot) => plot.unit?.id),
    );
    expect(first.overflow).toBe(2);
    expect(first.units).toHaveLength(9);
  });
  it('rapat aktif berdasarkan waktu Jakarta dan durasi, bukan seluruh hari', () => {
    const data = {
      meetings: [
        row('meeting', { title: 'Rapat', date: '2026-10-04', time: '09:00', duration: 60 }),
      ],
    };
    expect(getWorldModel(data, new Date('2026-10-04T01:59:00Z')).activity).toBe('idle');
    expect(getWorldModel(data, new Date('2026-10-04T02:00:00Z')).activity).toBe('meeting');
    expect(getWorldModel(data, new Date('2026-10-04T02:59:00Z')).activity).toBe('meeting');
    expect(getWorldModel(data, new Date('2026-10-04T03:00:00Z')).activity).toBe('idle');
  });
  it('kegiatan hari Jakarta memicu olahraga; catatan kemarin tidak', () => {
    const journal = [row('activity', { title: 'Kunjungan', date: '2026-10-05' })];
    expect(getWorldModel({ journal }, new Date('2026-10-04T17:01:00Z')).activity).toBe('gym');
    expect(getWorldModel({ journal }, new Date('2026-10-05T17:01:00Z')).activity).toBe('idle');
  });
  it('tugas selesai dan dibatalkan tidak menggerakkan aktivitas kerja', () => {
    const tasks = ['selesai', 'dibatalkan', 'rencana', 'proses'].map((status) =>
      row(status, { title: status, status }),
    );
    const model = getWorldModel({ 'work-items': tasks }, new Date());
    expect(model.tasks).toHaveLength(2);
    expect(model.activity).toBe('work');
  });
  it('waktu otomatis memakai WIB dan preferensi menolak nilai tidak dikenal', () => {
    expect(getWorldHour('otomatis', new Date('2026-10-04T17:00:00Z'))).toBe(0);
    expect(getWorldHour('senja', new Date())).toBe(17);
    expect(worldPreferencesSchema.safeParse({ weather: 'salju' }).success).toBe(false);
    expect(worldPreferencesSchema.parse({}).time).toBe('siang');
  });
  it('menyediakan tiga kendaraan suasana modular dengan identitas simulasi', async () => {
    const { worldVehicles, landPositions } = await import('@/features/cooperative-world/world-model');
    expect(worldVehicles).toHaveLength(3);
    expect(worldVehicles.map((v) => v.id)).toEqual([
      'kendaraan-manajer',
      'kendaraan-van',
      'kendaraan-truk',
    ]);
    expect(landPositions).toHaveLength(7);
    // Verifikasi koordinat map luas mencakup area di luar pusat
    expect(landPositions.some(([x]) => Math.abs(x) >= 18)).toBe(true);
  });
  it('membedakan stasiun interior kantor dan landmark exterior luar', async () => {
    const { worldStations } = await import('@/features/cooperative-world/world-model');
    const kantorStations = worldStations.filter((s) => s.scope === 'kantor');
    const luarStations = worldStations.filter((s) => s.scope === 'luar');
    expect(kantorStations.map((s) => s.id)).toEqual(['rapat', 'tugas', 'kegiatan', 'dokumen']);
    expect(luarStations.map((s) => s.id)).toEqual(['gudang']);
  });
});
