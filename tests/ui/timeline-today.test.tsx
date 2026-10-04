import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { TaskTimeline } from '@/features/tasks/TaskTimeline';
import { today } from '@/lib/date';
vi.mock('@/lib/client', () => ({ api: vi.fn() }));
afterEach(cleanup);
it('Hari ini mengatur awal linimasa ke tanggal Jakarta hari ini', () => {
  render(<TaskTimeline items={[]} workspace={{}} refresh={async () => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /^Hari ini$/ }));
  expect((screen.getByLabelText('Mulai') as HTMLInputElement).value).toBe(today());
});
