import { afterEach, beforeAll, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Editor } from '@/features/Editor';
import { popupEntities, popupWorkspace } from '@/features/qa/popup-fixtures';
import { schemas } from '@/features/schemas';
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});
afterEach(cleanup);
for (const entity of popupEntities) {
  for (const filled of [false, true]) {
    it(`form ${entity} ${filled ? 'ubah terisi' : 'tambah'} memiliki dialog, kontrol dan label`, () => {
      const item = popupWorkspace[entity]![0];
      expect(schemas[entity].safeParse(item.data).success).toBe(true);
      const { container } = render(<Editor entity={entity} item={filled ? item : undefined} workspace={popupWorkspace} draftScope="qa-popup" onClose={() => {}} onSaved={async () => {}} />);
      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByRole('button', { name: /^Simpan$/ })).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Tutup formulir' })).toBeTruthy();
      for (const control of container.querySelectorAll('input:not([aria-hidden="true"]):not([type="hidden"]), textarea')) {
        expect(control.getAttribute('aria-label') || control.getAttribute('aria-labelledby') || (control as HTMLInputElement).labels?.length).toBeTruthy();
      }
    }, 15000);
  }
}
