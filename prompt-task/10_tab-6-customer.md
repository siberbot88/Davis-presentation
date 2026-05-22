# Step 10, Tab 6 Customer

## Label tab

```text
6 CUSTOMER
```

## Catatan

Pada contoh Northwind, tab ini memakai `Karyawan`. Pada Superstore tidak ada employee, jadi gunakan **Customer** sebagai pengganti analisis kontribusi pihak utama.

## Tujuan

Melihat kontribusi sales berdasarkan customer dan segment.

## Judul

```text
Kontribusi Sales Berdasarkan Customer dan Segment
```

## Subjudul

```text
Analisis customer dan segment membantu melihat konsentrasi kontribusi sales serta kualitas profit.
```

## Data API yang digunakan

```text
GET /api/analytics/top-customers?limit=10
GET /api/analytics/segment-summary
```

## Visual 15, Top 10 Customer by Sales

Chart:

```text
Horizontal bar chart
```

Y-axis:

```text
Customer Name
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
Customer Name
Segment
Sales
Profit
Profit Margin
Orders
Quantity
Average Discount
```

Warna:

```text
Top customer: Dark Spruce
Customer lain: Air Force Blue
Customer profit negatif: Error
Track: Pale Sky
```

## Visual 16, Sales by Segment

Chart:

```text
Bar chart
```

X-axis:

```text
Segment
```

Y-axis:

```text
Sales
```

Tooltip:

```text
Segment
Sales
Profit
Profit Margin
Customers
Orders
Quantity
Share of Sales
```

Warna:

```text
Segment sales terbesar: Sea Green
Segment lain: Air Force Blue
```

## Visual 17, Profit by Segment

Chart:

```text
Bar chart
```

X-axis:

```text
Segment
```

Y-axis:

```text
Profit
```

Aturan warna:

```text
Profit positif: Sea Green
Profit negatif: Error
```

Tooltip:

```text
Segment
Profit
Sales
Profit Margin
Average Discount
Customers
Orders
```

## Kriteria selesai step ini

- Top 10 Customer by Sales tampil.
- Sales by Segment tampil.
- Profit by Segment tampil.
- Customer dengan profit negatif terlihat jelas.
- Tooltip informatif.
