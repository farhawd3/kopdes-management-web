import { describe, expect, it } from 'vitest';
import { makeTaskCode } from '@/features/task-code';
import { schemas } from '@/features/schemas';

describe('Kode tugas otomatis', () => {
  it('mengambil kata kegiatan dan penanda unik', () => {
    expect(makeTaskCode('Mengunjungi koperasi', '12345678-0000-0000-0000-000000000000')).toBe(
      'MENGU-123456780000',
    );
    expect(makeTaskCode('Rapat evaluasi', 'abcdef01-0000-0000-0000-000000000000')).toBe(
      'RAPAT-ABCDEF010000',
    );
  });
  it('menerima dokumen terkait sebagai pilihan tugas', () => {
    const task = schemas['work-items'].parse({
      title: 'Periksa kontrak',
      due_date: '2026-10-02',
      document_id: '12345678-1234-1234-1234-123456789abc',
    });
    expect(task.document_id).toBe('12345678-1234-1234-1234-123456789abc');
  });
});
