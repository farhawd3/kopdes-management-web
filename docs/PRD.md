> Pembaruan pemilik: baca [KEPUTUSAN.md](KEPUTUSAN.md). Dokumen ini adalah rancangan; progres aktual ada di [STATUS.md](STATUS.md).

# PRD — Ruang Kerja Manajer Proyek KDMP Puntukrejo

| | |
|---|---|
| **Nama produk (sementara)** | **Puntukrejo Manager Hub** |
| **Pemilik produk** | Manajer Koperasi Desa Merah Putih Puntukrejo |
| **Versi / tanggal** | 1.0 — 30 September 2026 |
| **Status** | Draft untuk persetujuan pemilik produk |
| **Basis** | Redesign total dari aplikasi "Kopdes Merah Putih — Ladang Laweh" (`xkdkmp.vercel.app`, kode di `src.zip`) |
| **Dokumen terkait** | [Checklist](CHECKLIST.md) · [Workflow](WORKFLOW.md) · [Pemetaan File](PEMETAAN-FILE.md) |

---

## 1. Ringkasan Eksekutif

Aplikasi lama adalah prototipe tata kelola koperasi yang banyak menyentuh **data anggota, omzet harian, stok, jurnal, neraca, dan SHU**. Untuk peran manajer yang baru mulai bekerja pada **Oktober 2026**, kebutuhan sebenarnya berbeda: manajer perlu **mengendalikan sebuah proyek besar** — menyiapkan dan menjalankan KDMP Puntukrejo — dengan banyak pekerjaan paralel, banyak pihak, dan tenggat yang saling bergantung.

Produk baru ini adalah **aplikasi manajemen proyek pribadi untuk manajer koperasi**: rencana 90 hari, roadmap dan Gantt, papan tugas, kesiapan gerai, pemangku kepentingan, rapat, dokumen legalitas, risiko, dan laporan berkala. **Tidak ada data anggota dan tidak ada data penghasilan/omzet.**

## 2. Latar Belakang dan Masalah

Konteks program: Kopdes/Kel Merah Putih dibentuk berdasarkan Inpres 9/2025 dan diperkuat Inpres 17/2025 untuk pembangunan fisik gerai dan pergudangan. Model usahanya mencakup tujuh gerai/unit: kantor koperasi, kios sembako, simpan pinjam, klinik desa, apotek desa, pergudangan/cold storage, dan logistik, ditambah usaha lain sesuai potensi desa. *(Juknis dan aturan turunan dapat berubah — verifikasi ke Dinas Koperasi setempat.)*

Masalah pada aplikasi lama bila dipakai manajer baru:

| # | Masalah | Dampak |
|---|---|---|
| P1 | Fokus pada data anggota, omzet, stok, jurnal, SHU | Tidak relevan untuk tahap persiapan; menambah beban input |
| P2 | Tidak ada roadmap, milestone, Gantt, atau dependensi | Manajer tidak bisa melihat urutan dan jalur kritis pekerjaan |
| P3 | Tidak ada manajemen pemangku kepentingan dan rapat | Koordinasi dengan kades, pengawas, dinas, bank, vendor tercecer |
| P4 | Identitas lama terkode keras (Ladang Laweh, nama manajer, nomor WhatsApp) | Salah konteks untuk Puntukrejo; ada data pribadi di kode |
| P5 | `lib/repository/index.ts` 2.152 baris; tipe POS/kasir/jurnal yang tak terpakai | Sulit dirawat; banyak kode mati |
| P6 | PIN 4 digit tanpa pembatasan percobaan yang terlihat di kode | Rentan ditebak |
| P7 | Navigasi 14 menu, banyak yang tumpang tindih | Manajer tidak tahu harus mulai dari mana |
| P8 | Visual satu palet mawar, grafik minim, responsif seadanya | Tidak nyaman di ponsel di lapangan |

## 3. Tujuan, Non-Tujuan, dan Metrik

