# Checklist produk aktif

## Redesain ruang kerja 3 Oktober
- [x] Perbarui token visual, sidebar arang, radius/kontrol, kartu, tab, dan hierarki judul bersama.
- [x] Pencarian berscope dengan konteks proyek, tautan sumber, dan batas data dimuat yang jelas.
- [x] Navigasi bagian detail proyek dan relasi dokumen/keputusan/kendala melalui tugas, disertai tes isolasi antarproyek.
- [ ] Audit visual ulang seluruh modul pada 360/768/1024/1440 px, terang dan gelap setelah paket ini.
- [ ] Selesaikan 9 galat lint lama dan periksa ulang lint seluruh repo.
- [ ] UAT interaksi pencarian/proyek dengan data nyata serta audit rinci desain setiap modul.

## Perapian 2 Oktober
- [x] Hilangkan dua blok `!important` duplikat (Section 6.1 & 6.5) yang menimpa rail tablet dan memicu overflow di 768px; beri `max-width:100%` pada skeleton/nav cards; naikkan tombol aksi ke 44px untuk mobile.
- [x] Kurangi aturan `margin-left`/`width` yang saling menimpa pada breakpoint: hapus blok media 768–1100 duplikat (sidebar 205px) yang tertimpa blok tablet-rail; satu breakpoint kini satu aturan untuk topbar/main/sidebar.
- [x] Desain ulang tabel tugas (task-table-wrap): padding flush, quick check circle, pill status dengan dot warna, avatar PIC, footer status bar.
- [x] Eliminasi menu redundant: pelabelan unik dan pembedaan peran Hari Ini (kokpit harian), Daftar Tugas (backlog master), Perlu Perhatian (audit anomali), Linimasa Gantt, dan Ringkasan Buku.
- [x] Migrasi SQL 7: validasi ketat referensi dokumen (document_id) pada tabel tugas (hub_check_relations) dan indeks pencarian dokumen.
- [x] Detail tugas tidak kembali terbuka setelah ditutup dan tampilan horizontal diganti.
- [x] Anotasi tugas: riwayat, kode otomatis, dokumen/kontrak, label daftar, status, dan tombol tutup dirapikan.
- [x] Anotasi Beranda/Hari Ini: tindak lanjut, grafik kosong, warna prioritas, input cepat, dan ikon selesai dirapikan.
- [x] Login PIN lokal kembali berhasil setelah server dapat menjangkau Supabase; pesan galat koneksi dibedakan dari migrasi hilang.
- [x] Tombol Tugas baru tidak menimpa pilihan rentang pada ponsel; tabel tugas bergulir di dalam kontainernya.
- [x] Form tugas mengunci milestone sebelum proyek dipilih dan membatasi pilihan ke proyek itu.
- [x] Tugas dapat menautkan Mitra atau kontak, Rapat, dan Kendala tanpa kode tugas wajib.
- [x] Input jam/batas pengulangan terkunci saat tidak berulang; pembuatan tugas berikutnya menghormati batas tanggal.
- [x] Form opname meminta barang terlebih dulu; stok buku menjadi salinan terkunci dan hasil hitung baru aktif setelah barang dipilih.
- [x] Kalender ponsel diringkas dan Gantt ponsel menyediakan daftar tanggal serta bagan pilihan.
- [ ] Pemeriksaan visual dan interaksi nyata di ponsel/tablet setelah masuk dengan PIN.
- [x] Panduan onboarding berbasis rundown, termasuk proyek, milestone, tugas, rapat, dan kontak.
- [x] Label Mitra & kontak serta pilihan Agrinas tanpa identitas palsu.
- [x] Daftar tugas dan catatan per 50 baris, riwayat selesai, cache bacaan, dan penanda ringkasan parsial.
- [ ] Migrasi indeks paginasi `20261002000006_paged_records.sql` dijalankan di proyek Supabase saat ini.
- [ ] Pemeriksaan visual setelah login pada 360, 768, 1024, dan 1440 px di perangkat/browse nyata.

