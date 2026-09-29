> Pembaruan pemilik: baca [KEPUTUSAN.md](KEPUTUSAN.md). Dokumen ini adalah rancangan; progres aktual ada di [STATUS.md](STATUS.md).

# Workflow — Puntukrejo Manager Hub

Tiga alur: **(1)** alur pengembangan, **(2)** alur kerja harian–bulanan manajer di aplikasi, **(3)** alur status data.
Diagram memakai Mermaid (tampil otomatis di GitHub/VS Code).

Rujukan: [PRD](PRD.md) · [Checklist](CHECKLIST.md) · [Pemetaan File](PEMETAAN-FILE.md)

---

## 1. Alur Pengembangan

### 1.1 Tahapan

```mermaid
flowchart LR
    A[PRD disetujui] --> B[Fase 0<br/>Bersih-bersih & fondasi]
    B --> C[Fase 1<br/>Rilis 1 MVP]
    C --> D{Dipakai manajer<br/>≥ 3 hari}
    D -- umpan balik --> C
    D -- lolos --> E[Fase 2<br/>Rilis 2]
    E --> F[Fase 3<br/>Rilis 3]
    F --> G[Fase 4<br/>UAT & hardening]
    G --> H[v1.0.0]
```

### 1.2 Alur satu fitur

```mermaid
flowchart TD
    S[Ambil item dari backlog] --> T[Baca kriteria terima di PRD]
    T --> U[Skema zod + tipe]
    U --> V[API route + layanan domain]
    V --> W[UI: kosong → memuat → galat → data]
    W --> X[Uji 360 / 768 / 1024 / 1440 px]
    X --> Y{Definition of Done<br/>terpenuhi?}
    Y -- tidak --> W
    Y -- ya --> Z[Perbarui docs + CHANGELOG]
    Z --> PR[Pull request → merge → deploy preview]
```

### 1.3 Aturan cabang dan commit
- Cabang: `main` (stabil) ← `redesign/manager-hub` ← `feat/<modul>-<hal>`.
- Tag `v0-legacy` pada kode lama sebelum penghapusan apa pun.
- Commit: `feat(tugas): papan seret-lepas`, `fix(gantt): konflik dependensi`, `chore(cleanup): hapus modul anggota`, `docs: perbarui PRD`.
- Satu PR = satu modul/perubahan; PR penghapusan dipisah dari PR fitur.

### 1.4 Urutan pembersihan yang aman

```mermaid
flowchart TD
    A[Tag v0-legacy] --> B[Ekspor JSON data lama]
    B --> C[Hapus halaman + komponen<br/>modul di luar lingkup]
    C --> D[Hapus API + lib terkait]
    D --> E[Hapus tipe mati]
    E --> F[Hapus hardcode identitas lama]
    F --> G[tsc + eslint + grep sisa kata terlarang]
    G --> H[Restruktur folder]
    H --> I[Arsipkan tabel DB lama<br/>hapus permanen setelah 30 hari]
```

### 1.5 Lingkungan
| Lingkungan | Tujuan | Catatan |
|---|---|---|
| Lokal | Pengembangan | `.env.local`, Supabase proyek dev |
| Preview (Vercel) | Tinjau tiap PR | Data uji, bukan data nyata |
| Produksi | Dipakai manajer | Migrasi DB dijalankan manual dengan cadangan |

Variabel lingkungan tidak pernah di-*commit*; sediakan `.env.example` tanpa nilai rahasia.

### 1.6 Kerangka kualitas
Sebelum merge: `tsc --noEmit` · `eslint` · uji komponen inti · Lighthouse pada halaman utama · cek manual di ponsel.

---

## 2. Alur Kerja Manajer di Aplikasi

### 2.1 Siklus harian

```mermaid
flowchart TD
    A[Buka Hari Ini] --> B[Tinjau Terlambat]
    B --> C[Pilih ≤ 3 prioritas]
    C --> D[Kerjakan / rapat / lapangan]
    D --> E{Ada hal baru?}
    E -- tugas --> F[Tombol +  → tugas dengan tenggat]
    E -- keputusan --> G[Catat di Rapat / Keputusan]
    E -- kendala --> H[Catat Isu → jadikan tugas]
    F --> D
    G --> D
    H --> D
    D --> I[Akhir hari: tandai selesai + jurnal singkat]
```

### 2.2 Siklus mingguan

```mermaid
flowchart LR
    Sen[Senin<br/>Tinjau roadmap & milestone<br/>rencana minggu ini] --> Tengah[Selasa–Kamis<br/>Eksekusi & koordinasi]
    Tengah --> Jum[Jumat<br/>Perbarui status<br/>Buat laporan mingguan]
    Jum --> Bagi[Bagikan ke Pengurus / Pengawas / Kades<br/>PDF cetak atau teks WhatsApp]
    Bagi --> Sen
```

