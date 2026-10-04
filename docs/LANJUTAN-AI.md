# Serah terima AI

Koreksi screenshot 4 Oktober: baca bagian terbaru QA-POPUP.md. Fixture daftar memakai draftScope, bukan scopeId yang menyembunyikan data; preferensi view QA terpisah. Lebar dropdown mengikuti batas panel dengan minimum yang diinginkan 220 px; opsi tidak flex-shrink. Form mobile satu kolom, tab dua kolom. Hari ini kini mengatur start=today() (varian layar penuh masih dalam perubahan kerja TaskTimeline milik pemilik). Kartu Gerai tanpa radar kosong, contoh 40/100% berasal dari checklist fixture. 245 tes/37 berkas, tipe/ESLint/build lulus; lint:ui dan check:ui tetap gagal pada utang checkout, bukan seluruh audit selesai.

## Lanjutan PLAN-ASTRA — 4 Oktober 2026

- Rujuk docs/QA-POPUP.md untuk audit popup terbaru. /dev/popup hanya development, fixture 21 domain, API diblokir sebelum fetch; draft form dan preferensi rutinitas QA terpisah. Jangan menghapus guard atau memakai fixture sebagai data operasional.
- Temuan: grid/label panjang, target tombol kecil, input rutinitas menyusut, Escape menutup dua lapis, label tanggal generik, filter pencarian menyusut dan fokus menu ponsel. Fix tersedia; konfirmasi laporan/CSV/rutinitas memakai modal native.
- Kalender sempit mempertahankan target 44 px dengan gulir kisi di dalam menu. Dua important di ui.css untuk target dialog masih utang cascade legacy, bukan penyelesaian target CSS PLAN-ASTRA.

- Pencatatan kini memakai EmptyState; Opname tanpa barang mengarahkan ke /barang. Tes terbaru 196/31 berkas. QA ukuran enam halaman pencatatan/gerai 360 dan Opname 768/1024/1440 tanpa luapan setelah isi muncul; tidak ada mutasi data nyata.

- Paket terbaru: EmptyState Beranda/Hari Ini, daftar proyek seluruhnya diarsipkan, kartu tugas mobile dan guard keyboard aksi anak. 195 tes/31 berkas serta typecheck/lint/lint:ui/build dan audit sumber 91/91 lulus.
- Sesi browser aktif kembali; catatan kedaluwarsa di bawah adalah riwayat. Hari Ini 320/360/768/1024/1440 diukur tanpa luapan; screenshot 360 di artifacts/astra/hari-ini-kartu-360.jpg. Tidak menyimpan perubahan data nyata selama QA.
- Kalender tetap ke bawah dan di dalam panel, namun sel pada form sempit kurang dari 44 px. Perbaikan berikutnya harus mempertahankan batas panel dan validasi tanggal, bukan membiarkan kalender meluap.

- Rujuk docs/LAPORAN-ASTRA.md dan AUDIT.md untuk paket serta kriteria terbuka. Pemeriksaan terakhir 191 tes/30 berkas, typecheck/lint/build, check:ui dan audit sumber 91/91 lulus.
- Branch codex/workspace-redesign telah di-push per paket. Periksa ulang Git. Perubahan pemilik pada personal.css, Settings.tsx, ThemeContext.tsx serta PLAN-ASTRA yang belum dilacak tetap dipertahankan terpisah.
- Sesi QA browser kedaluwarsa; masuk kembali diperlukan untuk QA halaman berdata. Galeri /dev/komponen hanya development, tanpa database.
- Stylesheet sekarang globals.css, personal.css, tokens.css dan ui.css. Jangan menandai rencana selesai: CSS legacy/important/duplikat dan QA lengkap masih terbuka.
- Skrip sekali pakai/snapshot berada di artifacts/astra (diabaikan Git); jangan rerun skrip migrasi lama. Skrip audit dan pembersihan berulang berada di scripts; tinjau kandidat sebelum menerapkan ke kode yang berubah.

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
