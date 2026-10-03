import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { Dashboard } from '@/features/Dashboard';
import { SprintModal } from '@/features/SprintModal';
import { TaskDetailDrawer } from '@/features/TaskDetailDrawer';
import { Records } from '@/features/Records';
import { AppShell } from '@/components/layout/AppShell';
import { invalidateWorkspaceCache, useWorkspace } from '@/features/useWorkspace';
import { schemas, type Item } from '@/features/schemas';
import { today } from '@/lib/date';
import { usePreference } from '@/lib/usePreference';

const mocks = vi.hoisted(() => ({ api: vi.fn(), replace: vi.fn() }));
vi.mock('@/lib/client', () => ({ api: mocks.api, resetAuthNavigation: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/tugas',
  useSearchParams: () => new URLSearchParams(window.location.search),
  useRouter: () => ({ replace: mocks.replace }),
}));
vi.mock('@/lib/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

const task = (id: string, title: string): Item => ({
  id,
  created_at: '',
  updated_at: '',
  data: schemas['work-items'].parse({ title, due_date: today() }),
});

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
  invalidateWorkspaceCache();
  window.history.replaceState(null, '', '/tugas');
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it('a preference stays usable for the session when browser storage rejects writes', () => {
  vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
    throw new Error('Storage blocked');
  });
  const hook = renderHook(() => usePreference('blocked-storage-preference', 'initial'));
  act(() => hook.result.current[1]('chosen'));
  expect(hook.result.current[0]).toBe('chosen');
});

it('a changed scope hides preceding records while a cached scope renders immediately', async () => {
  let finishHistory: (value: {
    items: Item[];
    hasMore: boolean;
    nextOffset: number;
  }) => void = () => {};
  const pendingHistory = new Promise<{ items: Item[]; hasMore: boolean; nextOffset: number }>(
    (resolve) => {
      finishHistory = resolve;
    },
  );
  mocks.api.mockImplementation(async (path: string) => {
    if (path === 'capabilities') return { operations: false };
    if (path.startsWith('work-items?')) {
      if (path.includes('scope=history')) return pendingHistory;
      return { items: [task('active', 'Tugas aktif')], hasMore: false, nextOffset: 0 };
    }
    return { items: [], hasMore: false, nextOffset: 0 };
  });
  const hook = renderHook(({ scope }) => useWorkspace('tugas', { scope }), {
    initialProps: { scope: 'current' as 'current' | 'history' },
  });
  await waitFor(() => expect(hook.result.current.loading).toBe(false));
  expect(hook.result.current.data['work-items']?.[0].id).toBe('active');
  hook.rerender({ scope: 'history' });
  expect(hook.result.current.loading).toBe(true);
  expect(hook.result.current.data).toEqual({});
  await act(async () => {
    finishHistory({ items: [task('archived', 'Tugas lama')], hasMore: false, nextOffset: 0 });
  });
  await waitFor(() => expect(hook.result.current.loading).toBe(false));
  expect(hook.result.current.data['work-items']?.[0].id).toBe('archived');
  hook.rerender({ scope: 'current' });
  expect(hook.result.current.loading).toBe(false);
  expect(hook.result.current.data['work-items']?.[0].id).toBe('active');
});

it('switching a detail task resets its edit fields to the newly selected task', () => {
  const props = { workspace: {}, onClose: vi.fn(), onUpdated: vi.fn() };
  const view = render(<TaskDetailDrawer task={task('a', 'Tugas pertama')} {...props} />);
  fireEvent.click(screen.getByTitle('Ubah Judul'));
  fireEvent.change(document.querySelector('.title-input-field')!, {
    target: { value: 'Draf lama' },
  });
  view.rerender(<TaskDetailDrawer task={task('b', 'Tugas kedua')} {...props} />);
  expect(screen.queryByText('Tugas pertama')).toBeNull();
  fireEvent.click(screen.getByTitle('Ubah Judul'));
  expect((document.querySelector('.title-input-field') as HTMLInputElement).value).toBe(
    'Tugas kedua',
  );
});

it('an empty saved routine configuration stays empty and stale completions do not inflate counts', () => {
  localStorage.setItem('kdmp_manager_routine_config', '[]');
  localStorage.setItem(`kdmp_manager_routine_${today()}`, '["removed-routine"]');
  render(<Dashboard data={{}} />);
  expect(screen.queryByText('Buka gerai & cek kas modal awal')).toBeNull();
  expect(screen.getByText('0/0 selesai')).toBeTruthy();
});

it('invalid routine storage does not crash the dashboard', () => {
  localStorage.setItem('kdmp_manager_routine_config', '[{"id":3,"title":null}]');
  localStorage.setItem(`kdmp_manager_routine_${today()}`, '{}');
  render(<Dashboard data={{}} />);
  expect(screen.getByText('Buka gerai & cek kas modal awal')).toBeTruthy();
  expect(screen.getByText('0/6 selesai')).toBeTruthy();
});

it('the period editor is a native modal and cannot close while saving', async () => {
  let rejectSave: (reason: Error) => void = () => {};
  mocks.api.mockImplementation(
    () =>
      new Promise((_, reject) => {
        rejectSave = reject;
      }),
  );
  const close = vi.fn();
  render(<SprintModal onClose={close} onSaved={vi.fn()} />);
  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInstanceOf(HTMLDialogElement);
  fireEvent.click(screen.getByRole('button', { name: 'Simpan' }));
  expect((screen.getByRole('button', { name: 'Tutup modal' }) as HTMLButtonElement).disabled).toBe(
    true,
  );
  fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
  expect(close).not.toHaveBeenCalled();
  await act(async () => {
    rejectSave(new Error('Koneksi terputus'));
  });
  expect(screen.getByRole('alert').textContent).toContain('Koneksi terputus');
  fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
  expect(close).toHaveBeenCalledOnce();
});

it('a query-only navigation switches task views while preserving local filters', () => {
  const props = {
    entity: 'work-items' as const,
    workspace: { 'work-items': [task('a', 'Tugas saya')] },
    refresh: vi.fn(),
  };
  const view = render(<Records {...props} />);
  fireEvent.change(screen.getByRole('combobox', { name: 'Prioritas' }), {
    target: { value: 'tinggi' },
  });
  window.history.replaceState(null, '', '/tugas?view=papan');
  view.rerender(<Records {...props} />);
  expect(screen.getByRole('button', { name: 'Papan' }).getAttribute('aria-pressed')).toBe('true');
  expect((screen.getByRole('combobox', { name: 'Prioritas' }) as HTMLSelectElement).value).toBe(
    'tinggi',
  );
});

it('at 1024px the menu toggles the desktop sidebar and closed mobile navigation is inert', () => {
  vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
  render(
    <AppShell>
      <p>Isi ruang kerja</p>
    </AppShell>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Buka menu navigasi' }));
  expect(document.querySelector('.manager-shell')?.classList.contains('sidebar-collapsed')).toBe(
    true,
  );
  const sheet = document.querySelector('.mobile-app-sheet')!;
  expect(sheet.hasAttribute('inert')).toBe(true);
  expect(sheet.getAttribute('aria-hidden')).toBe('true');
  const links = document.querySelectorAll('.sidebar-nav-item');
  expect([...links].every((link) => Boolean(link.getAttribute('aria-label')))).toBe(true);
});
