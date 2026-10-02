'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { operationEntities, type Entity, type Item } from './schemas';
import { api } from '@/lib/client';
import { pageEntities } from './workspace-scope';
import type { ListQuery } from './query';
export type Workspace = Partial<Record<Entity, Item[]>>;
type Page = { items: Item[]; hasMore: boolean; nextOffset: number };
export type LoadScope = Pick<ListQuery, 'scope' | 'q' | 'from' | 'to' | 'project'>;
type WorkspaceCacheEntry = {
  data: Workspace;
  more: Partial<Record<Entity, number>>;
  operations: boolean;
  timestamp: number;
};

const workspaceCache = new Map<string, WorkspaceCacheEntry>();

export function invalidateWorkspaceCache(pattern?: string) {
  if (!pattern) {
    workspaceCache.clear();
  } else {
    for (const key of workspaceCache.keys()) {
      if (key.includes(pattern)) workspaceCache.delete(key);
    }
  }
}

export function useWorkspace(
  slug = 'beranda',
  scope: LoadScope = { scope: 'current' },
  record?: { entity: Entity; id: string },
) {
  const scopeKey = JSON.stringify(scope),
    recordKey = JSON.stringify(record);
  const cacheKey = `${slug}:${scopeKey}:${recordKey}`;
  const initialCache = workspaceCache.get(cacheKey);

  const [data, setData] = useState<Workspace>(() => initialCache?.data || {}),
    [loading, setLoading] = useState(() => !initialCache),
    [error, setError] = useState('');
  const [operations, setOperations] = useState(() => initialCache?.operations || false);
  const [more, setMore] = useState<Partial<Record<Entity, number>>>(() => initialCache?.more || {});
  const [fetching, setFetching] = useState<Entity | null>(null);
  const generation = useRef(0);
  const pathFor = useCallback(
    (entity: Entity, offset = 0) => {
      const selection: LoadScope = JSON.parse(scopeKey);
      const params = new URLSearchParams({
        limit: '50',
        offset: String(offset),
        scope: selection.scope,
      });
      const primary = pageEntities(slug).filter(
        (name) => !['organization', 'workstreams'].includes(name),
      );
      if (entity === primary[0] || (slug === 'proyek' && entity === 'workstreams')) {
        for (const key of ['q', 'from', 'to'] as const)
          if (selection[key]) params.set(key, selection[key]);
      }
      if (selection.project && ['work-items', 'milestones', 'checklist'].includes(entity))
        params.set('project', selection.project);
      return `${entity}?${params}`;
    },
    [scopeKey, slug],
  );
  const refresh = useCallback(async () => {
    const current = ++generation.current;
    try {
      const capabilities = await api<{ operations: boolean }>('capabilities');
      const entries = await Promise.all(
        pageEntities(slug)
          .filter((entity) => capabilities.operations || !operationEntities.includes(entity))
          .map(async (entity) => [entity, await api<Page>(pathFor(entity))] as const),
      );
      if (current !== generation.current) return;
      const next: Workspace = Object.fromEntries(
        entries.map(([entity, page]) => [entity, page.items]),
      );
      const selected: { entity: Entity; id: string } | undefined = recordKey
        ? JSON.parse(recordKey)
        : undefined;
      if (selected && !next[selected.entity]?.some((row) => row.id === selected.id)) {
        const detail = await api<Page>(`${selected.entity}?id=${encodeURIComponent(selected.id)}`);
        next[selected.entity] = [...(next[selected.entity] || []), ...detail.items];
      }
      if (current !== generation.current) return;
      const nextMore = Object.fromEntries(
        entries
          .filter(([, page]) => page.hasMore)
          .map(([entity, page]) => [entity, page.nextOffset]),
      );
      setData(next);
      setMore(nextMore);
      workspaceCache.set(cacheKey, {
        data: next,
        more: nextMore,
        operations: capabilities.operations,
        timestamp: Date.now(),
      });
      window.dispatchEvent(new CustomEvent('hub-workspace', { detail: next }));
      setOperations(capabilities.operations);
      setError('');
    } catch (e) {
      if (current === generation.current) {
        window.dispatchEvent(new CustomEvent('hub-workspace', { detail: null }));
        setError((e as Error).message);
      }
    } finally {
      if (current === generation.current) setLoading(false);
    }
  }, [slug, pathFor, recordKey, cacheKey]);
  const loadMore = async (entity: Entity) => {
    if (fetching || more[entity] === undefined) return;
    const current = generation.current;
    setFetching(entity);
    setError('');
    try {
      const page = await api<Page>(pathFor(entity, more[entity]));
      if (current !== generation.current) return;
      setData((previous) => {
        const next = {
          ...previous,
          [entity]: [
            ...(previous[entity] || []),
            ...page.items.filter(
              (row) => !previous[entity]?.some((existing) => existing.id === row.id),
            ),
          ],
        };
        window.dispatchEvent(new CustomEvent('hub-workspace', { detail: next }));
        return next;
      });
      setMore((previous) => {
        const next = { ...previous };
        if (page.hasMore) next[entity] = page.nextOffset;
        else delete next[entity];
        return next;
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFetching(null);
    }
  };
  useEffect(() => {
    // Synchronize requests with the page and explicit archive filters.
    // Stale-while-revalidate: if cached data exists, render immediately without flash
    const cached = workspaceCache.get(cacheKey);
    if (cached) {
      setData(cached.data);
      setMore(cached.more);
      setOperations(cached.operations);
      setLoading(false);
      window.dispatchEvent(new CustomEvent('hub-workspace', { detail: cached.data }));
    } else {
      setLoading(true);
    }
    void refresh();
    const requestRef = generation;
    return () => {
      requestRef.current++;
    };
  }, [refresh, cacheKey]);
  return { data, loading, error, refresh, operations, more, loadMore, fetching };
}
