# prompt_q4_furniture_profitability_story.md

## Tujuan Revisi

Dashboard Superstore sudah berjalan. Jangan membangun ulang dari nol.

Revisi sekarang harus mengubah dashboard menjadi **data story Q4 2026** yang menjawab pertanyaan bisnis utama:

```text
Mengapa Furniture tidak profitable meski revenue tinggi?
```

Fokus analisis:

```text
Cost structure, margin, discount, product mix, region, customer, dan penyebab ketidakefisienan pada Furniture di Superstore.
```

Dashboard harus menjadi alat presentasi untuk manajer dan eksekutif, bukan dashboard eksplorasi umum.

---

## Catatan Terminologi Penting

Di dataset Superstore standar, **Furniture adalah Category**, bukan Segment.

Karena pertanyaan bisnis menyebut “segment Furniture”, gunakan aturan berikut:

```text
Jika field database memakai category, maka filter yang benar adalah category = 'Furniture'.
Dalam narasi boleh menggunakan istilah "kategori Furniture" agar akurat.
Jangan memakai field segment untuk mencari Furniture, karena segment biasanya berisi Consumer, Corporate, dan Home Office.
```

Jika UI lama sudah memakai istilah “segment Furniture”, ubah menjadi:

```text
Kategori Furniture
```

atau:

```text
Furniture Category
```

---

## Scope Data

### Scope utama

```text
Q4 2026
```

### Scope pembanding

```text
Q3 2026
Q1 sampai Q4 2026 untuk tren tahun berjalan
```

### Tujuan scope

Q4 digunakan karena:

```text
Q4 adalah kuartal penutup tahun.
Q4 menjadi dasar membaca risiko dan peluang tahun depan.
Furniture Q4 harus dianalisis untuk menentukan apakah strategi tahun depan perlu agresif, selektif, atau korektif.
```

---

## Pertanyaan Bisnis Utama

Dashboard harus menjawab:

```text
Mengapa Furniture tidak profitable meski revenue tinggi?
```

Pertanyaan turunan:

```text
1. Seberapa besar kontribusi revenue Furniture pada Q4 2026?
2. Apakah profit Furniture positif, rendah, atau negatif?
3. Bagaimana margin Furniture dibanding kategori lain?
4. Sub-category Furniture mana yang menekan profit?
5. Apakah discount tinggi menjadi penyebab utama margin rendah?
6. Region mana yang memperburuk profit Furniture?
7. Customer atau order mana yang menyumbang revenue besar tetapi profit rendah?
8. Apa tindakan yang perlu dilakukan untuk tahun depan?
```

---

## Hipotesis Analisis

Gunakan hipotesis berikut sebagai arah analisis, tetapi validasi dengan data aktual dari API.

```text
Furniture mencatat revenue tinggi karena volume atau nilai transaksi besar, tetapi profit tertekan oleh discount, sub-category dengan margin rendah, region tertentu, atau customer/order yang tidak efisien.
```

Jangan menulis hipotesis sebagai kesimpulan sebelum data membuktikan.

---

## Ukuran yang Wajib Dipakai

Gunakan ukuran berikut dari data aktual:

```text
Sales / Revenue
Profit
Profit Margin
Quantity
Orders
Customers
Average Discount
Average Order Value
Profit per Order
Profit per Unit
Revenue Share
Profit Share
Loss Order Count
Loss Order Rate
```

Tambahan proxy cost structure:

```text
Estimated Cost Burden = Sales - Profit
Cost Ratio = Estimated Cost Burden / Sales
```

Catatan:

Dataset Superstore biasanya tidak memiliki kolom COGS, shipping cost, atau operating cost detail. Karena itu, cost structure harus dijelaskan sebagai **proxy** berdasarkan Sales dan Profit.

Gunakan kalimat profesional seperti:

```text
Karena database tidak menyediakan komponen biaya aktual, analisis cost structure menggunakan proxy Sales minus Profit untuk melihat tekanan biaya atau profit leakage.
```

---

## API dan Query yang Perlu Disiapkan

Gunakan tabel MySQL:

```sql
`order`
```

Selalu pakai backtick karena `order` adalah keyword SQL.

### Konstanta frontend

