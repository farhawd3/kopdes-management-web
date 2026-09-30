import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
export async function readJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('JSON kosong.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 5_000_000) {
      await reader.cancel();
      throw new Error('PAYLOAD_TOO_LARGE');
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function sameOrigin(request: Request) {
  const expected = process.env.HUB_APP_ORIGIN || new URL(request.url).origin;
  if (request.headers.get('origin') !== expected) throw new Error('FORBIDDEN');
}
export function failure(error: unknown) {
  if (error instanceof SyntaxError)
    return NextResponse.json({ error: 'Format JSON tidak sah.' }, { status: 400 });
  if (error instanceof ZodError)
    return NextResponse.json(
      { error: error.issues.map((item) => `${item.path.join('.')}: ${item.message}`).join('; ') },
      { status: 400 },
    );
  const message = error instanceof Error ? error.message : 'Permintaan gagal.';
  const status =
    message === 'UNAUTHORIZED'
      ? 401
      : message === 'FORBIDDEN'
        ? 403
        : message === 'PAYLOAD_TOO_LARGE'
          ? 413
          : 503;
  return NextResponse.json(
    {
      error:
        message === 'UNAUTHORIZED'
          ? 'Sesi berakhir. Buka halaman PIN.'
          : message === 'FORBIDDEN'
            ? 'Asal permintaan tidak diizinkan.'
            : message,
    },
    { status },
  );
}
