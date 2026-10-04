import { notFound } from 'next/navigation';
import { CooperativeWorld } from '@/features/cooperative-world/CooperativeWorld';
const emptyWorkspace = {};
export default function Page() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <CooperativeWorld data={emptyWorkspace} preview />;
}
