import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/server/auth';
import { db } from '@/lib/server/db';
import { failure } from '@/lib/server/http';
export async function GET() {
  try {
    await requireSession();
    const { data, error } = await db().rpc('hub_operations_ready');
    if (error && !['PGRST202', '42883'].includes(error.code))
      throw new Error('Status modul pencatatan belum dapat diperiksa. Coba lagi.');
    return NextResponse.json(
      { operations: !error && data === true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return failure(error);
  }
}