### 3.1 Tujuan
1. **Satu layar, satu jawaban:** "Hari ini saya harus mengerjakan apa, dan apakah proyek on-track?"
2. **Rencana 90 hari siap pakai** sejak hari pertama, bisa disesuaikan.
3. **Visualisasi kerja yang jelas** (Gantt, burnup, papan, matriks risiko) di desktop, tablet, dan ponsel.
4. **Koordinasi terdokumentasi:** pemangku kepentingan, rapat, keputusan, dan tindak lanjut.
5. **Laporan berkala** (mingguan/bulanan) dibuat otomatis dari data kerja.

### 3.2 Non-Tujuan (sengaja dikeluarkan)
- Data anggota, simpanan, keanggotaan, RAT sebagai data suara/peserta.
- Omzet, laba, kas harian, jurnal akuntansi, neraca, SHU, POS/kasir.
- Stok barang dagang dan pembelian niaga.
- Fitur AI berbasis kunci API pengguna (OpenAI key, unit key).
- Multi-koperasi / multi-tenant (satu instalasi = satu koperasi).

### 3.3 Metrik Keberhasilan

| Metrik | Target | Cara ukur |
|---|---|---|
| Waktu catat tugas baru | ≤ 10 detik (ponsel) | Uji manual, tombol tambah cepat |
| Waktu membuat laporan mingguan | ≤ 2 menit | Uji manual |
| Rencana 90 hari terisi | 100% template ter-seed di hari pertama | Cek data awal |
| Tugas terlambat | < 10% dari tugas aktif pada minggu ke-4 | Dashboard |
| Performa | LCP < 2,5 dtk di 4G; Lighthouse ≥ 90 (Perf, A11y) | Lighthouse |
| Responsif | Tanpa scroll horizontal pada 360 px, kecuali Gantt/tabel di kontainer sendiri | Uji perangkat |
| Kode | Tidak ada referensi anggota/omzet/stok; rute mati = 0 | Pencarian statis |

## 4. Pengguna

**Persona utama — Manajer KDMP Puntukrejo** (pengguna harian). Bekerja campuran di kantor dan lapangan, memakai ponsel dan laptop, sering rapat, perlu bukti dan jejak keputusan.

**Pembaca laporan (tidak login):** Pengurus, Pengawas, Kepala Desa, Dinas Koperasi, pendamping. Mereka menerima laporan cetak/PDF/teks WhatsApp yang dibuat manajer.

Model akses: **satu pengguna (manajer)**, dilindungi PIN + sesi server. Peran lain ditunda.

## 5. Ruang Lingkup Berdasarkan Modul Lama

| Modul lama | Keputusan | Menjadi |
|---|---|---|
| `dashboard` | **Ubah** | Command Center `/beranda` |
| `meja-kerja` | **Ubah** | Hari Ini `/hari-ini` |
| `pekerjaan` (+ kalender) | **Ubah** | Tugas `/tugas` (daftar, papan, kalender, Gantt) |
| `persiapan` (checklist) | **Ubah** | Kesiapan `/kesiapan` terhubung ke workstream |
| `unit-usaha` | **Ubah** | Gerai `/gerai` — kesiapan per gerai, tanpa target omzet |
| `tata-kelola` | **Pecah** | Dokumen `/dokumen`, Risiko `/risiko`, Rapat `/rapat` |
| `pengaturan` | **Ubah** | Profil koperasi, PIN, tema, backup |
| `bantuan` | **Tulis ulang** | Panduan singkat + pintasan |
| `pin` | **Perkuat** | Halaman PIN dengan batas percobaan |
| `anggota` | **Hapus** | — |
| `keuangan`, `laporan` (neraca/SHU) | **Hapus** | Laporan Manajer baru (`/laporan`) |
| `monitoring`, `kinerja-gerai` | **Hapus** | Progres gerai di `/gerai` |
| `stok` | **Hapus** | — |
| `login`, `lupa-password`, `reset-password`, `auth/preview`, `DemoBanner` | **Hapus** | — |
| API openai-key, unit-key, stock-simple, members, finance, monitoring, unit-performance, executive | **Hapus** | — |

