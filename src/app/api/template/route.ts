import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { requireSession } from '@/lib/server/auth';
import { sameOrigin, failure } from '@/lib/server/http';
import { db } from '@/lib/server/db';
import { list } from '@/features/service';
import { schemas } from '@/features/schemas';
import { buildPlan } from '@/lib/templates/plan-90-hari';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await requireSession();
    const [profile] = await list('organization');
    if (!profile) throw new Error('Lengkapi profil dan tanggal mulai terlebih dahulu.');
    const records = buildPlan(schemas.organization.parse(profile.data).start_date, randomUUID);
    const { data, error } = await db().rpc('install_plan', { records });
    if (error)
      throw new Error('Template gagal dipasang. Tidak ada perubahan parsial yang disimpan.');
    if (!data)
      throw new Error(
        'Template sudah dipasang sebelumnya. Ubah rencana yang ada agar tidak duplikat.',
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    return failure(error);
  }
}
