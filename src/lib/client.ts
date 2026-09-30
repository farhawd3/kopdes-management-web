export async function api<T>(path: string, body?: unknown, method = 'POST'): Promise<T> {
  const response = await fetch(
    '/api/' + path,
    body === undefined
      ? { cache: 'no-store' }
      : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
  );
  const result = await response.json();
  if (!response.ok) {
    if (response.status === 401 && path !== 'auth/pin') resetAuthNavigation('/pin');
    throw new Error(result.error || 'Permintaan gagal.');
  }
  return result;
}
// Muat ulang penuh setelah perubahan sesi agar cache halaman privat ikut dibuang.
export function resetAuthNavigation(path: '/pin' | '/beranda') {
  window.location.assign(path);
}