```js
const YEAR = 2026;
const FOCUS_QUARTER = 4;
const COMPARISON_QUARTER = 3;
const FOCUS_CATEGORY = "Furniture";
```

### Endpoint yang dibutuhkan

Tambahkan endpoint jika belum ada:

```text
/api/analytics/summary?year=2026&quarter=4
/api/analytics/category-summary?year=2026&quarter=4
/api/analytics/category-summary?year=2026&quarter=3
/api/analytics/sales-by-quarter?year=2026
/api/analytics/category-by-quarter?year=2026&category=Furniture
/api/analytics/furniture-summary?year=2026&quarter=4
/api/analytics/furniture-subcategory?year=2026&quarter=4
/api/analytics/furniture-region?year=2026&quarter=4
/api/analytics/furniture-customer?year=2026&quarter=4&limit=10
/api/analytics/furniture-discount-profit?year=2026&quarter=4
/api/analytics/furniture-loss-orders?year=2026&quarter=4&limit=10
```

Jika project ingin tetap memakai endpoint generik, tambahkan query parameter:

```text
category=Furniture
```

Contoh:

```text
/api/analytics/subcategory-summary?year=2026&quarter=4&category=Furniture
/api/analytics/region-summary?year=2026&quarter=4&category=Furniture
/api/analytics/top-customers?year=2026&quarter=4&category=Furniture&limit=10
```

---

## Contoh Query SQL

### Furniture Summary Q4

```sql
SELECT
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(sales) / NULLIF(COUNT(DISTINCT order_id), 0) AS averageOrderValue,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  SUM(profit) / NULLIF(COUNT(DISTINCT order_id), 0) AS profitPerOrder,
  SUM(profit) / NULLIF(SUM(quantity), 0) AS profitPerUnit,
  SUM(sales - profit) AS estimatedCostBurden,
  SUM(sales - profit) / NULLIF(SUM(sales), 0) AS costRatio,
  SUM(CASE WHEN profit < 0 THEN 1 ELSE 0 END) AS lossRows,
  SUM(CASE WHEN profit < 0 THEN sales ELSE 0 END) AS lossSales,
  SUM(CASE WHEN profit < 0 THEN profit ELSE 0 END) AS lossProfit
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture';
```

### Furniture by Sub-Category

```sql
SELECT
  sub_category AS subCategory,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  SUM(profit) / NULLIF(COUNT(DISTINCT order_id), 0) AS profitPerOrder,
  SUM(profit) / NULLIF(SUM(quantity), 0) AS profitPerUnit,
  SUM(sales - profit) AS estimatedCostBurden,
  SUM(sales - profit) / NULLIF(SUM(sales), 0) AS costRatio
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture'
GROUP BY sub_category
ORDER BY profit ASC;
```

### Furniture by Region

```sql
SELECT
  region,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  SUM(sales - profit) AS estimatedCostBurden,
  SUM(sales - profit) / NULLIF(SUM(sales), 0) AS costRatio
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture'
GROUP BY region
ORDER BY profit ASC;
```

### Furniture by Customer

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
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  SUM(profit) / NULLIF(COUNT(DISTINCT order_id), 0) AS profitPerOrder
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture'
GROUP BY customer_id, customer_name, segment
ORDER BY sales DESC
LIMIT ?;
```

### Furniture Discount vs Profit

```sql
SELECT
  sub_category AS subCategory,
  AVG(discount) AS averageDiscount,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin,
  COUNT(DISTINCT order_id) AS orders
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture'
GROUP BY sub_category
ORDER BY averageDiscount DESC;
```

### Top Loss Orders Furniture

```sql
SELECT
  order_id AS orderId,
  order_date AS orderDate,
  customer_name AS customerName,
  region,
  sub_category AS subCategory,
  product_name AS productName,
  sales,
  quantity,
  discount,
  profit,
  profit / NULLIF(sales, 0) AS profitMargin
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 4
  AND category = 'Furniture'
  AND profit < 0
