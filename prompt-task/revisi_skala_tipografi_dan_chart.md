# revisi_skala_tipografi_dan_chart.md

## Tujuan Revisi

Dashboard sudah berada di arah yang benar, tetapi skala tipografi, card, dan elemen antarmuka masih terasa terlalu besar. Akibatnya, tampilan terlihat padat, viewport cepat habis, dan fokus visual justru bergeser dari chart ke teks.

Revisi ini bertujuan untuk:

1. Mengecilkan skala teks dan elemen UI secara keseluruhan.
2. Mempertahankan chart sebagai fokus utama.
3. Membuat dashboard terasa lebih ringan, profesional, dan efisien.
4. Menjaga keterbacaan di desktop, tablet, dan mobile.

---

## Arah Revisi Utama

Gunakan prinsip berikut:

```text
Teks lebih ringkas.
UI lebih ringan.
Chart lebih dominan.
Whitespace lebih efisien.
Angka penting tetap jelas.
```

Kesimpulan desain yang diinginkan:

```text
Jangan membesarkan semua elemen.
Cukup chart yang sedikit lebih besar.
Teks, label, tab, card, dan insight dibuat lebih proporsional.
```

---

## Masalah yang Harus Diperbaiki

### Kondisi saat ini

Beberapa elemen masih terlalu besar, seperti:

- tab navigasi di bagian atas
- angka KPI utama
- judul section
- teks pada card insight samping
- padding card yang terlalu longgar
- tinggi beberapa card yang terlalu besar dibanding isi

Dampaknya:

- layar cepat penuh
- user harus scroll lebih banyak
- chart tidak mendapat ruang yang cukup dominan
- dashboard terasa berat secara visual

---

## Keputusan Desain Baru

### Prinsip inti

```text
Kecilkan teks dan UI sekitar 10% sampai 20%.
Pertahankan chart sebagai elemen terbesar pada setiap slide.
```

### Prioritas visual baru

Urutan hierarki visual yang diinginkan:

```text
1. Chart utama
2. KPI penting
3. Judul naratif slide
4. Insight note / executive note
5. Supporting card kecil
6. Tab / label / metadata
```

---

## Revisi Tipografi

### 1. Judul utama slide

Saat ini terlalu dominan jika dibanding isi.

Gunakan skala baru:

```text
Desktop : 32px sampai 40px
Tablet  : 28px sampai 34px
Mobile  : 24px sampai 28px
```

Aturan:

```text
- Bold, tapi tidak oversized.
- Maksimal 2 sampai 3 baris.
- Line-height rapat, sekitar 1.05 sampai 1.15.
```

---

### 2. Judul section / judul chart card

Gunakan:

```text
Desktop : 18px sampai 24px
Tablet  : 17px sampai 22px
Mobile  : 16px sampai 20px
```

Aturan:

```text
- Cukup tegas, tetapi tidak terlalu besar.
- Lebih kecil dari sekarang.
- Fokus pada keterbacaan.
```

---

### 3. Tab navigasi

Saat ini tab terlihat terlalu besar dan memakan tinggi layout.

Gunakan skala baru:

```text
Font size : 12px sampai 14px
Height    : lebih pendek
Padding   : 10px 14px atau 10px 16px
```

Aturan:

```text
- Huruf kapital boleh dipakai, tetapi kecil.
- Letter spacing secukupnya.
- Active state tetap jelas, namun tidak terlalu tebal.
```

---

### 4. KPI angka utama

Angka KPI saat ini terlalu besar, sehingga terasa mendominasi sebelum chart dilihat.

Gunakan skala baru:

```text
Desktop : 48px sampai 60px
Tablet  : 40px sampai 50px
Mobile  : 32px sampai 40px
```

Aturan:

```text
- Masih dominan, tetapi lebih terkendali.
- Label card dibuat kecil.
- Secondary text di bawah angka harus lebih kecil dan ringan.
```

---

### 5. Insight card samping

Card insight seperti "Profitabilitas", "Margin Q3", dan "Bulan Tertinggi" perlu diperkecil.

Gunakan:

```text
Title kecil : 12px sampai 13px
Headline    : 36px sampai 52px tergantung isi
Body text   : 14px sampai 16px
```

Aturan:

```text
- Jangan terlalu banyak ruang kosong vertikal.
- Jangan gunakan headline terlalu besar jika isinya hanya 1 kata.
- Card harus terlihat sebagai supporting insight, bukan elemen utama mengalahkan chart.
```

---

### 6. Body text dan note

Gunakan skala:

```text
Desktop : 14px sampai 16px
Tablet  : 14px sampai 15px
Mobile  : 13px sampai 15px
```

Aturan:

```text
- Singkat.
- Maksimal 1 sampai 2 kalimat.
- Fokus ke angka dan implikasi.
```

---

## Revisi Layout dan Proporsi

### Prinsip utama layout

```text
Area chart harus terlihat lebih besar daripada area teks.
```

### Untuk layout section seperti contoh screenshot

#### Sebelum

```text
Kiri  : chart besar
Kanan : 3 card insight yang juga terasa besar
```

#### Sesudah

Gunakan proporsi seperti ini:

```text
Desktop:
- Chart area   : 68% sampai 72%
- Insight side : 28% sampai 32%
```

Card insight di kanan harus:

```text
- Lebih pendek tingginya
- Padding lebih rapat
- Headline lebih kecil
- Tidak terlalu mendominasi
```

---

## Revisi Ukuran Card

### KPI cards atas

Kurangi tinggi card.

Gunakan:

```text
Min-height desktop : 140px sampai 165px
Tablet             : 130px sampai 150px
Mobile             : auto, tetapi tetap compact
```

Kurangi:

```text
- padding vertikal
- ukuran angka utama
- ukuran label sekunder
```

### Chart card utama

Justru boleh sedikit dibesarkan.

Gunakan:

```text
Min-height desktop : 460px sampai 560px
Tablet             : 400px sampai 500px
Mobile             : 320px sampai 420px
```

Aturan:

```text
- Tambah ruang untuk chart plotting area
- Kurangi ruang header card yang terlalu tinggi
- Prioritaskan area visual chart, bukan area judul
```

### Side insight cards

Gunakan:

```text
Min-height desktop : 140px sampai 180px
Tablet             : 130px sampai 170px
Mobile             : auto
```

Aturan:

```text
- Card terasa kompak
- Headline tetap jelas
- Teks deskriptif singkat
```

---

## Revisi Padding dan Spacing

Kurangi spacing keseluruhan agar layout lebih efisien.

### Section padding

```text
Desktop : 20px sampai 28px
Tablet  : 18px sampai 24px
Mobile  : 14px sampai 18px
```

### Card padding

```text
Desktop : 18px sampai 22px
Tablet  : 16px sampai 20px
Mobile  : 14px sampai 16px
```

### Grid gap

```text
Desktop : 16px sampai 20px
Tablet  : 14px sampai 18px
Mobile  : 12px sampai 16px
```

Aturan:

```text
- Jangan terlalu lega.
- Jangan terlalu sesak.
- Fokus pada efisiensi viewport.
```

---

## Revisi Khusus untuk Chart

Karena user lebih ingin chart yang agak besar, maka terapkan aturan berikut.

### 1. Plotting area lebih besar

Pastikan area dalam chart mendapat porsi lebih luas.

Lakukan:

```text
- Kurangi padding internal chart wrapper
- Kurangi tinggi header card chart
- Tambah tinggi SVG / plotting container
```

### 2. Teks chart tetap proporsional

Gunakan skala:

```text
Chart title      : 18px sampai 22px
Axis label       : 12px sampai 13px
Tick label       : 11px sampai 12px
Data label       : 11px sampai 13px
Tooltip title    : 13px sampai 14px
Tooltip body     : 12px sampai 13px
```

### 3. Chart readability

Aturan:

```text
- Bar, line, point, dan label harus tetap jelas
- Data label tetap tampil jika tidak membuat chart sesak
- Tooltip informatif tetap dipertahankan
- Legend diperkecil jika perlu
```

### 4. Fokus visual chart

Gunakan:

```text
- Chart title lebih ringkas
- Annotation singkat
- Teks note tidak mengurangi ruang chart
```

---

## Responsive Rules

### Desktop

Target:

```text
Dashboard terasa luas, chart dominan, KPI ringkas.
```

Aturan:

```text
- 4 KPI cards tetap 1 baris jika lebar cukup
- Chart utama dominan di kiri
- Side insight cards lebih kecil dan kompak
- Tab navigasi lebih pendek
```

### Tablet

Target:

```text
Layout masih lega, tapi tidak padat.
```

Aturan:

```text
- KPI cards menjadi 2 kolom
- Chart utama tetap full width atau 2 tingkat
- Side insight bisa pindah ke bawah chart jika ruang sempit
- Font diskalakan turun
```

### Mobile

Target:

```text
Mudah dibaca, tidak sesak, chart tetap utama.
```

Aturan:

```text
- Semua card stack vertikal
- Tab navigasi scroll horizontal
- KPI 1 kolom
- Chart full width
- Insight cards di bawah chart
- Font headline dan KPI diperkecil secara signifikan
```

---

## Instruksi Praktis untuk Codex

Terapkan revisi pada desain dashboard yang sudah ada.

### Tugas utama

```text
1. Kecilkan skala tipografi global sekitar 10% sampai 20%.
2. Kecilkan tinggi tab navigasi, KPI card, dan insight card.
3. Kurangi ukuran headline insight yang terlalu besar.
4. Kurangi padding vertikal yang membuat layout terlalu tinggi.
5. Besarkan area chart, bukan semua elemen.
6. Pastikan chart card menjadi fokus utama setiap slide.
7. Pertahankan keterbacaan angka pada chart dan tooltip.
8. Pastikan versi tablet dan mobile tetap nyaman.
9. Optimalkan viewport agar lebih banyak informasi terlihat tanpa scroll berlebihan.
```

### Prinsip pengambilan keputusan desain

Jika harus memilih, prioritaskan:

```text
chart readability > decorative scale
content density yang rapi > whitespace berlebihan
professional clarity > visual drama
```

---

## Hasil Akhir yang Diinginkan

Dashboard final harus terasa seperti ini:

```text
Lebih ringan
Lebih proporsional
Lebih profesional
Lebih fokus ke chart
Lebih efisien di layar
Tetap nyaman dibaca di desktop, tablet, dan mobile
```

---

## Checklist Final

Pastikan hasil akhir memenuhi semua poin ini:

```text
Ukuran teks tidak lagi terasa terlalu besar.
Tab lebih ringkas.
KPI card lebih compact.
Insight card kanan lebih kecil dan efisien.
Chart menjadi elemen paling dominan.
Chart area lebih tinggi dan lebih mudah dibaca.
Layout desktop lebih lega.
Layout tablet tetap rapi.
Layout mobile tetap usable.
Scroll berkurang dibanding versi sebelumnya.
```