### 2.3 Alur rapat → tindak lanjut

```mermaid
flowchart TD
    A[Jadwalkan rapat + agenda] --> B[Rapat berlangsung]
    B --> C[Tulis notulen]
    C --> D[Catat keputusan]
    C --> E[Catat butir aksi + PJ + tenggat]
    E --> F[Otomatis jadi tugas di Tugas]
    F --> G[Tampil di Hari Ini saat jatuh tempo]
    D --> H[Log keputusan dapat dicari]
    G --> I[Selesai → dilaporkan di laporan mingguan]
```

### 2.4 Alur pemangku kepentingan

```mermaid
flowchart LR
    A[Tambah pemangku] --> B[Nilai pengaruh & minat]
    B --> C[Catat interaksi]
    C --> D{Belum dihubungi > 14 hari?}
    D -- ya --> E[Pengingat + saran tugas tindak lanjut]
    D -- tidak --> C
```

### 2.5 Alur kesiapan gerai

```mermaid
flowchart LR
    R[Rencana] --> P[Persiapan] --> U[Siap uji] --> B[Siap buka] --> A[Aktif]
    P -. checklist wajib < 100% .-> P
    U -. temuan uji coba .-> P
    B -. keputusan pengurus tercatat .-> A
```

Syarat perpindahan status disarankan (bukan dipaksa): **Siap uji** ≥ 70% checklist wajib · **Siap buka** 100% checklist wajib + SOP disetujui + petugas terlatih · **Aktif** setelah keputusan pembukaan tercatat.

### 2.6 Alur laporan

```mermaid
flowchart TD
    A[Pilih jenis & periode] --> B[Sistem mengumpulkan data:<br/>tugas selesai, milestone, terlambat,<br/>keputusan, risiko, rencana depan]
    B --> C[Pratinjau A4]
    C --> D[Edit catatan manajer]
    D --> E[Simpan snapshot]
    E --> F[Cetak/PDF]
    E --> G[Salin teks WhatsApp]
```

---

## 3. Alur Status Data

### 3.1 Tugas

```mermaid
stateDiagram-v2
    [*] --> Rencana
    Rencana --> DalamProses: mulai
    DalamProses --> Selesai: tandai selesai
    DalamProses --> Rencana: tunda
    Rencana --> Dibatalkan: batalkan
    DalamProses --> Dibatalkan: batalkan
    Selesai --> DalamProses: buka kembali
    Dibatalkan --> Rencana: pulihkan
```

Penanda turunan (tidak disimpan): **Terlambat** = tenggat < hari ini dan status bukan Selesai/Dibatalkan · **Berisiko** = tenggat ≤ 2 hari dan progres < 50% atau ada prasyarat belum selesai.

### 3.2 Status milestone
- **Tepat waktu:** semua tugas anak on-track.
- **Berisiko:** ≥ 1 tugas anak berisiko atau tenggat ≤ 7 hari dengan progres < 70%.
- **Terlambat:** tanggal target lewat dan belum tercapai.
- **Tercapai:** semua tugas anak selesai; `actual_date` terisi.

### 3.3 Rumus progres (satu sumber kebenaran: `lib/progress.ts`)
- Progres tugas = subtugas selesai / total subtugas (atau 0/100 bila tanpa subtugas).
- Progres milestone/workstream = rata-rata progres tugas, bobot sama (bobot durasi opsional).
- Progres 90 hari = tugas selesai / tugas tidak dibatalkan.
- Kesiapan gerai = checklist wajib selesai / total checklist wajib gerai tersebut.

Angka yang sama dipakai oleh Beranda, Gerai, dan Laporan.

---

## 4. Alur Migrasi Data Lama

```mermaid
flowchart TD
    A[Ekspor JSON: tasks, business_units,<br/>members, unit_daily_reports, products] --> B[Simpan cadangan di luar repo]
    B --> C[Migrasi skema: tambah kolom & tabel baru]
    C --> D[Petakan tasks → work_items<br/>business_units → units]
    D --> E[Pindahkan members, unit_daily_reports,<br/>products ke skema archive_*]
    E --> F[Verifikasi aplikasi baru berjalan]
    F --> G[Tunggu 30 hari]
    G --> H[Hapus archive_* atas persetujuan]
```

Data uji/demo dari Ladang Laweh **tidak** dimigrasikan; mulai dari data kosong Puntukrejo + template 90 hari.


