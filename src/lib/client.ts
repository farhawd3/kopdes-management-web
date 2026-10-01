// In-memory client cache with TTL & mutation invalidation to accelerate requests and save tokens
type CacheEntry<T> = { data: T; expiry: number };
const clientCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 60_000; // 60 seconds cache for read queries

export function invalidateCache(pathPrefix?: string) {
  if (!pathPrefix) {
    clientCache.clear();
  } else {
    for (const key of clientCache.keys()) {
      if (
        key === pathPrefix ||
        key.startsWith(pathPrefix + '/') ||
        key.startsWith(pathPrefix + '?')
      ) {
        clientCache.delete(key);
      }
    }
  }
}

export async function api<T>(
  path: string,
  body?: unknown,
  method = body === undefined ? 'GET' : 'POST',
  options?: { bypassCache?: boolean; ttlMs?: number },
): Promise<T> {
  const isRead = body === undefined && method === 'GET';
  const cacheKey = `${path}`;

  // Serve from cache if available and not expired for read requests
  if (isRead && !options?.bypassCache) {
    const cached = clientCache.get(cacheKey) as CacheEntry<T> | undefined;
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
  }

  const response = await fetch(
    '/api/' + path,
    body === undefined
      ? { method, cache: 'no-store' }
      : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
  );

  const result = await response.json();
  if (!response.ok) {
    if (response.status === 401 && path !== 'auth/pin') resetAuthNavigation('/pin');
    throw new Error(result.error || 'Permintaan gagal.');
  }

  // Cache read results
  if (isRead) {
    clientCache.set(cacheKey, {
      data: result,
      expiry: Date.now() + (options?.ttlMs ?? DEFAULT_TTL_MS),
    });
  } else {
    // Invalidate related cache on mutations (POST, PUT, DELETE)
    invalidateCache();
  }

  return result;
}

// Muat ulang penuh setelah perubahan sesi agar cache halaman privat ikut dibuang.
export function resetAuthNavigation(path: '/pin' | '/beranda') {
  invalidateCache();
  if (path === '/pin') {
    try {
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith('hub-draft:'))
        .forEach((key) => sessionStorage.removeItem(key));
    } catch {
      /* Storage may be disabled. */
    }
  }
  window.location.assign(path);
}
