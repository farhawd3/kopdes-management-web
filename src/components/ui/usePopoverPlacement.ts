'use client';
import { useLayoutEffect, useRef } from 'react';

/** Kalender membuka ke bawah; dropdown mengikuti ruang panel yang terlihat. */
export function usePopoverPlacement(open: boolean, calendar = false) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      const node = root.current;
      const menu = node?.querySelector<HTMLElement>('[data-popover]');
      if (!node || !menu) return;
      const rect = node.getBoundingClientRect();
      let bounds = { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth };
      // Panel bergulir dapat lebih sempit dari dialog; menu harus tetap di area yang terlihat.
      for (let parent = node.parentElement; parent; parent = parent.parentElement) {
        const style = window.getComputedStyle(parent);
        if (parent.tagName !== 'DIALOG' && !/(auto|scroll|hidden|clip)/.test(style.overflow))
          continue;
        const area = parent.getBoundingClientRect();
        bounds = {
          top: Math.max(bounds.top, area.top),
          bottom: Math.min(bounds.bottom, area.bottom),
          left: Math.max(bounds.left, area.left),
          right: Math.min(bounds.right, area.left + parent.clientLeft + parent.clientWidth),
        };
      }
      if (calendar) {
        const width = Math.min(344, window.innerWidth - 16, bounds.right - bounds.left - 16);
        menu.style.setProperty('--popover-width', `${width}px`);
        const left = bounds.left + 8;
        const right = bounds.right - 8;
        menu.style.setProperty(
          '--popover-offset',
          `${Math.max(left - rect.left, Math.min(0, right - rect.left - width))}px`,
        );
      }
      const top = bounds.top + 8;
      const bottom = bounds.bottom - 8;
      const above = rect.top - top - 8;
      const below = bottom - rect.bottom - 8;
      const height = Math.min(menu.scrollHeight, 360);
      const up = !calendar && below < height && above > below;
      node.dataset.popoverSide = up ? 'above' : 'below';
      menu.style.setProperty('--popover-available-height', `${Math.max(44, up ? above : below)}px`);
    };
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open, calendar]);
  return root;
}
