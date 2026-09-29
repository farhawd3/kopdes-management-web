> Pembaruan pemilik: baca [KEPUTUSAN.md](KEPUTUSAN.md). Dokumen ini adalah rancangan; progres aktual ada di [STATUS.md](STATUS.md).

# Checklist — Puntukrejo Manager Hub

Dua bagian:
- **Bagian A** — checklist pengembangan/redesign aplikasi.
- **Bagian B** — checklist 90 hari kerja manajer (juga menjadi *template seed* aplikasi).

Tanda: `[ ]` belum · `[x]` selesai · **(W)** wajib · **(O)** opsional.
Rujukan: [PRD](PRD.md) · [Workflow](WORKFLOW.md) · [Pemetaan File](PEMETAAN-FILE.md)

---

# BAGIAN A — Checklist Pengembangan

## Fase 0 — Fondasi (1–4 Okt)

### 0.1 Persetujuan & masukan
- [x] Analisis kode lama (`src.zip`, 130 file) **(W)**
- [x] PRD, Checklist, Workflow, Pemetaan File dibuat **(W)**
- [ ] Pemilik produk menyetujui PRD **(W)**
- [ ] Jawaban Q1–Q7 dari PRD diterima **(W)**
- [ ] `package.json`, `tailwind.config`, `next.config`, `.env.example`, skema SQL diterima **(W)**

### 0.2 Pembersihan repositori
- [ ] Buat cabang `redesign/manager-hub` dan tag `v0-legacy` pada kode lama **(W)**
- [ ] Ekspor cadangan JSON `members`, `unit_daily_reports`, `products`, `tasks`, `business_units` **(W)**
- [ ] Hapus modul di luar lingkup (daftar di Pemetaan File §1) **(W)**
- [ ] Hapus rute stub: `login`, `lupa-password`, `reset-password`, `auth/preview`, `DemoBanner` **(W)**
- [ ] Hapus API kunci: `integrations/openai-key`, `integrations/unit-key`, komponen & `lib/server/*key-store` **(W)**
- [ ] Hapus tipe mati (PO, GR, POS, kas, jurnal) dari `types/index.ts` **(W)**
- [ ] Hapus nomor WhatsApp, "Abdul Halim", "Ladang Laweh", "Banuhampu" dari seluruh kode **(W)**
- [ ] `grep -ri "anggota\|omzet\|omset\|revenue\|shu\|stok"` tidak menemukan sisa yang tak disengaja **(W)**
- [ ] Jalankan `tsc --noEmit` dan `eslint` bersih setelah penghapusan **(W)**

### 0.3 Restrukturisasi
- [ ] Buat struktur `features/`, `components/charts/`, `lib/date`, `lib/progress.ts` **(W)**
- [ ] Pecah `lib/repository/index.ts` (2.152 baris) menjadi layanan per domain **(W)**
- [ ] Pindahkan repositori *in-memory* ke `tests/` atau hapus **(W)**
- [ ] Ganti nama rute sesuai IA baru + alihan sementara dari rute lama **(O)**
- [ ] Tambahkan `README.md`, `docs/`, `CHANGELOG.md` **(W)**

### 0.4 Sistem desain
- [ ] Token warna, tipografi, radius, bayangan di `globals.css` + `tailwind.config` **(W)**
- [ ] Mode gelap dan kepadatan (nyaman/ringkas) **(W)**
- [ ] Restyle komponen `ui/`: Button, Card, Badge, Input, Select, Dialog, Drawer, Toast, DataTable, EmptyState **(W)**
- [ ] Komponen baru: `BottomSheet`, `Tabs`, `ProgressRing`, `StatusPill`, `Tooltip`, `Skeleton` **(W)**
- [ ] Verifikasi kontras teks/latar ≥ 4,5:1 **(W)**