Daftar file lengkap ada di [Pemetaan File](PEMETAAN-FILE.md).

## 6. Kebutuhan Fungsional

Prioritas MoSCoW: **M** = Must (Rilis 1), **S** = Should (Rilis 2), **C** = Could (Rilis 3).

### M1 — Command Center `/beranda` (M)
Ringkasan satu layar untuk keputusan cepat.
- Kartu: progres 90 hari (ring), hari ke-N dari 90, milestone berikutnya, tugas terlambat, tugas jatuh tempo minggu ini, risiko tinggi terbuka, kesiapan gerai rata-rata.
- Grafik: burnup tugas, distribusi status, progres per workstream.
- Daftar "Perlu perhatian" (maks. 7 item) dengan tautan langsung ke item.
- **Kriteria terima:** memuat < 2 dtk data lokal; tiap angka bisa diklik ke daftar terfilter; kosong-data menampilkan ajakan memakai template 90 hari.

### M2 — Hari Ini `/hari-ini` (M)
- Tiga bagian: **Terlambat**, **Hari ini**, **Menyusul (7 hari)**; agenda rapat hari ini; tindak lanjut dari rapat.
- Aksi cepat: selesai, tunda 1 hari/1 minggu, ubah prioritas.
- Tombol tambah cepat (judul + tanggal + workstream) di semua halaman.
- **Kriteria terima:** menyelesaikan tugas dengan satu ketukan; tersedia di ponsel tanpa membuka form penuh.

### M3 — Tugas `/tugas` (M)
- Entitas: judul, deskripsi, workstream, milestone, penanggung jawab, mulai, tenggat, prioritas, status, kategori POAC (dipertahankan dari sistem lama), subtugas, tautan/lampiran, catatan.
- Tampilan: **Daftar**, **Papan (Kanban)**, **Kalender**; Gantt di M4/S1.
- Filter: workstream, status, prioritas, PJ, rentang tanggal; pencarian teks.
- Pengulangan sederhana (harian/mingguan/bulanan) untuk tugas rutin manajer.
- **Kriteria terima:** seret-lepas kartu mengubah status; di ponsel papan bergulir horizontal dengan snap; seluruh aksi tersedia lewat keyboard.

### M4 — Roadmap `/roadmap` (M untuk milestone, S untuk Gantt penuh)
- Rilis 1: garis waktu milestone per workstream dengan status (tepat waktu / berisiko / terlambat).
- Rilis 2: **Gantt** dengan bar tugas, dependensi finish-to-start, penanda hari ini, zoom minggu/bulan, jalur kritis sederhana, garis dasar (baseline) versus aktual.
- Ponsel: Gantt berganti ke tampilan "garis waktu vertikal".
- **Kriteria terima:** mengubah tanggal di Gantt memperbarui tugas; tugas yang bergantung menandai konflik.

### M5 — Kesiapan & Checklist `/kesiapan` (M)
- Checklist per workstream dan per gerai; status belum/proses/selesai; bukti (catatan/tautan); wajib vs opsional.
- **Template "90 Hari Pertama Manajer"** dimasukkan otomatis saat pertama kali (lihat [Checklist bagian B](CHECKLIST.md)).
- **Kriteria terima:** persentase kesiapan dihitung otomatis dan konsisten di Beranda, Gerai, dan Laporan.

### M6 — Gerai `/gerai` (M)
- Tujuh gerai standar + usaha tambahan sesuai desa; status: rencana → persiapan → siap uji → siap buka → aktif.
- Per gerai: PJ, lokasi, kondisi fisik, peralatan, SOP, petugas, checklist kesiapan, catatan, foto (tautan).
- **Tidak ada** target/omzet/penjualan/laba.
- Grafik: batang horizontal kesiapan semua gerai; radar kesiapan per gerai (legalitas, fisik, SDM, SOP, sistem).

