import { notFound } from 'next/navigation';
import { navigation } from '@/features/catalog';
import { WorkspacePage } from '@/features/WorkspacePage';
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!navigation.some(([href]) => href === `/${slug}`)) notFound();
  return <WorkspacePage slug={slug} />;
}