## Reset database kosong
- [x] Berkas reset migrasi 1–5 dan panduan manual tersedia.
- [x] Reset diuji lokal; menolak penghapusan jika catatan atau laporan sudah ada.
- [x] SQL dijalankan pemilik di proyek `mqycnhebhzqaziouipet` (konfirmasi pemilik).
- [ ] PIN dibuat ulang dan penyimpanan catatan diverifikasi setelah reset cloud.

## Tersedia
- [x] Proyek fleksibel tanpa patokan durasi program.
- [x] Status, prioritas, pencarian, filter dan properti proyek.
- [x] Catatan proyek terformat: judul, daftar, checklist, kutipan, pratinjau, simpan.
- [x] Tugas daftar/papan/kalender/Gantt, PIC, subtugas, prasyarat, pengulangan.
- [x] Gantt dengan rentang/skala/proyek, geser jadwal, resize tenggat, tinjau/simpan, navigasi periode.
- [x] Alternatif pengaturan tanggal dengan keyboard dan formulir ponsel.
- [x] Peringatan konflik prasyarat, milestone, hari ini, potongan rentang yang benar.
- [x] Beranda berdasarkan tugas/proyek aktual dan riwayat penyelesaian delapan minggu bergulir.
- [x] Modul koordinasi manajer, snapshot laporan, backup/restore, keamanan PIN dan database.
- [x] Penyegaran tema, lapisan kartu, form, tabel, papan, dan navigasi.
- [x] Alur laporan eksekutif lengkap: simpan sebagai draf, terbitkan resmi, filter arsip, dan tombol hapus draf.
- [x] Pusat Aksi Cepat Manajer (Superapp Action Center) dengan pintasan keyboard 1-9 untuk seluruh operasional dan perencanaan.
- [x] Dasbor beranda multifungsi: pintasan aksi cepat harian, peringatan otomatis stok persediaan kritis, dan rekapitulasi data riil.
- [x] Ruang kerja editorial: 5 palet tema seimbang (Lime & Ink, Sage, Lavender, Peach, Sky) dan pratinjau komponen langsung di Pengaturan.
- [x] Navigasi sidebar terstruktur: favorit sematan dan grup menu kolapsibel; menu Terakhir dihapus agar pilihan tidak berulang.
- [x] Karakter visual tiap modul: proyek terhubung, dokumen dengan masa berlaku berkode warna, risiko 3-level, dan alur terstruktur rapat.

## Penerimaan berikutnya
- [ ] UAT dengan data nyata selama beberapa hari.
- [ ] Pengujian perangkat fisik Android/iOS/Safari dan audit aksesibilitas lengkap.
- [ ] Pemulihan cadangan nyata di lingkungan uji.
- [ ] Deployment produksi Vercel berhasil dan smoke test online.

## Pengembangan terpisah
- [ ] Baseline/jalur kritis dan penjadwalan otomatis dependensi.
- [ ] Editor blok drag-and-drop dan kolaborasi real-time.
- [ ] PWA/offline, CSV, unggah berkas, tautan laporan publik.

Hasil tes dan pemeriksaan viewport di [STATUS](STATUS.md). Rencana historis berada di `arsip/`, tidak dipakai sebagai template runtime.

## Paket studio dan pencatatan
- [x] Navigasi kelompok, area Kerja/Catat, pencarian halaman, desain studio terang/gelap.
- [x] Kalender tugas dan pemilih tanggal, dropdown mengikuti tema, teks UI ringkas.
- [x] Implementasi anggota, buku kas, barang, opname, filter dan CSV dengan gerbang aktivasi database.
- [x] Rapat online/hybrid, tautan bergabung, durasi dan ekspor agenda ICS.
- [x] Validasi dan migrasi domain pencatatan disiapkan.
- [x] Pemilik mengonfirmasi pemasangan migrasi kedua; aktivasi terverifikasi melalui aplikasi lokal.
- [ ] Uji simpan data pencatatan nyata setelah aktivasi.

