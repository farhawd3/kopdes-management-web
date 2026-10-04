import { z } from 'zod';
import { today } from '@/lib/date';
import type { Workspace } from '../workspace/useWorkspace';

export const worldPreferencesSchema = z.object({
  version: z.literal(1).default(1),
  weather: z.enum(['cerah', 'berawan', 'hujan']).default('cerah'),
  time: z.enum(['otomatis', 'pagi', 'siang', 'senja', 'malam']).default('otomatis'),
  outfit: z.enum(['biru', 'lavender', 'hijau']).default('biru'),
});
export type WorldPreferences = z.infer<typeof worldPreferencesSchema>;
export type WorldLocation = 'luar' | 'dalam';
export type CharacterActivity = 'idle' | 'work' | 'meeting' | 'gym';
export const landPositions: readonly [number, number][] = [
  [-9, -6],
  [-3, -6],
  [3, -6],
  [9, -6],
  [-9, 3],
  [3, 3],
  [9, 3],
];
export const worldStations = [
  {
    id: 'rapat',
    title: 'Meja rapat',
    href: '/rapat',
    description: 'Agenda, notulen, dan keputusan.',
    position: [-4, 0, -2],
  },
  {
    id: 'tugas',
    title: 'Meja tugas',
    href: '/tugas',
    description: 'Pekerjaan dan tenggat yang perlu ditindaklanjuti.',
    position: [3, 0, -2],
  },
  {
    id: 'kegiatan',
    title: 'Area kegiatan',
    href: '/jurnal',
    description: 'Karakter berolahraga sebagai visualisasi kegiatan hari ini.',
    position: [4, 0, 3],
  },
  {
    id: 'dokumen',
    title: 'Arsip & buku',
    href: '/dokumen',
    description: 'Dokumen koperasi dan pintasan pencatatan.',
    position: [-4, 0, 3],
  },
] as const;

export function getWorldModel(data: Workspace, now: Date) {
  const date = today(now);
  const units = [...(data.units || [])].sort(
    (a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id),
  );
  const tasks = (data['work-items'] || []).filter(
    (row) => !['selesai', 'dibatalkan'].includes(String(row.data.status)),
  );
  const meetings = (data.meetings || []).filter((row) => row.data.date === date);
  const currentMeeting = meetings.find((row) => {
    const start = Date.parse(`${date}T${row.data.time || '09:00'}:00+07:00`);
    return (
      now.getTime() >= start && now.getTime() < start + Number(row.data.duration || 60) * 60000
    );
  });
  const activities = (data.journal || []).filter((row) => row.data.date === date);
  const activity: CharacterActivity = currentMeeting
    ? 'meeting'
    : activities.length
      ? 'gym'
      : tasks.some((row) => row.data.status === 'proses')
        ? 'work'
        : 'idle';
  return {
    units,
    tasks,
    meetings,
    activities,
    currentMeeting,
    activity,
    plots: landPositions.map((position, index) => ({
      id: `lahan-${index + 1}`,
      position,
      unit: units[index],
    })),
    overflow: Math.max(0, units.length - landPositions.length),
    title: String(data.organization?.[0]?.data.title || 'Koperasi'),
    manager: String(data.organization?.[0]?.data.manager || 'Manajer'),
  };
}
export type WorldModel = ReturnType<typeof getWorldModel>;
export function getWorldHour(time: WorldPreferences['time'], now: Date) {
  if (time !== 'otomatis') return { pagi: 8, siang: 12, senja: 17, malam: 21 }[time];
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(now),
  );
}
