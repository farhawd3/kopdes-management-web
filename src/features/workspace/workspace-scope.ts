import { pages } from '../catalog';
import type { Entity } from '../schemas';
export function pageEntities(slug: string): Entity[] {
  if (slug === 'riwayat-proyek') return pageEntities('proyek');
  const related: Record<string, Entity[]> = {
    'dunia-koperasi': ['units', 'checklist', 'work-items', 'journal', 'meetings', 'documents', 'stakeholders', 'inventory-items', 'supplier'],
    suplier: ['supplier', 'inventory-items', 'stakeholders', 'documents', 'work-items', 'journal'],
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
      'journal',
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
    tugas: [
      'work-items',
      'milestones',
      'sprints',
      'units',
      'stakeholders',
      'documents',
      'meetings',
      'issues',
    ],
    proyek: [
      'decisions',
      'work-items',
      'milestones',
      'sprints',
      'checklist',
      'units',
      'stakeholders',
      'documents',
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
    jurnal: ['journal', 'work-items', 'stakeholders', 'units', 'meetings'],
  };
  return [
    ...new Set<Entity>(['organization', 'workstreams', ...(related[slug] || pages[slug] || [])]),
  ];
}
