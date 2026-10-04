# Sumber SQL dan instalasi bersih

## Migrasi 8 — Suplier, 4 Oktober 2026

`supabase/migrations/20261004000008_supplier.sql` disiapkan dan diuji PostgreSQL lokal. Menambah domain supplier pada hub_records, validasi nama/status, relasi kegiatan dan fungsi hub_supplier_ready khusus server. Data lama dan RLS dipertahankan. Generator instalasi/reset kini mencakup delapan migrasi. **Belum diterapkan cloud**; periksa migrasi 1–7 dan minta konfirmasi pemilik untuk proyek `mqycnhebhzqaziouipet`. Jangan memakai reset untuk aktivasi Suplier.

`supabase/migrations/` berisi tujuh migrasi berurutan (1–7). Semuanya masih digunakan oleh `tests/database/database.test.ts` dan generator reset; **tidak ada berkas migrasi yang terbukti tidak digunakan**, sehingga tidak ada yang aman dihapus sekarang. Menghapus migrasi historis yang pernah dijalankan membuat keadaan cloud sulit diaudit. Berkas reset adalah operasi destruktif tersendiri, bukan migrasi normal.

Untuk proyek yang benar-benar **belum memiliki skema aplikasi**, `supabase/install/INSTALL_SCHEMA_KOSONG.sql` adalah SQL tunggal yang menggabungkan ketujuh migrasi dalam satu transaksi. Dibuat ulang dengan `node scripts/build-install.mjs`. Berkas ini menolak berjalan bila tabel aplikasi sudah ada; jangan jalankan pada proyek Kopdes yang sekarang berisi data atau sudah terpasang. Uji lokal di `tests/database/install-schema.test.ts` memeriksa pemasangan dan penolakan instalasi ulang.

Untuk proyek Supabase saat ini `mqycnhebhzqaziouipet`, pakai hanya migrasi tambahan yang belum terpasang setelah **memeriksa keadaan cloud**. Status penerapan migrasi 6 dan beberapa migrasi sebelumnya belum sepenuhnya terverifikasi di `STATUS.md`/`CHECKLIST.md`; jangan menebak atau mengulang reset. Sebelum SQL cloud apa pun: sebutkan berkas, dampak, proyek tujuan, dan minta persetujuan pemilik sesuai `AGENTS.md`. Jangan jalankan SQL dari panduan ini secara otomatis.

Setelah perubahan skema berikutnya, tambah migrasi bernomor baru, jalankan tes database lokal, lalu bangun ulang SQL instalasi bersih dan reset dengan generatornya. Bila ada file yang diduga tak dipakai, buktikan bahwa tidak dirujuk kode, tes, generator, docs, serta belum menjadi bagian riwayat cloud sebelum menghapusnya.
