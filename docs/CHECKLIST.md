# Checklist Kopdes Management Web

## Bagian A — Implementasi dan penerimaan

### Fondasi
- [x] Repo privat baru, push awal, riwayat Git lama diarsipkan lokal.
- [x] Dokumen terbaru menjadi `docs`, panduan AI tunggal dan gitignore dirapikan.
- [x] Modul lama di luar lingkup dihapus dari runtime; arsip lokal dipertahankan.
- [x] Supabase baru dan migrasi enam tabel disetujui; tabel cloud dapat diakses.
- [x] PIN, sesi, batas percobaan, validasi server, RLS, relasi, dan transaksi database.

### Implementasi tersedia
- [x] Beranda, Hari Ini, daftar/papan/kalender tugas, subtugas, prasyarat, tugas berulang.
- [x] Halaman proyek: tujuan, PIC, catatan, progres, milestone, tugas terhubung.
- [x] Pencarian, filter status/proyek/prioritas, pengurutan tugas.
- [x] Roadmap awal, checklist kesiapan, gerai, batang/radar progres.
- [x] Kontak/interaksi, rapat/notulen/keputusan, dokumen, risiko/isu, tim/pelatihan, jurnal.
- [x] Snapshot laporan, cetak A4/PDF, salin teks WhatsApp.
- [x] Profil, template 43 tugas, tema, kepadatan, ekspor/pemulihan JSON.
- [x] Tampilan baru: sidebar berkelompok, ikon, latar hangat, aksen rose, navigasi ponsel.

### Penerimaan dan pekerjaan lanjutan
- [ ] UAT manajer minimal tiga hari dengan data nyata.
- [ ] Uji perangkat fisik Android/iOS, aksesibilitas menyeluruh, Lighthouse.
- [ ] Pemulihan cadangan data nyata di lingkungan uji.
- [ ] Gantt lanjutan: baseline, jalur kritis, drag tanggal, zoom.
- [ ] Burnup berbasis riwayat perubahan cakupan lengkap.
- [ ] PWA/offline, palet perintah, CSV, unggah berkas, tautan laporan publik.
- [ ] Editor blok bebas dan kolaborasi real-time (di luar implementasi awal).
- [ ] Anggaran, jika diputuskan dibutuhkan.

Hasil pengujian otomatis dan viewport terkini dicatat di [STATUS.md](STATUS.md). Checklist implementasi bukan pernyataan bahwa UAT seluruh PRD sudah selesai. Model data aktual mengikuti [KEPUTUSAN.md](KEPUTUSAN.md).

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
