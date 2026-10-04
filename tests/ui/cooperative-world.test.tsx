import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CooperativeWorld } from '@/features/cooperative-world/CooperativeWorld';
afterEach(() => {
  cleanup();
  localStorage.clear();
});
beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
});
afterEach(() => vi.unstubAllGlobals());
describe('Navigasi dunia koperasi', () => {
  it('masuk kantor, membuka meja kosong, lalu Escape kembali satu tingkat', () => {
    render(
      <CooperativeWorld data={{}} refresh={vi.fn()} operations={false} supplierReady={false} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Gedung koperasi — masuk kantor' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tugas — 0 catatan dimuat' }));
    expect(screen.getByRole('heading', { name: 'Meja Tugas' })).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('heading', { name: 'Meja Tugas' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Tugas — 0 catatan dimuat' })).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Gedung koperasi — masuk kantor' })).toBeTruthy();
  });
  it('slot kosong menyediakan aksi tambah dan gudang tidak mengarang stok', () => {
    render(
      <CooperativeWorld data={{}} refresh={vi.fn()} operations={false} supplierReady={false} />,
    );
    fireEvent.keyDown(screen.getByRole('button', { name: 'Slot Gerai 1 — tambahkan gerai' }), {
      key: 'Enter',
    });
    expect(screen.getByRole('button', { name: 'Tambah gerai' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Gudang — periksa barang dan stok' }));
    expect(screen.getByText('Pencatatan belum aktif. Stok belum dapat diperiksa.')).toBeTruthy();
  });
  it('alternatif daftar tetap membuka modul dan objek tanpa scene', () => {
    render(
      <CooperativeWorld data={{}} refresh={vi.fn()} operations={false} supplierReady={false} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Daftar saja' }));
    expect(screen.queryByRole('img', { name: /Dunia koperasi, pilih/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Tugas · 0 catatan' }));
    expect(screen.getByRole('heading', { name: 'Meja Tugas' })).toBeTruthy();
  });
});