### 0.5 Kerangka aplikasi
- [ ] `AppShell` baru: sidebar penuh / rel ikon / bilah bawah **(W)**
- [ ] Tombol tambah cepat (+) global **(W)**
- [ ] Halaman PIN baru: ≥ 6 digit, batas percobaan, jeda eksponensial **(W)**
- [ ] Wizard pengaturan awal (profil koperasi, nama manajer, tanggal mulai) **(W)**

## Fase 1 — Rilis 1 / MVP (5–18 Okt)

### 1.1 Data
- [ ] Migrasi: `workstreams`, `milestones`, `work_items` (+kolom), `checklist_items` (+kolom), `units` **(W)**
- [ ] Seed workstream & template 90 hari (Bagian B) **(W)**
- [ ] Seed tujuh gerai standar dengan status "rencana" **(W)**
- [ ] Arsipkan tabel `members`, `unit_daily_reports`, `products` **(W)**

### 1.2 Fitur
- [ ] **M1 Beranda:** cincin progres, kartu KPI, burnup, distribusi status, "Perlu perhatian" **(W)**
- [ ] **M2 Hari Ini:** Terlambat/Hari ini/Menyusul, aksi cepat, tambah cepat **(W)**
- [ ] **M3 Tugas:** daftar, papan seret-lepas, kalender, filter, pencarian, subtugas **(W)**
- [ ] **M4 Roadmap (milestone):** timeline milestone per workstream **(W)**
- [ ] **M5 Kesiapan:** checklist per workstream & gerai, bukti, persen otomatis **(W)**
- [ ] **M6 Gerai:** daftar, detail, batang & radar kesiapan **(W)**
- [ ] **M7 Pengaturan:** profil, PIN, tema, cadangan/pulihkan **(W)**
- [ ] Tugas berulang **(O)**

### 1.3 Kualitas Rilis 1
- [ ] Uji di 360 px, 768 px, 1024 px, 1440 px **(W)**
- [ ] Uji Chrome Android, Safari iOS, Chrome desktop **(W)**
- [ ] Lighthouse Perf & A11y ≥ 90 **(W)**
- [ ] Navigasi keyboard penuh di form dan papan **(W)**
- [ ] Keadaan kosong, memuat, dan galat di setiap halaman **(W)**
- [ ] Manajer memakai ≥ 3 hari; catat umpan balik **(W)**

## Fase 2 — Rilis 2 (19 Okt–8 Nov)
- [ ] **Gantt:** bar, dependensi FS, penanda hari ini, zoom, baseline, jalur kritis **(W)**
- [ ] Tampilan Gantt ponsel (timeline vertikal) **(W)**
- [ ] **Pemangku kepentingan:** daftar, interaksi, peta pengaruh–minat, pengingat kontak **(W)**
- [ ] **Rapat & notulen:** agenda, notulen, keputusan, aksi → tugas **(W)**
- [ ] **Dokumen & legalitas:** registri, masa berlaku, pengingat 30/14/7 hari **(W)**
- [ ] **Risiko & isu:** matriks 5×5, mitigasi, isu → tugas **(W)**
- [ ] **Laporan mingguan/bulanan:** tampilan cetak A4, teks WhatsApp, snapshot **(W)**
- [ ] Log keputusan dapat dicari **(O)**

## Fase 3 — Rilis 3 (9–22 Nov)
- [ ] Tim & pelatihan **(O)**
- [ ] Jurnal kerja **(O)**
- [ ] Anggaran proyek (jika Q3 = ya) **(O)**
- [ ] Palet perintah `Ctrl/⌘+K` **(O)**
- [ ] PWA: manifest, ikon, cache dasar **(O)**
- [ ] Impor/ekspor CSV **(O)**
- [ ] Pengingat dalam aplikasi **(O)**

## Fase 4 — UAT & Hardening (23–30 Nov)
- [ ] Audit aksesibilitas (pembaca layar, kontras, fokus) **(W)**
- [ ] Uji keamanan: PIN brute-force, sesi, header keamanan, validasi input **(W)**
- [ ] Uji cadangan → pulihkan pada data nyata **(W)**
- [ ] Hapus permanen arsip `members`/`daily_reports`/`products` (setelah 30 hari, atas persetujuan) **(W)**
- [ ] Perbarui seluruh dokumentasi; tandai `v1.0.0` **(W)**