ORDER BY profit ASC
LIMIT ?;
```

---

## Struktur Storytelling

Gunakan struktur dari tugas:

```text
Setup -> Conflict -> Resolution
```

### Setup

```text
Furniture adalah kategori dengan revenue tinggi pada Q4 2026.
```

### Conflict

```text
Revenue tinggi tidak menghasilkan profit yang setara. Margin Furniture tertinggal atau negatif dibanding kategori lain.
```

### Resolution

```text
Analisis sub-category, discount, region, dan customer digunakan untuk menemukan sumber profit leakage dan rekomendasi tindakan tahun depan.
```

---

## Narasi Utama yang Diinginkan

Gunakan gaya narasi seperti:

```text
Furniture Mendorong Revenue Q4, tetapi Margin Menekan Outlook Tahun Depan
```

Alternatif judul utama berdasarkan data:

Jika Furniture revenue tinggi tapi profit rendah:

```text
Furniture Menyumbang Revenue Besar Q4, Profitabilitas Menjadi Risiko Tahun Depan
```

Jika Furniture rugi:

```text
Furniture Mencetak Revenue Tinggi Q4, tetapi Berakhir dengan Profit Negatif
```

Jika Tables menjadi penyebab utama:

```text
Tables Menjadi Sumber Profit Leakage Terbesar di Furniture Q4
```

Jika discount penyebab utama:

```text
Diskon Furniture Q4 Menggerus Margin meski Revenue Tetap Tinggi
```

Jangan gunakan judul generik seperti:

```text
Furniture Analysis
Sales by Furniture
Profit by Sub-Category
Furniture Dashboard
```

---

## Struktur 7 Tab Dashboard

Pertahankan 7 tab, tetapi ubah fungsinya agar fokus ke pertanyaan bisnis Furniture.

### Tab 1, Pembuka

Fungsi:

```text
Hook
```

Scope:

```text
Q4 2026
```

Tujuan:

```text
Membuka cerita bahwa Furniture punya revenue tinggi tetapi profitabilitas perlu diuji.
```

Visual:

```text
KPI Q4 total Superstore
KPI Furniture Q4
Furniture revenue share
Furniture profit margin
```

Judul contoh:

```text
Furniture Mendorong Revenue Q4, tetapi Margin Menjadi Risiko Tahun Depan
```

Catatan analisis:

```text
Furniture mencatat revenue {furnitureSales} pada Q4 2026 dengan margin {furnitureMargin}. Prioritas analisis adalah menemukan sumber profit leakage sebelum target tahun depan ditetapkan.
```

---

### Tab 2, Overview

Fungsi:

```text
Context
```

Scope:

```text
Q4 2026 dan pembanding Q3 2026
```

Tujuan:

```text
Menunjukkan posisi Furniture dibanding total bisnis dan kategori lain.
```

Visual:

```text
Category sales vs profit margin Q4
Furniture Q4 vs Q3: sales, profit, margin
Revenue share dan profit share Furniture
```

Judul contoh:

```text
Revenue Furniture Q4 Tinggi, Margin Tertinggal dari Kategori Lain
```

Catatan analisis:

```text
Furniture menyumbang {furnitureShare} dari revenue Q4, tetapi hanya menghasilkan {furnitureProfitShare} dari profit. Gap ini menunjukkan revenue belum berubah menjadi profit yang seimbang.
```

---

### Tab 3, Tren 2026

Fungsi:

```text
Momentum
```

Scope:

```text
Q1, Q2, Q3, Q4 2026
```

Tujuan:

```text
Menjelaskan apakah masalah profit Furniture terjadi hanya di Q4 atau berulang sepanjang tahun.
```

Visual:

```text
Furniture sales by quarter
Furniture profit by quarter
Furniture profit margin by quarter
Total Superstore vs Furniture margin trend
```

Judul contoh:

```text
Margin Furniture Q4 Menentukan Kualitas Momentum Tahun Depan
```

Catatan analisis:

```text
Jika margin Furniture melemah di Q4, target tahun depan perlu disusun dengan kontrol discount dan product mix yang lebih ketat.
```

Anotasi wajib:

```text
Quarter revenue tertinggi Furniture
Quarter profit terendah Furniture
Q4 sebagai titik outlook
```

---

### Tab 4, Sub-Category Furniture

Fungsi:

```text
Conflict & Evidence
```

Scope:

```text
Furniture Q4 2026
```

Tujuan:

```text
Mencari sub-category yang menekan profit Furniture.
```

Visual:

```text
Sales by Furniture sub-category
Profit by Furniture sub-category
Profit margin by Furniture sub-category
Estimated cost burden by sub-category
```

Judul contoh:

```text
Sub-Category Furniture Menjelaskan Sumber Profit Leakage Q4
```

Jika data menunjukkan Tables negatif:

```text
Tables Menjadi Penekan Profit Terbesar di Furniture Q4
```

Catatan analisis:

```text
{subCategoryWorst} mencatat profit terendah sebesar {worstProfit} dengan margin {worstMargin}. Sub-category ini menjadi prioritas utama untuk evaluasi pricing dan discount.
```

---

### Tab 5, Discount dan Cost Structure

Fungsi:

```text
Root Cause
```

Scope:

```text
Furniture Q4 2026
```

Tujuan:

```text
Menjelaskan apakah discount dan cost burden menjadi penyebab ketidakefisienan.
```

Visual:

```text
Scatter discount vs profit margin by sub-category atau product
Bar average discount by sub-category
Waterfall profit leakage jika memungkinkan
Cost ratio by sub-category
```

Judul contoh:

```text
Diskon dan Cost Burden Menekan Margin Furniture Q4
```

Catatan analisis:

```text
Sub-category dengan discount tinggi cenderung memiliki margin lebih rendah. Evaluasi batas discount perlu menjadi prioritas sebelum strategi penjualan tahun depan dijalankan.
```

Jika korelasi tidak kuat:

```text
Discount bukan satu-satunya penyebab margin rendah. Product mix, region, dan customer perlu diperiksa sebagai faktor tambahan.
```

---

### Tab 6, Region dan Customer

Fungsi:

```text
Insight Pendukung
```

Scope:

```text
Furniture Q4 2026
```

Tujuan:

```text
Menunjukkan apakah kerugian Furniture terkonsentrasi di region atau customer tertentu.
```

Visual:

```text
Furniture profit by region
Furniture margin by region
Top Furniture customers by sales and profit
Top loss orders Furniture
```

Judul contoh:

```text
Kerugian Furniture Terkonsentrasi pada Region dan Customer Tertentu
```

Catatan analisis:

```text
{worstRegion} mencatat margin Furniture terendah di Q4. Prioritas tahun depan adalah membatasi discount atau meninjau product mix pada region tersebut.
```

Jika customer tertentu rugi:

```text
{worstCustomer} menghasilkan revenue Furniture besar tetapi profit negatif. Akun ini perlu ditinjau sebelum dijadikan prioritas retensi.
```

---

### Tab 7, Kesimpulan dan Rekomendasi

Fungsi:

```text
Resolution & Call to Action
```

Scope:

```text
Q4 2026 dan outlook tahun depan
```

Tujuan:

```text
Memberikan rekomendasi konkret agar Furniture bisa lebih profitable tahun depan.
```

Struktur:

```text
1. Temuan utama
2. Penyebab utama
3. Rekomendasi tindakan
4. Call to action
```

Judul contoh:

```text
Furniture Perlu Strategi Margin Baru untuk Tahun Depan
```

Rekomendasi harus konkret:

```text
1. Tetapkan guardrail discount untuk sub-category margin rendah.
2. Review pricing untuk sub-category dengan profit negatif.
3. Prioritaskan region dan customer dengan margin positif.
4. Batasi promosi pada order Furniture yang historisnya menghasilkan loss.
5. Pantau profit per order dan profit per unit, bukan hanya revenue.
```

Call to action:

```text
Setujui pilot margin control untuk Furniture pada Q1 tahun depan, dimulai dari sub-category dan region dengan profit leakage terbesar.
```

---

## Chart Selection per Narrative Moment

Gunakan mapping berikut.

```text
Hook:
Big number + comparison card
Tujuan: membuka masalah revenue tinggi, profit lemah

