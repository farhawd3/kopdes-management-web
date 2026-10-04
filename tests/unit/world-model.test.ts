import { describe, expect, it } from 'vitest';
import { worldModel } from '@/features/cooperative-world/world-model';
import { worldLight } from '@/features/cooperative-world/CooperativeWorld';
import { schemas, type Item } from '@/features/schemas';
const row = (id: string, data: Record<string, unknown>): Item => ({
  id,
  data,
  created_at: '2026-10-04T00:00:00Z',
  updated_at: '2026-10-04T00:00:00Z',
});
describe('Dunia koperasi dari catatan tersimpan', () => {
  it('tujuh slot terkunci tanpa data dan terbuka/kembali kosong sesuai gerai', () => {
    expect(worldModel({}, '2026-10-04').slots.every((slot) => !slot.row)).toBe(true);
    const model = worldModel({ units: [row('gerai', { title: 'Gerai uji' })] }, '2026-10-04');
    expect(model.slots).toHaveLength(7);
    expect(model.slots[0].row?.id).toBe('gerai');
    expect(model.slots[0].readiness).toBeNull();
    expect(worldModel({ units: [] }, '2026-10-04').slots[0].row).toBeUndefined();
  });
  it('meja dan kendaraan tidak terisi dari tugas selesai atau suplier nonaktif', () => {
    const model = worldModel(
      {
        'work-items': [
          row('a', { status: 'selesai' }),
          row('b', { status: 'proses', due_date: '2026-10-03' }),
        ],
        supplier: [row('c', { status: 'nonaktif' }), row('d', { status: 'aktif' })],
        meetings: [row('e', { date: '2026-10-12', status: 'rencana' })],
      },
      '2026-10-04',
    );
    expect(model.tasks.map((task) => task.id)).toEqual(['b']);
    expect(model.overdue).toHaveLength(1);
    expect(model.vehicles.map((vehicle) => vehicle.row.id)).toEqual(['d']);
    expect(model.desks.find((desk) => desk.entity === 'meetings')?.rows).toHaveLength(0);
  });
  it('pencahayaan berkesinambungan dan lampu mengikuti waktu', () => {
    expect(worldLight(0).lamps).toBe(1);
    expect(worldLight(12).lamps).toBe(0);
    expect(worldLight(24).sky).toEqual(worldLight(0).sky);
    expect(Math.abs(worldLight(18.66).lamps - worldLight(18.67).lamps)).toBeLessThan(0.01);
  });
  it('suplier memvalidasi status dan hubungan catatan', () => {
    expect(schemas.supplier.safeParse({ title: 'Pemasok', item_id: 'invalid' }).success).toBe(
      false,
    );
    expect(schemas.supplier.parse({ title: 'Pemasok' }).status).toBe('aktif');
  });
});
