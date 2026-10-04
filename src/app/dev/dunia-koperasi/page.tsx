import { notFound } from 'next/navigation';
import { WorldGallery } from '@/features/cooperative-world/WorldGallery';
export default function Page() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <WorldGallery />;
}
