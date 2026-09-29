"use client";

import React, { useState } from 'react';
import { Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/Textarea';
import { managerBriefing } from '@/lib/manager-briefing';
import type { DashboardSummary } from '@/lib/manager-summary';

export function ManagerBriefing({ data, organization }: { data: DashboardSummary; organization: string }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const text = managerBriefing(data, organization);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice('Ringkasan disalin. Bapak dapat menempelkannya di catatan atau pesan. Tidak ada pesan yang dikirim otomatis.');
    } catch {
      setNotice('Browser belum mengizinkan penyalinan. Pilih teks di atas, lalu salin secara manual.');
    }
  };
  return <>
    <Button variant="outline" onClick={() => { setNotice(''); setOpen(true); }} className="min-h-12"><FileText className="mr-2 h-4 w-4" />Ringkasan harian</Button>
    <Dialog isOpen={open} onClose={() => setOpen(false)} title="Ringkasan untuk koordinasi" description="Tinjau sebelum dibagikan kepada pengurus atau PIC. Dibuat dari data dashboard, tanpa layanan AI atau pengiriman otomatis." maxWidth="2xl" footer={<><Button variant="outline" onClick={() => setOpen(false)}>Tutup</Button><Button onClick={copy}><Copy className="mr-2 h-4 w-4" />Salin ringkasan</Button></>}>
      <Textarea label="Isi ringkasan" readOnly value={text} rows={14} onFocus={(event) => event.currentTarget.select()} />
      {notice && <p role="status" className="mt-3 text-sm text-slate-600 dark:text-slate-300">{notice}</p>}
    </Dialog>
  </>;
}
