# 13 · Prompt Lengkap (siap tempel)

Lampirkan bersama prompt: seluruh folder `01_panduan`, `02_referensi_gambar/asli`, `03_token_desain`, `05_demo`.

## PROMPT 1 — Pengembang (rombak total web)
Peran: kamu pengembang front-end senior sekaligus desainer UI.
Tujuan: rombak total tampilan web manajer koperasi agar **semirip mungkin dengan UI video WareTrack** (lihat
`asli/video_*.png` dan `ui/11_mockup_ui_mirip_video.png`), tetapi isinya data koperasi.
Aturan:
1. Baca `00_BACA_DULU.md` lalu semua panduan 01–13 berurutan. Panduan ini sumber kebenaran; abaikan panduan lama di luar folder ini.
2. Pertahankan SEMUA fitur & data yang ada (Beranda, Proyek, Tugas+Gantt, Kegiatan, Rapat, Gerai, Pencatatan, Dokumen/Risiko/Keputusan/Laporan, Pengaturan). Tambah menu Suplier (panduan 05). Jangan hapus log & pengetahuan AI lama.
3. UI: dunia isometrik layar penuh + kartu putih melayang persis susunan di panduan 11 (bilah atas, 3 KPI, pil zoom, panel detail kanan, kartu alur bawah-kiri, kartu daftar bawah-kanan, label objek gelap, pin). Tambahkan rel ikon navigasi pil di kiri.
4. Dua scene: Luar (koperasi, 7 slot gerai terkunci/terbuka sesuai data, gudang, kendaraan mitra berbeda-beda) dan Kantor (meja per modul). Klik koperasi → kantor; Esc/Kembali → luar.
5. Karakter: gunakan `05_demo/char.js` (`drawChar`) dan mesin keadaan pada demo: jalan, duduk, kerja, berpikir, lambai; bubble pikiran sesekali. Pengguna punya karakter Manajer yang dapat dikustomisasi di Pengaturan.
6. Pakai token `03_token_desain/tokens.css`. Halus: transisi 180–520 ms, kamera bergeser lembut, tanpa gerak mendadak. Dukung `prefers-reduced-motion`, keyboard (Tab/Enter/Esc), tema terang/gelap, layar HP (bottom sheet).
7. Jangan menampilkan angka palsu: data kosong → keadaan kosong ramah.
8. Cuaca & waktu: implementasikan lapisan pencahayaan sesuai `14_cuaca_dan_pencahayaan.md` (langit, bayangan, lampu, tint, awan, hujan, kabut, petir) dengan token `lighting-weather-tokens.json`; demo acuan `05_demo/cuaca_waktu_demo.html`. Waktu dari jam perangkat; cuaca manual atau Open-Meteo opsional; sediakan mode kualitas Rendah/Sedang/Tinggi dan reduced-motion.
9. Kerjakan bertahap sesuai `08_rencana_implementasi.md`; setelah tiap tahap laporkan singkat apa yang selesai & uji sesuai checklist. Rapikan folder panduan sesuai `09`.
Keluaran: kode lengkap per berkas, daftar berkas yang berubah, dan catatan hal yang belum bisa dipenuhi.

## PROMPT 2 — Pembuat gambar: UI & dunia (per gambar)
"Isometric 3D illustration in the exact style of the attached WareTrack video frames: very light white-lavender world,
royal-blue accents (#2F5BEA), rounded toy-like matte objects, soft blue shadows, round pastel trees, light from top-left,
30° isometric angle, clean and uncluttered, no photorealism, no black. Subject: <ISI dari panduan 07 bagian A>.
Keep the same camera angle and scale across all images. Transparent or flat #EEF2FF background."

## PROMPT 3 — Pembuat gambar: karakter pengguna
"Chibi isometric office character, minimal style: large round head, capsule body, tube arms and legs, dot eyes, soft pink blush,
flat matte pastel colors, soft blue shadow under feet, plain #EEF2FF background. Character: cooperative manager, royal-blue blazer
#2F5BEA with white collar, white ID card on a blue lanyard, navy trousers, short dark hair. Provide a sprite sheet on a grid:
row 1 walking toward bottom-right, 4 frames; row 2 walking toward top-right (back view), 4 frames; row 3 sitting side view,
sitting back view typing (2 frames), thinking with hand on chin, waving; row 4 five role variants (hijab admin, glasses treasurer,
yellow helmet warehouse, pink cap courier, field staff). Same proportions in every frame, feet on the same baseline, 68×90 px cells."

## PROMPT 3B — Pembuat gambar: variasi waktu/cuaca
"Same isometric pastel cooperative town as the attached image, identical layout. Change only lighting to: <pagi | siang | sore emas | senja | malam | hujan lebat | badai malam | kabut>. Pastel, soft, no pure black, rounded matte objects."

## PROMPT 4 — Pemeriksa kemiripan
"Bandingkan hasil dengan frame video di `asli/`. Beri daftar singkat perbedaan pada: warna, bayangan, radius kartu,
tipografi, jarak, perilaku klik. Beri skor kemiripan 1–10 per area dan perbaiki yang di bawah 8."
