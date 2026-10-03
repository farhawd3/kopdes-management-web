# Paket perbaikan berikutnya — serah terima AI

Dokumen ini adalah titik mulai untuk AI lain. Baca `../AGENTS.md`, `STATUS.md`, `KEPUTUSAN.md`, `PRD.md`, dan `CHECKLIST.md` sebelum mengubah kode. Instruksi pemilik terbaru mengutamakan aplikasi kerja pribadi yang sederhana, rapi, dan konsisten di ponsel. Jangan lakukan deployment produksi. Jangan mengubah database cloud tanpa penjelasan SQL, proyek tujuan, dan persetujuan pemilik.

Baca juga `KEGIATAN-DAN-TUGAS.md` untuk memisahkan catatan kejadian dari pekerjaan yang harus dilakukan, serta `MIGRASI-SQL.md` sebelum menyentuh skema.

## Keadaan terbaru — 3 Oktober 2026

- Cabang aktif paket redesain: `codex/workspace-redesign`; selalu periksa Git kembali. Stylesheet aktif hanya `globals.css` dan `personal.css`; berkas workspace/studio/polish/responsive-finish sudah dikonsolidasikan dan dihapus pada paket sebelumnya.
- Pencarian berkonteks proyek dan navigasi bagian proyek tersedia. Relasi dokumen/kendala mengikuti tugas; keputusan mengikuti rapat terkait tugas. Jangan menambahkan bidang proyek fiktif ke domain tersebut.
- Paket lanjutan memperbaiki lint/state, dialog native target periode, preferensi rutinitas, batas tablet 768–1023/desktop 1024, nama aksesibel navigasi ciut, dan menu ponsel tertutup yang inert. Rincian hasil ada di STATUS dan CHANGELOG.
- Audit render empat ukuran serta tema terang/gelap belum dilakukan setelah paket ini karena alat browser lokal gagal membuka tab (timeout CDP). Prioritas berikutnya adalah pemeriksaan browser, fokus/Escape/modal, navigasi/sidebar, dan UAT data nyata. Tes DOM tidak menggantikan bukti visual.

## Catatan serah terima sebelumnya — 2 Oktober 2026

- Per 2 Oktober 2026 paket "Pembersihan kegiatan/tugas, kalender, dan detail visual" sudah masuk kode: menu `Jurnal Kerja` menjadi **Kegiatan**, kalender menampilkan judul lebih dulu, tanda kode diseragamkan, centang subtugas dirapikan, tombol ikon memakai sudut 12 px, animasi dialog naik dari bawah, `card-project-pill` disederhanakan, serta "Gabung rapat" muncul pada detail tugas dan kegiatan. Beranda punya tombol "Buat tugas"/"Catat kegiatan" dan bagian "Kegiatan terbaru". Audit lanjutan memperbaiki scope relasi halaman Kegiatan/Beranda, tampilan chip tautan rapat, luapan tombol di 360 px, visibilitas tombol ciutkan sidebar, dan menambah `tests/kegiatan.test.tsx`. Verifikasi: 134 tes (18 berkas), typecheck, lint, build lulus. Perubahan ini belum di-commit.
- Commit lokal `12718c7` merapikan input cepat tugas pada 360 px dan `cb547a9` menambah panduan ini. Jumlah commit lokal dapat berubah; periksa `git status -sb` dan `git log` sebelum bekerja. Jangan push ke cabang produksi karena dapat memicu deployment.
- Ada perubahan belum di-commit pada `src/app/personal.css`, `src/app/polish.css`, dan `src/components/layout/AppShell.tsx` dari pekerjaan lain. Periksa diff dan pertahankan isinya. Jangan stage seluruh direktori.
- Beranda/Hari Ini pernah menampilkan satu tugas ketika Daftar Tugas tampak kosong; reproduksi dan cari penyebab sebelum menyatakan alur data konsisten.
- SQL indeks paginasi masih ditandai belum terverifikasi pada `CHECKLIST.md`. Jangan anggap sudah terpasang.
- UI paket terakhir belum diperiksa langsung di browser pada 360/768/1024/1440 px; lakukan sebelum menandai selesai.

## Urutan paket kerja

### 1. Navigasi dan ruang layar (prioritas tertinggi)

Periksa `AppShell.tsx`, CSS `.manager-shell`, `.manager-main`, `.manager-topbar`, `.manager-sidebar`, `.bottom-nav`, dan `sidebar-collapsed` pada 360, 768, 1024, 1440 px. Saat sidebar disembunyikan, konten tidak boleh bergeser atau meninggalkan ruang kosong di kanan. Saat dibuka lagi, fokus, posisi scroll, dan lebar konten harus tetap wajar. Pilih satu aturan layout untuk tiap breakpoint; kurangi aturan `margin-left`, `width`, `max-width` yang saling menimpa dan `!important` yang berulang. Pada ponsel, rapikan navigasi mengambang agar tidak menutup tombol form, tabel, atau dialog; perhitungkan safe area. Uji klik item menu, buka/tutup sidebar, rotasi/lebar viewport, dan tidak ada horizontal overflow dokumen.

### 2. Modal ponsel

