import { z } from 'zod';
const text = z.string().trim().max(5000).default('');
const title = z.string().trim().min(1, 'Wajib diisi').max(200);
export const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (value) =>
      !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
    'Tanggal tidak sah',
  );
const optionalDate = z.union([date, z.literal('')]).default('');
const link = z
  .union([
    z
      .string()
      .url()
      .max(2000)
      .refine((value) => /^https?:\/\//.test(value), 'Gunakan tautan HTTP/HTTPS'),
    z.literal(''),
  ])
  .default('');
const ref = z.union([z.string().uuid(), z.literal('')]).default('');
const quantity = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() !== '' ? Number(value) : value),
  z.number().int().min(0).max(1_000_000_000),
);
const money = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() !== '' ? Number(value) : value),
  z.number().int().min(1).max(1_000_000_000_000),
);
export const statuses = ['rencana', 'proses', 'selesai', 'dibatalkan'] as const;
const status = z.enum(statuses).default('rencana');
const poac = z.enum(['planning', 'organizing', 'actuating', 'controlling']).default('planning');
export const schemas = {
  organization: z
    .object({
      title,
      village: text,
      district: text,
      regency: text,
      province: text,
      manager: text,
      start_date: date,
      target_date: optionalDate,
    })
    .strict(),
  workstreams: z
    .object({
      title,
      code: z.string().min(2).max(8),
      description: text,
      notes: text,
      assignee: text,
      status: z.enum(['rencana', 'aktif', 'ditunda', 'selesai', 'diarsipkan']).default('rencana'),
      priority: z.enum(['rendah', 'normal', 'tinggi', 'mendesak']).default('normal'),
      start_date: optionalDate,
      target_date: optionalDate,
      color: z
        .string()
        .regex(/^#[\da-fA-F]{6}$/)
        .default('#B3243B'),
    })
    .strict(),
  milestones: z
    .object({ title, workstream_id: ref, due_date: date, actual_date: optionalDate, notes: text })
    .strict(),
  'work-items': z
    .object({
      title,
      code: text,
      description: text,
      workstream_id: ref,
      milestone_id: ref,
      sprint_id: ref,
      unit_id: ref,
      meeting_id: ref,
      issue_id: ref,
      assignee: text,
      start_date: optionalDate,
      due_date: date,
      status,
      priority: z.enum(['rendah', 'normal', 'tinggi', 'mendesak']).default('normal'),
      poac,
      recurrence: z.enum(['tidak', 'harian', 'mingguan', 'bulanan']).default('tidak'),
      recurrence_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
        .default('09:00'),
      recurrence_end_date: optionalDate,
      followers: z.array(z.string()).default([]),
      subtasks: z
        .array(
          z
            .object({
              title,
              done: z.boolean(),
              code: text.optional(),
            })
            .strict(),
        )
        .max(100)
        .default([]),
      activities: z
        .array(
          z
            .object({
              id: z.string(),
              user: z.string(),
              role: text,
              text,
              created_at: z.string(),
              type: z.enum(['log', 'comment', 'status_change', 'creation']).default('comment'),
            })
            .strict(),
        )
        .default([]),
      dependencies: z.array(z.string().uuid()).max(100).default([]),
      link,
      notes: text,
      completed_at: optionalDate,
    })
    .strict(),
  units: z
    .object({
      title,
      kind: text,
      assignee: text,
      location: text,
      status: z.enum(['rencana', 'persiapan', 'siap uji', 'siap buka', 'aktif']).default('rencana'),
      physical: text,
      equipment: text,
      sop: text,
      staff: text,
      link,
      notes: text,
    })
    .strict(),
  checklist: z
    .object({
      title,
      workstream_id: ref,
      unit_id: ref,
      dimension: z.enum(['legalitas', 'fisik', 'sdm', 'sop', 'sistem']).default('legalitas'),
      required: z.boolean().default(true),
      status: z.enum(['rencana', 'proses', 'selesai']).default('rencana'),
      evidence: text,
      link,
    })
    .strict(),
  stakeholders: z
    .object({
      title,
      category: text,
      contact: text,
      influence: z.coerce.number().int().min(1).max(5).default(3),
      interest: z.coerce.number().int().min(1).max(5).default(3),
      last_contact: optionalDate,
      follow_up: text,
    })
    .strict(),
  interactions: z
    .object({ title, stakeholder_id: ref, date, notes: text, follow_up: text })
    .strict(),
  meetings: z
    .object({
      title,
      date,
      time: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
        .default('09:00'),
      participants: text,
      agenda: text,
      minutes: text,
      mode: z.enum(['tatap muka', 'online', 'hybrid']).default('tatap muka'),
      location: text,
      meeting_url: link,
      duration: z.coerce.number().int().min(15).max(480).default(60),
    })
    .strict(),
  decisions: z.object({ title, meeting_id: ref, date, reason: text, link }).strict(),
  documents: z
    .object({
      title,
      kind: text,
      number: text,
      issued_date: optionalDate,
      expires_date: optionalDate,
      status: z.enum(['belum ada', 'diproses', 'tersedia']).default('belum ada'),
      link,
      notes: text,
    })
    .strict(),
  risks: z
    .object({
      title,
      probability: z.coerce.number().int().min(1).max(5).default(3),
      impact: z.coerce.number().int().min(1).max(5).default(3),
      mitigation: text,
      assignee: text,
      review_date: optionalDate,
      status: z.enum(['terbuka', 'ditangani', 'ditutup']).default('terbuka'),
    })
    .strict(),
  issues: z
    .object({
      title,
      description: text,
      assignee: text,
      due_date: date,
      status: z.enum(['terbuka', 'ditangani', 'ditutup']).default('terbuka'),
    })
    .strict(),
  staff: z
    .object({
      title,
      role: text,
      unit_id: ref,
      status: z.enum(['direncanakan', 'ditunjuk', 'aktif', 'nonaktif']).default('direncanakan'),
    })
    .strict(),
  trainings: z
    .object({
      title,
      staff_id: ref,
      date,
      required: z.boolean().default(true),
      status: z.enum(['rencana', 'selesai']).default('rencana'),
      notes: text,
    })
    .strict(),
  journal: z
    .object({ title, date, notes: text, unit_id: ref, work_item_id: ref, stakeholder_id: ref })
    .strict(),
  members: z
    .object({
      title,
      member_number: title,
      date,
      contact: text,
      address: text,
      status: z.enum(['aktif', 'nonaktif']).default('aktif'),
      notes: text,
    })
    .strict(),
  'cash-entries': z
    .object({
      title,
      date,
      direction: z.enum(['masuk', 'keluar']),
      amount: money,
      category: title,
      account: title,
      unit_id: ref,
      member_id: ref,
      item_id: ref,
      reference_number: text,
      link,
      notes: text,
    })
    .strict(),
  'inventory-items': z
    .object({
      title,
      sku: title,
      unit_id: ref,
      price: z.preprocess(
        (value) => (typeof value === 'string' && value.trim() !== '' ? Number(value) : value),
        z.number().int().min(0).max(1_000_000_000).default(0),
      ),
      measurement: title,
      book_quantity: quantity,
      minimum_quantity: quantity,
      notes: text,
    })
    .strict(),
  'stock-counts': z
    .object({
      title,
      item_id: z.string().uuid(),
      date,
      book_quantity: quantity,
      counted_quantity: quantity,
      assignee: title,
      notes: text,
    })
    .strict(),
  sprints: z
    .object({
      title,
      goal: text,
      duration: z.enum(['1 minggu', '2 minggu', '1 bulan', 'kustom']).default('2 minggu'),
      start_date: optionalDate,
      end_date: optionalDate,
      status: z.enum(['rencana', 'aktif', 'selesai']).default('aktif'),
      notes: text,
    })
    .strict(),
};
export const operationEntities: Entity[] = [
  'members',
  'cash-entries',
  'inventory-items',
  'stock-counts',
];
export type Entity = keyof typeof schemas;
export type Item = {
  id: string;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
};
export type Task = z.infer<(typeof schemas)['work-items']> & { id: string };
export type Checklist = z.infer<typeof schemas.checklist>;
export function entityName(value: string): Entity | null {
  return Object.hasOwn(schemas, value) ? (value as Entity) : null;
}
