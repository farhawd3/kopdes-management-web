"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, SlidersHorizontal, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { DEFAULT_SHORTCUTS, MAX_SHORTCUTS, parseShortcuts, SHORTCUT_OPTIONS, SHORTCUT_STORAGE_KEY } from '@/lib/manager-shortcuts';

export function ManagerShortcuts() {
  const [saved, setSaved] = useState<string[]>(DEFAULT_SHORTCUTS);
  const [draft, setDraft] = useState<string[]>(DEFAULT_SHORTCUTS);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const load = () => {
      try { setSaved(parseShortcuts(localStorage.getItem(SHORTCUT_STORAGE_KEY))); }
      catch { setNotice('Penyimpanan perangkat tidak tersedia. Pintasan bawaan tetap dapat dipakai.'); }
    };
    load();
    const sync = (event: StorageEvent) => {
      if (event.key === SHORTCUT_STORAGE_KEY || event.key === null) load();
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const save = () => {
    try {
      localStorage.setItem(SHORTCUT_STORAGE_KEY, JSON.stringify(draft));
      setSaved(draft);
      setOpen(false);
      setNotice('Pintasan tersimpan di perangkat ini.');
    } catch {
      setNotice('Pintasan belum tersimpan. Izinkan penyimpanan browser, lalu coba lagi.');
    }
  };

  return (
    <section aria-label="Pintasan pilihan manajer" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold"><Zap className="h-4 w-4 text-primary" />Akses cepat</h2>
        <Button variant="ghost" onClick={() => { setDraft(saved); setNotice(''); setOpen(true); }}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />Atur pintasan
        </Button>
      </div>
      <div className={cn('grid grid-cols-2 gap-2', saved.length <= 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3 xl:grid-cols-6')}>
        {saved.map((href) => {
          const item = SHORTCUT_OPTIONS.find((option) => option.href === href)!;
          return <Link key={href} href={href} className="group flex min-h-14 items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold transition-colors hover:border-rose-300 hover:bg-rose-50 dark:border-slate-700 dark:bg-[#252F40] dark:hover:border-rose-400/60 dark:hover:bg-slate-800">
            <span>{item.title}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
          </Link>;
        })}
      </div>
      {saved.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada pintasan. Pilih halaman yang paling sering Bapak gunakan.</p>}
      {!open && notice && <p role="status" className="text-xs text-slate-500 dark:text-slate-400">{notice}</p>}
      <Dialog isOpen={open} onClose={() => setOpen(false)} title="Pintasan kerja pilihan" description="Pilih hingga enam halaman. Urutan mengikuti pilihan Bapak; tersimpan hanya pada browser ini, tidak ikut backup koperasi." maxWidth="xl" footer={<><Button variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button onClick={save}>Simpan pintasan</Button></>}>
        <div className="mb-3 flex items-center justify-between gap-2 text-sm"><span>{draft.length}/{MAX_SHORTCUTS} dipilih</span><Button variant="ghost" onClick={() => setDraft([...DEFAULT_SHORTCUTS])}>Kembalikan bawaan</Button></div>
        <div className="grid gap-2 sm:grid-cols-2">
          {SHORTCUT_OPTIONS.map(({ href, title, desc }) => {
            const selected = draft.includes(href);
            return <button key={href} type="button" aria-pressed={selected} disabled={!selected && draft.length >= MAX_SHORTCUTS} onClick={() => setDraft(selected ? draft.filter((value) => value !== href) : [...draft, href])} className={cn('flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left disabled:opacity-40', selected ? 'border-rose-300 bg-rose-50 dark:border-rose-400/60 dark:bg-rose-950/30' : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800')}>
              <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border', selected ? 'border-primary-container bg-primary-container text-white' : 'border-slate-300 dark:border-slate-600')}>{selected && <Check className="h-4 w-4" />}</span>
              <span><span className="block text-sm font-semibold">{title}</span><span className="text-xs text-slate-500 dark:text-slate-400">{desc}</span></span>
            </button>;
          })}
        </div>
        {notice && <p role="alert" className="mt-3 text-sm text-amber-700 dark:text-amber-300">{notice}</p>}
      </Dialog>
    </section>
  );
}
