'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { schemas, type Entity, type Item } from './schemas';
import { catalog, labels, options, references } from './catalog';
import type { Workspace } from './useWorkspace';
import { today } from '@/lib/date';
import { api } from '@/lib/client';
import { ZodError } from 'zod';
import { DateField } from '@/components/ui/DateField';
export function Editor({
  entity,
  item,
  workspace,
  onClose,
  onSaved,
  quick = false,
}: {
  entity: Entity;
  item?: Item;
  workspace: Workspace;
  onClose: () => void;
  onSaved: () => Promise<void>;
  quick?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [stockItem, setStockItem] = useState(String(item?.data.item_id || ''));
  const [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => {
      node?.close();
    };
  }, []);
  const fields = quick ? ['title', 'due_date', 'workstream_id'] : catalog[entity].fields;
  const defaults = item?.data || {
    due_date: today(),
    date: today(),
    start_date: today(),
    title: '',
  };
  return (
    <dialog ref={dialog} className="editor" onCancel={onClose} aria-labelledby={headingId}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError('');
          try {
            const form = new FormData(event.currentTarget),
              values: Record<string, unknown> = { ...item?.data };
            for (const field of fields) {
              if (field === 'required') values[field] = form.get(field) === 'on';
              else if (field === 'subtasks')
                values[field] = String(form.get(field) || '')
                  .split('\n')
                  .filter(Boolean)
                  .map((line) => ({
                    title: line.replace(/^\[x\]\s*/i, ''),
                    done: /^\[x\]/i.test(line),
                  }));
              else if (field === 'dependencies') values[field] = form.getAll(field);
              else values[field] = form.get(field) ?? '';
            }
            if (entity === 'work-items')
              values.completed_at =
                values.status === 'selesai' ? item?.data.completed_at || today() : '';
            const parsed = schemas[entity].parse(values);
            await api(entity, { id: item?.id || undefined, data: parsed });
            await onSaved();
            onClose();
          } catch (e) {
            setError(
              e instanceof ZodError
                ? e.issues
                    .map((issue) => `${labels[String(issue.path[0])] || 'Isian'}: ${issue.message}`)
                    .join(' · ')
                : (e as Error).message,
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="section-head">
          <div>
            <span className="eyebrow">{catalog[entity].title}</span>
            <h2 id={headingId}>
              {item?.id
                ? String(item.data.title)
                : entity === 'work-items'
                  ? 'Tugas baru'
                  : entity === 'workstreams'
                    ? 'Proyek baru'
                    : 'Catatan baru'}
            </h2>
          </div>
          <button type="button" aria-label="Tutup formulir" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-grid">
          {fields.map((field) => {
            const value =
                entity === 'stock-counts' &&
                field === 'book_quantity' &&
                stockItem &&
                stockItem !== item?.data.item_id
                  ? workspace['inventory-items']?.find((row) => row.id === stockItem)?.data
                      .book_quantity
                  : defaults[field as keyof typeof defaults],
              choices = options[entity + '.' + field] || options[field],
              reference = references[field];
            const label =
              entity === 'members' && field === 'date'
                ? 'Tanggal bergabung'
                : entity === 'members' && field === 'title'
                  ? 'Nama anggota'
                  : entity === 'workstreams' && field === 'target_date'
                    ? 'Target selesai'
                    : labels[field] || field;
            if (field.endsWith('_date') || field === 'date' || field === 'last_contact')
              return (
                <DateField
                  key={field}
                  name={field}
                  label={label}
                  defaultValue={String(value || '')}
                  required={
                    ['due_date', 'date'].includes(field) ||
                    (entity === 'organization' && field === 'start_date')
                  }
                />
              );
            if (field === 'required')
              return (
                <label key={field} className="check">
                  <input type="checkbox" name={field} defaultChecked={value !== false} />
                  Wajib diselesaikan
                </label>
              );
            if (field === 'dependencies')
              return (
                <fieldset key={field} className="dependency-picker wide">
                  <legend>{label}</legend>
                  <div>
                    {(workspace['work-items'] || [])
                      .filter((row) => row.id !== item?.id)
                      .map((row) => (
                        <label className="check" key={row.id}>
                          <input
                            type="checkbox"
                            name={field}
                            value={row.id}
                            defaultChecked={((value || []) as string[]).includes(row.id)}
                          />
                          {String(row.data.title)}
                        </label>
                      ))}
                  </div>
                  <small>
                    {(workspace['work-items'] || []).some((row) => row.id !== item?.id)
                      ? 'Pilih tugas yang harus selesai lebih dahulu.'
                      : 'Belum ada tugas lain untuk dipilih.'}
                  </small>
                </fieldset>
              );
            if (choices || reference)
              return (
                <label key={field}>
                  {label}
                  <select
                    name={field}
                    defaultValue={String(value ?? choices?.[0] ?? '')}
                    onChange={
                      field === 'item_id' ? (event) => setStockItem(event.target.value) : undefined
                    }
                  >
                    {reference && <option value="">Belum ditentukan</option>}
                    {choices
                      ? choices.map((choice) => <option key={choice}>{choice}</option>)
                      : (workspace[reference] || []).map((row) => (
                          <option key={row.id} value={row.id}>
                            {String(row.data.title)}
                          </option>
                        ))}
                  </select>
                </label>
              );
            if (
              [
                'description',
                'notes',
                'evidence',
                'minutes',
                'agenda',
                'mitigation',
                'subtasks',
              ].includes(field)
            )
              return (
                <label className="wide" key={field}>
                  {label}
                  <textarea
                    name={field}
                    rows={3}
                    defaultValue={
                      field === 'subtasks'
                        ? ((value || []) as { title: string; done: boolean }[])
                            .map((row) => (row.done ? '[x] ' : '') + row.title)
                            .join('\n')
                        : String(value || '')
                    }
                  />
                  {field === 'subtasks' && (
                    <small>Satu subtugas per baris. Awali [x] jika sudah selesai.</small>
                  )}
                </label>
              );
            const score = ['probability', 'impact', 'interest', 'influence'].includes(field);
            const quantity = ['book_quantity', 'minimum_quantity', 'counted_quantity'].includes(
              field,
            );
            const numeric = score || quantity || field === 'amount' || field === 'duration';
            return (
              <label key={field}>
                {label}
                <input
                  key={field === 'book_quantity' ? stockItem : field}
                  name={field}
                  type={
                    field.endsWith('_date') || field === 'date' || field === 'last_contact'
                      ? 'date'
                      : field === 'time'
                        ? 'time'
                        : field === 'link' || field === 'meeting_url'
                          ? 'url'
                          : field === 'color'
                            ? 'color'
                            : numeric
                              ? 'number'
                              : 'text'
                  }
                  min={field === 'duration' ? 15 : quantity ? 0 : numeric ? 1 : undefined}
                  max={
                    field === 'duration'
                      ? 480
                      : score
                        ? 5
                        : field === 'amount'
                          ? 1_000_000_000_000
                          : quantity
                            ? 1_000_000_000
                            : undefined
                  }
                  step={numeric ? 1 : undefined}
                  maxLength={field === 'title' ? 200 : 5000}
                  required={
                    [
                      'title',
                      'due_date',
                      'date',
                      'code',
                      'member_number',
                      'amount',
                      'sku',
                      'measurement',
                      'book_quantity',
                      'minimum_quantity',
                      'counted_quantity',
                    ].includes(field) ||
                    (entity === 'organization' && field === 'start_date')
                  }
                  defaultValue={String(
                    value ??
                      (score
                        ? 3
                        : field === 'duration'
                          ? 60
                          : field === 'color'
                            ? '#B3243B'
                            : field === 'time'
                              ? '09:00'
                              : ''),
                  )}
                />
                {field === 'code' && <small>Kode singkat 2–8 karakter, misalnya OPS.</small>}
                {field === 'meeting_url' && (
                  <small>
                    Tempel tautan Google Meet, Zoom, atau layanan rapat yang Anda gunakan.
                  </small>
                )}
                {entity === 'stock-counts' && field === 'book_quantity' && (
                  <small>
                    Stok pembanding saat pemeriksaan. Tidak mengubah stok pada daftar barang.
                  </small>
                )}
              </label>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="notice error">
            {error}
          </p>
        )}
        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Batal
          </button>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
