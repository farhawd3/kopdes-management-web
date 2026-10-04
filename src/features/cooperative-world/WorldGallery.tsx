'use client';
import { ThemeProvider } from '@/lib/ThemeContext';
import { CooperativeWorld } from './CooperativeWorld';
export function WorldGallery() {
  return (
    <ThemeProvider>
      <CooperativeWorld
        data={{}}
        refresh={async () => {}}
        operations={false}
        supplierReady={false}
      />
    </ThemeProvider>
  );
}
