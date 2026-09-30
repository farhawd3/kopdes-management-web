'use client';
import { useSyncExternalStore } from 'react';
const eventName = 'kopdes-preference';
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(eventName, callback);
  };
}
export function usePreference(key: string, fallback: string): [string, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) || fallback;
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );
  return [
    value,
    (next) => {
      try {
        localStorage.setItem(key, next);
      } catch {
        /* Browser privat dapat menolak penyimpanan. */
      }
      window.dispatchEvent(new Event(eventName));
    },
  ];
}
