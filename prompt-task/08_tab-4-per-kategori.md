# Step 8, Tab 4 Per Kategori

## Label tab

```text
4 PER KATEGORI
```

## Tujuan

Membandingkan sales, profit, dan profit margin berdasarkan kategori dan sub-category.

## Judul

```text
Sales dan Profit Berdasarkan Kategori Produk
```

## Subjudul

```text
Kategori dengan sales tinggi belum tentu paling menguntungkan, sehingga profit margin perlu dibandingkan.
```

## Data API yang digunakan

```text
GET /api/analytics/category-summary
GET /api/analytics/subcategory-summary
```

## Visual 9, Sales by Category

Chart:

```text
Horizontal bar chart
```

Y-axis:

```text
Category
```

X-axis:

```text
Sales
```

Urutan:

```text
Sales terbesar ke terkecil
```

Tooltip:

```text
Category
Sales
Profit
Profit Margin
Quantity
Orders
Customers
Average Discount
Share of Sales
```

Warna:

```text
Bar normal: Air Force Blue
Kategori sales terbesar: Sea Green atau Dark Spruce
Track: Pale Sky
```

## Visual 10, Profit Margin by Category

Chart:

```text
Horizontal bar chart
```

X-axis:

```text
Profit Margin
```

Y-axis:

```text
Category
```

Aturan warna:

```text
Margin tinggi: Sea Green
Margin sedang: Air Force Blue
Margin rendah: Tertiary
Margin negatif: Error
```

Tooltip:

```text
Category
Profit Margin
Sales
Profit
Average Discount
```

## Visual 11, Profit by Sub-Category

Chart:

```text
Horizontal bar chart
```

Tampilkan:

```text
Top 8 sub-category berdasarkan profit
Bottom 5 sub-category berdasarkan profit
```

Boleh pisahkan secara visual dengan label:

```text
Top Profit
Low / Negative Profit
```

Aturan warna:

```text
Profit positif: Sea Green atau Air Force Blue
Profit negatif: Error
Profit rendah tapi positif: Tertiary
```

Tooltip:

```text
Sub-Category
Category
Sales
Profit
Profit Margin
Quantity
Average Discount
Orders
Customers
```

## Kriteria selesai step ini

- Sales by Category tampil.
- Profit Margin by Category tampil.
- Profit by Sub-Category tampil.
- Profit negatif terlihat jelas merah.
- Tooltip lengkap.
