import { notFound, redirect } from 'next/navigation';
import { navigation } from '@/features/catalog';
import { WorkspacePage } from '@/features/workspace/WorkspacePage';
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  if (slug === 'riwayat-proyek') {
    const query = await searchParams;
    const id = typeof query?.id === 'string' ? query.id : '';
    redirect('/proyek?tab=riwayat' + (id ? '&id=' + encodeURIComponent(id) : ''));
  }
  if (!navigation.some(([href]) => href === `/${slug}`)) notFound();
  return <WorkspacePage key={slug} slug={slug} />;
}
