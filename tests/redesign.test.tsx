import { beforeEach, describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DailyTasksView } from '@/features/DailyTasksView';
import { TaskDetailDrawer } from '@/features/TaskDetailDrawer';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { SprintCard } from '@/features/SprintCard';
import { ScrumBoardView } from '@/features/ScrumBoardView';
import { TodayView } from '@/features/TodayView';
import { Editor } from '@/features/Editor';
import { Records } from '@/features/Records';
import { Operations } from '@/features/Operations';
import { type Item } from '@/features/schemas';

const mocks = vi.hoisted(() => ({ api: vi.fn() }));
vi.mock('@/lib/client', () => ({ api: mocks.api }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
  };
});
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
    render(<DateRangePicker startDate="2026-10-01" endDate="2026-10-16" onChange={onChange} />);

    expect(screen.getByText('16 hari')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /November/ }));
    expect(screen.getByRole('heading', { level: 3, name: 'November 2026' })).toBeTruthy();
  });

  it('TaskDetailDrawer menampilkan metadata pribadi dan aktivitas tugas', async () => {
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
    expect(screen.queryByText('PEMANGKU / TIM')).toBeNull();
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

  it('ScrumBoardView menampilkan kolom Backlog, To Do, dan kartu tugas dengan tombol Add Task', () => {
    const task: Item = {
      id: 'task-scrum-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Penataan Rak Etalase Gerai',
        status: 'rencana',
        code: 'KD-44010',
        due_date: '2026-10-01',
        description: 'Menyusun barang sembako di rak depan',
      },
    };

    render(
      <ScrumBoardView
        tasks={[task]}
        workspace={{}}
        onOpenTask={vi.fn()}
        onCreateTask={vi.fn()}
        onRefresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('Rencana')).toBeTruthy();
    expect(screen.getByText('Dibatalkan')).toBeTruthy();
    expect(screen.getByText('Dikerjakan')).toBeTruthy();

    expect(screen.getByText('Selesai')).toBeTruthy();
    expect(screen.getByText('KD-44010')).toBeTruthy();
    expect(screen.getByText('Penataan Rak Etalase Gerai')).toBeTruthy();
    expect(screen.getAllByText('Tambah tugas').length).toBeGreaterThan(0);
  });

  it('TodayView menampilkan tugas hari ini, tugas terlambat, dan agenda rapat', () => {
    const todayTask: Item = {
      id: 'today-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Cek kas harian',
        status: 'rencana',
        due_date: '2026-10-01',
      },
    };
    const overdueTask: Item = {
      id: 'overdue-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'LPJ Bulanan',
        status: 'rencana',
        due_date: '2026-09-20',
      },
    };
    const meeting: Item = {
      id: 'meeting-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Rapat Pengurus KDMP',
        date: '2026-10-01',
        time: '14:00',
        mode: 'Tatap muka',
      },
    };

    render(
      <TodayView
        workspace={{
          'work-items': [todayTask, overdueTask],
          meetings: [meeting],
        }}
        refresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('Fokus Kerja Hari Ini')).toBeTruthy();
    expect(screen.getByText('Cek kas harian')).toBeTruthy();
    expect(screen.getByText('Tugas Terlambat')).toBeTruthy();
    expect(screen.getByText('LPJ Bulanan')).toBeTruthy();
    expect(screen.getByText('Rapat Pengurus KDMP')).toBeTruthy();
    expect(screen.getByText('14:00 WIB')).toBeTruthy();

    const formBtn = screen.getByRole('button', { name: /Form lengkap/i });
    expect(formBtn).toBeTruthy();
    fireEvent.click(formBtn);
    expect(screen.getByRole('heading', { name: /Tambah Tugas Baru/i })).toBeTruthy();
  });

  it('Editor pemangku kepentingan menyediakan pilihan cepat Babinsa dan Kades', () => {
    render(
      <Editor
        entity="stakeholders"
        workspace={{}}
        onClose={vi.fn()}
        onSaved={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText(/Pilihan Cepat Pemangku Desa/i)).toBeTruthy();
    const babinsaBtn = screen.getByRole('button', { name: /Babinsa \(TNI\)/i });
    expect(babinsaBtn).toBeTruthy();

    fireEvent.click(babinsaBtn);
    expect((screen.getByLabelText(/Nama pemangku/i) as HTMLInputElement).value).toContain(
      'Babinsa Desa',
    );
    expect((screen.getByLabelText(/Kategori/i) as HTMLSelectElement).value).toContain(
      'Keamanan Desa',
    );
    expect((screen.getByLabelText(/Tingkat wewenang/i) as HTMLSelectElement).value).toBe('4');
  });

  it('Records pemangku kepentingan menampilkan lencana peran, kuadran, dan kontak WhatsApp', () => {
    const babinsa: Item = {
      id: 'stk-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Sertu Budi (Babinsa)',
        category: 'Keamanan Desa (Babinsa / Bhabinkamtibmas)',
        contact: '081234567890',
        influence: 4,
        interest: 3,
        last_contact: '2026-09-28',
        follow_up: 'Koordinasi keamanan gerai',
      },
    };

    render(
      <Records
        entity="stakeholders"
        workspace={{ stakeholders: [babinsa] }}
        refresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getAllByText('Sertu Budi (Babinsa)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Keamanan Desa/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Libatkan Erat · Mitra Kunci Strategis')).toBeTruthy();
    expect(screen.getByText('WhatsApp ↗')).toBeTruthy();
    expect(screen.getByText('Telepon')).toBeTruthy();
    expect(screen.getByText(/Koordinasi keamanan gerai/)).toBeTruthy();
    expect(screen.getByText(/Peta pengaruh–minat/i)).toBeTruthy();
  });

  it('Editor meetings menyesuaikan input lokasi dan online meeting berdasarkan pilihan format rapat', () => {
    render(
      <Editor
        entity="meetings"
        workspace={{}}
        onClose={vi.fn()}
        onSaved={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    // Default mode is 'tatap muka': location is shown, meeting_url is hidden
    expect(screen.getByLabelText(/Ruangan \/ Tempat Rapat/i)).toBeTruthy();
    expect(screen.queryByLabelText(/Tautan Rapat Online/i)).toBeNull();

    // Switch to 'online': meeting_url is shown, location is hidden
    const modeSelect = screen.getByLabelText(/Format Rapat/i) as HTMLSelectElement;
    fireEvent.change(modeSelect, { target: { value: 'online' } });

    expect(screen.getByLabelText(/Tautan Rapat Online/i)).toBeTruthy();
    expect(screen.queryByLabelText(/Ruangan \/ Tempat Rapat/i)).toBeNull();

    // Switch to 'hybrid': both location and meeting_url are shown
    fireEvent.change(modeSelect, { target: { value: 'hybrid' } });

    expect(screen.getByLabelText(/Ruangan \/ Tempat Rapat/i)).toBeTruthy();
    expect(screen.getByLabelText(/Tautan Rapat Online/i)).toBeTruthy();
  });

  it('Operations menampilkan tabel kas dengan lencana arah transaksi, nominal rapi, dan tombol aksi', () => {
    const cashItem: Item = {
      id: 'cash-1',
      created_at: '',
      updated_at: '',
      data: {
        title: 'Penjualan Beras',
        date: '2026-10-01',
        direction: 'masuk',
        amount: 150000,
        category: 'Operasional',
        account: 'Kas Utama',
      },
    };

    render(
      <Operations
        slug="keuangan"
        data={{ 'cash-entries': [cashItem] }}
        ready
        refresh={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(screen.getByText('Penjualan Beras')).toBeTruthy();
    expect(screen.getByText('+ Masuk')).toBeTruthy();
    expect(screen.getByText('+ Rp 150.000')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ubah' })).toBeTruthy();
  });
});
