import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireSession } from '@/lib/server/auth';
import { sameOrigin, failure, readJson } from '@/lib/server/http';
import { entityName } from '@/features/schemas';
import { list, save } from '@/features/service';
import { db } from '@/lib/server/db';
type Context = { params: Promise<{ entity: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    await requireSession();
    const entity = entityName((await context.params).entity);
    if (!entity) return NextResponse.json({ error: 'Rute tidak ditemukan.' }, { status: 404 });
    return NextResponse.json(await list(entity), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request, context: Context) {
  try {
    sameOrigin(request);
    await requireSession();
    const entity = entityName((await context.params).entity);
    if (!entity) return NextResponse.json({ error: 'Rute tidak ditemukan.' }, { status: 404 });
    const body = z
      .object({ id: z.string().uuid().optional(), data: z.unknown() })
      .strict()
      .parse(await readJson(request));
    return NextResponse.json(await save(entity, body.data, body.id));
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request, context: Context) {
  try {
    sameOrigin(request);
    await requireSession();
    const entity = entityName((await context.params).entity);
    const { id } = z
      .object({ id: z.string().uuid() })
      .strict()
      .parse(await readJson(request));
    if (!entity || entity === 'organization' || entity === 'workstreams')
      throw new Error('Catatan ini tidak dapat dihapus.');
    const { error } = await db().from('hub_records').delete().eq('id', id).eq('entity', entity);
    if (error) throw new Error('Penghapusan gagal.');
    return NextResponse.json({ success: true });
  } catch (error) {
    return failure(error);
  }
}