Context:
Bar chart category sales vs margin
Tujuan: membandingkan Furniture dengan kategori lain

Momentum:
Line chart atau bar chart quarterly trend
Tujuan: menunjukkan apakah masalah berulang sepanjang 2026

Conflict:
Bar chart sub-category profit
Tujuan: menemukan sub-category yang menekan profit

Root Cause:
Scatter discount vs margin atau waterfall profit leakage
Tujuan: menjelaskan penyebab ketidakefisienan

Insight:
Region/customer breakdown
Tujuan: menunjukkan konsentrasi masalah

Action:
Summary card + recommendation cards
Tujuan: mengarahkan keputusan tahun depan
```

Hindari:

```text
Pie chart untuk kontribusi utama jika bar chart lebih jelas.
Tabel besar tanpa ringkasan.
Scatter tanpa anotasi.
Chart yang tidak menjawab pertanyaan Furniture profitability.
```

---

## Visual Hierarchy dan Anotasi

Gunakan aturan:

```text
Merah hanya untuk profit negatif, margin negatif, loss order, atau risiko.
Hijau untuk margin sehat, profit positif, atau improvement.
Kuning untuk warning seperti discount tinggi atau margin rendah.
Biru untuk data utama yang netral.
Abu-abu untuk pembanding.
```

Anotasi wajib:

```text
Tandai sub-category profit terendah.
Tandai discount tertinggi.
Tandai region margin terendah.
Tandai customer loss terbesar.
Tandai Q4 sebagai periode outlook.
```

Data label wajib ada pada bar chart utama.

Tooltip wajib berisi:

```text
Period
Category / Sub-Category / Region / Customer
Sales
Profit
Profit Margin
Average Discount
Orders
Quantity
Estimated Cost Burden jika relevan
```

---

## SCR Statement yang Harus Dibuat

Buat file dokumentasi baru:

```text
docs/furniture_q4_story_plan.md
```

Isi file tersebut dengan:

### Setup

```text
Furniture mencatat revenue tinggi pada Q4 2026 dan menjadi salah satu area penting untuk outlook tahun depan.
```

### Conflict

```text
Profitability Furniture tidak sebanding dengan revenue. Margin ditekan oleh sub-category, discount, region, atau customer tertentu.
```

### Resolution

```text
Dashboard mengidentifikasi sumber profit leakage dan memberikan rekomendasi margin control untuk Q1 tahun depan.
```

Jangan hardcode angka. Jika ingin menampilkan angka, generate dari API atau tulis placeholder yang jelas untuk diisi otomatis.

---

## Rencana Chart per Narrative Moment

Tambahkan ke `docs/furniture_q4_story_plan.md`:

```text
Chart 1: KPI Furniture Q4
Narrative moment: Hook
Insight expected: Revenue Furniture besar, margin perlu diuji

