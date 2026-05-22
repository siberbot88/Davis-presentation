# Step 11, Tab 7 Kesimpulan

## Label tab

```text
7 KESIMPULAN
```

## Tujuan

Menampilkan ringkasan otomatis dari data sebagai tempat awal untuk insight dan rekomendasi. Narasi final akan diperbaiki setelah semua grafik selesai.

## Judul

```text
Ringkasan Temuan Utama
```

## Subjudul

```text
Ringkasan ini disiapkan sebagai dasar untuk tahap storytelling berikutnya.
```

## Data API yang digunakan

```text
GET /api/analytics/summary
GET /api/analytics/category-summary
GET /api/analytics/subcategory-summary
GET /api/analytics/region-summary
GET /api/analytics/segment-summary
GET /api/analytics/top-customers?limit=10
```

## Visual 18, Insight Cards

Buat 6 insight cards:

```text
1. Total Sales
2. Total Profit
3. Region Sales Terbesar
4. Category Sales Terbesar
5. Sub-Category Profit Terendah
6. Customer Sales Terbesar
```

Isi tiap card:

```text
Label
Angka utama
Keterangan singkat
```

Contoh format:

```text
Region Sales Terbesar
West
Sales $725K, kontribusi 31.6% dari total sales
```

Warna:

```text
Positive card: Sea Green
Warning card: Tertiary
Negative card: Error
Neutral card: Air Force Blue
Background: Surface Container Low
```

## Visual 19, Recommendation Box

Buat 3 kotak rekomendasi sementara:

```text
Pertahankan area dengan sales dan profit kuat.
Evaluasi area dengan sales tinggi tetapi profit rendah.
Analisis pengaruh discount terhadap profit pada sub-category bermasalah.
```

Catatan:

Teks ini masih placeholder. Jangan terlalu mengunci narasi karena storytelling final akan dipandu setelah visual selesai.

## Kriteria selesai step ini

- Insight cards tampil.
- Rekomendasi placeholder tampil.
- Semua angka berasal dari API.
- Tidak ada hardcode hasil analisis.