## Definition of Done (setiap fitur)
- [ ] Sesuai kriteria terima di PRD
- [ ] Responsif 360–1440 px
- [ ] Keadaan kosong/memuat/galat ada
- [ ] Validasi zod di klien & server
- [ ] Aksesibel keyboard + label ARIA
- [ ] Tanpa `any` baru; lulus `tsc` dan `eslint`
- [ ] Dokumen & CHANGELOG diperbarui

---

# BAGIAN B — Checklist 90 Hari Pertama Manajer KDMP Puntukrejo

> Hitungan **H+N** dari tanggal mulai kerja (default **1 Oktober 2026**, ubah di Pengaturan).
> Ini template *awal*. Sesuaikan dengan juknis terbaru dari Dinas Koperasi setempat dan kondisi nyata Puntukrejo.
> Workstream: **LEG** Legalitas · **KEL** Kelembagaan · **FIS** Gerai & Fisik · **SDM** SDM & Pelatihan · **MIT** Kemitraan & Pemasok · **SIS** Sistem & SOP · **KOM** Komunikasi & Laporan

## Fase A — Orientasi (H1–H14)

**Minggu 1**
- [ ] KEL — Bertemu Ketua & pengurus; sepakati peran, wewenang, dan cara kerja manajer **(W)**
- [ ] KEL — Bertemu Pengawas dan Kepala Desa; sepakati jadwal dan format pelaporan **(W)**
- [ ] LEG — Kumpulkan & periksa dokumen dasar: akta pendirian, AD/ART, SK pengesahan, NIB, NPWP, rekening **(W)**
- [ ] LEG — Catat dokumen yang **belum ada / kedaluwarsa** dan penanggung jawabnya **(W)**
- [ ] MIT — Petakan pemangku kepentingan (Dinas Koperasi, pendamping, bank, camat, BPD, vendor) **(W)**
- [ ] KOM — Siapkan aplikasi ini: profil koperasi, PIN, template 90 hari **(W)**
- [ ] KOM — Mulai jurnal kerja harian **(O)**

**Minggu 2**
- [ ] FIS — Survei lokasi tiap gerai; foto & catatan kondisi (bangunan, listrik, air, akses) **(W)**
- [ ] FIS — Inventaris peralatan yang sudah ada dan yang dibutuhkan **(W)**
- [ ] KEL — Tinjau status pembentukan dan kewajiban pelaporan ke Dinas **(W)**
- [ ] SDM — Petakan kebutuhan petugas per gerai **(W)**
- [ ] KOM — Susun daftar risiko awal (≥ 10 risiko) **(W)**
- [ ] KOM — Laporan mingguan pertama ke Pengurus/Pengawas **(W)**
- [ ] **🏁 Milestone M1 (H14): Baseline kondisi terkonfirmasi** — dokumen, gerai, pemangku, risiko awal tercatat

## Fase B — Fondasi (H15–H45)

**Minggu 3–4**
- [ ] LEG — Lengkapi/urus dokumen yang kurang; jadwalkan pengingat kedaluwarsa **(W)**
- [ ] KEL — Susun **Rencana Kerja** periode berjalan (tujuan, indikator, program, PJ, tenggat) **(W)**
- [ ] KEL — Rapat pengurus: bahas & setujui rencana kerja; catat keputusan **(W)**
- [ ] FIS — Tetapkan **gerai prioritas** dan urutan pembukaan bertahap **(W)**
- [ ] FIS — Susun daftar kebutuhan renovasi/perlengkapan per gerai **(W)**
- [ ] MIT — Hubungi bank terkait skema pembiayaan/rekening; catat persyaratan **(W)**
- [ ] KOM — Laporan mingguan rutin (tiap Jumat) **(W)**

