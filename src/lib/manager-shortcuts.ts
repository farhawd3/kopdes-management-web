import { SEARCH_MODULES } from './navigation';

export const SHORTCUT_STORAGE_KEY = 'kopdes.manager-shortcuts.v1';
export const MAX_SHORTCUTS = 6;
export const DEFAULT_SHORTCUTS = ['/pekerjaan', '/monitoring', '/stok', '/keuangan'];
export const SHORTCUT_OPTIONS = SEARCH_MODULES.filter(({ href }) => href !== '/dashboard');

/** Preferensi perangkat, bukan data koperasi. Hanya rute dikenal yang boleh dibuka. */
export function parseShortcuts(raw: string | null): string[] {
  try {
    const values: unknown = JSON.parse(raw ?? 'null');
    if (!Array.isArray(values)) return [...DEFAULT_SHORTCUTS];
    return [...new Set(values.filter((value): value is string =>
      typeof value === 'string' && SHORTCUT_OPTIONS.some(({ href }) => href === value)
    ))].slice(0, MAX_SHORTCUTS);
  } catch {
    return [...DEFAULT_SHORTCUTS];
  }
}
