# Step 5, Tab 1 Pembuka

## Label tab

```text
1 PEMBUKA
```

## Tujuan

Membuat halaman pembuka dashboard dengan KPI utama dan ringkasan sales bulanan.

## Judul

```text
Dashboard Kinerja Penjualan Superstore
```

## Subjudul

```text
Analisis Sales, Profit, Category, Region, dan Customer dari database Superstore
```

## Data API yang digunakan

```text
GET /api/analytics/summary
GET /api/analytics/sales-by-month
```

## Visual 1, Hero KPI Cards

Buat 4 KPI card:

```text
Total Sales
Total Profit
Total Orders
Total Customers
```

Tambahan kecil di bawah angka:

```text
Profit Margin
Average Order Value
Average Discount
Total Quantity
```

Mapping:

```text
Total Sales = summary.totalSales
Total Profit = summary.totalProfit
Total Orders = summary.totalOrders
Total Customers = summary.totalCustomers
Profit Margin = summary.profitMargin
Average Order Value = summary.averageOrderValue
Average Discount = summary.averageDiscount
Total Quantity = summary.totalQuantity
```

Warna:

```text
Total Sales: primary / Air Force Blue
Total Profit: Sea Green jika positif, Error jika negatif
Total Orders: Primary Deep
Total Customers: Secondary
Average Discount: Tertiary
```

Tooltip KPI:

```text
Metric name
Value
Supporting metric
Short explanation
```

## Visual 2, Sales by Month Ringkas

Gunakan tahun terakhir dari `sales-by-month`.

Chart:

```text
Horizontal bar atau vertical bar
```

Rekomendasi:

```text
Vertical bar chart karena datanya bulanan
```

X-axis:

```text
Month label
```

Y-axis:

```text
Sales
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

Highlight:

```text
Bulan sales tertinggi: Sea Green
Bulan sales terendah: Error
Bulan lain: Air Force Blue
```

## Insight placeholder

Tambahkan card catatan:

```text
Insight sementara: Performa penjualan diringkas melalui sales, profit, order, dan customer. Narasi final akan disesuaikan setelah seluruh visual selesai.
```

## Layout

Gunakan:

```text
KPI cards di atas
Sales by Month di bawah
Insight placeholder di bawah chart
```

## Kriteria selesai step ini

- Tab Pembuka tampil.
- 4 KPI card muncul.
- Sales by Month tahun terakhir muncul.
- Tooltip aktif.
- Tidak ada angka hardcode.
