'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { schemas, type Entity, type Item } from './schemas';
import { catalog, labels, options, references } from './catalog';
import type { Workspace } from './useWorkspace';
import { today } from '@/lib/date';
import { api } from '@/lib/client';
import { ZodError } from 'zod';
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
    title: entity === 'organization' ? 'KDMP Puntukrejo' : '',
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
            const value = defaults[field as keyof typeof defaults],
              choices = options[entity + '.' + field] || options[field],
              reference = references[field];
            const label =
              entity === 'workstreams' && field === 'target_date'
                ? 'Target selesai'
                : labels[field] || field;
            if (field === 'required')
              return (
                <label key={field} className="check">
                  <input type="checkbox" name={field} defaultChecked={value !== false} />
                  Wajib diselesaikan
                </label>
              );
            if (field === 'dependencies')
              return (
                <label key={field}>
                  {label}
                  <select name={field} multiple defaultValue={(value || []) as string[]}>
                    {(workspace['work-items'] || [])
                      .filter((row) => row.id !== item?.id)
                      .map((row) => (
                        <option key={row.id} value={row.id}>
                          {String(row.data.title)}
                        </option>
                      ))}
                  </select>
                  <small>Ctrl/⌘ untuk memilih beberapa prasyarat.</small>
                </label>
              );
            if (choices || reference)
              return (
                <label key={field}>
                  {label}
                  <select name={field} defaultValue={String(value ?? choices?.[0] ?? '')}>
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
            const numeric = ['probability', 'impact', 'interest', 'influence'].includes(field);
            return (
              <label key={field}>
                {label}
                <input
                  name={field}
                  type={
                    field.endsWith('_date') || field === 'date' || field === 'last_contact'
                      ? 'date'
                      : field === 'time'
                        ? 'time'
                        : field === 'link'
                          ? 'url'
                          : field === 'color'
                            ? 'color'
                            : numeric
                              ? 'number'
                              : 'text'
                  }
                  min={numeric ? 1 : undefined}
                  max={numeric ? 5 : undefined}
                  maxLength={field === 'title' ? 200 : 5000}
                  required={
                    ['title', 'due_date', 'date', 'code'].includes(field) ||
                    (entity === 'organization' && field === 'start_date')
                  }
                  defaultValue={String(
                    value ??
                      (numeric
                        ? 3
                        : field === 'color'
                          ? '#B3243B'
                          : field === 'time'
                            ? '09:00'
                            : ''),
                  )}
                />
                {field === 'code' && <small>Kode singkat 2–8 karakter, misalnya OPS.</small>}
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
