import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireSession } from '@/lib/server/auth';
import { AppShell } from '@/components/layout/AppShell';
export const dynamic = 'force-dynamic';
export default async function Layout({ children }: { children: React.ReactNode }) {
  try {
    await requireSession();
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') redirect('/pin');
    return (
      <main className="auth">
        <section className="card">
          <h1>Konfigurasi diperlukan</h1>
          <p>
            Supabase baru belum siap. Periksa variabel HUB_SUPABASE_URL, HUB_SUPABASE_SERVICE_KEY,
            dan migrasi baru di server.
          </p>
          <Link href="/pin">Kembali ke PIN</Link>
        </section>
      </main>
    );
  }
  return <AppShell>{children}</AppShell>;
}
