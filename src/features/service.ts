import 'server-only';
import { db } from '@/lib/server/db';
import { schemas, type Entity, type Item } from './schemas';
import { references } from './catalog';
import { today, nextOccurrence, addDays } from '@/lib/date';
import type { ListQuery } from './query';
import { makeTaskCode } from './task-code';

export async function listPage(entity: Entity, input: ListQuery) {
  let query = db().from('hub_records').select('*').eq('entity', entity);
  if (input.id) query = query.eq('id', input.id);
  else {
    if (entity === 'work-items' && input.scope === 'current')
      query = query.or(
        `data->>status.in.(rencana,proses),data->>completed_at.gte.${addDays(today(), -30)}`,
      );
    if (entity === 'work-items' && input.scope === 'history')
      query = query.in('data->>status', ['selesai', 'dibatalkan']);
    if (input.project) query = query.eq('data->>workstream_id', input.project);
    if (input.q) query = query.ilike('data->>title', `%${input.q.replace(/[\\%_]/g, '\\$&')}%`);
    const field = entity === 'work-items' ? 'due_date' : 'date';
    if (input.from) query = query.gte(`data->>${field}`, input.from);
    if (input.to) query = query.lte(`data->>${field}`, input.to);
  }
  if (entity === 'work-items' && input.scope === 'current' && !input.id)
    query = query.order('data->>due_date', { ascending: true });
  else query = query.order('created_at', { ascending: false });
  const { data, error } = await query
    .order('id', { ascending: false })
    .range(input.offset, input.offset + input.limit);
  if (error) throw new Error('Catatan belum dapat dimuat. Coba lagi.');
  return {
    items: (data || []).slice(0, input.limit) as Item[],
    hasMore: (data || []).length > input.limit,
    nextOffset: input.offset + input.limit,
  };
}
export async function list(entity: Entity): Promise<Item[]> {
  const rows: Item[] = [];
  const batch = 500;
  for (let offset = 0; offset <= 10_000; offset += batch) {
    const { data, error } = await db()
      .from('hub_records')
      .select('*')
      .eq('entity', entity)
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .range(offset, offset + batch - 1);
    if (error) throw new Error('Data tidak dapat dimuat. Periksa koneksi database.');
    rows.push(...((data || []) as Item[]));
    if (!data || data.length < batch) return rows;
  }
  throw new Error('Terlalu banyak catatan untuk laporan ini. Pilih periode lebih pendek.');
}
export async function save(entity: Entity, input: unknown, id?: string) {
  const data = schemas[entity].parse(input);
  if (entity === 'workstreams') {
    const project = schemas.workstreams.parse(data);
    if (project.start_date && project.target_date && project.start_date > project.target_date)
      throw new Error('Target proyek tidak boleh sebelum tanggal mulai.');
  }
  for (const [field, target] of Object.entries(references)) {
    const value = (data as Record<string, unknown>)[field];
    if (value) {
      const { data: found, error } = await db()
        .from('hub_records')
        .select('id')
        .eq('entity', target)
        .eq('id', value)
        .maybeSingle();
      if (error || !found)
        throw new Error('Catatan terkait tidak ditemukan. Muat ulang sebelum menyimpan.');
    }
  }
  if (entity === 'work-items') {
    const task = schemas['work-items'].parse(data);
    if (!id && !task.code) task.code = makeTaskCode(task.title, crypto.randomUUID());
    task.completed_at = task.status === 'selesai' ? task.completed_at || today() : '';
    if (task.start_date && task.start_date > task.due_date)
      throw new Error('Tanggal mulai harus sebelum atau sama dengan tenggat.');
    if (
      task.recurrence !== 'tidak' &&
      task.recurrence_end_date &&
      task.recurrence_end_date < task.due_date
    )
      throw new Error('Batas pengulangan tidak boleh sebelum tenggat tugas.');
    if (task.milestone_id) {
      const { data: milestone, error: milestoneError } = await db()
        .from('hub_records')
        .select('data')
        .eq('entity', 'milestones')
        .eq('id', task.milestone_id)
        .maybeSingle();
      if (milestoneError || !milestone || milestone.data.workstream_id !== task.workstream_id)
        throw new Error('Milestone harus berasal dari proyek yang dipilih.');
    }
    if (id && task.dependencies.includes(id))
      throw new Error('Tugas tidak boleh bergantung pada dirinya sendiri.');
    if (task.dependencies.length) {
      const { data: dependencies, error: dependencyError } = await db()
        .from('hub_records')
        .select('id')
        .eq('entity', 'work-items')
        .in('id', task.dependencies);
      if (dependencyError || dependencies?.length !== new Set(task.dependencies).size)
        throw new Error('Prasyarat tugas tidak ditemukan.');
      // Pemicu transaksi di database memeriksa rantai dependensi dan siklus.
    }
    const nextDueDate =
      task.recurrence !== 'tidak' ? nextOccurrence(task.due_date, task.recurrence) : '';
    const next =
      task.status === 'selesai' &&
      task.recurrence !== 'tidak' &&
      (!task.recurrence_end_date || nextDueDate <= task.recurrence_end_date)
        ? {
            ...task,
            status: 'rencana',
            completed_at: '',
            due_date: nextDueDate,
            start_date: task.start_date ? nextOccurrence(task.start_date, task.recurrence) : '',
            subtasks: task.subtasks.map((item) => ({ ...item, done: false })),
            dependencies: [],
          }
        : null;
    const { data: record, error } = await db().rpc('save_work_item', {
      record_id: id || null,
      payload: task,
      next_payload: next,
    });
    if (error) throw new Error('Tugas gagal disimpan. Tidak ada perubahan parsial.');
    return record as Item;
  }
  const client = db();
  const query = id
    ? client.from('hub_records').update({ data }).eq('id', id).eq('entity', entity)
    : client.from('hub_records').insert({ entity, data });
  const { data: record, error } = await query.select('*').single();
  if (error)
    throw new Error(
      error.code === '23505'
        ? 'Nomor atau kode sudah dipakai. Gunakan kode berbeda.'
        : error.code === '23514'
          ? 'Data belum dapat disimpan. Periksa isian dan pastikan migrasi pencatatan sudah terpasang.'
          : 'Penyimpanan gagal. Muat ulang dan coba lagi.',
    );
  return record as Item;
}
