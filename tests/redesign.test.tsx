import { beforeEach, describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { DailyTasksView } from '@/features/DailyTasksView';
import { TaskDetailDrawer } from '@/features/TaskDetailDrawer';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { SprintCard } from '@/features/SprintCard';
import { schemas, type Item } from '@/features/schemas';

const mocks = vi.hoisted(() => ({ api: vi.fn() }));
vi.mock('@/lib/client', () => ({ api: mocks.api }));

beforeEach(() => vi.clearAllMocks());
afterEach(cleanup);

describe('Fitur Redesain Behance', () => {
  it('DailyTasksView menampilkan tugas dan subtugas dengan kode unik', () => {
    const task: Item = {
      id: 'task-100',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Verifikasi Stok Gerai',
        due_date: '2026-10-01',
        status: 'rencana',
        code: 'KD-44008',
        subtasks: [
          { title: 'Cek rak display', done: false, code: 'KD-44008-1' },
          { title: 'Hitung kardus gudang', done: true, code: 'KD-44008-2' },
        ],
      },
    };

    render(
      <DailyTasksView
        tasks={[task]}
        workspace={{}}
        onOpenTask={vi.fn()}
        onCreateTask={vi.fn()}
        onRefresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('KD-44008')).toBeTruthy();
    expect(screen.getByText('Verifikasi Stok Gerai')).toBeTruthy();
    expect(screen.getByText('KD-44008-1')).toBeTruthy();
    expect(screen.getByText('Cek rak display')).toBeTruthy();
  });

  it('DateRangePicker menghitung rentang hari dan mengubah bulan aktif', () => {
    const onChange = vi.fn();
    render(
      <DateRangePicker
        startDate="2026-10-01"
        endDate="2026-10-16"
        onChange={onChange}
      />,
    );

    expect(screen.getByText('16 hari')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /November/ }));
    expect(screen.getByRole('heading', { level: 3, name: 'November 2026' })).toBeTruthy();
  });

  it('TaskDetailDrawer menampilkan 3 kolom metadata dan aktivitas tugas', async () => {
    const task: Item = {
      id: 'task-detail-1',
      created_at: '2026-10-01T08:00:00Z',
      updated_at: '2026-10-01T08:00:00Z',
      data: {
        title: 'Persiapan Rapat Anggota Tahunan',
        due_date: '2026-10-05',
        status: 'rencana',
        code: 'KD-44006',
        description: 'Menyiapkan berkas LPJ dan laporan keuangan.',
        assignee: 'Budi Santoso',
        activities: [
          {
            id: 'act-1',
            user: 'Budi Santoso',
            role: 'Manajer Koperasi',
            text: 'membuat tugas ini',
            created_at: '2026-10-01T08:00:00Z',
            type: 'creation',
          },
        ],
      },
    };

    render(
      <TaskDetailDrawer
        task={task}
        workspace={{}}
        onClose={vi.fn()}
        onUpdated={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('KD-44006')).toBeTruthy();
    expect(screen.getByText('DIBUAT OLEH')).toBeTruthy();
    expect(screen.getByText('PENANGGUNG JAWAB')).toBeTruthy();
    expect(screen.getByText('PEMANGKU / TIM')).toBeTruthy();
    expect(screen.getByText(/membuat tugas ini/)).toBeTruthy();
  });

  it('SprintCard merangkum progres dan jumlah tugas dalam sprint', () => {
    const sprint: Item = {
      id: 'sprint-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Sprint 1 Gerai',
        goal: 'Kesiapan rak dan barang',
        duration: '2 minggu',
        status: 'aktif',
      },
    };

    const taskDone: Item = {
      id: 't-1',
      created_at: '',
      updated_at: '',
      data: { title: 'Tugas 1', sprint_id: 'sprint-1', status: 'selesai' },
    };
    const taskPlan: Item = {
      id: 't-2',
      created_at: '',
      updated_at: '',
      data: { title: 'Tugas 2', sprint_id: 'sprint-1', status: 'rencana' },
    };

    render(
      <SprintCard
        sprint={sprint}
        tasks={[taskDone, taskPlan]}
        onEdit={vi.fn()}
        onRefresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('Sprint 1 Gerai')).toBeTruthy();
    expect(screen.getByText('50%')).toBeTruthy();
    expect(screen.getByText('1 dari 2 tugas selesai')).toBeTruthy();
  });
});
