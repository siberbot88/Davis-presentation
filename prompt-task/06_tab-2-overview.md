# Step 6, Tab 2 Overview

## Label tab

```text
2 OVERVIEW
```

## Tujuan

Menampilkan konteks historis sales dan profit dari waktu ke waktu.

## Judul

```text
Overview Historis Sales dan Profit
```

## Subjudul

```text
Melihat baseline performa sebelum masuk ke breakdown kategori, region, dan customer.
```

## Data API yang digunakan

```text
GET /api/analytics/overview-by-year
GET /api/analytics/overview-by-quarter
```

## Visual 3, Sales by Year

Chart:

```text
Bar chart
```

X-axis:

```text
Year
```

Y-axis:

```text
Sales
```

Tooltip:

```text
Year
Sales
Profit
Profit Margin
Orders
Customers
Quantity
Average Discount
Sales Growth vs Previous Year
```

Warna:

```text
Bar normal: Air Force Blue
Tahun tertinggi: Sea Green
Tahun terendah: Cool Steel atau Error jika ingin ditandai sebagai perhatian
```

## Visual 4, Profit by Year

Chart:

```text
Bar chart
```

X-axis:

```text
Year
```

Y-axis:

```text
Profit
```

Aturan:

```text
Profit positif: Sea Green
Profit negatif: Error
Zero line wajib ada
```

Tooltip:

```text
Year
Profit
Sales
Profit Margin
Profit Growth vs Previous Year
```

## Visual 5, Table Overview

Gunakan data quarter atau year.

Jika data quarter tidak terlalu banyak, tampilkan quarter. Jika terlalu panjang, tampilkan year.

Kolom:

```text
Year / Quarter
Sales
Profit
Profit Margin
Orders
Customers
Quantity
Avg Discount
Growth Sales
```

Highlight:

```text
Growth positif: Sea Green
Growth negatif: Error
Discount tinggi: Tertiary
```

## Kriteria selesai step ini

- Sales by Year tampil.
- Profit by Year tampil.
- Tabel overview tampil.
- Tooltip semua chart aktif.
- Growth dihitung dari API, bukan hardcode.
