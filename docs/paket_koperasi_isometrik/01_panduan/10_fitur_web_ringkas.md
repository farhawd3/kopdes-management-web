# 10 · Fitur Web (rujukan dari brief)

Web = ruang kerja pribadi manajer koperasi, BUKAN POS/akuntansi lengkap.

1. **Beranda** — tugas aktif/terlambat, kegiatan terbaru, catatan, grafik status, hal perlu perhatian.
2. **Proyek** — tujuan, PIC, prioritas, tanggal, milestone, dokumen, keputusan, kendala, tugas. Proyek selesai ≠ tugas otomatis selesai.
3. **Tugas** — status, prioritas, tenggat, PIC, subtugas, prasyarat, bukti, pengulangan; tampilan daftar/papan/kalender/Hari Ini/Gantt.
4. **Gantt/Linimasa** — hari/minggu/bulan, milestone, konflik prasyarat sederhana, layar penuh; belum ada baseline/jalur kritis.
5. **Kegiatan/Jurnal** — kegiatan lapangan terhubung ke gerai, mitra, rapat; bisa menghasilkan tugas tindak lanjut.
6. **Rapat & Notulen** — agenda, jenis online/tatap muka/hybrid, tautan, notulen, keputusan, tindak lanjut; ekspor `.ics` (tanpa Zoom/Meet otomatis & undangan).
7. **Gerai/Kesiapan** — status, dimensi kesiapan, progres, tautan, aksi lanjutan.
8. **Pencatatan** — Anggota, Buku Kas (bukan laporan laba rugi), Barang, Stok Opname (snapshot, tidak mengubah stok otomatis).
9. **Dokumen, Risiko, Keputusan, Laporan** — catatan pendukung & relasi antar-catatan.
10. **Pengaturan** — profil, tema terang/gelap, PIN, cadangan JSON, preferensi lokal.
11. **Suplier (baru, lihat 05).**

Relasi penting: Proyek↔Tugas↔Kegiatan↔Rapat↔Pencatatan; Gantt & kalender memakai data tugas yang sama;
database memakai model hub records (divalidasi server); UI tidak boleh menampilkan angka palsu bila modul/DB bermasalah.
