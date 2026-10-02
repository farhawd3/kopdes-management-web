# Kerja Git dengan beberapa AI

Anda boleh mengunggah ke `main` lalu menggabungkan cabang `codex/*`, tetapi risiko konflik meningkat jika kedua AI mengubah file atau fitur yang sama. Dalam proyek ini, `main` juga kemungkinan menjadi cabang produksi Vercel. **No Production Deployment** masih berlaku: jangan push atau merge ke cabang produksi sampai pemilik mengubah arahan itu. Periksa pengaturan Production Branch di Vercel; jangan berasumsi selalu `main`.

## Aturan aman

1. Satu AI = satu cabang `codex/nama-pekerjaan` dan satu worktree/checkout terpisah. Dua AI jangan menulis pada folder checkout yang sama. Simpan perubahan sebelum berpindah cabang.
2. Bagi kepemilikan file dan tujuan. Contoh: AI A navigasi dan modal, AI B status tugas dan tes. `personal.css`, `AppShell.tsx`, dan `Records.tsx` adalah titik benturan; jangan beri dua AI perubahan pada file itu secara bersamaan.
3. Setiap AI membuat commit kecil dan push ke cabangnya sendiri. Buka pull request menuju `main` untuk melihat diff dan pemeriksaan. Jangan otomatis merge. AI berikutnya mulai dari `origin/main` terbaru atau memperbarui cabangnya dengan perubahan `main` sebelum pengujian ulang.
4. Jika pemilik mengubah `main` sementara cabang `codex/*` masih aktif, sinkronkan cabang fitur dengan `origin/main` di worktree miliknya, selesaikan konflik secara sadar, lalu ulangi tes. Jangan `force-push` ke `main`, jangan `reset --hard` pada checkout berisi perubahan orang lain.
5. Sebelum merge: review diff, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, uji alur UI terkait, dan pastikan migrasi database kompatibel. Merge satu PR pada satu waktu. Setelah merge, cabang lain harus sinkron ulang.

## Keadaan checkout ini saat panduan ditulis

`main` lokal memiliki commit dokumentasi/perbaikan ponsel yang belum ada di `origin/main`. Ada perubahan belum di-commit di `src/app/personal.css`, `src/app/polish.css`, dan `src/components/layout/AppShell.tsx` dari pekerjaan lain. AI berikutnya harus menjalankan `git status -sb` dulu, mempertahankan perubahan itu, dan tidak memakai `git add .`. Jangan memindahkan checkout aktif ke cabang lain saat AI lain masih bekerja di sana.

Jika ingin tetap memakai `main` untuk AI lain, gunakan **checkout atau worktree terpisah**, bukan folder ini. Jadikan `main` tempat integrasi yang ditinjau, bukan ruang kerja bersama. Selama larangan deployment produksi berlaku, simpan hasil pada cabang dan PR tanpa merge ke cabang yang dilacak sebagai produksi.
