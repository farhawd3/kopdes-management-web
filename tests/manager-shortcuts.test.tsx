import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { ManagerShortcuts } from '@/components/dashboard/ManagerShortcuts';
import { DEFAULT_SHORTCUTS, MAX_SHORTCUTS, parseShortcuts, SHORTCUT_OPTIONS, SHORTCUT_STORAGE_KEY } from '@/lib/manager-shortcuts';

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });

describe('Pintasan manajer', () => {
  it('menggunakan bawaan untuk data rusak tanpa menyebabkan aplikasi gagal', () => {
    expect(parseShortcuts('{broken')).toEqual(DEFAULT_SHORTCUTS);
    expect(parseShortcuts(null)).toEqual(DEFAULT_SHORTCUTS);
    expect(parseShortcuts('{}')).toEqual(DEFAULT_SHORTCUTS);
  });

  it('membuang rute asing, duplikasi, dan membatasi jumlah pilihan', () => {
    expect(parseShortcuts(JSON.stringify(['/stok', '/stok', 'https://example.com', null]))).toEqual(['/stok']);
    expect(parseShortcuts(JSON.stringify(SHORTCUT_OPTIONS.map(({ href }) => href)))).toHaveLength(MAX_SHORTCUTS);
    expect(parseShortcuts('[]')).toEqual([]);
  });

  it('menyimpan pilihan dan mempertahankannya setelah komponen dibuka lagi', () => {
    const view = render(<ManagerShortcuts />);
    fireEvent.click(screen.getByRole('button', { name: 'Atur pintasan' }));
    fireEvent.click(screen.getByRole('button', { name: /Data Anggota/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Simpan pintasan' }));
    expect(JSON.parse(localStorage.getItem(SHORTCUT_STORAGE_KEY)!)).toContain('/anggota');
    view.unmount();
    render(<ManagerShortcuts />);
    expect(screen.getByRole('link', { name: 'Data Anggota' }).getAttribute('href')).toBe('/anggota');
  });

  it('membatalkan perubahan tanpa menulis preferensi', () => {
    render(<ManagerShortcuts />);
    fireEvent.click(screen.getByRole('button', { name: 'Atur pintasan' }));
    fireEvent.click(screen.getByRole('button', { name: /Data Anggota/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));
    expect(screen.queryByRole('link', { name: 'Data Anggota' })).toBeNull();
    expect(localStorage.getItem(SHORTCUT_STORAGE_KEY)).toBeNull();
  });

  it('menyelaraskan perubahan pintasan dari tab browser lain', () => {
    render(<ManagerShortcuts />);
    localStorage.setItem(SHORTCUT_STORAGE_KEY, JSON.stringify(['/anggota']));
    fireEvent(window, new StorageEvent('storage', { key: SHORTCUT_STORAGE_KEY }));
    expect(screen.getByRole('link', { name: 'Data Anggota' })).toBeDefined();
    expect(screen.queryByRole('link', { name: 'Barang & Stok' })).toBeNull();
  });

  it('menonaktifkan pilihan tambahan setelah enam pintasan dan bisa menghapus pilihan', () => {
    localStorage.setItem(SHORTCUT_STORAGE_KEY, JSON.stringify(SHORTCUT_OPTIONS.slice(0, 6).map(({ href }) => href)));
    render(<ManagerShortcuts />);
    fireEvent.click(screen.getByRole('button', { name: 'Atur pintasan' }));
    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByRole('button', { name: new RegExp(SHORTCUT_OPTIONS[6].title) }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(dialog.getByRole('button', { name: new RegExp(SHORTCUT_OPTIONS[0].title) }));
    expect(dialog.getByRole('button', { name: new RegExp(SHORTCUT_OPTIONS[6].title) }).hasAttribute('disabled')).toBe(false);
  });

  it('memberi pesan gagal tanpa mengaku tersimpan ketika browser menolak penyimpanan', () => {
    render(<ManagerShortcuts />);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    fireEvent.click(screen.getByRole('button', { name: 'Atur pintasan' }));
    fireEvent.click(screen.getByRole('button', { name: 'Simpan pintasan' }));
    expect(screen.getByRole('alert').textContent).toContain('belum tersimpan');
    expect(screen.getByRole('dialog')).toBeDefined();
  });
});
