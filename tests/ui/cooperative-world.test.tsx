import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CooperativeWorld } from '@/features/cooperative-world/CooperativeWorld';
vi.mock('next/dynamic', () => ({ default: () => () => <div data-testid="scene" /> }));
beforeEach(() => localStorage.clear());
afterEach(cleanup);
it('masuk dan keluar kantor dengan pintasan area yang tepat', () => {
  render(<CooperativeWorld data={{}} preview />);
  fireEvent.click(screen.getByRole('button', { name: 'Kantor' }));
  expect(screen.getByRole('heading', { name: 'Meja rapat' })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Buka meja rapat' }).getAttribute('href')).toBe('/rapat');
  fireEvent.click(screen.getByRole('button', { name: 'Area kegiatan' }));
  expect(screen.getByRole('link', { name: 'Buka area kegiatan' }).getAttribute('href')).toBe(
    '/jurnal',
  );
  fireEvent.click(screen.getByRole('button', { name: 'Kawasan' }));
  expect(screen.getByRole('heading', { name: 'Kawasan koperasi' })).toBeTruthy();
});
it('gerai kosong mengarah ke form asli, tanpa membuat data pratinjau', () => {
  render(<CooperativeWorld data={{}} />);
  fireEvent.click(screen.getByRole('button', { name: /Lahan gerai 1/ }));
  expect(screen.getByText('Lahan kosong')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Tambahkan gerai' }).getAttribute('href')).toBe('/gerai');
});
it('galat pemuatan ditampilkan sebagai tidak tersedia, bukan angka nol', () => {
  render(<CooperativeWorld data={{}} error="Koneksi gagal" refresh={vi.fn()} />);
  expect(screen.getByRole('alert').textContent).toContain('Koneksi gagal');
  expect(screen.getByRole('link', { name: /Gerai tercatat/ }).textContent).toContain('—');
  expect(screen.getByRole('button', { name: 'Coba lagi' })).toBeTruthy();
});
it('preferensi korup tidak mencegah halaman tampil', () => {
  localStorage.setItem('hub-world-preferences-v1', '{rusak');
  render(<CooperativeWorld data={{}} />);
  fireEvent.click(screen.getByRole('button', { name: 'Suasana' }));
  expect(screen.getByRole('heading', { name: 'Suasana & karakter' })).toBeTruthy();
  expect(screen.getByText(/Cuaca adalah simulasi/)).toBeTruthy();
});
