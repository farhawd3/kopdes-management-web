import type { Checklist, Item } from '../schemas';
import type { Workspace } from '../workspace/useWorkspace';
import { readiness, isOverdue } from '@/lib/progress';
import { addDays } from '@/lib/date';

export const deskModules = [
  { entity: 'work-items', title: 'Tugas', href: '/tugas' },
  { entity: 'journal', title: 'Kegiatan', href: '/jurnal' },
  { entity: 'meetings', title: 'Rapat', href: '/rapat' },
  { entity: 'workstreams', title: 'Proyek', href: '/proyek' },
  { entity: 'documents', title: 'Arsip', href: '/dokumen' },
] as const;

export function worldModel(data: Workspace, date: string) {
  const tasks = (data['work-items'] || []).filter(
    (row) => !['selesai', 'dibatalkan'].includes(String(row.data.status)),
  );
  const upcoming = (data.meetings || []).filter(
    (row) =>
      String(row.data.date) >= date &&
      String(row.data.date) <= addDays(date, 7) &&
      !['selesai', 'dibatalkan'].includes(String(row.data.status)),
  );
  const units = [...(data.units || [])].sort(
    (a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id),
  );
  return {
    tasks,
    overdue: tasks.filter((row) =>
      isOverdue({ status: 'proses', due_date: String(row.data.due_date || '') }, date),
    ),
    slots: Array.from({ length: 7 }, (_, index) => {
      const row = units[index];
      return {
        row,
        index,
        readiness: row
          ? readiness(
              (data.checklist || [])
                .filter((item) => item.data.unit_id === row.id)
                .map((item) => item.data as Checklist),
            )
          : null,
      };
    }),
    units,
    vehicles: [
      ...(data.stakeholders || []).map((row) => ({ row, supplier: false })),
      ...(data.supplier || [])
        .filter((row) => row.data.status === 'aktif')
        .map((row) => ({ row, supplier: true })),
    ],
    desks: deskModules.map((module) => {
      let rows: Item[] = data[module.entity] || [];
      if (module.entity === 'work-items') rows = tasks;
      if (module.entity === 'meetings') rows = upcoming;
      if (module.entity === 'workstreams')
        rows = rows.filter((row) =>
          ['rencana', 'aktif', 'ditunda'].includes(String(row.data.status)),
        );
      if (module.entity === 'journal') rows = rows.filter((row) => row.data.date === date);
      return { ...module, rows };
    }),
    critical: (data['inventory-items'] || []).filter(
      (row) => Number(row.data.book_quantity) <= Number(row.data.minimum_quantity),
    ),
  };
}
