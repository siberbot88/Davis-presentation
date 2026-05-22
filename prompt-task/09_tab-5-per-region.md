# Step 9, Tab 5 Per Region

## Label tab

```text
5 PER REGION
```

## Tujuan

Membandingkan performa region berdasarkan sales, profit, margin, order, customer, dan kategori teratas.

## Judul

```text
Performa Sales dan Profit per Region
```

## Subjudul

```text
Region dibandingkan untuk melihat pasar utama, kontribusi profit, dan area yang perlu diperhatikan.
```

## Data API yang digunakan

```text
GET /api/analytics/region-summary
```

## Visual 12, Sales by Region

Chart:

```text
Horizontal bar chart
```

Y-axis:

```text
Region
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
Region
Sales
Profit
Profit Margin
Orders
Customers
Quantity
Average Discount
Share of Sales
Top Category
```

Warna:

```text
Region sales terbesar: Sea Green atau Dark Spruce
Region lain: Air Force Blue
Track: Pale Sky
```

## Visual 13, Profit by Region

Chart:

```text
Bar chart profit per region
```

Aturan warna:

```text
Profit positif: Sea Green
Profit negatif: Error
Profit rendah: Tertiary
```

Tooltip:

```text
Region
Profit
Sales
Profit Margin
Orders
Average Discount
Top Category
```

## Visual 14, Region Summary Table

Kolom:

```text
Region
Sales
Profit
Profit Margin
Orders
Customers
Top Category by Sales
Average Discount
```

Highlight:

```text
Profit margin tertinggi: hijau halus
Profit margin terendah: kuning atau merah halus jika negatif
Discount tinggi: kuning
```

## Kriteria selesai step ini

- Sales by Region tampil.
- Profit by Region tampil.
- Region Summary Table tampil.
- Tooltip lengkap.
- Warna semantik sudah benar.