### S1 — Pemangku Kepentingan `/pemangku` (S)
Daftar kontak (Kades/Pengawas/Pengurus/Dinas Koperasi/Bank/Pendamping/Vendor/Warga kunci) dengan pengaruh–minat, tanggal kontak terakhir, tindak lanjut, dan riwayat interaksi. Peta pengaruh–minat 2×2. Pengingat "belum dihubungi > 14 hari".

### S2 — Rapat & Notulen `/rapat` (S)
Agenda, peserta (nama teks, bukan data anggota), notulen, keputusan, dan **butir tindak lanjut yang otomatis menjadi tugas**. Log keputusan terpisah dan bisa dicari.

### S3 — Dokumen & Legalitas `/dokumen` (S)
Registri dokumen (AD/ART, akta, SK pengesahan, NIB, NPWP, rekening, MoU, izin gerai): nomor, tanggal terbit, masa berlaku, status, tautan berkas. Pengingat kedaluwarsa 30/14/7 hari. Rilis 1–2 menyimpan **tautan**; unggah berkas ke penyimpanan ditunda.

### S4 — Risiko & Isu `/risiko` (S)
Register risiko dengan skala 1–5 untuk peluang dan dampak, **matriks panas 5×5**, mitigasi, PJ, tanggal tinjau. Log isu (masalah yang sudah terjadi) dapat dikonversi menjadi tugas.

### S5 — Laporan Manajer `/laporan` (S)
- Laporan mingguan dan bulanan otomatis: capaian, milestone, tugas terlambat, keputusan, risiko, rencana pekan depan.
- Keluaran: tampilan cetak (A4), PDF lewat cetak browser, dan **teks ringkas untuk WhatsApp**.
- Snapshot disimpan agar laporan lama tidak berubah.

### C1 — Tim & Pelatihan `/tim` (C)
Daftar petugas/pegawai gerai (bukan anggota), peran, status akun, pelatihan yang wajib dan tuntas.

### C2 — Jurnal Kerja `/jurnal` (C)
Catatan harian/kunjungan lapangan bercap waktu, dapat ditautkan ke tugas, pemangku kepentingan, atau gerai.

### C3 — Anggaran Proyek (C, perlu konfirmasi)
Hanya **rencana vs realisasi biaya persiapan proyek** (bukan pendapatan). Diaktifkan bila pemilik produk menghendaki. Lihat pertanyaan terbuka Q3.

### C4 — Pelengkap (C)
Palet perintah `Ctrl/⌘+K`, PWA (dapat dipasang, cache dasar), pengingat dalam aplikasi, impor/ekspor CSV, ekspor cadangan JSON.

### M7 — Pengaturan & Keamanan (M)
- Profil koperasi (nama, desa, kecamatan, kabupaten, provinsi), nama manajer, **tanggal mulai kerja**, tanggal target (opsional).
- PIN: ubah PIN, panjang minimal 6 digit, pembatasan percobaan (mis. 5 gagal → kunci 15 menit), sesi kedaluwarsa.
- Tema terang/gelap/sistem; kepadatan tampilan.
- Cadangan/pulihkan JSON.

## 7. Katalog Grafik dan Visualisasi

| Grafik | Lokasi | Data | Ponsel |
|---|---|---|---|
| Cincin progres 90 hari | Beranda | Selesai/total tugas | Tetap |
| Burnup | Beranda, Laporan | Cakupan vs selesai per minggu | Dapat digeser |
| Batang bertumpuk status | Beranda | Status per workstream | Tetap |
| Timeline milestone | Roadmap | Milestone | Vertikal |
| **Gantt** | Roadmap | Tugas + dependensi | Diganti timeline vertikal |
| Kanban | Tugas | Status | Geser horizontal |
| Kalender bulan/minggu | Tugas | Tenggat + rapat | Agenda 3 hari |
| Batang kesiapan gerai | Gerai | Persen kesiapan | Tetap |
| Radar kesiapan | Detail gerai | 5 dimensi | Tetap |
| Matriks panas risiko | Risiko | Peluang × dampak | Tetap, geser |
| Peta pengaruh–minat | Pemangku | 2×2 | Tetap |
| Aging tugas terlambat | Beranda | 1–3, 4–7, >7 hari | Tetap |