Chart 2: Category Sales vs Margin
Narrative moment: Context
Insight expected: Furniture dibandingkan dengan kategori lain

Chart 3: Furniture Quarterly Trend
Narrative moment: Momentum
Insight expected: Masalah profit terjadi di Q4 saja atau berulang

Chart 4: Furniture Sub-Category Profit
Narrative moment: Conflict
Insight expected: Sub-category penyebab profit leakage

Chart 5: Discount vs Margin
Narrative moment: Root Cause
Insight expected: Discount/cost burden menekan margin

Chart 6: Furniture Region and Customer
Narrative moment: Insight
Insight expected: Masalah terkonsentrasi di region/customer tertentu

Chart 7: Recommendation Summary
Narrative moment: Action
Insight expected: Keputusan untuk Q1 tahun depan
```

---

## Log Keputusan Visual

Tambahkan ke dokumentasi:

```text
Warna:
Merah dipakai hanya untuk profit negatif atau margin negatif.
Hijau dipakai untuk profit sehat dan margin terbaik.
Kuning dipakai untuk discount tinggi atau area warning.
Biru dipakai untuk Furniture sebagai fokus utama.

Judul:
Semua judul diubah dari deskriptif menjadi berbasis temuan.

Anotasi:
Anotasi dipakai pada sub-category, region, customer, dan quarter yang menjadi penyebab utama masalah.

