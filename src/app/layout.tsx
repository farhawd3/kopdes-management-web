import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './globals.css';
import './workspace.css';
import './studio.css';
export const metadata: Metadata = {
  title: 'Kopdes Management Web',
  description: 'Ruang kerja pribadi manajer koperasi: rencana, koordinasi, kesiapan, dan laporan.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
