"use client";

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useTheme, type ThemePreference } from '@/lib/ThemeContext';

const options: { value: ThemePreference; label: string; description: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Terang', description: 'Lembut untuk ruangan terang.', icon: Sun },
  { value: 'dark', label: 'Gelap', description: 'Nyaman untuk cahaya rendah.', icon: Moon },
  { value: 'system', label: 'Ikuti perangkat', description: 'Sesuai pengaturan perangkat.', icon: Monitor },
];

export function AppearanceSettings() {
  const { preference, setTheme } = useTheme();
  return <Card>
    <CardHeader><CardTitle>Kenyamanan tampilan</CardTitle><CardDescription>Tema hanya disimpan pada browser ini. Data koperasi tidak berubah.</CardDescription></CardHeader>
    <CardContent>
      <fieldset className="grid gap-3 md:grid-cols-3">
        <legend className="sr-only">Pilih tema tampilan</legend>
        {options.map(({ value, label, description, icon: Icon }) => <label key={value} className="relative flex min-h-24 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-colors has-[:checked]:border-rose-400 has-[:checked]:bg-rose-50 dark:border-slate-700 dark:has-[:checked]:bg-rose-950/30">
          <input type="radio" name="appearance" value={value} checked={preference === value} onChange={() => setTheme(value)} className="h-5 w-5 shrink-0 accent-[#A64768]" />
          <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{label}</span><span className="text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</span></span>
          <Icon className="h-5 w-5 shrink-0 text-primary" />
        </label>)}
      </fieldset>
    </CardContent>
  </Card>;
}
