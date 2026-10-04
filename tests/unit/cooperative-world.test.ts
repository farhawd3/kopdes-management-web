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
  it('menyediakan armada kendaraan modular termasuk motor dan truk mitra', async () => {
    const { worldVehicles, landPositions } = await import('@/features/cooperative-world/world-model');
    expect(worldVehicles).toHaveLength(5);
    expect(worldVehicles.map((v) => v.id)).toEqual([
      'kendaraan-manajer',
      'kendaraan-motor',
      'kendaraan-van',
      'kendaraan-truk',
      'kendaraan-truk-mitra',
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
  it('simulasi lalu lintas: shuffle-bag tidak memunculkan 3 jenis berurutan sama', async () => {
    const { createTrafficShuffleBag } = await import('@/features/cooperative-world/world-traffic');
    const bag = createTrafficShuffleBag(42);
    const drawn = Array.from({ length: 50 }, () => bag.draw());

    for (let i = 2; i < drawn.length; i++) {
      const threeInRow = drawn[i] === drawn[i - 1] && drawn[i] === drawn[i - 2];
      expect(threeInRow).toBe(false);
    }
  });
  it('simulasi fade: opasitas mulus dan castShadow aktif hanya saat opasitas >= 0.85', async () => {
    const { calculateFade } = await import('@/features/cooperative-world/world-traffic');
    // Di luar batas platform
    const outside = calculateFade(-35, 1);
    expect(outside.opacity).toBe(0);
    expect(outside.castShadow).toBe(false);

    // Di tengah jalan
    const center = calculateFade(0, 1);
    expect(center.opacity).toBe(1);
    expect(center.scale).toBe(1);
    expect(center.castShadow).toBe(true);

    // Di zona transisi masuk (-28)
    const entering = calculateFade(-28, 1);
    expect(entering.opacity).toBeGreaterThan(0);
    expect(entering.opacity).toBeLessThan(1);
  });
  it('kepatuhan lampu lalu lintas: kendaraan berhenti di stop line saat merah', async () => {
    const { stepTrafficSimulation } = await import('@/features/cooperative-world/world-traffic');
    const vehicle = {
      id: 'test-car',
      type: 'mobil' as const,
      color: '#3866f6',
      direction: 1 as const,
      x: -6.0,
      z: 10.8,
      speed: 3.0,
      targetSpeed: 3.0,
      opacity: 1,
      scale: 1,
      castShadow: true,
      state: 'driving' as const,
      lane: 'east' as const,
    };

    // Saat lampu merah
    stepTrafficSimulation([vehicle], 0.5, false, -4.5, 4.5);
    expect(vehicle.x).toBeLessThanOrEqual(-4.5);

    // Step berkali-kali sampai diam di garis henti
    for (let i = 0; i < 20; i++) {
      stepTrafficSimulation([vehicle], 0.1, false, -4.5, 4.5);
    }
    expect(vehicle.state).toBe('waiting');
    expect(vehicle.speed).toBe(0);
    expect(vehicle.x).toBeLessThanOrEqual(-4.5);
    expect(vehicle.x).toBeGreaterThan(-4.7);

    // Saat lampu hijau
    stepTrafficSimulation([vehicle], 0.5, true, -4.5, 4.5);
    expect(vehicle.state).toBe('driving');
    expect(vehicle.speed).toBeGreaterThan(0);
  });
  it('dialog kontekstual: sapaan waktu dan integritas data nyata', async () => {
    const { getTimeGreeting, getContextualDialogue, DialogueManager } = await import(
      '@/features/cooperative-world/world-dialogue'
    );
    expect(getTimeGreeting(8)).toBe('Selamat pagi');
    expect(getTimeGreeting(13)).toBe('Selamat siang');
    expect(getTimeGreeting(17)).toBe('Selamat sore');
    expect(getTimeGreeting(21)).toBe('Selamat malam');

    const ctxWithTasks = {
      managerName: 'Budi',
      openTasksCount: 3,
      hasMeetingSoon: false,
      recordedUnitsCount: 1,
      weather: 'cerah' as const,
      timeHour: 10,
    };
    const deskDialog = getContextualDialogue('manager', ctxWithTasks, 'desk_visit');
    expect(deskDialog.text).toContain('3 tugas aktif');

    const mgr = new DialogueManager();
    const triggered = mgr.triggerDialogue('p1', 'p2', 'Budi', 'manager', [0, 0, 0], ctxWithTasks, 10.0);
    expect(triggered).toBe(true);
    expect(mgr.getBubbles()).toHaveLength(1);

    // Cooldown global mencegah dialog instan dalam < 8 detik
    const tooSoon = mgr.triggerDialogue('p3', 'p4', 'Andi', 'staff', [1, 0, 1], ctxWithTasks, 12.0);
    expect(tooSoon).toBe(false);

    // Setelah 9 detik, pasangan baru bisa memicu dialog
    const afterGlobal = mgr.triggerDialogue('p3', 'p4', 'Andi', 'staff', [1, 0, 1], ctxWithTasks, 19.0);
    expect(afterGlobal).toBe(true);

    // Pasangan pertama masih dalam cooldown 45s
    const pairStillCooldown = mgr.triggerDialogue('p1', 'p2', 'Budi', 'manager', [0, 0, 0], ctxWithTasks, 25.0);
    expect(pairStillCooldown).toBe(false);
  });
});
