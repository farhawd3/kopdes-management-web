'use client';
import { useEffect, useId, useRef, useState } from 'react';
import {
  X,
  CheckCircle2,
  FolderKanban,
  FileText,
  Sparkles,
  BookOpen,
  Calendar,
  Users,
} from 'lucide-react';
import { schemas, type Entity, type Item } from './schemas';
import { catalog, formatChoiceLabel, labels, options, references } from './catalog';
import type { Workspace } from './useWorkspace';
import { today } from '@/lib/date';
import { api } from '@/lib/client';
import { ZodError } from 'zod';
import { DateField } from '@/components/ui/DateField';

const STAKEHOLDER_PRESETS = [
  {
    label: 'Agrinas',
    title: '',
    category: 'Agrinas',
    influence: 3,
    interest: 3,
    follow_up: '',
  },
  {
    label: 'PIC / Babinsa',
    title: '',
    category: 'PIC lapangan / Babinsa',
    influence: 3,
    interest: 3,
    follow_up: '',
  },
  {
    label: 'Pengurus / Pengawas',
    title: '',
    category: 'Pengurus dan pengawas koperasi',
    influence: 3,
    interest: 3,
    follow_up: '',
  },
  {
    label: 'Pemerintah desa',
    title: '',
    category: 'Pemerintah desa',
    influence: 3,
    interest: 3,
    follow_up: '',
  },
] as const;
const BASIC_TASK_FIELDS = [
  'title',
  'description',
  'workstream_id',
  'milestone_id',
  'stakeholder_id',
  'document_id',
  'assignee',
  'due_date',
  'status',
  'priority',
];

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
  const formRef = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);
  const [savedDraft, setSavedDraft] = useState<Record<string, unknown> | null>(null);
  const [restoredDraft, setRestoredDraft] = useState<Record<string, unknown> | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [draftNotice, setDraftNotice] = useState('');
  const draftKey = 'hub-draft:' + entity + ':' + (item?.id || 'new');
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(draftKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          // Restore only after the manager chooses to use this browser-tab draft.
          Promise.resolve().then(() => setSavedDraft(parsed as Record<string, unknown>));
        }
      }
    } catch {
      /* Drafts are optional when browser storage is unavailable. */
    }
  }, [draftKey]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function captureValues(form: HTMLFormElement) {
    const input = new FormData(form);
    const result: Record<string, unknown> = { ...item?.data };
    for (const field of fields) {
      if (field === 'required') result[field] = input.get(field) === 'on';
      else if (field === 'dependencies') result[field] = input.getAll(field);
      else if (field === 'subtasks')
        result[field] = String(input.get(field) || '')
          .split('\n')
          .filter(Boolean)
          .map((line) => ({ title: line.replace(/^\[x\]\s*/i, ''), done: /^\[x\]/i.test(line) }));
      else result[field] = input.get(field) ?? '';
    }
    return result;
  }
  function saveLocalDraft() {
    if (!formRef.current || savedDraft) return;
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(captureValues(formRef.current)));
      setDraftNotice('Draf tersimpan di tab ini. Belum masuk ke database.');
    } catch {
      setDraftNotice('Draf tidak dapat disimpan di browser. Simpan formulir sebelum menutup.');
    }
  }
  function requestClose() {
    if (busy) return;
    if (!dirty || window.confirm('Perubahan belum disimpan ke database. Tutup formulir?')) {
      if (dirty) saveLocalDraft();
      onClose();
    }
  }
  const headingId = useId();
  const [stockItem, setStockItem] = useState(String(item?.data.item_id || ''));
  const [meetingMode, setMeetingMode] = useState<string>(() =>
    String(item?.data.mode || 'tatap muka'),
  );
  const [recurrence, setRecurrence] = useState(String(item?.data.recurrence || 'tidak'));
  const [projectId, setProjectId] = useState(String(item?.data.workstream_id || ''));
  const [showTaskDetails, setShowTaskDetails] = useState(Boolean(item?.id));
  const [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const [stakeholderPreset, setStakeholderPreset] = useState<
    (typeof STAKEHOLDER_PRESETS)[number] | null
  >(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => {
      node?.close();
    };
  }, []);
  const fields = quick
    ? ['title', 'due_date', 'workstream_id']
    : entity === 'work-items' && !showTaskDetails
      ? BASIC_TASK_FIELDS
      : catalog[entity].fields;
  const defaults = restoredDraft ||
    item?.data || {
      due_date: today(),
      date: today(),
      start_date: today(),
      title: '',
    };
  return (
    <dialog
      ref={dialog}
      className="editor"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      aria-labelledby={headingId}
      onClick={(e) => {
        if (e.target === dialog.current) requestClose();
      }}
    >
      <form
        key={formVersion}
        ref={formRef}
        onChange={() => {
          setDirty(true);
          saveLocalDraft();
        }}
        onBlur={() => {
          if (dirty) saveLocalDraft();
        }}
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
            if (entity === 'work-items' && values.recurrence === 'tidak') {
              values.recurrence_time = '09:00';
              values.recurrence_end_date = '';
            }
            if (entity === 'meetings') {
              if (meetingMode === 'tatap muka') {
                values.meeting_url = '';
              } else if (meetingMode === 'online') {
                values.location = '';
              }
            }
            const parsed = schemas[entity].parse(values);
            await api(entity, { id: item?.id || undefined, data: parsed });
            try {
              sessionStorage.removeItem(draftKey);
            } catch {
              /* Optional browser storage. */
            }
            setDirty(false);
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
        <div className="section-head editor-modal-head">
          <div className="editor-title-wrap">
            <span className="eyebrow editor-badge-eyebrow">
              {entity === 'work-items' ? (
                <CheckCircle2 size={13} />
              ) : entity === 'workstreams' ? (
                <FolderKanban size={13} />
              ) : entity === 'journal' ? (
                <BookOpen size={13} />
              ) : entity === 'meetings' ? (
                <Calendar size={13} />
              ) : entity === 'stakeholders' ? (
                <Users size={13} />
              ) : (
                <FileText size={13} />
              )}
              {catalog[entity].title}
            </span>
            <h2 id={headingId}>
              {item?.id
                ? String(item.data.title)
                : entity === 'work-items'
                  ? 'Tambah Tugas Baru'
                  : entity === 'workstreams'
                    ? 'Tambah Proyek Baru'
                    : entity === 'stakeholders'
                      ? 'Tambah Mitra atau Kontak'
                      : entity === 'meetings'
                        ? 'Jadwalkan Rapat Baru'
                        : `Tambah ${catalog[entity].title}`}
            </h2>
          </div>
          <button
            type="button"
            className="editor-close-btn"
            aria-label="Tutup formulir"
            title="Tutup formulir (Esc)"
            onClick={requestClose}
          >
            <X size={20} strokeWidth={2.25} />
          </button>
        </div>
        {savedDraft && (
          <div className="draft-notice">
            <p>Draf belum disimpan ditemukan di tab ini.</p>
            <button
              type="button"
              onClick={() => {
                setRestoredDraft(savedDraft);
                setMeetingMode(String(savedDraft.mode || 'tatap muka'));
                setStockItem(String(savedDraft.item_id || ''));
                setRecurrence(String(savedDraft.recurrence || 'tidak'));
                setProjectId(String(savedDraft.workstream_id || ''));
                setShowTaskDetails(true);
                setFormVersion((value) => value + 1);
                setSavedDraft(null);
                setDirty(true);
                setDraftNotice('Draf dibuka. Periksa isian sebelum menyimpan.');
              }}
            >
              Lanjutkan draf
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem(draftKey);
                } catch {}
                setSavedDraft(null);
              }}
            >
              Abaikan draf
            </button>
          </div>
        )}
        {draftNotice && (
          <p className="draft-status" role="status">
            {draftNotice}
          </p>
        )}
        {entity === 'stakeholders' && !item?.id && (
          <div className="stakeholder-preset-banner">
            <div className="preset-label">
              <Sparkles size={14} />
              <strong>Jenis kontak</strong>
            </div>
            <div className="preset-buttons">
              {STAKEHOLDER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip ${stakeholderPreset?.label === p.label ? 'active' : ''}`}
                  onClick={() => setStakeholderPreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <small className="preset-hint">
              Pilih jenis, lalu isi nama orang atau lembaga sesuai data Anda.
            </small>
          </div>
        )}
        {entity === 'work-items' && !quick && !showTaskDetails && (
          <div className="task-form-intro">
            <p>Isi judul dan tenggat. Hubungkan proyek atau mitra jika pekerjaan ini terkait.</p>
            <button type="button" onClick={() => setShowTaskDetails(true)}>
              Detail lainnya: rapat, kendala, pengulangan, dan subtugas
            </button>
          </div>
        )}
        <div className="form-grid">
          {fields.map((field) => {
            if (entity === 'meetings' && field === 'meeting_url' && meetingMode === 'tatap muka') {
              return null;
            }
            if (entity === 'meetings' && field === 'location' && meetingMode === 'online') {
              return null;
            }
            const presetVal =
              entity === 'stakeholders' && stakeholderPreset
                ? stakeholderPreset[field as keyof typeof stakeholderPreset]
                : undefined;
            const value =
                presetVal !== undefined
                  ? presetVal
                  : entity === 'stock-counts' &&
                      field === 'book_quantity' &&
                      stockItem &&
                      stockItem !== item?.data.item_id
                    ? workspace['inventory-items']?.find((row) => row.id === stockItem)?.data
                        .book_quantity
                    : defaults[field as keyof typeof defaults],
              choices = options[entity + '.' + field] || options[field],
              reference = references[field];
            const selectedValue =
              entity === 'work-items' &&
              field === 'milestone_id' &&
              projectId !== String(defaults.workstream_id || '')
                ? ''
                : value;
            const label =
              entity === 'members' && field === 'date'
                ? 'Tanggal bergabung'
                : entity === 'members' && field === 'title'
                  ? 'Nama anggota'
                  : entity === 'workstreams' && field === 'target_date'
                    ? 'Target selesai'
                    : entity === 'stakeholders' && field === 'title'
                      ? 'Nama orang atau lembaga'
                      : entity === 'stakeholders' && field === 'contact'
                        ? 'Nomor WhatsApp / Kontak telepon'
                        : entity === 'stakeholders' && field === 'influence'
                          ? 'Tingkat wewenang / pengaruh (1–5)'
                          : entity === 'stakeholders' && field === 'interest'
                            ? 'Tingkat kepentingan / keterlibatan (1–5)'
                            : entity === 'meetings' && field === 'title'
                              ? 'Nama / Topik Rapat'
                              : entity === 'meetings' && field === 'mode'
                                ? 'Format Rapat'
                                : entity === 'meetings' && field === 'location'
                                  ? 'Ruangan / Tempat Rapat'
                                  : entity === 'meetings' && field === 'meeting_url'
                                    ? 'Tautan Rapat Online'
                                    : entity === 'meetings' && field === 'participants'
                                      ? 'Daftar Peserta Rapat'
                                      : entity === 'meetings' && field === 'duration'
                                        ? 'Estimasi Durasi (menit)'
                                        : entity === 'meetings' && field === 'time'
                                          ? 'Jam Mulai (WIB)'
                                          : entity === 'meetings' && field === 'agenda'
                                            ? 'Agenda Pembahasan'
                                            : entity === 'meetings' && field === 'minutes'
                                              ? 'Notulen & Ringkasan Keputusan'
                                              : labels[field] || field;

            if (field.endsWith('_date') || field === 'date' || field === 'last_contact')
              return (
                <div key={field} className="field-item">
                  <DateField
                    name={field}
                    label={label}
                    defaultValue={String(value || '')}
                    required={
                      ['due_date', 'date'].includes(field) ||
                      (entity === 'organization' && field === 'start_date')
                    }
                    disabled={
                      entity === 'work-items' &&
                      field === 'recurrence_end_date' &&
                      recurrence === 'tidak'
                    }
                  />
                </div>
              );
            if (field === 'required')
              return (
                <label key={field} className="check field-item field-check">
                  <input type="checkbox" name={field} defaultChecked={value !== false} />
                  <span className="field-caption-check">Wajib diselesaikan</span>
                </label>
              );
            if (field === 'dependencies')
              return (
                <fieldset key={field} className="dependency-picker wide field-item field-wide">
                  <legend>
                    <span className="field-caption">{label}</span>
                  </legend>
                  <div className="dependency-checkboxes">
                    {((value || []) as string[])
                      .filter((id) => !(workspace['work-items'] || []).some((row) => row.id === id))
                      .map((id) => (
                        <label className="check" key={id}>
                          <input type="checkbox" name={field} value={id} defaultChecked />
                          <span>Tugas terkait di halaman lain ({id.slice(0, 8)})</span>
                        </label>
                      ))}
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
                          <span>{String(row.data.title)}</span>
                        </label>
                      ))}
                  </div>
                  <small className="field-helper">
                    {(workspace['work-items'] || []).some((row) => row.id !== item?.id)
                      ? 'Pilih tugas yang harus selesai lebih dahulu.'
                      : 'Belum ada tugas lain untuk dipilih.'}
                  </small>
                </fieldset>
              );
            if (entity === 'stakeholders' && (field === 'influence' || field === 'interest')) {
              return (
                <label key={field} className="field-item">
                  <span className="field-caption">{label}</span>
                  <select
                    key={stakeholderPreset ? `${field}-${String(presetVal)}` : field}
                    name={field}
                    className="field-select"
                    defaultValue={String(value ?? 3)}
                  >
                    {field === 'influence' ? (
                      <>
                        <option value="5">
                          5 — Sangat Tinggi (Kepala Desa / Pembuat Kebijakan)
                        </option>
                        <option value="4">4 — Tinggi (Babinsa, Bhabinkamtibmas, Pengawas)</option>
                        <option value="3">3 — Sedang (Pengurus Bidang, Mitra Utama)</option>
                        <option value="2">2 — Terbatas (Kelompok Warga, Pemasok Berkala)</option>
                        <option value="1">1 — Rendah (Pemantau Umum)</option>
                      </>
                    ) : (
                      <>
                        <option value="5">
                          5 — Sangat Tinggi (Sangat Aktif & Terdampak Langsung)
                        </option>
                        <option value="4">
                          4 — Tinggi (Pengawasan Rutin & Koordinasi Berkala)
                        </option>
                        <option value="3">3 — Sedang (Perlu Laporan & Update Periodik)</option>
                        <option value="2">2 — Rendah (Cukup Diinformasikan Saat Perlu)</option>
                        <option value="1">1 — Minimal (Hanya Bila Diperlukan)</option>
                      </>
                    )}
                  </select>
                  <small className="field-helper">
                    {field === 'influence'
                      ? 'Wewenang atau pengaruh tokoh ini terhadap perizinan & kelancaran koperasi.'
                      : 'Tingkat keterlibatan atau kebutuhan koordinasi rutin.'}
                  </small>
                </label>
              );
            }
            if (entity === 'meetings' && field === 'mode') {
              return (
                <label key={field} className="field-item">
                  <span className="field-caption">{label}</span>
                  <select
                    name={field}
                    className="field-select"
                    value={meetingMode}
                    onChange={(event) => setMeetingMode(event.target.value)}
                  >
                    <option value="tatap muka">Tatap Muka (Pertemuan Langsung di Lokasi)</option>
                    <option value="online">Online Penuh (Google Meet / Zoom)</option>
                    <option value="hybrid">Hybrid (Fisik di Lokasi + Tautan Online)</option>
                  </select>
                  <small className="field-helper">
                    {meetingMode === 'tatap muka'
                      ? 'Rapat berlangsung secara fisik di balai desa, kantor, atau gerai koperasi.'
                      : meetingMode === 'online'
                        ? 'Rapat daring. Tautan video conference wajib dapat diakses peserta.'
                        : 'Rapat gabungan: ada kehadiran langsung di lokasi dan akses online bagi peserta jauh.'}
                  </small>
                </label>
              );
            }
            if (choices || reference) {
              const allChoices = choices
                ? [
                    ...(value && !choices.includes(String(value)) ? [String(value)] : []),
                    ...choices,
                  ]
                : undefined;
              return (
                <label key={field} className="field-item">
                  <span className="field-caption">{label}</span>
                  <select
                    key={
                      field === 'category' && stakeholderPreset
                        ? `${field}-${stakeholderPreset.category}`
                        : entity === 'work-items' && field === 'milestone_id'
                          ? `${field}-${projectId}`
                          : field
                    }
                    name={field}
                    aria-label={label}
                    className="field-select"
                    required={entity === 'stock-counts' && field === 'item_id'}
                    disabled={entity === 'work-items' && field === 'milestone_id' && !projectId}
                    defaultValue={String(selectedValue ?? allChoices?.[0] ?? '')}
                    onChange={
                      field === 'item_id'
                        ? (event) => setStockItem(event.target.value)
                        : entity === 'work-items' && field === 'workstream_id'
                          ? (event) => setProjectId(event.target.value)
                          : entity === 'work-items' && field === 'recurrence'
                            ? (event) => setRecurrence(event.target.value)
                            : undefined
                    }
                  >
                    {reference && <option value="">Belum Ditentukan</option>}
                    {reference &&
                      Boolean(selectedValue) &&
                      !(workspace[reference] || []).some((row) => row.id === selectedValue) && (
                        <option value={String(selectedValue)}>
                          Catatan terkait yang belum dimuat ({String(selectedValue).slice(0, 8)})
                        </option>
                      )}
                    {allChoices
                      ? allChoices.map((choice) => (
                          <option key={choice} value={choice}>
                            {formatChoiceLabel(choice)}
                          </option>
                        ))
                      : (workspace[reference] || [])
                          .filter(
                            (row) =>
                              entity !== 'work-items' ||
                              field !== 'milestone_id' ||
                              row.data.workstream_id === projectId,
                          )
                          .map((row) => {
                            const title = String(row.data.title);
                            const subtitle =
                              reference === 'members' && row.data.member_number
                                ? ` (No: ${row.data.member_number})`
                                : reference === 'inventory-items'
                                  ? ` [Stok: ${Number(row.data.book_quantity || 0)} ${String(row.data.measurement || 'unit')}]`
                                  : '';
                            return (
                              <option key={row.id} value={row.id}>
                                {title}
                                {subtitle}
                              </option>
                            );
                          })}
                  </select>
                  {entity === 'work-items' && field === 'recurrence' && (
                    <small className="field-helper">
                      Tugas berikutnya dibuat setelah tugas ini ditandai selesai.
                    </small>
                  )}
                  {entity === 'work-items' && field === 'milestone_id' && !projectId && (
                    <small className="field-helper">
                      Pilih proyek lebih dulu untuk memilih milestone.
                    </small>
                  )}
                  {entity === 'work-items' && field === 'milestone_id' && projectId && (
                    <small className="field-helper">
                      Hanya milestone dari proyek ini yang ditampilkan.
                    </small>
                  )}
                  {entity === 'stock-counts' && field === 'item_id' && (
                    <small className="field-helper">
                      Pilih barang sebelum mencatat hasil hitung.
                    </small>
                  )}
                </label>
              );
            }
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
                <label className="wide field-item field-wide" key={field}>
                  <span className="field-caption">{label}</span>
                  <textarea
                    name={field}
                    rows={field === 'subtasks' ? 4 : 3}
                    className="field-textarea"
                    placeholder={
                      field === 'subtasks'
                        ? 'Tulis subtugas, misal:\nCek kelengkapan berkas\n[x] Survei lokasi gerai'
                        : entity === 'meetings' && field === 'agenda'
                          ? 'Tulis pokok bahasan atau agenda rapat yang akan dibahas…'
                          : entity === 'meetings' && field === 'minutes'
                            ? 'Tulis notulen, risalah hasil musyawarah, dan kesepakatan rapat…'
                            : `Tulis ${label.toLowerCase()}…`
                    }
                    defaultValue={
                      field === 'subtasks'
                        ? ((value || []) as { title: string; done: boolean }[])
                            .map((row) => (row.done ? '[x] ' : '') + row.title)
                            .join('\n')
                        : String(value || '')
                    }
                  />
                  {field === 'subtasks' && (
                    <small className="field-helper">
                      Satu subtugas per baris. Awali [x] jika sudah selesai.
                    </small>
                  )}
                </label>
              );
            const score = ['probability', 'impact', 'interest', 'influence'].includes(field);
            const quantity = ['book_quantity', 'minimum_quantity', 'counted_quantity'].includes(
              field,
            );
            const numeric = score || quantity || field === 'amount' || field === 'duration';
            return (
              <label key={field} className="field-item">
                <span className="field-caption">{label}</span>
                <input
                  key={
                    field === 'book_quantity'
                      ? stockItem
                      : stakeholderPreset
                        ? `${field}-${stakeholderPreset.label}`
                        : field
                  }
                  name={field}
                  className="field-input"
                  aria-label={label}
                  placeholder={
                    entity === 'stakeholders' && field === 'title'
                      ? 'Contoh: Sertu Joko (Babinsa) atau Bpk. Mulyono (Kepala Desa)'
                      : entity === 'stakeholders' && field === 'contact'
                        ? 'Contoh: 0812-3456-7890 (WhatsApp / Telepon)'
                        : entity === 'meetings' && field === 'title'
                          ? 'Contoh: Rapat Evaluasi Bulanan & Koordinasi Gerai'
                          : entity === 'meetings' && field === 'location'
                            ? 'Contoh: Ruang Rapat Kantor Koperasi KDMP Puntukrejo'
                            : entity === 'meetings' && field === 'meeting_url'
                              ? 'https://meet.google.com/abc-defg-hij atau tautan Zoom'
                              : entity === 'meetings' && field === 'participants'
                                ? 'Contoh: Kepala Desa, Seluruh Pengurus, Babinsa'
                                : undefined
                  }
                  type={
                    field.endsWith('_date') || field === 'date' || field === 'last_contact'
                      ? 'date'
                      : field === 'time' || field === 'recurrence_time'
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
                  disabled={
                    (entity === 'work-items' &&
                      field === 'recurrence_time' &&
                      recurrence === 'tidak') ||
                    (entity === 'stock-counts' &&
                      ['book_quantity', 'counted_quantity'].includes(field) &&
                      !stockItem)
                  }
                  readOnly={entity === 'stock-counts' && field === 'book_quantity'}
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
                    (entity === 'work-items' &&
                      field === 'recurrence_time' &&
                      recurrence !== 'tidak') ||
                    (entity === 'organization' && field === 'start_date')
                  }
                  defaultValue={String(
                    value ??
                      (score
                        ? 3
                        : field === 'duration'
                          ? 60
                          : field === 'recurrence_time'
                            ? '09:00'
                            : field === 'color'
                              ? '#B3243B'
                              : field === 'time'
                                ? '09:00'
                                : ''),
                  )}
                />
                {entity === 'stakeholders' && field === 'contact' && (
                  <small className="field-helper">
                    Nomor telepon atau WhatsApp untuk koordinasi cepat.
                  </small>
                )}
                {entity === 'stakeholders' && field === 'follow_up' && (
                  <small className="field-helper">
                    Rencana koordinasi berikutnya atau catatan penting.
                  </small>
                )}
                {entity === 'work-items' && field === 'document_id' && (
                  <small className="field-helper">
                    Pilih kontrak yang sudah dicatat di Dokumen. Kode tugas dibuat otomatis saat
                    disimpan.
                  </small>
                )}
                {entity === 'work-items' && field === 'recurrence_time' && (
                  <small className="field-helper">
                    Jam ini hanya catatan. Belum ada pengingat otomatis.
                  </small>
                )}
                {field === 'code' && (
                  <small className="field-helper">Kode singkat proyek, misalnya OPS.</small>
                )}
                {entity === 'meetings' && field === 'location' && (
                  <small className="field-helper">
                    Nama ruangan, balai pertemuan, atau alamat gerai tempat berkumpul.
                  </small>
                )}
                {entity === 'meetings' && field === 'meeting_url' && (
                  <small className="field-helper">
                    Tempel tautan Google Meet atau Zoom agar peserta dapat bergabung langsung.
                  </small>
                )}
                {entity === 'meetings' && field === 'participants' && (
                  <small className="field-helper">
                    Pihak atau pejabat yang diundang mengikuti rapat ini.
                  </small>
                )}
                {!['meetings'].includes(entity) && field === 'meeting_url' && (
                  <small className="field-helper">
                    Tempel tautan Google Meet, Zoom, atau layanan rapat yang Anda gunakan.
                  </small>
                )}
                {entity === 'stock-counts' && field === 'book_quantity' && (
                  <small className="field-helper">
                    Diambil dari stok buku barang saat dipilih. Tidak mengubah stok pada daftar
                    barang.
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
        <div className="form-actions editor-form-actions">
          <button type="button" className="btn-editor-cancel" onClick={requestClose}>
            Batal
          </button>
          <button className="primary btn-editor-submit" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
