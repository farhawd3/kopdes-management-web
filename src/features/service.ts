import 'server-only';
import { db } from '@/lib/server/db';
import { schemas, type Entity, type Item } from './schemas';
import { references } from './catalog';
import { today, nextOccurrence } from '@/lib/date';
export async function list(entity: Entity): Promise<Item[]> {
  const { data, error } = await db()
    .from('hub_records')
    .select('*')
    .eq('entity', entity)
    .order('created_at', { ascending: true })
    .limit(5000);
  if (error) throw new Error('Data tidak dapat dimuat. Periksa migrasi dan koneksi Supabase baru.');
  if (data.length === 5000)
    throw new Error('Batas 5.000 catatan tercapai. Perlu paginasi sebelum data ditampilkan.');
  return data as Item[];
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
    task.completed_at = task.status === 'selesai' ? task.completed_at || today() : '';
    if (task.start_date && task.start_date > task.due_date)
      throw new Error('Tanggal mulai harus sebelum atau sama dengan tenggat.');
    if (id && task.dependencies.includes(id))
      throw new Error('Tugas tidak boleh bergantung pada dirinya sendiri.');
    if (task.dependencies.length) {
      const tasks = await list('work-items');
      const seen = new Set<string>();
      const visit = (dependency: string): boolean => {
        if (dependency === id) return true;
        if (seen.has(dependency)) return false;
        seen.add(dependency);
        const found = tasks.find((item) => item.id === dependency);
        if (!found) throw new Error('Prasyarat tugas tidak ditemukan.');
        return schemas['work-items'].parse(found.data).dependencies.some(visit);
      };
      if (task.dependencies.some(visit)) throw new Error('Dependensi melingkar tidak diizinkan.');
    }
    const next =
      task.status === 'selesai' && task.recurrence !== 'tidak'
        ? {
            ...task,
            status: 'rencana',
            completed_at: '',
            due_date: nextOccurrence(task.due_date, task.recurrence),
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
