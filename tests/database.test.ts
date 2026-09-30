// @vitest-environment node
import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { buildPlan } from './fixtures/legacy-plan';
let database: PGlite;
beforeAll(async () => {
  database = new PGlite();
  await database.exec(
    'create role anon; create role authenticated; create role service_role bypassrls;',
  );
  await database.exec(readFileSync('supabase/migrations/20260930000001_manager_hub.sql', 'utf8'));
}, 30000);
afterAll(async () => {
  await database?.close();
});
describe('Migrasi PostgreSQL nyata di mesin lokal', () => {
  it('RLS aktif pada seluruh tabel publik', async () => {
    const result = await database.query<{ relrowsecurity: boolean }>(
      "select relrowsecurity from pg_class join pg_namespace on pg_namespace.oid=relnamespace where nspname='public' and relkind='r'",
    );
    expect(result.rows.length).toBe(6);
    expect(result.rows.every((row) => row.relrowsecurity)).toBe(true);
  });
  it('anon tidak memiliki izin baca maupun menjalankan fungsi keamanan', async () => {
    const result = await database.query<{ table_access: boolean; function_access: boolean }>(
      "select has_table_privilege('anon','public.hub_records','SELECT') as table_access, has_function_privilege('anon','public.reserve_pin_attempt()','EXECUTE') as function_access",
    );
    expect(result.rows[0]).toEqual({ table_access: false, function_access: false });
  });
  it('PIN hanya dapat diinisialisasi sekali', async () => {
    const first = await database.query<{ ok: boolean }>(
      "select public.initialize_manager('test-hash') as ok",
    );
    const second = await database.query<{ ok: boolean }>(
      "select public.initialize_manager('other') as ok",
    );
    expect(first.rows[0].ok).toBe(true);
    expect(second.rows[0].ok).toBe(false);
  });
  it('lima percobaan membatasi percobaan berikut selama 15 menit', async () => {
    for (let i = 0; i < 5; i++) {
      await database.exec('update public.manager_security set next_attempt_at=null');
      const result = await database.query<{ hash: string }>(
        'select public.reserve_pin_attempt() as hash',
      );
      expect(result.rows[0].hash).toBe('test-hash');
    }
    const denied = await database.query<{ hash: null }>(
      'select public.reserve_pin_attempt() as hash',
    );
    expect(denied.rows[0].hash).toBeNull();
    const lock = await database.query<{ locked: boolean }>(
      "select blocked_until>now()+interval '14 minutes' as locked from public.manager_security",
    );
    expect(lock.rows[0].locked).toBe(true);
  });
  it('login menyimpan sesi acak dan menolak hash PIN lama', async () => {
    const invalid = await database.query<{ ok: boolean }>(
      "select public.finish_pin_login('old','invalid') as ok",
    );
    expect(invalid.rows[0].ok).toBe(false);
    const valid = await database.query<{ ok: boolean }>(
      "select public.finish_pin_login('test-hash','session-1') as ok",
    );
    expect(valid.rows[0].ok).toBe(true);
    const sessions = await database.query('select * from public.manager_sessions');
    expect(sessions.rows).toHaveLength(1);
  });
  it('template atomik dan idempoten', async () => {
    const records = buildPlan('2026-10-01', randomUUID);
    const first = await database.query<{ ok: boolean }>(
      'select public.install_plan($1::jsonb) as ok',
      [JSON.stringify(records)],
    );
    const second = await database.query<{ ok: boolean }>(
      'select public.install_plan($1::jsonb) as ok',
      [JSON.stringify(buildPlan('2026-10-01', randomUUID))],
    );
    expect(first.rows[0].ok).toBe(true);
    expect(second.rows[0].ok).toBe(false);
    const count = await database.query<{ count: number }>(
      "select count(*)::integer as count from public.hub_records where entity='work-items'",
    );
    expect(count.rows[0].count).toBe(43);
  });
  it('penyelesaian berulang tidak menggandakan tugas berikut', async () => {
    const task = { title: 'Rutin', status: 'proses', due_date: '2026-10-01' };
    const created = await database.query<{ record: { id: string } }>(
      'select public.save_work_item(null,$1::jsonb,null) as record',
      [JSON.stringify(task)],
    );
    const id = created.rows[0].record.id;
    for (let i = 0; i < 2; i++)
      await database.query('select public.save_work_item($1,$2::jsonb,$3::jsonb)', [
        id,
        JSON.stringify({ ...task, status: 'selesai' }),
        JSON.stringify({ ...task, due_date: '2026-10-02', status: 'rencana' }),
      ]);
    const count = await database.query<{ count: number }>(
      "select count(*)::integer as count from public.hub_records where data->>'title'='Rutin'",
    );
    expect(count.rows[0].count).toBe(2);
  });
  it('pemulihan gagal tidak menghapus data sebelumnya', async () => {
    const before = await database.query<{ count: number }>(
      'select count(*)::integer as count from public.hub_records',
    );
    await expect(
      database.query('select public.restore_manager_data($1::jsonb,$2::jsonb)', [
        JSON.stringify([{ id: 'not-a-uuid', entity: 'units', data: { title: 'A' } }]),
        '[]',
      ]),
    ).rejects.toThrow();
    const after = await database.query<{ count: number }>(
      'select count(*)::integer as count from public.hub_records',
    );
    expect(after.rows[0].count).toBe(before.rows[0].count);
  });
  it('referensi yang hilang ditolak database', async () => {
    await expect(
      database.query("insert into public.hub_records(entity,data) values('checklist',$1)", [
        JSON.stringify({ title: 'Checklist', unit_id: randomUUID() }),
      ]),
    ).rejects.toThrow('Missing related record');
  });
  it('gerai yang masih dipakai checklist tidak dapat dihapus', async () => {
    const result = await database.query<{ id: string }>(
      "select id from public.hub_records where entity='units' limit 1",
    );
    await expect(
      database.query('delete from public.hub_records where id=$1', [result.rows[0].id]),
    ).rejects.toThrow('Record is still referenced');
  });
  it('dependensi melingkar ditolak database', async () => {
    const id = randomUUID();
    await expect(
      database.query("insert into public.hub_records(id,entity,data) values($1,'work-items',$2)", [
        id,
        JSON.stringify({ title: 'Loop', dependencies: [id] }),
      ]),
    ).rejects.toThrow('Circular dependency');
  });
  it('perubahan PIN mencabut seluruh sesi', async () => {
    await database.query("select public.change_manager_pin('test-hash','new-hash')");
    expect((await database.query('select * from public.manager_sessions')).rows).toHaveLength(0);
  });
});