Aturan: setiap grafik punya **ringkasan teks** di bawahnya (aksesibilitas), tidak mengandalkan warna saja (ikon/label/pola), dan menampilkan keadaan kosong yang menjelaskan cara mengisinya.

## 8. Desain UX/UI

### 8.1 Prinsip
1. **Bekerja dulu, melihat kemudian:** aksi utama ≤ 2 ketukan.
2. **Padat tapi lega:** kepadatan bisa dipilih (nyaman/ringkas).
3. **Status selalu terbaca:** warna + ikon + teks.
4. **Ponsel adalah warga kelas satu:** dirancang mulai 360 px.
5. **Identitas Merah Putih yang tenang:** merah sebagai aksen merek, bukan pemenuhan seluruh layar.

### 8.2 Token desain

| Token | Terang | Gelap | Catatan |
|---|---|---|---|
| `--brand` | `#B3243B` | `#F08A9B` | Tombol utama, tautan aktif |
| `--brand-soft` | `#FDECEF` | `#3A1C24` | Latar aksen |
| `--ink` | `#111827` | `#F3F4F6` | Teks utama |
| `--ink-muted` | `#5B6472` | `#A3ACBA` | Teks sekunder |
| `--surface` | `#FFFFFF` | `#161B26` | Kartu |
| `--canvas` | `#F6F7F9` | `#0E121A` | Latar halaman |
| `--line` | `#E5E7EB` | `#2A3242` | Garis |
| `--ok` | `#15803D` | `#4ADE80` | Tepat waktu / selesai |
| `--warn` | `#B45309` | `#FBBF24` | Berisiko |
| `--late` | `#C2410C` + ikon | `#FB923C` | Terlambat |
| `--info` | `#1D4ED8` | `#60A5FA` | Informasi |

Catatan: merah merek dan status "terlambat" **sengaja dibedakan** (merah-tua vs oranye-terbakar + ikon) agar tidak membingungkan. Semua pasangan teks/latar ditargetkan ≥ 4,5:1 (WCAG AA) — verifikasi saat implementasi.

Tipografi: **Plus Jakarta Sans** (judul) + **Inter** (UI, angka tabular). Skala 12/14/16/20/24/32. Radius 12 px kartu, 10 px kontrol. Bayangan halus dua tingkat. Gerak ≤ 200 ms dan menghormati `prefers-reduced-motion`.

### 8.3 Pola responsif

| Lebar | Navigasi | Tata letak |
|---|---|---|
| < 640 px | Bilah bawah 5 slot: Beranda · Hari Ini · **+** · Tugas · Menu; lembar bawah (bottom sheet) untuk form | Satu kolom; tabel → kartu; Gantt → timeline vertikal |
| 640–1023 px | Rel ikon di kiri (kolapsibel) | Dua kolom; drawer untuk detail |
| 1024–1439 px | Sidebar penuh | 12 kolom; panel detail geser dari kanan |
| ≥ 1440 px | Sidebar + panel konteks kanan | Kanvas lebar, Gantt penuh |

Target sentuh ≥ 44 px, `100dvh` dan *safe-area inset* untuk ponsel, pelipatan teks tanpa memotong, dan tidak ada aksi yang hanya bisa dilakukan lewat *hover*.

### 8.4 Arsitektur Informasi

```
Beranda        → Command Center · Hari Ini
Perencanaan    → Roadmap & Gantt · Tugas · Rapat & Notulen
Gerai          → Daftar Gerai · Kesiapan & Checklist
Kelembagaan    → Pemangku Kepentingan · Dokumen & Legalitas · Risiko & Isu · Tim & Pelatihan
Laporan        → Laporan Manajer · Jurnal Kerja
Sistem         → Pengaturan · Panduan
```

Dari 14 menu lama menjadi **6 grup, 13 halaman**, dengan Rilis 1 hanya menampilkan 6 halaman utama.

## 9. Model Data

