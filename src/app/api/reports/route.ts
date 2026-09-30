import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireSession } from '@/lib/server/auth';
import { sameOrigin, failure, readJson } from '@/lib/server/http';
import { db } from '@/lib/server/db';
import { date } from '@/features/schemas';
import { list } from '@/features/service';
import { reportSnapshot } from '@/features/report-snapshot';
export async function GET() {
  try {
    await requireSession();
    const { data, error } = await db()
      .from('manager_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw new Error('Laporan gagal dimuat.');
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await requireSession();
    const body = z
      .object({
        title: z.string().min(1).max(200),
        start: date,
        end: date,
        notes: z.string().max(10000),
      })
      .strict()
      .parse(await readJson(request));
    if (body.start > body.end) throw new Error('Periode tidak sah.');
    const [organization, tasks, decisions, risks, milestones] = await Promise.all([
      list('organization'),
      list('work-items'),
      list('decisions'),
      list('risks'),
      list('milestones'),
    ]);
    const snapshot = {
      ...reportSnapshot(
        { organization, 'work-items': tasks, decisions, risks, milestones },
        body.start,
        body.end,
      ),
      notes: body.notes,
    };
    const { data, error } = await db()
      .from('manager_reports')
      .insert({ title: body.title, period_start: body.start, period_end: body.end, snapshot })
      .select('*')
      .single();
    if (error) throw new Error('Snapshot laporan gagal disimpan.');
    return NextResponse.json(data);
  } catch (error) {
    return failure(error);
  }
}
