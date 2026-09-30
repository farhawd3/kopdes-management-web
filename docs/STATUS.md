# Status proyek — Workspace fleksibel

## Perubahan terbaru

- Konsep program 90 hari dikeluarkan dari UI dan runtime. Proyek memiliki tujuan, tanggal, dan durasinya sendiri. Data lama tidak dihapus.
- Proyek: status rencana/aktif/ditunda/selesai/arsip, prioritas, PIC, tujuan, tanggal, pencarian, filter, progres tugas.
- Catatan proyek: judul, paragraf, daftar, checklist, kutipan, pratinjau, penyimpanan server. HTML tidak dieksekusi.
- Tugas: daftar, papan, kalender, dan Gantt memakai data yang sama; subtugas, prasyarat, pengulangan, filter dan pengurutan tetap tersedia.
- Gantt: rentang tanggal, skala, filter proyek, navigasi periode, milestone, hari ini, deteksi benturan tanggal prasyarat, geser batang, resize tenggat, tinjau dan simpan. Keyboard/form menjadi alternatif untuk sentuh.
- Dashboard baru memakai jumlah proyek/tugas aktual dan delapan minggu penyelesaian bergulir.
- Tema rose/lavender, lapisan kartu dan bayangan lembut, sidebar, tabel, papan, form, halaman proyek dan catatan diperbarui.
- Rencana/spec lama di `docs/arsip`; seed historis menjadi fixture tes, bukan fitur runtime. SQL terpasang tetap utuh.

## Fondasi tetap aktif

Repo privat `halimxn/kopdes-management-web` dengan riwayat awal baru. Supabase baru `mqycnhebhzqaziouipet`; enam tabel, RLS, validasi server, pemeriksaan relasi, transaksi, PIN scrypt, sesi HttpOnly dan batas percobaan persisten. PIN/login dan baca 16 domain berhasil diverifikasi sebelumnya. Database lama tidak digunakan.

Modul kesiapan/gerai, pemangku/interaksi, rapat/keputusan/tindak lanjut, dokumen, risiko/isu, tim/pelatihan, jurnal, snapshot laporan, cetak, salin teks dan backup/pemulihan tetap tersedia.

## Verifikasi paket

- **62/62 tes lulus**: keamanan, PostgreSQL lokal, kompatibilitas data lama, lingkup proyek, filter, aksi tugas, geometri Gantt, geser/resize lintas tahun, konflik prasyarat, simpan/gagal simpan jadwal, catatan terformat dan escaping HTML.
- Lint, TypeScript, build produksi Next.js berhasil. Audit sumber: 43/43 file terjangkau.
- Pemeriksaan browser singkat Beranda dan Gantt pada 360/768/1024/1440 px: tidak ada overflow dokumen. Grafik lebar menggulir di kontainernya. Tema terang/gelap diperiksa.
- Browser menggunakan data cloud kosong; tes lokal memakai fixture. Interaksi drag pada data nyata dan perangkat fisik belum menjadi UAT.

## Batas yang masih perlu dikerjakan

- Baseline, jalur kritis, dan penjadwalan otomatis seluruh dependensi.
- Editor blok drag-and-drop dan kolaborasi real-time. Catatan saat ini berbasis teks terformat dengan toolbar.
- PWA/offline, CSV, unggah berkas, tautan laporan publik.
- UAT beberapa hari, Android/iOS/Safari fisik, Lighthouse dan audit aksesibilitas menyeluruh.
- Smoke test deployment produksi. Vercel sebelumnya menampilkan No Production Deployment; keberhasilan hosting belum dikonfirmasi.

## Mulai memakai

Buka **Proyek → Proyek baru**. Isi tujuan dan jadwal, tambahkan tugas, lalu pilih tampilan Gantt atau tulis catatan proyek. **Gantt & milestone** merangkum jadwal lintas proyek. Pengaturan untuk profil, PIN, dan backup. Tidak ada migrasi cloud tambahan untuk paket ini.
