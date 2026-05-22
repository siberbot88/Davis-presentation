# Step 2, Pembuatan MySQL API

## Tujuan

Buat backend API yang membaca data dari **Superstore Database MySQL** dan mengirim data JSON ke frontend D3.js.

D3.js tidak boleh query langsung ke MySQL dari browser.

Arsitektur:

```text
MySQL Database
      ↓
Backend API
      ↓
JSON response
      ↓
Frontend D3.js
```

## Konfigurasi environment

Buat `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=superstore
PORT=3000
```

Buat `.env` lokal sesuai konfigurasi database.

## Koneksi database

Buat `src/db.js`:

```js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

## Server Express

Buat `server.js`:

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyticsRoutes from "./src/routes/analytics.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
```

## Mapping kolom

Jika tabel MySQL memakai snake_case, gunakan mapping berikut:

```text
order_id        -> Order ID
order_date      -> Order Date
ship_date       -> Ship Date
ship_mode       -> Ship Mode
customer_id     -> Customer ID
customer_name   -> Customer Name
segment         -> Segment
country         -> Country
city            -> City
state           -> State
postal_code     -> Postal Code
region          -> Region
product_id      -> Product ID
category        -> Category
sub_category    -> Sub-Category
product_name    -> Product Name
sales           -> Sales
quantity        -> Quantity
discount        -> Discount
profit          -> Profit
```

Gunakan hanya **satu tabel**:

```sql
`order`
```

Catatan penting: `order` adalah keyword SQL. Karena itu, semua query harus menulis nama tabel dengan backtick.

Benar:

```sql
SELECT * FROM `order`;
```

Salah:

```sql
SELECT * FROM order;
```

## Endpoint wajib

Buat `src/routes/analytics.js` dengan endpoint berikut:

```text
GET /api/analytics/summary
GET /api/analytics/sales-by-month
GET /api/analytics/overview-by-year
GET /api/analytics/overview-by-quarter
GET /api/analytics/category-summary
GET /api/analytics/subcategory-summary
GET /api/analytics/region-summary
GET /api/analytics/segment-summary
GET /api/analytics/top-customers?limit=10
GET /api/analytics/top-products?limit=10&sortBy=sales
```

## Query Summary

```sql
SELECT
  SUM(sales) AS totalSales,
  SUM(profit) AS totalProfit,
  SUM(quantity) AS totalQuantity,
  COUNT(DISTINCT order_id) AS totalOrders,
  COUNT(DISTINCT customer_id) AS totalCustomers,
  SUM(sales) / NULLIF(COUNT(DISTINCT order_id), 0) AS averageOrderValue,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  AVG(discount) AS averageDiscount
FROM `order`;
```

## Query Sales by Month

```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS monthKey,
  DATE_FORMAT(order_date, '%b %Y') AS monthLabel,
  YEAR(order_date) AS year,
  MONTH(order_date) AS month,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY
  DATE_FORMAT(order_date, '%Y-%m'),
  DATE_FORMAT(order_date, '%b %Y'),
  YEAR(order_date),
  MONTH(order_date)
ORDER BY year, month;
```

## Query Overview by Year

```sql
WITH yearly AS (
  SELECT
    YEAR(order_date) AS year,
    SUM(sales) AS sales,
    SUM(profit) AS profit,
    SUM(quantity) AS quantity,
    COUNT(DISTINCT order_id) AS orders,
    COUNT(DISTINCT customer_id) AS customers,
    AVG(discount) AS averageDiscount,
    SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
  FROM `order`
  GROUP BY YEAR(order_date)
)
SELECT
  year,
  sales,
  profit,
  quantity,
  `order`,
  customers,
  averageDiscount,
  profitMargin,
  (sales - LAG(sales) OVER (ORDER BY year)) / NULLIF(LAG(sales) OVER (ORDER BY year), 0) AS salesGrowth,
  (profit - LAG(profit) OVER (ORDER BY year)) / NULLIF(LAG(profit) OVER (ORDER BY year), 0) AS profitGrowth
FROM yearly
ORDER BY year;
```

## Query Overview by Quarter

```sql
WITH quarterly AS (
  SELECT
    CONCAT(YEAR(order_date), '-Q', QUARTER(order_date)) AS quarterKey,
    YEAR(order_date) AS year,
    QUARTER(order_date) AS quarter,
    SUM(sales) AS sales,
    SUM(profit) AS profit,
    SUM(quantity) AS quantity,
    COUNT(DISTINCT order_id) AS orders,
    COUNT(DISTINCT customer_id) AS customers,
    AVG(discount) AS averageDiscount,
    SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
  FROM `order`
  GROUP BY YEAR(order_date), QUARTER(order_date)
)
SELECT
  quarterKey,
  year,
  quarter,
  sales,
  profit,
  quantity,
  `order`,
  customers,
  averageDiscount,
  profitMargin,
  (sales - LAG(sales) OVER (ORDER BY year, quarter)) / NULLIF(LAG(sales) OVER (ORDER BY year, quarter), 0) AS salesGrowth,
  (profit - LAG(profit) OVER (ORDER BY year, quarter)) / NULLIF(LAG(profit) OVER (ORDER BY year, quarter), 0) AS profitGrowth
FROM quarterly
ORDER BY year, quarter;
```

## Query Category Summary

```sql
SELECT
  category,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY category
ORDER BY sales DESC;
```

## Query Sub-Category Summary

```sql
SELECT
  category,
  sub_category AS subCategory,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY category, sub_category
ORDER BY profit DESC;
```

## Query Region Summary

```sql
WITH region_base AS (
  SELECT
    region,
    category,
    SUM(sales) AS categorySales
  FROM `order`
  GROUP BY region, category
),
top_category AS (
  SELECT region, category AS topCategory
  FROM (
    SELECT
      region,
      category,
      categorySales,
      ROW_NUMBER() OVER (PARTITION BY region ORDER BY categorySales DESC) AS rn
    FROM region_base
  ) ranked
  WHERE rn = 1
)
SELECT
  o.region,
  SUM(o.sales) AS sales,
  SUM(o.profit) AS profit,
  SUM(o.quantity) AS quantity,
  COUNT(DISTINCT o.order_id) AS orders,
  COUNT(DISTINCT o.customer_id) AS customers,
  AVG(o.discount) AS averageDiscount,
  SUM(o.profit) / NULLIF(SUM(o.sales), 0) AS profitMargin,
  tc.topCategory
FROM `order` o
LEFT JOIN top_category tc ON o.region = tc.region
GROUP BY o.region, tc.topCategory
ORDER BY sales DESC;
```

## Query Segment Summary

```sql
SELECT
  segment,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY segment
ORDER BY sales DESC;
```

## Query Top Customers

```sql
SELECT
  customer_id AS customerId,
  customer_name AS customerName,
  segment,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY customer_id, customer_name, segment
ORDER BY sales DESC
LIMIT ?;
```

## Query Top Products

```sql
SELECT
  product_id AS productId,
  product_name AS productName,
  category,
  sub_category AS subCategory,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
GROUP BY product_id, product_name, category, sub_category
ORDER BY sales DESC
LIMIT ?;
```

## Kriteria selesai step ini

- `/api/health` mengembalikan `{ ok: true }`.
- Semua endpoint analytics mengembalikan JSON.
- Tidak ada query langsung dari browser ke MySQL.
- Jika database error, API mengembalikan error JSON yang jelas.