Audit `dialog.editor`, `TaskDetailDrawer`, `ManagerActionModal`, `SprintModal`, dan dialog lain. Modal harus memakai lebar yang tersedia dengan margin aman, tinggi maksimum mengikuti `dvh`, area isi bergulir, header dan aksi tetap mudah dijangkau, serta form dua kolom menjadi satu kolom pada ponsel. Target sentuh minimal 44 px. Pastikan tombol tutup terlihat, Escape dan tombol kembali bekerja, fokus kembali ke pemicu, dan modal tidak terbuka ulang setelah pindah tampilan. Jangan mengandalkan animasi posisi yang memicu loncatan. Uji keyboard dan reduced-motion.

### 3. Satu aturan status dan aksi tugas

Audit `Records.tsx`, `TodayView.tsx`, `DailyTasksView.tsx`, `ScrumBoardView.tsx`, `TaskCalendar.tsx`, `TaskTimeline.tsx`, `TaskDetailDrawer.tsx`, dan `service.ts`. Saat ini beberapa tampilan menyimpan atau mengubah status sendiri; Harian membalik `selesai` ke `rencana`, sedangkan tampilan lain memakai aksi berbeda. Rumuskan satu utilitas domain untuk perubahan `rencana`, `proses`, `selesai`, `dibatalkan` dan `completed_at`, lalu gunakan pada semua tampilan. Perilaku yang diinginkan:

| Aksi | Hasil |
|---|---|
| Mulai mengerjakan | `rencana` → `proses` |
| Tandai selesai | status aktif → `selesai`; isi tanggal selesai |
| Buka kembali | `selesai`/`dibatalkan` → `rencana` atau pilihan eksplisit `proses`; kosongkan tanggal selesai |
| Batalkan | status aktif → `dibatalkan`; jangan tampil sebagai selesai |

Tentukan satu kebijakan hapus: tampilkan aksi **Hapus** di detail tugas sebagai lokasi utama, dengan konfirmasi yang menyebut judul; daftar/papan/harian boleh mengarah ke detail atau memakai menu aksi seragam. Jangan membuat tombol hapus hanya muncul pada satu tampilan tanpa alasan. Tugas yang selesai/dibatalkan tetap dapat dicari di Riwayat. Tambahkan tes lintas tampilan untuk status, tanggal selesai, batal, buka kembali, dan hapus. Jangan menghapus data pengguna saat menguji.

### 4. Harian yang lebih ringkas

> Perbaikan pembukaan Selasa otomatis sudah masuk; bagian lain berikut perlu diverifikasi pada UI nyata.

`DailyTasksView.tsx` saat ini menginisialisasi hari ini **dan Selasa** sebagai terbuka (`i === 1`), juga grup mendatang dan terlewat. Hapus pembukaan Selasa otomatis. Buka hanya hari ini; jika ada tugas terlambat, tampilkan ringkasan tertutup dengan jumlah dan aksi buka. Hari lain tampil sebagai baris ringkas berisi tanggal dan jumlah, tanpa ruang kosong besar. Perubahan minggu/tanggal harus memperbarui hari yang relevan; jangan menyimpan tanggal historis sebagai default. Bedakan Hari Ini (`/hari-ini`) dari tampilan Harian di `/tugas` dengan teks navigasi yang jelas.

### 5. Gaya dan warna

Cari sumber glow merah pada keadaan hover/fokus/aktif tombol, terutama aturan `box-shadow`, filter, dan pseudo-element di `personal.css`, `polish.css`, `workspace.css`, `studio.css`, `globals.css`. Jangan menebak selector dari warna yang terlihat: reproduksi dan periksa computed style. Gunakan satu sistem tombol dan status: merah hanya untuk aksi berbahaya atau galat, tanpa halo mencolok; fokus keyboard tetap terlihat dengan outline yang tenang. Selaraskan jarak, radius, ikon, teks, badge, kartu, dan tab pada tiap halaman. Hormati tema gelap dan `prefers-reduced-motion`.

### 6. Detail visual tugas dan kalender dari pemilik

> Sebagian besar sudah selesai pada 2 Oktober 2026 (lihat CHANGELOG). Item yang tersisa: uji animasi buka/tutup berulang pada 360 dan 1024 px, serta pastikan drawer masuk dari sisi yang sama dengan posisi akhirnya di semua kasus.