Declutter:
Chart tidak menampilkan semua label jika membuat padat. Label hanya untuk nilai utama, titik ekstrem, atau item yang menjadi fokus cerita.
```

---

## Script Presentasi 5 Menit

Buat atau perbarui file:

```text
docs/furniture_q4_presentation_script.md
```

Gunakan segmentasi waktu dari tugas.

### Hook, 30 detik

```text
Buka dengan temuan utama Furniture Q4: revenue tinggi tetapi profitabilitas belum seimbang.
```

### Context, 1 menit

```text
Tunjukkan posisi Furniture dibanding kategori lain dan tren Q1 sampai Q4 2026.
```

### Konflik & Bukti, 2 menit

```text
Tunjukkan sub-category, discount, region, dan customer yang menekan profit.
```

### Insight & Rekomendasi, 1.5 menit

```text
Jelaskan penyebab utama dan rekomendasi margin control.
```

### Call to Action, 30 detik

```text
Ajukan keputusan: setujui pilot margin control Furniture untuk Q1 tahun depan.
```

Script harus berupa poin bicara singkat, bukan paragraf panjang.

---

## Perubahan Teks yang Wajib Dilakukan

Ganti narasi umum Q4 menjadi narasi spesifik Furniture.

Hindari:

```text
Q4 menjadi dasar outlook tahun depan.
```

Lebih baik:

```text
Furniture Q4 menjadi indikator risiko margin untuk tahun depan.
```

Hindari:

```text
Sales tinggi perlu dibandingkan dengan profit.
```

Lebih baik:

```text
Furniture menghasilkan revenue tinggi, tetapi margin rendah menunjukkan adanya profit leakage yang perlu ditangani sebelum Q1.
```

Hindari:

```text
Region perlu perhatian.
```

Lebih baik:

```text
Region dengan margin Furniture terendah perlu menjadi prioritas review discount dan product mix.
```

---

## Deliverables yang Harus Dihasilkan Codex

Codex harus menghasilkan:

```text
1. Dashboard revisi dengan scope Q4 2026 dan fokus Furniture.
2. Endpoint API tambahan atau query parameter category=Furniture.
3. Narasi dashboard yang menjawab pertanyaan bisnis Furniture profitability.
4. Anotasi chart sesuai prinsip storytelling.
5. docs/furniture_q4_story_plan.md
6. docs/furniture_q4_presentation_script.md
```

---

## Checklist Final

Pastikan:

```text
Fokus utama dashboard adalah Furniture Q4 2026.
Dashboard menjawab pertanyaan "Mengapa Furniture tidak profitable meski revenue tinggi?"
Tidak ada lagi narasi umum yang hanya membahas Q4 total Superstore.
Furniture difilter memakai category = 'Furniture'.
Setiap chart punya peran dalam story arc.
Semua angka berasal dari API.
Ada analisis cost structure menggunakan proxy Sales minus Profit.
Ada analisis margin.
Ada analisis discount.
Ada analisis sub-category.
Ada analisis region.
Ada analisis customer.
Ada rekomendasi konkret untuk tahun depan.
Ada call to action.
Bahasa profesional untuk manajerial dan eksekutif.
Tidak ada em dash.
Tidak ada label "SO WHAT".
```

---

## Instruksi Eksekusi untuk Codex

Baca prompt ini sampai selesai. Kemudian lakukan revisi pada project dashboard yang sudah ada.

Jangan membangun ulang dari nol.

Langkah kerja:

```text
1. Audit endpoint API dan chart yang sudah ada.
2. Tambahkan filter category=Furniture untuk endpoint yang relevan.
3. Ubah scope utama ke Q4 2026.
4. Ubah narasi dashboard menjadi fokus pada pertanyaan Furniture profitability.
5. Revisi struktur 7 tab agar mengikuti story arc Furniture.
6. Tambahkan chart root cause untuk sub-category, discount, region, dan customer.
7. Tambahkan anotasi dan data label yang mendukung cerita.
8. Buat dokumentasi SCR, rencana chart, log keputusan visual, dan script 5 menit.
9. Test semua chart dan endpoint.
10. Pastikan dashboard siap dipresentasikan ke manajemen.
```

Output akhir:

```text
Dashboard Q4 2026 yang menjelaskan penyebab Furniture tidak profitable meski revenue tinggi, serta memberi rekomendasi tindakan untuk tahun depan.
```