Memakai ulang Supabase yang ada. Tabel baru/ubah (semua kolom `created_at`, `updated_at`; RLS/otorisasi server tetap):

| Tabel | Status | Kolom utama |
|---|---|---|
| `organization_profile` | ubah | nama koperasi, desa, kecamatan, kabupaten, provinsi, nama manajer, `start_date`, `target_date?` |
| `workstreams` | baru | nama, warna, urutan |
| `milestones` | baru | workstream_id, judul, target, aktual, status |
| `tasks` → `work_items` | ubah | + workstream_id, milestone_id, start_date, progress, parent_id, sort_order, recurrence |
| `work_item_dependencies` | baru | item_id, depends_on_id |
| `checklist_items` | ubah | + workstream_id, unit_id, wajib, bukti |
| `business_units` → `units` | ubah | hapus target bulanan; + jenis gerai, kondisi fisik |
| `stakeholders`, `interactions` | baru | kategori, pengaruh, minat, kontak, kontak terakhir |
| `meetings`, `meeting_actions` | baru | tanggal, agenda, notulen, keputusan; aksi → work_items |
| `decisions` | baru | tanggal, keputusan, alasan, tautan |
| `documents` | ubah | jenis, nomor, terbit, berlaku sampai, tautan |
| `risks`, `issues` | ubah/baru | peluang 1–5, dampak 1–5, mitigasi, tinjau |
| `staff`, `trainings` | baru (C) | peran, status, pelatihan |
| `journal_entries` | baru (C) | waktu, isi, tautan |
| `reports` | baru | jenis, periode, snapshot JSON |
| `activity_log` | baru | aksi, entitas, waktu |
| `members`, `unit_daily_reports`, `products` | **arsip lalu hapus** | Ekspor JSON dulu; hapus setelah 30 hari |

Skema SQL dan kebijakan RLS akan ditulis di `supabase/migrations/` setelah struktur database aktual dikonfirmasi (lihat Q5).

## 10. Arsitektur Teknis

**Tetap:** Next.js (App Router) + TypeScript, Tailwind, Supabase, zod, lucide-react, react-hook-form, class-variance-authority.
**Tambahan yang diusulkan:** `recharts` (grafik standar), `@dnd-kit/core` (papan), `date-fns` (tanggal, lokal `id`). **Gantt dibuat sendiri** (CSS grid + SVG) agar ringan.

Struktur target:

```
src/
├─ app/
│  ├─ (auth)/pin/
│  ├─ (app)/{beranda,hari-ini,tugas,roadmap,rapat,gerai,kesiapan,
│  │         pemangku,dokumen,risiko,tim,laporan,jurnal,pengaturan,panduan}/
│  └─ api/{auth/pin, organization, work-items, milestones, units, checklist,
│          stakeholders, meetings, documents, risks, reports, backup}/
├─ features/<domain>/{components,hooks,schemas.ts,service.ts}
├─ components/{ui,layout,charts}/
├─ lib/{auth,supabase,security,utils,date}/
└─ types/
```

Perubahan penting: pecah `repository/index.ts` (2.152 baris) menjadi layanan per domain; hapus implementasi *in-memory* atau pindahkan ke `tests/`; satu sumber kebenaran untuk perhitungan progres (`lib/progress.ts`).

## 11. Kebutuhan Non-Fungsional

- **Performa:** LCP < 2,5 dtk (4G), bundel per rute lazy-load, grafik dimuat dinamis.
- **Keamanan:** hapus nomor WhatsApp dan nama manajer terkode keras; PIN ≥ 6 digit + batas percobaan + jeda eksponensial; cookie sesi `HttpOnly`/`Secure`/`SameSite`; validasi zod di setiap API; tidak ada kunci API pengguna disimpan.
- **Privasi:** tidak menyimpan data pribadi warga/anggota; kontak pemangku kepentingan bersifat profesional saja.
- **Ketersediaan data:** ekspor JSON manual + pengingat cadangan mingguan; opsional cadangan otomatis Supabase.
- **Aksesibilitas:** WCAG 2.2 AA, navigasi keyboard, label ARIA, fokus terlihat.
- **Bahasa/zona:** Bahasa Indonesia, WIB, format `dd MMM yyyy`, mata uang `Rp` hanya jika C3 aktif.
- **Offline (C):** cache halaman & antrean tulis sederhana via PWA.

