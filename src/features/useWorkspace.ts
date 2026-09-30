'use client';
import { useCallback, useEffect, useState } from 'react';
import { schemas, type Entity, type Item } from './schemas';
import { api } from '@/lib/client';
export type Workspace = Partial<Record<Entity, Item[]>>;
export function useWorkspace() {
  const [data, setData] = useState<Workspace>({}),
    [loading, setLoading] = useState(true),
    [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try {
      const entries = await Promise.all(
        (Object.keys(schemas) as Entity[]).map(
          async (entity) => [entity, await api<Item[]>(entity)] as const,
        ),
      );
      setData(Object.fromEntries(entries));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // Sinkronisasi awal dengan API; setter di refresh berjalan setelah permintaan asinkron.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);
  return { data, loading, error, refresh };
}