- **Kalender menonjolkan ID:** `TaskCalendar.tsx` saat ini merender `.cal-task-code` sebelum `.cal-task-title`. Judul kegiatan harus paling mudah dibaca; kode otomatis menjadi metadata kecil atau hanya ada di detail. Jangan tampilkan UUID mentah. Audit juga `.task-code-badge`, `.card-task-code`, `.task-code-tag` agar kode konsisten, rapi, dan tidak bersambung dengan judul.
- **Checklist/subtugas:** rapikan baris di `TaskDetailDrawer.tsx` dan `DailyTasksView.tsx`: lingkar centang `.subtask-check-circle` harus jelas kosong/selesai, pusat ikon simetris, area sentuh 44 px, teks sejajar, fokus terlihat, dan status dapat dibaca tanpa warna. Cek keadaan teks panjang pada ponsel.
- **Tautan bergabung rapat dari kegiatan:** tugas sudah memiliki `meeting_id`, sedangkan rapat memiliki `meeting_url` (`schemas.ts`). Jika tugas terhubung ke rapat online/hybrid dengan URL yang sah, tampilkan tindakan **Gabung rapat** di detail tugas dan, jika relevan, kartu agenda. Ambil URL dari rapat terkait, jangan menyalin atau membuat tautan baru di tugas. Jika rapat belum bertautan, tatap muka, atau URL tidak sah, jangan tampilkan tombol kosong. Uji relasi hilang dan keamanan URL.
- **Pill proyek di papan:** `.card-project-pill` pada `ScrumBoardView.tsx` perlu hierarki dan kontras yang lebih tenang, teks panjang terpotong dengan judul penuh dapat diakses, serta gaya konsisten dengan badge proyek di detail tugas. Warna proyek boleh menjadi penanda kecil, bukan seluruh permukaan kartu.
- **Navigasi tugas sebelum/sesudah dan item setara:** periksa tombol pada detail tugas dan rangkaian terkait. Bentuk oval hanya pantas untuk chip/label singkat; tombol navigasi berisi teks/ikon harus punya ukuran, jarak, dan arah panah yang jelas. Jangan mengubah bentuk tanpa memastikan fungsi dan urutan keyboard.
- **Animasi membuka form tugas dan dialog sejenis:** tentukan arah yang mengikuti asal tindakan: dialog tengah memakai fade + scale ringan di pusat; drawer masuk dari sisi yang sama dengan posisi akhirnya. Hindari gerak diagonal/loncatan dari kiri akibat aturan posisi yang bertabrakan. Durasi pendek, tidak menggeser halaman, dan nonaktif saat reduced-motion. Uji buka/tutup berulang pada 360 dan 1024 px.

Terima bila kalender menampilkan judul sebagai informasi utama, semua kode hanya metadata yang dapat dipahami, checklist bisa disentuh/dibaca, tautan rapat hanya muncul untuk relasi valid, dan animasi/modal tidak meloncat atau menyembunyikan isi.

## Verifikasi sebelum menyatakan selesai

1. Periksa Git, pisahkan perubahan yang sudah ada, dan gunakan cabang kerja `codex/` atau worktree terpisah agar tidak mengganggu checkout aktif.
2. Reproduksi setiap bug lebih dulu, lalu ubah paket kecil. Periksa data sama pada Beranda, Hari Ini, Tugas, dan Riwayat; bedakan filter yang sah dari kegagalan memuat.
3. Jalankan `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
4. Uji UI nyata pada 360, 768, 1024, 1440 px: buka/tutup menu, modal, tugas, status, dan Harian. Catat ukuran yang benar-benar diuji. Tidak boleh ada horizontal overflow halaman; tabel/Gantt boleh bergulir dalam kontainer.
5. Perbarui `STATUS.md`, `CHECKLIST.md`, dan `../CHANGELOG.md` hanya untuk hasil yang terbukti. Jangan mengklaim siap produksi dari tes otomatis saja. Simpan perubahan per paket; jangan push cabang utama atau deploy produksi tanpa instruksi baru dari pemilik.

## Saran tambahan untuk sistem yang benar-benar menyatu

- Buat matriks hubungan entitas yang diuji, bukan sekadar tautan tampilan: proyek → milestone → tugas; tugas ↔ mitra/kontak, rapat, dokumen/kontrak, kendala; barang → opname; transaksi kas → buku kas. Untuk setiap hubungan, uji buat, ubah, buka dari kedua arah, hapus/arsip referensi, dan data yang tidak ditemukan.
- Jadikan status tugas, tanggal selesai, dan catatan aktivitas sebagai satu operasi domain. Pastikan Beranda, Hari Ini, Tugas, kalender, papan, Gantt, dan laporan membaca hasil yang sama setelah mutasi tanpa refresh manual. Periksa invalidasi cache setelah setiap perubahan.
- Audit paginasi dan filter di server. Angka ringkasan harus menyebut jika hanya mencakup 50 baris yang dimuat, atau memakai query agregat server yang benar. Jangan mengunduh semua riwayat untuk menghitung dashboard.
- Tambahkan uji alur untuk data kosong, ratusan tugas lintas bulan, relasi yang putus, jaringan gagal, sesi kedaluwarsa, dan akses ulang setelah login. Galat harus jelas dan tidak menjadi angka nol atau pesan sukses palsu.
- Audit aksesibilitas: ikon memiliki nama, status tidak hanya warna, modal mengelola fokus, dan kontrol dapat dipakai keyboard. Periksa performa di ponsel: permintaan berulang, ukuran bundle, animasi, dan scroll tabel.
- Simpan cadangan dan uji pemulihan pada data uji terpisah sebelum memakai data penting. Jangan pernah reset cloud untuk menyelesaikan bug UI.

Panduan kerja Git untuk beberapa AI ada di `GIT-KERJA-PARALEL.md`. Selesaikan masalah per paket dan buktikan alurnya; tidak ada satu tes yang dapat membuktikan klaim “100% bebas error”.
