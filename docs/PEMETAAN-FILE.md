> Pembaruan pemilik: baca [KEPUTUSAN.md](KEPUTUSAN.md). Dokumen ini adalah rancangan; progres aktual ada di [STATUS.md](STATUS.md).

# Pemetaan File — Lama → Baru

Hasil audit `src.zip`: **130 file, ±883 KB**. Zip hanya berisi folder `src/` — tidak ada `package.json`, konfigurasi Tailwind/Next, folder `public/`, skema SQL, maupun berkas `.md` lama. Karena itu "perbarui semua md" berarti **membuat set dokumentasi baru** (README + `docs/`).

Rujukan: [PRD](PRD.md) · [Checklist](CHECKLIST.md) · [Workflow](WORKFLOW.md)

Ringkasan: **hapus 43 file (±298 KB, 33%)** · **tulis ulang/pecah 28 file** · **pertahankan & restyle sisanya**.

---

## 1. HAPUS (43 file)

### Anggota
```
src/app/anggota/page.tsx
src/app/anggota/[id]/page.tsx
src/components/anggota/MemberAddModal.tsx
src/components/anggota/MemberImportModal.tsx
src/app/api/members/route.ts
```

### Keuangan, neraca, SHU, jurnal
```
src/app/keuangan/page.tsx
src/app/keuangan/jurnal/page.tsx
src/components/keuangan/FinanceRegister.tsx
src/app/api/finance/register/route.ts
src/app/api/finance/summary/route.ts
src/lib/finance-insights.ts
src/lib/finance-register.ts
src/app/laporan/page.tsx                 ← diganti Laporan Manajer baru
```

### Omzet harian, kinerja gerai berbasis pendapatan
```
src/app/kinerja-gerai/page.tsx
src/app/monitoring/page.tsx
src/components/monitoring/MonitoringHistoryTable.tsx
src/components/monitoring/MonitoringPeriodicSummary.tsx
src/components/monitoring/MonitoringReportForm.tsx
src/components/monitoring/MonitoringTaskModal.tsx
src/app/api/monitoring/records/route.ts
src/app/api/dashboard/executive/route.ts
src/app/api/dashboard/summary/route.ts
src/app/api/manager/unit-performance/route.ts
src/lib/unit-performance.ts
src/lib/reporting-trend.ts
```

### Stok
```
src/app/stok/page.tsx
src/app/stok/PreparationStockPage.tsx
src/app/stok/ProductionStockPage.tsx
src/app/api/stock-simple/route.ts
```

### Integrasi kunci API (tidak dibutuhkan)
```
src/app/api/integrations/openai-key/route.ts
src/app/api/integrations/openai-key/test/route.ts
src/app/api/integrations/unit-key/route.ts
src/components/pengaturan/OpenAiKeySettings.tsx
src/components/pengaturan/UnitApiKeySettings.tsx
src/lib/server/openai-key-store.ts
src/lib/server/unit-api-key-store.ts
```

### Rute stub/warisan (hanya `redirect`)
```
src/app/login/page.tsx
src/app/lupa-password/page.tsx
src/app/reset-password/page.tsx
src/app/auth/callback/route.ts
src/app/auth/logout/route.ts
src/app/auth/preview/                    ← folder kosong
src/components/layout/DemoBanner.tsx
src/components/layout/RelatedPages.tsx
```

### Dalam file yang dipertahankan
- `src/types/index.ts` — hapus blok "Pembelian, Stok & Kasir" dan turunannya (PO, GR, invoice pemasok, mutasi stok, opname, shift kasir, POS, retur, kas, deposit anggota, jurnal, laporan keuangan; sekitar baris 262–545), `Member`, `Product`.
- `src/types/models.ts` — hapus `MemberRecord`, `CatalogProduct`, `DailyReportRecord`; `BusinessUnit` hapus `monthly_target`.
- `src/lib/validations/simple-schemas.ts` — hapus skema anggota/stok/laporan harian.
- `src/lib/repository/*` — hapus metode anggota, stok, harian, kas.
- **Tepian hardcode** (hapus/ganti dengan profil dinamis): nomor WhatsApp di `app/pin/page.tsx`; "Abdul Halim", "Ladang Laweh", "Banuhampu" di `constants.ts`, `layout.tsx`, `Sidebar.tsx`, `TaskFormModal.tsx`, `pengaturan/page.tsx`, `persiapan/page.tsx`, `tata-kelola/page.tsx`, `unit-usaha/[id]/page.tsx`, `api/units`, `api/backup`, `api/organization/profile`, `api/manager/work-desk`, `not-found.tsx`, `bantuan/page.tsx`.

---

## 2. TULIS ULANG / PECAH (28 file)

