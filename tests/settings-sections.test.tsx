import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/components/layout', () => ({ PageHeader: ({ title, actions }: { title: string; actions: React.ReactNode }) => <header><h1>{title}</h1>{actions}</header> }));
vi.mock('@/lib/OrganizationContext', () => ({ useOrganizationProfile: () => ({ setProfileData: vi.fn(), reloadProfile: vi.fn() }) }));
vi.mock('@/lib/ThemeContext', () => ({ useTheme: () => ({ preference: 'light', setTheme: vi.fn() }) }));
vi.mock('@/lib/organization-status', () => ({ businessStatusLabel: () => 'Persiapan' }));
vi.mock('@/components/ui/Toast', () => ({ useToast: () => ({ showToast: vi.fn() }) }));
vi.mock('@/components/pengaturan/ManagerPinSettings', () => ({ ManagerPinSettings: () => <p>Panel PIN</p> }));
vi.mock('@/components/pengaturan/OpenAiKeySettings', () => ({ OpenAiKeySettings: () => <p>Panel AI</p> }));
vi.mock('@/components/pengaturan/UnitApiKeySettings', () => ({ UnitApiKeySettings: () => <p>Panel API gerai</p> }));

import PengaturanPage from '@/app/pengaturan/page';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('menampilkan satu bagian pengaturan dan menjaga draf profil saat berpindah bagian', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ profile: { display_name: 'Koperasi', business_status: 'persiapan', manager_name: 'Manajer' } }) });
  vi.stubGlobal('fetch', fetchMock);
  render(<PengaturanPage />);
  await screen.findByRole('heading', { name: 'Kenyamanan tampilan' });
  expect(screen.queryByRole('heading', { name: 'Identitas Lembaga Koperasi' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Profil' }));
  expect(screen.queryByRole('heading', { name: 'Kenyamanan tampilan' })).toBeNull();
  const name = screen.getByRole('textbox', { name: /Nama Tampilan Koperasi/ });
  fireEvent.change(name, { target: { value: 'Nama belum disimpan' } });
  fireEvent.click(screen.getByRole('button', { name: 'Tampilan' }));
  fireEvent.click(screen.getByRole('button', { name: 'Profil' }));
  expect((screen.getByRole('textbox', { name: /Nama Tampilan Koperasi/ }) as HTMLInputElement).value).toBe('Nama belum disimpan');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
