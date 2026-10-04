import { catalog } from '../catalog';
import { schemas, type Entity, type Item } from '../schemas';
import type { Workspace } from '../workspace/useWorkspace';

export const popupEntities = Object.keys(schemas) as Entity[];
const seed: Record<string, unknown> = {
  title: 'Contoh pemeriksaan tampilan dengan judul panjang dan relasi terisi',
  code: 'QA', member_number: 'QA-001', sku: 'QA-001', measurement: 'pcs',
  date: '2026-10-04', due_date: '2026-10-05', start_date: '2026-10-04',
  direction: 'masuk', amount: 10000, category: 'Contoh', account: 'Contoh',
  book_quantity: 12, minimum_quantity: 2, counted_quantity: 10, assignee: 'Contoh QA',
  description: 'Data contoh khusus pemeriksaan. Bukan catatan operasional.',
  notes: 'Catatan contoh khusus pemeriksaan tombol, input, dan tata letak.',
  item_id: '00000000-0000-4000-8000-000000000001',
};
export const popupWorkspace: Workspace = Object.fromEntries(popupEntities.map((entity, index) => {
  const input = Object.fromEntries(Object.keys(schemas[entity].shape)
    .filter(key => key in seed).map(key => [key, seed[key]]));
  const item: Item = {
    id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
    created_at: '2026-10-04T02:00:00Z', updated_at: '2026-10-04T02:00:00Z',
    data: schemas[entity].parse(input),
  };
  return [entity, [item]];
}));
export const popupLabels = Object.fromEntries(popupEntities.map(entity => [entity, catalog[entity].title]));
const task = popupWorkspace['work-items']![0];
task.data = schemas['work-items'].parse({ ...task.data,
  workstream_id: popupWorkspace.workstreams![0].id,
  milestone_id: popupWorkspace.milestones![0].id,
  unit_id: popupWorkspace.units![0].id,
  meeting_id: popupWorkspace.meetings![0].id,
  stakeholder_id: popupWorkspace.stakeholders![0].id,
  document_id: popupWorkspace.documents![0].id,
  subtasks: [{ title: 'Contoh subtugas belum selesai dengan judul panjang', done: false }, {title: 'Contoh subtugas selesai', done: true}],
  activities: [{ id: 'qa-comment', user: 'Contoh QA', role: '', text: 'Komentar contoh untuk pemeriksaan tata letak.', created_at: task.created_at, type: 'comment' }],
});
popupWorkspace['stock-counts']![0].data.item_id = popupWorkspace['inventory-items']![0].id;
