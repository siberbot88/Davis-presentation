# Step 7, Tab 3 Tren Sales

## Label tab

```text
3 TREN SALES
```

## Tujuan

Menampilkan pola bulanan sales dan profit, termasuk bulan tertinggi, bulan terendah, dan hubungan sales dengan profit.

## Judul

```text
Tren Bulanan Sales dan Profit
```

## Subjudul

```text
Pola waktu membantu melihat puncak penjualan, penurunan, serta kualitas profit di balik sales.
```

## Data API yang digunakan

```text
GET /api/analytics/sales-by-month
```

## Visual 6, Monthly Sales Line Chart

Chart:

```text
Line chart dengan dot
```

X-axis:

```text
Month-Year
```

Y-axis:

```text
Sales
```

Highlight:

```text
Titik sales tertinggi: Sea Green
Titik sales terendah: Error
Titik profit negatif: Error
Titik lain: Primary atau Air Force Blue
```

Tooltip:

```text
Month
Sales
Profit
Orders
Customers
Quantity
Profit Margin
Average Discount
```

## Visual 7, Monthly Profit Bar Chart

Chart:

```text
Bar chart profit per bulan
```

Aturan:

```text
Profit positif: Sea Green
Profit negatif: Error
Zero line wajib ada
```

Tooltip:

```text
Month
Profit
Sales
Profit Margin
Average Discount
Orders
```

## Visual 8, Sales vs Profit Scatter

Chart:

```text
Scatter plot
```

X-axis:

```text
Sales
```

Y-axis:

```text
Profit
```

Circle size:

```text
Orders
```

Color:

```text
Profit margin positif: Sea Green / Air Force Blue
Profit margin negatif: Error
Profit margin rendah: Tertiary
```

Tooltip:

```text
Month
Sales
Profit
Profit Margin
Orders
Average Discount
```

## Kriteria selesai step ini

- Line chart monthly sales tampil.
- Bar chart monthly profit tampil.
- Scatter sales vs profit tampil.
- Tooltip informatif.
- Highlight peak dan trough terlihat.