## 12. Rencana Rilis

Perkiraan untuk satu pengembang; sesuaikan kapasitas.

| Fase | Perkiraan | Isi | Hasil |
|---|---|---|---|
| **0 — Fondasi** | 1–4 Okt | Persetujuan PRD, pembersihan file, token desain, AppShell baru, PIN diperkuat | Repo bersih, kerangka baru |
| **1 — Rilis 1 (MVP)** | 5–18 Okt | M1–M7 (Beranda, Hari Ini, Tugas, milestone, Kesiapan + template 90 hari, Gerai, Pengaturan) | Dipakai harian |
| **2 — Rilis 2** | 19 Okt–8 Nov | Gantt, Pemangku, Rapat, Dokumen, Risiko, Laporan | Koordinasi lengkap |
| **3 — Rilis 3** | 9–22 Nov | Tim, Jurnal, PWA, palet perintah, impor/ekspor, (opsional) anggaran | Polesan |
| **UAT & Hardening** | 23–30 Nov | Uji perangkat, aksesibilitas, keamanan, dokumentasi | Rilis stabil |

**Jembatan hari pertama:** sebelum Rilis 1 selesai, manajer sudah bisa memakai [Checklist 90 Hari](CHECKLIST.md) (bagian B) secara manual mulai 1 Oktober.

## 13. Risiko Proyek Pengembangan

| # | Risiko | P | D | Mitigasi |
|---|---|---|---|---|
| R1 | Lingkup melebar (fitur terlalu banyak) | T | T | Kunci Rilis 1 pada 6 halaman; sisanya via backlog |
| R2 | Migrasi menghapus data berharga | S | T | Ekspor JSON & arsip 30 hari |
| R3 | Konfigurasi proyek tidak lengkap (lihat Q5) | T | S | Minta `package.json`, config, SQL sebelum implementasi |
| R4 | Gantt rumit di ponsel | S | S | Tampilan timeline vertikal alternatif |
| R5 | Regulasi/juknis berubah | S | S | Template dapat diedit; tanggal & istilah bukan kode keras |
| R6 | PIN dibobol | S | T | Batas percobaan, PIN ≥ 6 digit |
| R7 | Waktu manajer terbatas untuk UAT | T | S | Rilis bertahap, umpan balik mingguan |

*P = peluang, D = dampak; R=rendah, S=sedang, T=tinggi.*

## 14. Asumsi dan Pertanyaan Terbuka

**Asumsi:** tanggal mulai kerja default 1 Oktober 2026; satu pengguna; Supabase tetap dipakai; bahasa Indonesia saja.

| # | Pertanyaan | Dampak |
|---|---|---|
| Q1 | Nama lengkap manajer, kecamatan, kabupaten, dan provinsi Puntukrejo? | Profil, kop laporan |
| Q2 | Tanggal mulai kerja pasti dan tanggal target pembukaan (jika ada)? | Rencana 90 hari |
| Q3 | Apakah perlu modul **anggaran proyek** (biaya persiapan, bukan pendapatan)? | C3 |
| Q4 | Gerai mana dari tujuh yang aktif direncanakan di Puntukrejo, dan adakah usaha tambahan? | Seed gerai |
| Q5 | Bisa kirim `package.json`, `tailwind.config`, `next.config`, `.env.example`, dan skema SQL Supabase? Zip saat ini hanya berisi `src/`. | Implementasi dan build |
| Q6 | Perlu berbagi laporan ke pihak lain dengan tautan baca-saja? | Model akses |
| Q7 | Nama produk final (mis. "Puntukrejo Manager Hub")? | Merek |

## 15. Persetujuan

| Peran | Nama | Tanggal | Status |
|---|---|---|---|
| Pemilik produk | | | ☐ |


