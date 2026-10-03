# Pelaksanaan PLAN-ASTRA — 4 Oktober 2026

## Fase 1 — audit otomatis selesai

- Audit JSX memakai AST TypeScript, CSS memakai PostCSS. `AUDIT.md` memuat seluruh kontrol dengan file/baris, rute, overlay, nilai deklarasi dan selector berulang dalam konteks yang sama.
- Berkas: `scripts/audit-ui.mjs` baru; `package.json` menambah `audit:ui`; `AUDIT.md` hasil yang dapat dibuat ulang.
- Baseline: 250 button, 45 input, 4 select, 5 textarea; 289 kontrol di luar UI; 37 hex TSX, 946 hex CSS; CSS 603.721 byte, 2.353 important, 522 selector berulang.
- Verifikasi: 171 tes/23 berkas lulus; typecheck, lint, build, audit:source (74/74) dan audit:ui berhasil.
- Keputusan: angka di arsip rencana diganti pengukuran aktual. Duplikat selector adalah kandidat tinjauan, bukan izin menghapus aturan responsif. Perubahan awal personal.css, Settings.tsx, ThemeContext.tsx dipertahankan; snapshot lokal ada di artifacts/astra (diabaikan Git).
- [x] Semua kontrol mentah terdata.
- [x] Inventaris rute/overlay tersedia.
- [ ] Pemeriksaan visual baru: belum berlaku pada fase audit tanpa perubahan tampilan.

## Tahap berikutnya

Migrasi visual penuh, interaktivitas, animasi dan QA menyeluruh masih berjalan. Bukti perangkat fisik dan Lighthouse tidak boleh disimpulkan dari tes DOM/build.

## Fase 2 — fondasi token dan penjaga CSS

- `tokens.css` menambah empat radius, enam peran font, kontrol, spasi, ikon, motion dan alias warna ke pastel/tema aktif. `ui.css` menyiapkan primitive berawalan ui tanpa important/hex.
- Stylelint terpasang sebagai satu devDependency yang diizinkan rencana; `lint:ui` melarang hex, important dan radius/font tanpa token pada CSS baru. Legacy tetap diaudit terpisah agar utang lama tidak tersamarkan.
- Verifikasi: 171 tes/23 berkas, typecheck, lint, lint:ui dan build lulus. CSS baru memiliki empat nilai radius token dan enam peran font; belum ada klaim kontras seluruh tema.
- Keputusan: font isi mobile 14, bukan 13,5, mengikuti permintaan menghapus ukuran pecahan; kontrol mobile 48 menjaga minimum sentuh 44. Warna tidak diduplikasi. Pemeriksaan visual menyeluruh menyusul galeri komponen.
- [x] Fondasi token dan stylelint tersedia.
- [ ] Penjaga elemen mentah diaktifkan setelah migrasi fase 3.
- [ ] Normalisasi seluruh CSS legacy dan kontras seluruh tema.

## Fase 3 — paket kontrol dan navigasi

- Seluruh button/input/textarea pemanggil beralih ke primitive bersama; tiga select Editor beralih ke Select kustom. Handler, nilai form dan referensi dipertahankan. Tambahan Badge, Card, Field, DateNav, BottomNav dan permukaan dialog bersama.
- DateInput menampilkan satu tanggal dd/mm/yyyy; native tersembunyi menjaga validasi/form, invalid mengembalikan fokus ke pemicu. Kalender tetap membuka ke bawah dan memperhitungkan scrollbar viewport.
- DateNav dipakai kalender/Gantt; dock memakai lima struktur ikon/label setara. Modal berulang memakai dialog native dengan pemulihan fokus; tiga dialog lain memakai permukaan bersama tanpa mengganti lifecycle lama.
- Metrik: kontrol mentah luar UI 289 → 0; important 2.353 → 2.278; duplikat 522 → 519. CSS keseluruhan 603.721 → 609.077 byte karena lapisan transisi; belum mencapai target akhir pembersihan.
- Verifikasi: 175 tes/24 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 83/83 lulus. Galeri 360 terang/gelap: satu tanggal, popup, Escape, dock dan tanpa luapan; Beranda 360/768 terang diperiksa visual. Belum semua halaman/state/tema.
- Keputusan: aturan elemen legacy mengecualikan primitive baru; blok tanggal/dock yang sudah tidak dipanggil dihapus. Galeri `/dev/komponen` hanya tersedia pada mode development, tanpa data/database.
- [x] Nol kontrol mentah di luar UI, dijaga `check:ui`.
- [x] DateField, DateNav, BottomNav dan tes regresi.
- [ ] Migrasi lengkap Card/Badge/Field/Tabs/Toast/Tooltip/Legend ke semua pemanggil.
- [ ] Semua state/halaman pada 320 px ke atas.