## Referensi HP pribadi
- [x] Shell seluruh rute, navigasi mengambang HP dan menu semua halaman.
- [x] Beranda pribadi dengan angka aktual, filter tugas, rapat berikutnya, dan akses buku koperasi.
- [x] Kalender lingkaran HP serta agenda bulan/minggu/hari.
- [x] Papan status sah, progres dari subtugas, dan detail tanpa pengikut tiruan.

## Penyempurnaan Tampilan & Pembersihan Desain
- [x] Mengganti tampilan flat dengan estetika clean design dan soft elevation shadows.
- [x] Palet warna pastel terkurasi (Lime awal, Peach terakota, Lavender, Sage, Sky) dengan pemilih gaya interaktif di Pengaturan.
- [x] Kalender interaktif berdimensi: sel terpilih memiliki latar pastel, border aksen, dan soft glow saat diklik.
- [x] Icon tombol "+" kalender dibuat simetris presisi sejajar dengan nomor tanggal (28px x 28px lingkaran).
- [x] Tombol tambah tugas pada agenda kalender diselaraskan dengan ikon Plus dan typography rapi.
- [x] Seluruh modal pop-up dan drawer menutup saat mengklik area backdrop transparan atau menekan tombol Escape.
- [x] Penataan jarak (spacing), border, dan komposisi warna kontras tinggi pada papan scrum, kartu tugas, dan kartu sprint.
- [x] Mengganti pengulangan teks "+ Tugas" pada kalender dengan alternatif mini-plus elegan dan tombol agenda.
- [x] Menyatukan pemilih tanggal kalender tanpa dobel klik / duplikasi indikator browser di DateField.
- [x] Merapikan skeleton loading menjadi wireframe shimmer yang selaras dengan halaman kerja.
- [x] Mendesain ulang menu samping (sidebar) dengan ikon representatif per modul, emblem brand, dan profil manajer.
- [x] Membersihkan kalimat AI slop, istilah asing janggal, dan slogan motivasi fiktif.
- [x] Perbaikan persentase ProgressRing di Beranda tepat di tengah dan persentase proyek rapi dalam pill badge.
- [x] Perapian tampilan Tugas Harian (DailyTasksView) dengan kartu harian collapsible dan konektor pohon subtugas.
- [x] Keterbacaan nomor tanggal "Hari ini" pada kalender tugas dengan kontras tajam.
- [x] Penutupan otomatis menu pop-up/dropdown (Lainnya, Opsi) saat mengklik luar area transparan atau menekan Escape.
- [x] Penyelarasan grid dan interaksi Pemilih Rentang Tanggal (DateRangePicker) & Kalender Popover (DateField).
- [x] Pembuatan komponen TodayView untuk merapikan halaman /hari-ini (fokus tugas hari ini, rapat, terlambat, dan menyusul 7 hari).
- [x] Desain ulang pop-up tambah tugas/editor modal dengan header berikon, tombol tutup X, dan input teratur berjarak rapi.
- [x] Perapihan papan scrum (ScrumBoardView): pembersihan latar lavender kolom kedua, dot warna status, placeholder kolom kosong, dan lencana prioritas/tenggat.
- [x] Perapihan tugas harian (DailyTasksView): penanganan tugas terlewat/sebelum pekan ini dan navigasi keyboard.
- [x] Perbaikan aksesibilitas kartu TodayView dan SprintCard (menghilangkan tombol bersarang dan menambah kontrol keyboard).


- [x] Audit kode: pengurutan tugas, pembaruan detail Hari Ini, galat aksi harian, dan perhitungan grafik.
- [x] Verifikasi audit terbaru: 108 tes, lint, typecheck, dan build produksi.
- [ ] Periksa ulang UI terbaru pada 360/768/1024/1440 px setelah login browser.
- [x] Grafik dashboard dan daftar tugas terhubung melalui proyek, status, serta tanggal penyelesaian.
- [x] Perbaiki kartu ringkasan HP dan kartu pencatatan/diagram tablet; periksa dashboard pada empat ukuran target.