**Minggu 5–6**
- [ ] SIS — Rancang alur kerja tiap gerai prioritas (dari pemesanan sampai pelaporan) **(W)**
- [ ] SIS — Tulis draf **SOP** gerai prioritas (layanan, kas, barang, kebersihan, keselamatan) **(W)**
- [ ] SDM — Susun deskripsi tugas & kriteria petugas **(W)**
- [ ] MIT — Daftar calon pemasok/mitra; minta penawaran/perbandingan **(W)**
- [ ] KEL — Rencanakan agenda **RAT** (jadwal, bahan, dokumen), tanpa data anggota di aplikasi ini **(O)**
- [ ] **🏁 Milestone M2 (H30): Rencana Kerja disetujui pengurus**
- [ ] **🏁 Milestone M2b (H45): Gerai prioritas & urutan pembukaan ditetapkan**

## Fase C — Persiapan Operasional (H46–H75)

**Minggu 7–8**
- [ ] FIS — Pantau progres pembangunan/renovasi mingguan; foto bukti **(W)**
- [ ] FIS — Pengadaan peralatan gerai prioritas; lacak status pesan → terima **(W)**
- [ ] SDM — Rekrut/tunjuk petugas gerai prioritas **(W)**
- [ ] SDM — Jadwal pelatihan (layanan, pencatatan, keselamatan, etika) **(W)**
- [ ] MIT — Tetapkan pemasok terpilih; catat kesepakatan/MoU **(W)**
- [ ] LEG — Periksa izin khusus gerai (mis. klinik/apotek bila direncanakan) **(W)**

**Minggu 9–10**
- [ ] SIS — Finalkan SOP; ajukan ke pengurus **(W)**
- [ ] SDM — Pelaksanaan pelatihan; catat kehadiran & hasil **(W)**
- [ ] SIS — Siapkan sistem pencatatan operasional yang akan dipakai petugas **(W)**
- [ ] KOM — Sosialisasi ke warga/pemangku (materi, jadwal, kanal) **(W)**
- [ ] KOM — Tinjau ulang risiko; perbarui matriks **(W)**
- [ ] **🏁 Milestone M3 (H60): Peralatan & petugas gerai prioritas siap**
- [ ] **🏁 Milestone M4 (H75): SOP disetujui & pelatihan tuntas**

## Fase D — Uji Coba & Keputusan (H76–H90)

**Minggu 11–12**
- [ ] FIS — Periksa kelayakan akhir gerai prioritas (daftar periksa keselamatan & kebersihan) **(W)**
- [ ] SIS — **Uji coba operasional terbatas** (simulasi/soft-run); catat temuan **(W)**
- [ ] SIS — Perbaiki temuan uji coba; uji ulang bagian kritis **(W)**
- [ ] KEL — Rapat pengurus: **keputusan pembukaan** (ya/tunda/bertahap) dengan alasan **(W)**
- [ ] KOM — Susun **Laporan 90 Hari**: capaian, pelajaran, risiko, rencana 90 hari berikut **(W)**
- [ ] KOM — Presentasikan laporan ke Pengurus, Pengawas, Kepala Desa **(W)**
- [ ] KEL — Rencanakan 90 hari berikutnya (buat proyek/milestone baru) **(W)**
- [ ] **🏁 Milestone M5 (H90): Laporan 90 hari disampaikan & keputusan pembukaan tercatat**

---

## Ritme Rutin (dibuat sebagai tugas berulang)

| Frekuensi | Kegiatan |
|---|---|
| **Harian** (15 mnt) | Buka *Hari Ini*; tetapkan 3 prioritas; catat jurnal singkat |
| **Mingguan** (Senin) | Tinjau roadmap & milestone; rencana minggu ini |
| **Mingguan** (Jumat) | Perbarui status; **buat laporan mingguan**; bagikan |
| **Dua mingguan** | Hubungi pemangku yang belum dihubungi; tinjau risiko |
| **Bulanan** | Rapat pengurus; laporan bulanan; cadangan JSON; tinjau dokumen kedaluwarsa |
| **Per 30 hari** | Retrospektif: apa berjalan baik, apa diubah |


