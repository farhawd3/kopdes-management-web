import { z } from 'zod';
import { today } from '@/lib/date';
import type { Workspace } from '../workspace/useWorkspace';

export const worldPreferencesSchema = z.object({
  version: z.literal(1).default(1),
  weather: z.enum(['cerah', 'berawan', 'hujan']).default('cerah'),
  time: z.enum(['otomatis', 'pagi', 'siang', 'senja', 'malam']).default('siang'),
  outfit: z.enum(['biru', 'lavender', 'hijau']).default('biru'),
});
export type WorldPreferences = z.infer<typeof worldPreferencesSchema>;
export type WorldLocation = 'luar' | 'dalam';
export type CharacterActivity = 'idle' | 'work' | 'meeting' | 'gym';
export const landPositions: readonly [number, number][] = [
  [-18, -10],
  [-9, -10],
  [0, -10],
  [9, -10],
  [18, -10],
  [-18, 0],
  [18, 0],
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
    description: 'Zona gym & olahraga sebagai visualisasi kegiatan hari ini.',
    position: [4, 0, 3],
  },
  {
    id: 'dokumen',
    title: 'Arsip & buku',
    href: '/dokumen',
    description: 'Dokumen koperasi dan pintasan pencatatan.',
    position: [-4, 0, 3],
  },
  {
    id: 'gudang',
    title: 'Gudang Logistik',
    href: '/barang',
    description: 'Pusat penerimaan pasokan barang, area bongkar muat 3 dermaga, dan armada pengiriman.',
    position: [18, 0, 4],
  },
] as const;

export const worldVehicles = [
  {
    id: 'kendaraan-manajer',
    name: 'Mobil Manajer',
    kind: 'Kendaraan dinas',
    description: 'Mobil operasional manajer untuk peninjauan gerai dan mitra.',
  },
  {
    id: 'kendaraan-van',
    name: 'Van Distribusi',
    kind: 'Armada logistik',
    description: 'Van pengiriman pasokan reguler ke unit-unit gerai koperasi.',
  },
  {
    id: 'kendaraan-truk',
    name: 'Truk Muatan Logistik',
    kind: 'Angkutan barang',
    description: 'Truk pengangkut pasokan muatan besar menuju area bongkar muat.',
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
