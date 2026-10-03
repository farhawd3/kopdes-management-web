# Serah terima AI

Baca [AGENTS](../AGENTS.md), [STATUS](STATUS.md), [KEPUTUSAN](KEPUTUSAN.md), [PRD](PRD.md) dan [CHECKLIST](CHECKLIST.md). Untuk UI baca [DESAIN-ANTARMUKA](DESAIN-ANTARMUKA.md); kegiatan/SQL memakai [KEGIATAN-DAN-TUGAS](KEGIATAN-DAN-TUGAS.md) dan [MIGRASI-SQL](MIGRASI-SQL.md).

## Acuan kerja

- Periksa Git, cabang dan diff; pertahankan perubahan yang sudah ada. Paket terakhir memakai codex/workspace-redesign, tetapi checkout dapat berubah.
- Pemilik memilih dashboard aplikasi saat ini. Pertahankan acuan e8fc8b4 dan tweak berikutnya, tanpa redesain total atau pratinjau baru.
- Stylesheet aktif: src/app/globals.css dan src/app/personal.css. Fitur di src/features/<domain>/, kontrak/form bersama di akar features; lihat [ARSITEKTUR](ARSITEKTUR.md).
- Status tugas sudah memiliki utilitas src/lib/task-status.ts; progres di src/lib/progress.ts. Periksa pemanggil sebelum membuat logika baru.
- Harian memakai tampilan hari/minggu. Instruksi lama tentang accordion Selasa sudah usang. Kalender telah mengutamakan judul dan menjadikan kode metadata.
- Bukti tes, viewport dan cloud ada di STATUS. Tes lokal tidak membuktikan UAT atau penerapan SQL cloud.

## Pekerjaan lanjutan

Reproduksi masalah memakai data yang sama sebelum memperbaiki: filter Beranda–Hari Ini–Tugas–Riwayat, modal 360 px, fokus kembali, Escape/reduced-motion serta luapan tabel/Gantt. Audit seluruh modul/tema dan perangkat fisik tetap terbuka. Fixture/tes DOM tidak menggantikan UAT.

Tidak melakukan deployment produksi atau SQL cloud otomatis. Jelaskan berkas SQL, dampak dan proyek tujuan lalu minta persetujuan untuk eksekusi cloud. Jalankan pemeriksaan sesuai AGENTS, catat hasil nyata dan commit/push paket ke cabang kerja tanpa menyertakan perubahan orang lain.