| File lama | Ukuran | Menjadi |
|---|---|---|
| `app/dashboard/page.tsx` + `ProductionDashboard.tsx` | 11 KB + 13 KB | `app/(app)/beranda/page.tsx` + `features/beranda/*` |
| `components/dashboard/{DashboardTrends,ManagerBriefing,ManagerShortcuts}.tsx` | 12 KB | `features/beranda/components/*` + `components/charts/*` |
| `app/meja-kerja/page.tsx` + `api/manager/work-desk/route.ts` | 16 KB + 11 KB | `app/(app)/hari-ini` + `api/hari-ini` |
| `app/pekerjaan/page.tsx` | 17 KB | `app/(app)/tugas/page.tsx` (tab Daftar/Papan/Kalender) |
| `components/pekerjaan/TaskCalendarView.tsx` | 27 KB | `features/tugas/components/CalendarView.tsx` (dipecah) |
| `app/persiapan/page.tsx` | 33 KB | `app/(app)/kesiapan` + `features/kesiapan/*` |
| `app/tata-kelola/page.tsx` | 42 KB | dipecah: `dokumen/`, `risiko/`, `rapat/` |
| `app/pengaturan/page.tsx` | 35 KB | dipecah per tab: Profil · Keamanan · Tampilan · Cadangan |
| `app/unit-usaha/page.tsx` + `[id]/page.tsx` | 21 KB + 9 KB | `app/(app)/gerai` + `gerai/[id]` |
| `app/bantuan/page.tsx` | 19 KB | `app/(app)/panduan` (ringkas) |
| `lib/repository/index.ts` | 75 KB, 2.152 baris | `features/<domain>/service.ts` (satu per domain) |
| `lib/repository/supabase.ts` | 15 KB | digabung ke layanan domain |
| `lib/manager-summary.ts`, `manager-briefing.ts`, `manager-shortcuts.ts` | 7 KB | `lib/progress.ts` + `features/beranda/insights.ts` |
| `lib/constants.ts`, `lib/navigation.ts`, `lib/checklist.ts` | 4 KB | `lib/nav.ts` (IA baru) + `lib/templates/plan-90-hari.ts` |
| `components/layout/{AppShell,Header,Sidebar,MobileNavigation,PageHeader}.tsx` | 44 KB | layout responsif baru (rel/sidebar/bilah bawah) |

---

## 3. PERTAHANKAN (restyle sesuai token baru)

| Area | File | Catatan |
|---|---|---|
| UI dasar | `components/ui/*` (Alert, Badge, Button, Card, ConfirmDialog, DataTable, Dialog, Drawer, EmptyState, ErrorState, Input, LoadingState, Select, Skeleton, Textarea, Toast, Breadcrumb, fieldStyles, index) | Ganti token warna; tambah varian |
| UI tanggal | `DateInput.tsx`, `MonthPicker.tsx` | Sesuaikan lokal `id`; uji di ponsel |
| Tugas | `TaskFormModal.tsx`, `TaskList.tsx` | Tambah workstream/milestone/mulai/dependensi; jadikan bottom sheet di ponsel |
| Tema/konteks | `lib/ThemeContext.tsx`, `lib/OrganizationContext.tsx` | Tambah kepadatan; profil baru |
| Autentikasi | `app/pin/page.tsx`, `api/auth/pin/route.ts`, `lib/security/*`, `lib/auth/*`, `lib/supabase/*`, `middleware.ts` | **Perkuat**: PIN ≥ 6 digit, batas percobaan (tidak ditemukan di kode saat ini), hapus nomor WA |
| Utilitas | `lib/utils.ts`, `csv.ts`, `useResource.ts`, `useModalFocus.ts`, `dashboard-greeting.ts`, `organization-status.ts` | Tinjau relevansi |
| Cadangan | `api/backup/route.ts`, `lib/validations/backup-schemas.ts` | Sesuaikan entitas baru |
| API inti | `api/tasks`, `api/units`, `api/organization/profile` | Menjadi `work-items`, `units`, `organization` |
| Error | `app/error.tsx`, `not-found.tsx`, `forbidden/page.tsx` | Restyle; hapus nama lama |
| Global | `app/globals.css`, `app/layout.tsx` | Token baru; metadata Puntukrejo; font Plus Jakarta Sans + Inter |

---

## 4. BARU

```
src/features/
  beranda/  tugas/  roadmap/  kesiapan/  gerai/  pemangku/
  rapat/  dokumen/  risiko/  tim/  laporan/  jurnal/  pengaturan/
src/components/charts/
  ProgressRing  Burnup  StatusStack  Gantt  MilestoneTimeline
  RiskMatrix  ReadinessBars  ReadinessRadar  InfluenceMap
src/components/layout/
  AppShell  Sidebar  IconRail  BottomNav  QuickAdd  CommandPalette
src/lib/
  progress.ts  date.ts  nav.ts  templates/plan-90-hari.ts
supabase/migrations/        (setelah skema aktual diterima)
docs/                       (dokumen ini)
tests/                      (unit test progres & tanggal)
```

## 5. Peta Rute

| Lama | Baru |
|---|---|
| `/` , `/dashboard` | `/beranda` |
| `/meja-kerja` | `/hari-ini` |
| `/pekerjaan` | `/tugas` |
| — | `/roadmap` |
| `/persiapan` | `/kesiapan` |
| `/unit-usaha`, `/unit-usaha/[id]` | `/gerai`, `/gerai/[id]` |
| `/tata-kelola` | `/dokumen`, `/risiko`, `/rapat` |
| — | `/pemangku`, `/tim`, `/jurnal` |
| `/laporan` (neraca/SHU) | `/laporan` (laporan manajer) |
| `/pengaturan`, `/bantuan`, `/pin` | `/pengaturan`, `/panduan`, `/pin` |
| `/anggota`, `/keuangan`, `/monitoring`, `/kinerja-gerai`, `/stok`, `/login`, `/lupa-password`, `/reset-password` | **dihapus** |

## 6. Verifikasi Setelah Pembersihan

```bash
# 1. Tidak ada sisa kata terlarang yang tak disengaja
grep -rniE "anggota|omzet|omset|revenue|profit|shu|stok|stock|jurnal|pos_|kasir" src/ \
  | grep -viE "pemangku|tim|catatan"          # tinjau hasil manual

# 2. Tidak ada identitas lama
grep -rniE "ladang laweh|banuhampu|abdul halim|6281267890123" src/

# 3. Tipe & lint
npx tsc --noEmit && npx eslint src/

# 4. Rute mati
grep -rnE "href=\"/(anggota|keuangan|monitoring|kinerja-gerai|stok|dashboard|meja-kerja|pekerjaan|persiapan|unit-usaha|tata-kelola)" src/
```


