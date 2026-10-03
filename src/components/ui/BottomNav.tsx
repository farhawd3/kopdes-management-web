import Link from 'next/link';
import { BookOpen, CheckCheck, House, Menu, Plus } from 'lucide-react';
import { Button } from './Button';

export function BottomNav({ path, calendar, menu, onAction, onMenu }: {
  path: string; calendar: boolean; menu: boolean; onAction: () => void; onMenu: () => void;
}) {
  const items = [
    { label: 'Beranda', href: '/beranda', Icon: House },
    { label: 'Tugas', href: '/tugas', Icon: CheckCheck },
    { label: 'Aksi', action: onAction, Icon: Plus },
    { label: 'Kegiatan', href: '/jurnal', Icon: BookOpen },
    { label: 'Menu', action: onMenu, Icon: Menu },
  ];
  return <nav className="ui-bottom-nav" aria-label="Navigasi cepat">
    {items.map(({ label, href, Icon, action }) => {
      const content = <><span className="ui-bottom-icon"><Icon /></span><span>{label}</span></>;
      return href
        ? <Link key={label} href={href} className="ui-bottom-item" aria-label={label} aria-current={path === href && !(href === '/tugas' && calendar) ? 'page' : undefined}>{content}</Link>
        : <Button key={label} type="button" className="ui-bottom-item" onClick={action} data-action={label === 'Aksi'} aria-label={label === 'Aksi' ? 'Aksi Manajer' : 'Semua halaman'} aria-expanded={label === 'Menu' ? menu : undefined}>{content}</Button>;
    })}
  </nav>;
}
