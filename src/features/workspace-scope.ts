import { pages } from './catalog';
import type { Entity } from './schemas';
export function pageEntities(slug: string): Entity[] {
  const related: Record<string, Entity[]> = {
    beranda: [
      'work-items',
      'meetings',
      'documents',
      'issues',
      'risks',
      'inventory-items',
      'stock-counts',
      'members',
      'cash-entries',
    ],
    'tindak-lanjut': [
      'work-items',
      'documents',
      'issues',
      'risks',
      'inventory-items',
      'stock-counts',
    ],
    'hari-ini': ['work-items', 'meetings'],
    tugas: ['work-items', 'milestones', 'sprints', 'units', 'stakeholders', 'meetings', 'issues'],
    proyek: [
      'work-items',
      'milestones',
      'sprints',
      'checklist',
      'units',
      'stakeholders',
      'meetings',
      'issues',
    ],
    roadmap: ['work-items', 'milestones'],
    rapat: ['meetings', 'decisions', 'work-items'],
    pemangku: ['stakeholders', 'interactions'],
    mitra: ['stakeholders', 'interactions'],
    gerai: ['units', 'checklist', 'work-items'],
    kesiapan: ['checklist', 'units'],
    tim: ['staff', 'trainings', 'units'],
    pencatatan: ['members', 'cash-entries', 'inventory-items', 'stock-counts', 'units'],
    anggota: ['members', 'cash-entries'],
    keuangan: ['cash-entries', 'members', 'inventory-items', 'units'],
    barang: ['inventory-items', 'cash-entries', 'units'],
    'stok-opname': ['stock-counts', 'inventory-items', 'units'],
    risiko: ['risks', 'issues', 'work-items'],
  };
  return [
    ...new Set<Entity>(['organization', 'workstreams', ...(related[slug] || pages[slug] || [])]),
  ];
}
