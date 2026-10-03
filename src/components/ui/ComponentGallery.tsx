'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, IconButton } from './Button';
import { Input, Textarea } from './Input';
import { Field } from './Field';
import { Badge } from './Badge';
import { Card, CardHeader } from './Card';
import { Select } from './Select';
import { DateInput } from './DateField';
import { DateNav } from './DateNav';
import { BottomNav } from './BottomNav';

export function ComponentGallery() {
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState('sage');
  const [value, setValue] = useState('2026-10-04');
  const [notice, setNotice] = useState('');
  return <main className={`ui-gallery ${dark ? 'dark' : ''}`} data-theme={dark ? 'dark' : 'light'} data-theme-color={theme}>
    <h1>Komponen antarmuka</h1>
    <p>Pratinjau lokal tanpa koneksi data. Gunakan Tab, hover dan tekan untuk memeriksa fokus serta interaksi.</p>
    <Button onClick={() => setDark(!dark)}>{dark ? 'Tema terang' : 'Tema gelap'}</Button>
    <Select ariaLabel="Warna pratinjau" value={theme} onChange={setTheme} options={['lime', 'peach', 'lavender', 'sage', 'sky']} />
    <Card><CardHeader><h2>Tombol</h2></CardHeader>
      <div className="ui-gallery-row">{(['primary', 'secondary', 'ghost', 'danger-soft'] as const).map((variant) => <Button key={variant} variant={variant} onClick={() => setNotice(variant)}>{variant}</Button>)}
      <IconButton aria-label="Tambah"><Plus /></IconButton><Button disabled>Nonaktif</Button><Button loading>Menyimpan</Button></div>
    </Card>
    <Card><CardHeader><h2>Form dan tanggal</h2></CardHeader>
      <form onSubmit={(event) => { event.preventDefault(); setNotice('Form valid'); }}>
        <Field id="gallery-name" label="Nama" helper="Contoh bantuan"><Input id="gallery-name" aria-describedby="gallery-name-helper" /></Field>
        <Field id="gallery-error" label="Kolom dengan galat" error="Lengkapi kolom ini"><Input id="gallery-error" aria-invalid aria-describedby="gallery-error-error" /></Field>
        <Field id="gallery-notes" label="Catatan"><Textarea id="gallery-notes" /></Field>
        <DateInput label="Tanggal" name="date" value={value} onValueChange={setValue} required />
        <DateInput label="Tanggal nonaktif" disabled />
        <Select ariaLabel="Pilihan" options={['Pertama', 'Kedua']} />
        <Button type="submit" variant="primary">Simpan contoh</Button>
      </form>
    </Card>
    <Card><CardHeader><h2>Status dan navigasi</h2></CardHeader>
      <div className="ui-gallery-row">{(['neutral', 'success', 'danger', 'warn', 'info'] as const).map((tone) => <Badge key={tone} tone={tone}>{tone}</Badge>)}</div>
      <DateNav onPrevious={() => setNotice('Sebelumnya')} onToday={() => setNotice('Hari ini')} onNext={() => setNotice('Berikutnya')} />
    </Card>
    <p role="status">{notice}</p>
    <BottomNav path="/beranda" calendar={false} menu={false} onAction={() => setNotice('Aksi')} onMenu={() => setNotice('Menu')} />
  </main>;
}
