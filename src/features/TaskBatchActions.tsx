'use client';
import { useState } from 'react';
import type { Item } from './schemas';
import { api } from '@/lib/client';
import { today } from '@/lib/date';

export function TaskBatchActions({
  items,
  refresh,
}: {
  items: Item[];
  refresh: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const rows = items.filter((item) => selected.includes(item.id));
  return (
    <section className="task-batch">
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        Ubah beberapa tugas
      </button>
      {open && (
        <div className="batch-panel">
          <p>Pilih tugas, lalu ubah status atau tenggatnya.</p>
          <div className="batch-list">
            {items.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  disabled={busy}
                  checked={selected.includes(item.id)}
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? [...selected, item.id]
                        : selected.filter((id) => id !== item.id),
                    )
                  }
                />
                {String(item.data.title)}
              </label>
            ))}
          </div>
          <div className="batch-fields">
            <label>
              Status baru
              <select value={status} disabled={busy} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Tidak diubah</option>
                <option value="rencana">Rencana</option>
                <option value="proses">Dikerjakan</option>
                <option value="selesai">Selesai</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
            </label>
            <label>
              Tenggat baru
              <input
                type="date"
                value={date}
                disabled={busy}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <button
            disabled={busy || !rows.length || (!status && !date)}
            onClick={async () => {
              setBusy(true);
              setMessage('');
              let saved = 0;
              try {
                for (const item of rows) {
                  await api('work-items', {
                    id: item.id,
                    data: {
                      ...item.data,
                      ...(date ? { due_date: date } : {}),
                      ...(status
                        ? {
                            status,
                            completed_at:
                              status === 'selesai' ? item.data.completed_at || today() : '',
                          }
                        : {}),
                    },
                  });
                  saved++;
                  setSelected((current) => current.filter((id) => id !== item.id));
                }
                setMessage(`${saved} tugas diperbarui.`);
              } catch (error) {
                setMessage(
                  `${saved} tugas diperbarui. ${(error as Error).message} Tugas lainnya belum diubah.`,
                );
              } finally {
                await refresh();
                setBusy(false);
              }
            }}
          >
            {busy ? 'Menyimpan…' : `Terapkan ke ${rows.length} tugas`}
          </button>
          {message && <p role="status">{message}</p>}
        </div>
      )}
    </section>
  );
}
