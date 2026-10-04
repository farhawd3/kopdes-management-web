import { Store, Video, Users, Wallet, Package, ClipboardCheck, BookOpen, Building2, FolderKanban, CalendarCheck, FileText, Ellipsis, ArrowUpRight, AlertTriangle, CircleCheck, CircleX, X } from 'lucide-react';

export const appIcons = { store: Store, meeting: Video, members: Users, cash: Wallet, inventory: Package, stockCount: ClipboardCheck, guide: BookOpen, profile: Building2, project: FolderKanban, today: CalendarCheck, report: FileText, more: Ellipsis, open: ArrowUpRight, warning: AlertTriangle, complete: CircleCheck, unavailable: CircleX, close: X };
export type AppIconName = keyof typeof appIcons;

/** Ikon dekoratif mendampingi label; ikon mandiri harus diberi label. */
export function AppIcon({ name, size = 18, label }: { name: AppIconName; size?: 16 | 18 | 20 | 24; label?: string }) {
  const Icon = appIcons[name];
  return <Icon className="app-icon" size={size} strokeWidth={1.75} aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} />;
}
