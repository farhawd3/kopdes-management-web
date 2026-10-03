# Serah terima AI

Baca [AGENTS](../AGENTS.md), [STATUS](STATUS.md), [KEPUTUSAN](KEPUTUSAN.md), [PRD](PRD.md) dan [CHECKLIST](CHECKLIST.md). Untuk UI baca [DESAIN-ANTARMUKA](DESAIN-ANTARMUKA.md); kegiatan/SQL memakai [KEGIATAN-DAN-TUGAS](KEGIATAN-DAN-TUGAS.md) dan [MIGRASI-SQL](MIGRASI-SQL.md).

## Acuan kerja

- Periksa Git, cabang dan diff; pertahankan perubahan yang sudah ada. Paket terakhir memakai codex/workspace-redesign, tetapi checkout dapat berubah.
- Pemilik memilih dashboard aplikasi saat ini. Pertahankan acuan e8fc8b4 dan tweak berikutnya, tanpa redesain total atau pratinjau baru.
- Stylesheet aktif: src/app/globals.css dan src/app/personal.css. Fitur di src/features/<domain>/, kontrak/form bersama di akar features; lihat [ARSITEKTUR](ARSITEKTUR.md).
- Font/ukuran kontrol memakai token global; style kontrol aktif di akhir personal.css. Gunakan DateInput/DateField, Select dan SubtaskToggle bersama. Posisi menu memakai usePopoverPlacement yang memperhitungkan batas panel bergulir. Panduan onboarding berada di ManagerGuide.
- Koreksi terbaru pemilik: kalender ke bawah, input/dropdown mobile 14 px; skala mobile dimiliki token globals.css. Basis flex 200 px intro tugas dibuang karena berubah menjadi tinggi pada layout kolom. Dashboard/Hari Ini memakai ringkasan dua kolom dan label proyek panjang membungkus. Hindari menambah aturan tipografi !important atau mengembalikan bleed kalender di ponsel.
- Status tugas sudah memiliki utilitas src/lib/task-status.ts; progres di src/lib/progress.ts. Periksa pemanggil sebelum membuat logika baru.
- Harian memakai tampilan hari/minggu. Instruksi lama tentang accordion Selasa sudah usang. Kalender telah mengutamakan judul dan menjadikan kode metadata.
- Bukti tes, viewport dan cloud ada di STATUS. Tes lokal tidak membuktikan UAT atau penerapan SQL cloud.

## Pekerjaan lanjutan

Paket mobile memeriksa 22 halaman dan 21 form pada 360 px dalam dua tema, serta Proyek/Panduan/Risiko/Tugas pada empat lebar. Kalender detail, skeleton, matriks risiko, tabel tugas dan aksi buku diperbaiki dari temuan fixture. Reproduksi masalah memakai data yang sama sebelum memperbaiki: filter Beranda–Hari Ini–Tugas–Riwayat, fokus kembali, Escape/reduced-motion dan Gantt. Audit seluruh keadaan/interaksi dan perangkat fisik tetap terbuka. Fixture/tes DOM tidak menggantikan UAT.

Tidak melakukan deployment produksi atau SQL cloud otomatis. Jelaskan berkas SQL, dampak dan proyek tujuan lalu minta persetujuan untuk eksekusi cloud. Jalankan pemeriksaan sesuai AGENTS, catat hasil nyata dan commit/push paket ke cabang kerja tanpa menyertakan perubahan orang lain.
