# Keputusan proyek — 30 September 2026

## 4 Oktober 2026 — Dunia Koperasi isometrik

Arahan pemilik terbaru mengganti arah visual sebelumnya dengan paket `docs/paket_koperasi_isometrik`: dua scene, kartu putih melayang, aksen biru/pastel dan menu khusus Dunia Koperasi. Fitur dan data lama dipertahankan. Suplier ditambahkan sebagai domain hub_records dengan migrasi baru; cloud memerlukan konfirmasi. Pemilik memilih repositori baru `kopdes-dunia-koperasi` **publik**, dengan riwayat bersih dan repositori lama dipertahankan. Publikasi belum dilakukan; panduan ada di GITHUB-DUNIA-KOPERASI.md.

## 2 Oktober 2026 — reset proyek saat ini

Pemilik meminta memakai kembali `mqycnhebhzqaziouipet` dan meresetnya karena belum berisi data. Target ini adalah proyek Kopdes yang sekarang, bukan proyek legacy. Siapkan SQL reset dengan pengaman data kosong; pemilik tetap menjalankan langkah cloud. PIN dan sesi dibuat ulang, URL proyek tetap sama.

Instruksi pemilik terbaru menjadi acuan jika berbeda dari rancangan awal PRD.

## 3 Oktober 2026 — pertahankan style cabang redesain

Pemilik membatalkan arah penggantian style total setelah menilai tampilan sebelumnya lebih baik. Acuan: `https://github.com/halimxn/kopdes-management-web/tree/codex/workspace-redesign`, commit lokal/remote `e8fc8b4` saat arahan diterima. Pertahankan karakter visual tersebut dan lakukan tweak untuk dashboard yang lebih ringkas. Eksperimen CSS baru dibuang; penambahan fitur tidak boleh membuat Beranda semakin ramai.

| Hal | Keputusan |
|---|---|
| Repositori | Privat `halimxn/kopdes-management-web`, riwayat baru tanpa induk |
| Produk | Ruang kerja pribadi manajer koperasi; identitas mengikuti profil |
| Arah pengalaman | Task/project manager terinspirasi ruang kerja Notion: proyek, catatan, tugas terhubung, daftar/papan/kalender/Gantt |
| Kode | Runtime baru yang sederhana; kode lama menjadi arsip referensi lokal |
| Database | Supabase baru `mqycnhebhzqaziouipet`; database lama tidak diubah |
| Model data | Enam tabel fisik; 21 domain tervalidasi Zod dalam `hub_records` JSONB, disertai relasi dan transaksi SQL |
| Migrasi | `20260930000001_manager_hub.sql` dijelaskan, disetujui pemilik, dan tabel terverifikasi tersedia |
| Proyek | Memakai domain `workstreams`; tujuan, catatan, PIC, tanggal, tugas, dan milestone. Status/prioritas proyek dan data lama tetap kompatibel |
| Form | Form HTML/React dan Zod bersama; tidak menambah lapisan React Hook Form yang belum diperlukan |
| Desain | Permukaan netral, teks arang, aksen hijau lembut/lavender, kartu membulat dan sidebar berkelompok; tema gelap dan tata letak adaptif |
| Dokumen | Panduan aktif di `docs`; CHANGELOG dan AGENTS di akar |
| Arsip | `.local-backup/legacy-20260930`, diabaikan Git, termasuk Git lama dan konfigurasi lama |
| Data awal | Kosong; proyek dan tugas dibuat pemilik tanpa template wajib |
| Tanggal | Tanggal proyek ditentukan pemilik; tidak ada rentang program wajib |
| Tindakan manual | Pemilik mengisi kredensial dan menjalankan SQL cloud dengan panduan AI |
| Anggaran | Belum diaktifkan |

Model enam tabel menggantikan usulan tabel fisik per domain di rancangan awal. Pengayaan proyek disimpan pada JSONB dengan validasi server; tidak memerlukan SQL tambahan. Jangan mengeksekusi migrasi cloud baru tanpa menjelaskan dan mengonfirmasikannya.

Tidak memakai database lama, menghapus tabel lamanya, atau membawa tag legacy ke repo baru. Status pengujian dan fitur lanjutan yang belum selesai ada di [STATUS.md](STATUS.md). Implementasi ini belum menyamai editor blok bebas atau kolaborasi real-time Notion.

## Perubahan arah produk

Pemilik mengganti konsep program 90 hari menjadi workspace proyek fleksibel. Endpoint dan pemasangan template dihapus dari runtime, tanpa menghapus data cloud yang sudah tersimpan. Rancangan lama sudah digantikan PRD aktif; riwayat dokumennya dapat ditelusuri melalui Git. Catatan terformat disimpan sebagai teks aman pada field `notes`; proyek memakai status/prioritas dengan default kompatibel. Tidak ada SQL baru untuk paket perubahan ini.

## 1 Oktober 2026 — perluasan oleh pemilik

Larangan lingkup anggota/stok pada rancangan sebelumnya dicabut sesuai permintaan terbaru. Empat domain pencatatan ditambahkan (total 20) pada enam tabel fisik. Saat keputusan ini dibuat, migrasi kedua disiapkan dan diuji lokal; konfirmasi cloud berikutnya tercatat di STATUS. Desain aktif memakai tema studio, menggantikan rose/lavender. Pencatatan dipisahkan dari proyek/tugas agar mudah dijangkau. Kas sederhana dan opname manual; bukan POS atau akuntansi penuh.

## Referensi HP terakhir
Palet oranye sebelumnya diganti oleh referensi terbaru pemilik: arang, hijau lembut, lavender. Aplikasi tetap satu pengguna. Data tim adalah catatan koordinasi, bukan akun/kolaborasi. Tata letak bersama berlaku ke semua rute; grafik hanya memakai data tersimpan. Tidak menambahkan jam tugas yang tidak ada pada skema.
