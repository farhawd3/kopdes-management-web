import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { TaskCalendar } from '@/features/TaskCalendar';
import { today } from '@/lib/date';
import type { Item } from '@/features/schemas';
afterEach(cleanup);
it('pindah tahun dan kembali ke hari ini tanpa kehilangan agenda', () => {
  const date = today();
  const item = {
    id: 'task-1',
    created_at: '',
    updated_at: '',
    data: { title: 'Periksa dokumen', due_date: date, status: 'proses' },
  } as Item;
  render(
    <TaskCalendar
      items={[item]}
      render={(row) => <p key={row.id}>Detail {String(row.data.title)}</p>}
    />,
  );
  fireEvent.change(screen.getByLabelText('Bulan kalender'), { target: { value: '2026-12' } });
  fireEvent.click(screen.getByRole('button', { name: 'Bulan berikutnya' }));
  expect((screen.getByLabelText('Bulan kalender') as HTMLInputElement).value).toBe('2027-01');
  fireEvent.click(screen.getByRole('button', { name: 'Bulan sebelumnya' }));
  expect((screen.getByLabelText('Bulan kalender') as HTMLInputElement).value).toBe('2026-12');
  fireEvent.click(screen.getByRole('button', { name: 'Hari ini' }));
  expect(screen.getByText('Detail Periksa dokumen')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Semua tanggal' })).toBeTruthy();
});
it('menjelaskan bulan kosong', () => {
  render(<TaskCalendar items={[]} render={() => null} />);
  expect(screen.getByText('Belum ada tugas bulan ini.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Hari ini' }));
  expect(screen.getByText('Tidak ada tugas pada tanggal ini.')).toBeTruthy();
});
