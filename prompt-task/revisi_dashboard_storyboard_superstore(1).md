# revisi_dashboard_storyboard_superstore.md

## Tujuan Revisi

Dashboard Superstore sudah selesai dibuat. Jangan membangun ulang dari awal.

Tugas sekarang adalah **merevisi dashboard yang sudah ada** agar sesuai dengan scope data dan prinsip storyboard berikut:

1. Fokus utama data adalah **tahun terakhir, yaitu 2026**.
2. Tab **Tren Sales** harus fokus pada **Q1, Q2, Q3, Q4 tahun 2026**.
3. Tab selain Tren Sales harus fokus pada **Q3 2026**.
4. Dashboard harus tetap berbentuk **web presentasi 7 tab**, bukan dashboard operasional biasa.
5. Semua visual harus tetap memakai D3.js, tooltip informatif, dan data dari MySQL API.
6. Jangan menghapus struktur besar dashboard yang sudah jadi kecuali memang perlu untuk menyesuaikan scope.

---

## Konteks Project

Project sudah memiliki dashboard berbasis:

```text
D3.js
MySQL API
7 tab presentasi
Database Superstore
Satu tabel MySQL: `order`
```

Catatan penting:

```sql
`order`
```

Nama tabel harus selalu memakai backtick karena `order` adalah keyword SQL.

Contoh benar:

```sql
SELECT * FROM `order`;
```

Contoh salah:

```sql
SELECT * FROM order;
```

---

## Scope Data Baru

### Scope utama

Gunakan tahun terakhir:

```text
2026
```

### Scope khusus per tab

```text
Tab 1 Pembuka      : Q3 2026
Tab 2 Overview     : Q3 2026, boleh dibandingkan dengan Q2 2026
Tab 3 Tren Sales   : Q1, Q2, Q3, Q4 tahun 2026
Tab 4 Per Kategori : Q3 2026
Tab 5 Per Region   : Q3 2026
Tab 6 Customer     : Q3 2026
Tab 7 Kesimpulan   : rangkuman Q3 2026 + konteks tren 2026
```

### Jangan lagi menampilkan

```text
2023
2024
2025
multi-year trend
monthly trend lintas tahun
```

Kecuali jika hanya muncul di tooltip debug atau data mentah, tetapi tidak boleh menjadi visual utama.

---

## Prinsip Storyboard yang Wajib Dipakai

Dashboard ini harus dianggap sebagai **storyboard presentasi**, bukan sekadar kumpulan grafik.

Gunakan alur:

```text
Hook -> Context -> Tension -> Insight -> Action
```

Mapping ke tab:

```text
Tab 1 Pembuka      = Hook
Tab 2 Overview     = Context
Tab 3 Tren Sales   = Context, perubahan antar quarter 2026
Tab 4 Per Kategori = Tension, kategori kuat dan kategori lemah
Tab 5 Per Region   = Tension, region kuat dan region perlu perhatian
Tab 6 Customer     = Insight pendukung, konsentrasi customer dan segment
Tab 7 Kesimpulan   = Insight + Action
```

Setiap tab harus menjawab pertanyaan:

```text
"So what?"
```

Artinya, jangan hanya memberi judul seperti:

```text
Sales by Region
```

Lebih baik gunakan judul yang memberi konteks, misalnya:

```text
Performa Region Q3 2026 Menunjukkan Area Kontributor dan Area Perlu Perhatian
```

Untuk tahap revisi ini, judul tidak harus final banget, tetapi harus mulai mengarah ke narasi.

---

## Revisi Backend / API

Jangan membuat API baru dari nol jika endpoint sudah ada. Revisi endpoint yang sudah tersedia agar mendukung filter:

```text
year=2026
quarter=3
```

atau buat endpoint tambahan jika lebih bersih.

Contoh pola endpoint yang disarankan:

```text
/api/analytics/summary?year=2026&quarter=3
/api/analytics/sales-by-quarter?year=2026
/api/analytics/sales-by-month?year=2026
/api/analytics/category-summary?year=2026&quarter=3
/api/analytics/subcategory-summary?year=2026&quarter=3
/api/analytics/region-summary?year=2026&quarter=3
/api/analytics/segment-summary?year=2026&quarter=3
/api/analytics/top-customers?year=2026&quarter=3&limit=10
```

Jika endpoint lama belum menerima query parameter, tambahkan parsing parameter:

```js
const year = Number(req.query.year || 2026);
const quarter = req.query.quarter ? Number(req.query.quarter) : null;
```

Gunakan filter SQL:

```sql
WHERE YEAR(order_date) = ?
```

Untuk quarter:

```sql
AND QUARTER(order_date) = ?
```

Jika `quarter` null, jangan tambahkan filter quarter.

---

## Query Helper yang Disarankan

Buat helper sederhana agar query tidak berulang:

```js
function buildDateFilter({ year, quarter }) {
  const conditions = [];
  const params = [];

  if (year) {
    conditions.push("YEAR(order_date) = ?");
    params.push(year);
  }

  if (quarter) {
    conditions.push("QUARTER(order_date) = ?");
    params.push(quarter);
  }

  return {
    whereClause: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    params
  };
}
```

Gunakan helper ini di endpoint summary, category, subcategory, region, segment, dan customer.

---

## Revisi Query Summary

Pastikan endpoint summary untuk Q3 2026 menghasilkan:

```text
Total Sales Q3 2026
Total Profit Q3 2026
Total Quantity Q3 2026
Total Orders Q3 2026
Total Customers Q3 2026
Average Order Value Q3 2026
Profit Margin Q3 2026
Average Discount Q3 2026
```

Contoh query:

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
FROM `order`
WHERE YEAR(order_date) = 2026
  AND QUARTER(order_date) = 3;
```

---

## Endpoint Baru yang Disarankan: Sales by Quarter 2026

Tambahkan endpoint:

```text
GET /api/analytics/sales-by-quarter?year=2026
```

Response minimal:

```json
[
  {
    "quarter": 1,
    "quarterLabel": "Q1 2026",
    "sales": 0,
    "profit": 0,
    "quantity": 0,
    "orders": 0,
    "customers": 0,
    "averageDiscount": 0,
    "profitMargin": 0
  }
]
```

Query:

```sql
SELECT
  QUARTER(order_date) AS quarter,
  CONCAT('Q', QUARTER(order_date), ' ', YEAR(order_date)) AS quarterLabel,
  SUM(sales) AS sales,
  SUM(profit) AS profit,
  SUM(quantity) AS quantity,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  AVG(discount) AS averageDiscount,
  SUM(profit) / NULLIF(SUM(sales), 0) AS profitMargin
FROM `order`
WHERE YEAR(order_date) = 2026
GROUP BY YEAR(order_date), QUARTER(order_date)
ORDER BY quarter;
```

Pastikan tetap menampilkan Q1 sampai Q4. Jika ada quarter tanpa data, boleh tampil 0 agar chart lengkap.

---

## Revisi Frontend Data Fetching

Ubah request frontend agar memakai scope berikut:

```js
const YEAR = 2026;
const FOCUS_QUARTER = 3;
```

Gunakan untuk endpoint:

```js
const q3Params = `year=${YEAR}&quarter=${FOCUS_QUARTER}`;

const [
  summaryQ3,
  salesByQuarter2026,
  categorySummaryQ3,
  subCategorySummaryQ3,
  regionSummaryQ3,
  segmentSummaryQ3,
  topCustomersQ3
] = await Promise.all([
  getJson(`/summary?${q3Params}`),
  getJson(`/sales-by-quarter?year=${YEAR}`),
  getJson(`/category-summary?${q3Params}`),
  getJson(`/subcategory-summary?${q3Params}`),
  getJson(`/region-summary?${q3Params}`),
  getJson(`/segment-summary?${q3Params}`),
  getJson(`/top-customers?${q3Params}&limit=10`)
]);
```

Jika masih membutuhkan Q2 sebagai pembanding overview, ambil:

```js
const q2Params = `year=${YEAR}&quarter=2`;
const summaryQ2 = await getJson(`/summary?${q2Params}`);
```

---

# Revisi Per Tab

## Tab 1, Pembuka

### Scope

```text
Q3 2026
```

### Perubahan

KPI cards harus memakai data Q3 2026, bukan total semua tahun.

KPI utama:

```text
Total Sales Q3 2026
Total Profit Q3 2026
Total Orders Q3 2026
Total Customers Q3 2026
```

Tambahan:

```text
Profit Margin Q3 2026
Average Order Value Q3 2026
Average Discount Q3 2026
```

### Judul yang disarankan

```text
Kinerja Superstore Q3 2026 Menjadi Fokus Analisis
```

### Subjudul yang disarankan

```text
Dashboard ini merangkum sales, profit, category, region, dan customer pada Q3 2026 sebagai dasar pengambilan keputusan.
```

### Visual

Tetap gunakan KPI cards dan ringkasan singkat. Jangan tampilkan multi-year chart di pembuka.

---

## Tab 2, Overview

### Scope

```text
Q3 2026
```

Boleh gunakan pembanding:

```text
Q2 2026
```

### Perubahan

Overview jangan lagi memakai seluruh tahun atau multi-year. Fokuskan pada:

```text
Q3 2026 vs Q2 2026
```

Visual yang disarankan:

1. KPI comparison card Q3 vs Q2
2. Bar kecil Sales Q2 vs Q3
3. Bar kecil Profit Q2 vs Q3
4. Tabel ringkas Q2 dan Q3

### Judul yang disarankan

```text
Q3 2026 Perlu Dibaca dari Sales dan Profit, Bukan Sales Saja
```

### Tooltip wajib

```text
Quarter
Sales
Profit
Profit Margin
Orders
Customers
Growth vs previous quarter
```

---

## Tab 3, Tren Sales

### Scope

```text
Q1, Q2, Q3, Q4 tahun 2026
```

### Perubahan utama

Saat ini chart masih menampilkan banyak bulan dari 2023 sampai 2026. Ubah.

Chart utama harus fokus pada quarter 2026.

Visual yang disarankan:

1. Bar chart Sales by Quarter 2026
2. Bar chart Profit by Quarter 2026
3. Scatter atau small comparison Sales vs Profit by Quarter 2026

Jika masih ingin monthly detail, hanya boleh untuk bulan di 2026.

### Judul yang disarankan

```text
Tren 2026 Menunjukkan Posisi Q3 di Antara Empat Kuartal
```

### Tooltip wajib

```text
Quarter
Sales
Profit
Profit Margin
Orders
Customers
Average Discount
```

### Warna

```text
Q3 = highlight utama
Quarter profit negatif = merah
Quarter profit tertinggi = hijau
Quarter normal = Air Force Blue
```

---

## Tab 4, Per Kategori

### Scope

```text
Q3 2026
```

### Perubahan

Semua chart kategori harus hanya memakai data Q3 2026.

Visual:

1. Sales by Category Q3 2026
2. Profit Margin by Category Q3 2026
3. Profit by Sub-Category Q3 2026

### Judul yang disarankan

```text
Kategori Q3 2026 Menunjukkan Sales Besar Belum Tentu Margin Terbaik
```

### Tooltip wajib

```text
Category / Sub-Category
Sales
Profit
Profit Margin
Orders
Quantity
Average Discount
Share of Sales
```

---

## Tab 5, Per Region

### Scope

```text
Q3 2026
```

### Perubahan

Semua chart region harus hanya memakai Q3 2026.

Visual:

1. Sales by Region Q3 2026
2. Profit by Region Q3 2026
3. Region Summary Table Q3 2026

### Judul yang disarankan

```text
Performa Region Q3 2026 Menunjukkan Area Kontributor dan Area Perlu Perhatian
```

### Tooltip wajib

```text
Region
Sales
Profit
Profit Margin
Orders
Customers
Average Discount
Top Category
```

---

## Tab 6, Customer

### Scope

```text
Q3 2026
```

### Perubahan

Top customer dan segment harus hanya Q3 2026.

Visual:

1. Top 10 Customer by Sales Q3 2026
2. Sales by Segment Q3 2026
3. Profit by Segment Q3 2026

### Judul yang disarankan

```text
Kontribusi Customer Q3 2026 Perlu Dibaca Bersama Profit
```

### Catatan penting

Pada chart Top 10 Customer, jangan otomatis mewarnai customer pertama dengan merah hanya karena ia ranking pertama. Merah hanya dipakai jika:

```text
profit negatif
margin negatif
status bermasalah
```

Jika customer pertama punya profit positif, gunakan:

```text
Dark Spruce atau Sea Green
```

Jika profit negatif, baru gunakan:

```text
Error Red
```

Tooltip wajib:

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

---

## Tab 7, Kesimpulan

### Scope

```text
Q3 2026 + konteks tren 2026
```

### Perubahan

Kesimpulan harus menjadi penutup storyboard, bukan hanya kumpulan angka.

Susun menjadi 3 kelompok:

```text
Apa yang berjalan baik
Apa yang perlu perhatian
Action / rekomendasi
```

Contoh struktur:

```text
Positif:
- Sales Q3 2026 menunjukkan kontribusi kuat pada periode analisis.
- Region atau kategori tertentu menjadi pendorong utama sales.

Perhatian:
- Profit margin tidak selalu mengikuti sales.
- Beberapa customer, category, atau region perlu dicek karena profit rendah atau negatif.

Action:
- Prioritaskan area dengan sales tinggi dan margin sehat.
- Evaluasi discount pada area yang menekan profit.
- Fokuskan follow-up pada category, region, atau customer bermasalah di Q3 2026.
```

Angka di kesimpulan tetap harus berasal dari API, bukan hardcode.

---

## Revisi Warna

Gunakan warna semantik:

```text
Air Force Blue  = data normal
Sea Green       = positif / profit / terbaik
Dark Spruce     = highlight positif kuat
Tertiary Yellow = warning / perhatian / discount tinggi
Error Red       = profit negatif / loss / masalah
Pale Sky        = background track
Cool Steel      = data sekunder
```

Larangan:

```text
Jangan memberi merah pada ranking pertama jika tidak ada masalah.
Jangan memakai terlalu banyak warna tanpa makna.
Jangan membuat semua bar punya warna berbeda hanya karena kategori berbeda.
```

---

## Revisi Khusus untuk Line Chart Highlight

Untuk **line chart**, tampilkan bukan hanya garis dan titik, tetapi juga **highlight insight kecil** seperti contoh referensi.

Tujuannya:

```text
Membantu audiens langsung menangkap cerita utama tanpa membaca chart terlalu lama.
Line chart harus terasa seperti bagian dari storyboard, bukan hanya visual mentah.
Insight penting harus terlihat langsung di chart melalui warna, label, dan callout kecil.
```

### Aturan utama line chart

```text
Titik data biasa menggunakan warna default utama.
Titik yang menjadi highlight insight harus memakai warna berbeda sesuai maknanya.
Setiap titik highlight boleh diberi label kecil atau callout box ringkas.
Tambahkan summary chips / mini insight box di bawah chart untuk menjelaskan poin penting.
```

### Jenis insight yang wajib dipertimbangkan pada line chart

Minimal cek apakah chart memiliki insight berikut:

```text
Bulan terendah.
Bulan tertinggi.
Periode konsisten naik.
Periode konsisten di atas target.
Periode turun tajam.
Awal momentum kenaikan.
Akhir quarter dengan performa terbaik.
```

Tidak semua insight harus dipakai sekaligus. Pilih **2 sampai 4 insight paling penting** agar chart tetap bersih.

### Aturan warna titik highlight

Gunakan warna berbeda berdasarkan makna:

```text
Merah        : titik terendah, penurunan tajam, area masalah, below target.
Hijau        : titik terbaik, titik di atas target, periode kuat, hasil positif.
Kuning/emas  : target line, warning zone, area perhatian.
Biru utama   : titik normal, tren utama.
```

Contoh penggunaan:

```text
Februari sebagai bulan terendah diberi titik merah.
Bulan yang pertama kali melewati target diberi titik hijau.
Deretan bulan yang konsisten di atas target dapat diberi titik hijau muda atau hijau penuh.
Target line ditampilkan sebagai garis horizontal putus-putus warna kuning/emas.
```

### Pola anotasi yang diharapkan

#### 1. Insight box kecil di bawah chart

Seperti contoh referensi, tambahkan 2 sampai 3 kotak insight kecil.

Format contoh:

```text
Feb: terendah $61K
--- Target $80K/bulan
Agu-Sep: konsisten above target
```

Aturan:

```text
Gunakan border tipis dan warna yang sesuai dengan insight.
Box merah untuk insight negatif.
Box kuning untuk target atau benchmark.
Box hijau untuk pencapaian atau konsistensi positif.
Jangan buat box terlalu besar, cukup pendek dan mudah dipindai.
```

#### 2. Label langsung dekat titik penting

```text
Label kecil boleh ditempel dekat titik highlight.
Gunakan teks singkat, misalnya “lowest”, “above target”, “peak”, atau nilai singkat seperti $61K.
Posisi label jangan menabrak titik atau garis.
```

#### 3. Highlight period / sequence

Jika ada beberapa bulan berurutan yang penting:

```text
Gunakan warna titik yang sama untuk semua titik dalam periode itu.
Boleh tambahkan teks ringkas seperti “Aug-Sep above target” atau “Q4 strongest run”.
Jika perlu, gunakan area shading sangat halus untuk menandai fase tertentu, tetapi jangan berlebihan.
```

### Aturan khusus untuk storyboard proyek ini

Karena dashboard ini adalah **web presentasi 7 tab**, line chart harus membantu membangun narasi.

#### Untuk tab 3, Tren Sales

Fokus hanya pada **tahun 2026**, dengan orientasi quarter:

```text
Q1 2026
Q2 2026
Q3 2026
Q4 2026
```

Jika line chart masih memakai data bulanan dalam 2026, maka:

```text
Tampilkan bulan Jan sampai Dec 2026 saja.
Berikan highlight pada bulan terendah.
Berikan highlight pada bulan tertinggi.
Tandai periode paling konsisten, misalnya Oct-Dec atau Jul-Sep.
Jika ada target, tunjukkan garis target dan bulan-bulan yang berhasil melewatinya.
```

Jika chart dibuat per quarter, maka:

```text
Tampilkan label angka di semua titik quarter karena hanya ada 4 titik.
Gunakan highlight warna berbeda untuk quarter terbaik dan quarter terlemah.
Tambahkan insight kecil, misalnya “Q3 recovery” atau “Q4 strongest quarter”.
```

### Data labels untuk line chart

Aturan tambahan khusus line chart:

```text
Tidak perlu memberi label ke semua titik jika chart bulanan terlalu padat.
Wajib beri label pada titik highlight utama.
Jika chart quarter hanya 4 titik, tampilkan label angka pada semua titik.
Angka label harus konsisten dengan formatter currency yang dipakai di chart lain.
```

Contoh:

```text
Feb 2026  : $18.2K
Oct 2026  : $88.4K
Q3 2026   : $245K
Q4 2026   : $312K
```

### Perilaku tooltip tetap wajib

Walaupun insight box dan highlight labels ditampilkan, tooltip tetap harus informatif.

Tooltip line chart minimal berisi:

```text
Periode, misalnya Feb 2026.
Total sales / revenue.
Profit jika relevan.
Difference vs previous month atau vs target jika tersedia.
Status highlight jika titik tersebut termasuk insight tertentu.
```

Contoh:

```text
Feb 2026
Sales: $18,200
Status: Lowest month in 2026
Vs Jan: -42.5%
```

### Rekomendasi implementasi visual D3.js

Untuk Codex, implementasi line chart sebaiknya mendukung struktur berikut:

```text
1. Base line dan point untuk semua data.
2. Layer khusus untuk highlighted points.
3. Layer label untuk highlighted points.
4. Layer target line jika ada benchmark.
5. Layer mini insight chips atau callout box di bawah chart.
```

Atribut data yang disarankan per titik:

```js
{
  period: '2026-02',
  label: 'Feb 2026',
  sales: 18200,
  profit: 950,
  isHighlight: true,
  highlightType: 'lowest',
  highlightColor: 'red',
  highlightText: 'Feb: terendah $18.2K'
}
```

Jenis `highlightType` yang bisa dipakai:

```text
lowest
highest
above-target
below-target
consistent-run
recovery
drop
peak
```

### Checklist final untuk line chart

Tambahkan ke checklist QA:

```text
Line chart memiliki minimal 2 insight highlight yang jelas.
Titik highlight memakai warna berbeda sesuai makna.
Ada mini insight box di bawah chart untuk menjelaskan poin penting.
Jika ada target, target line ditampilkan jelas.
Titik highlight memiliki label atau tooltip yang menjelaskan kenapa penting.
Line chart mendukung storytelling, bukan hanya menunjukkan data mentah.
```

---

## Revisi Data Labels pada Grafik

Setiap grafik harus menampilkan **label angka langsung di visual**, tidak hanya mengandalkan tooltip.

Tujuannya:

```text
Membuat audiens langsung membaca nilai utama tanpa harus hover.
Mempercepat pemahaman pada mode presentasi.
Menyesuaikan gaya visual dengan contoh dashboard referensi.
```

### Aturan umum data labels

```text
Semua bar chart wajib menampilkan angka pada atau di ujung bar.
Line chart wajib menampilkan label minimal pada titik penting, seperti nilai tertinggi, terendah, dan titik highlight utama.
Scatter chart wajib menampilkan label selektif jika titik penting perlu ditekankan. Jika semua titik terlalu padat, tampilkan label hanya untuk titik utama.
KPI card tentu tetap menampilkan angka utama.
Table tetap menampilkan angka seperti biasa.
Tooltip tetap wajib ada, tetapi bukan satu-satunya tempat untuk melihat nilai.
```

### Aturan per jenis chart

#### Horizontal bar chart

Contoh seperti referensi yang diinginkan:

```text
Nilai utama ditampilkan di dalam bar, dekat sisi kiri atau tengah awal bar.
Nilai ringkas juga boleh ditampilkan di ujung kanan sebagai rounded format, misalnya $68K.
Gunakan background track agar panjang bar mudah dibandingkan.
```

Format yang disarankan:

```text
Di dalam bar  : $68,240
Di ujung kanan: $68K
```

Jika ruang sempit:

```text
Gunakan satu label saja, prioritaskan nilai penuh atau rounded value yang paling mudah dibaca.
```

#### Vertical bar chart

```text
Tampilkan nilai di atas batang.
Jika batang sangat pendek, label boleh diletakkan sedikit di atas atau di luar batang agar tetap terbaca.
```

#### Line chart

```text
Minimal tampilkan label pada titik maksimum, minimum, dan highlight utama seperti Q3 2026.
Jika chart quarter hanya punya 4 titik, tampilkan label angka pada semua titik.
```

#### Scatter chart

```text
Jangan label semua titik jika membuat chart berantakan.
Label hanya titik anomali, titik tertinggi, titik rugi, atau titik highlight yang relevan.
```

### Format angka data labels

Gunakan format konsisten:

```text
Sales / Revenue : $12,450 atau $12.5K
Profit          : $3,240 atau -$850
Margin          : 18.4%
Orders          : 247
Customers       : 89
Quantity        : 156
Discount        : 12.5%
```

Aturan formatting:

```text
Gunakan nilai penuh untuk chart dengan sedikit item.
Gunakan format ringkas K atau M jika chart lebar dan angka besar.
Jaga konsistensi dalam satu chart.
Jangan campur format acak dalam chart yang sama.
```

### Warna dan keterbacaan label

```text
Jika label berada di dalam bar berwarna gelap, gunakan teks terang atau putih.
Jika label berada di luar bar atau di area terang, gunakan teks gelap.
Pastikan kontras tinggi dan mudah terbaca.
Jangan biarkan label bertabrakan dengan axis atau elemen lain.
```

### Prioritas implementasi

Wajib diterapkan pada chart berikut:

```text
Tab 3 Tren Sales, semua chart quarter 2026.
Tab 4 Per Kategori, semua bar chart category dan sub-category.
Tab 5 Per Region, terutama sales dan profit by region.
Tab 6 Customer, terutama Top 10 Customer by Sales.
```

Opsional selektif:

```text
Scatter chart, hanya label titik penting.
Line chart bulanan, label titik penting saja jika terlalu padat.
```

### Instruksi implementasi D3.js

Dalam implementasi D3.js:

```text
Tambahkan layer text labels setelah bar, line, atau point dirender.
Gunakan formatter util bersama agar label dan tooltip konsisten.
Pastikan label ikut update saat data berubah.
Jika ada animation, label ikut transisi dengan posisi akhir yang benar.
```

Contoh helper format yang disarankan:

```js
const formatCurrency = (value) => {
  if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${Number(value).toLocaleString()}`;
};

const formatCurrencyFull = (value) => {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(Number(value)).toLocaleString()}`;
};

const formatPercent = (value) => `${(Number(value) * 100).toFixed(1)}%`;
```

### Tambahan ke checklist final

Tambahkan checklist berikut:

```text
Setiap chart utama memiliki data labels yang terlihat langsung.
Bar chart menampilkan nilai di bar atau di ujung bar.
Chart quarter 2026 menampilkan angka secara jelas.
Tooltip tetap ada walaupun label angka sudah tampil.
Label tidak bertumpuk dan tetap terbaca.
```

---

## Revisi Tooltip

Semua tooltip harus menjawab:

```text
Apa labelnya?
Berapa sales?
Berapa profit?
Bagaimana margin?
Berapa order/customer jika relevan?
Periode apa?
```

Minimal tooltip per chart:

```text
Label
Period
Sales
Profit
Profit Margin
Orders
Customers / Quantity jika relevan
Average Discount jika relevan
```

---

## Revisi Label dan Axis

Perbaiki chart yang terlalu padat.

Khusus chart bulanan:

- Jika masih dipakai, hanya tampilkan bulan 2026.
- Jangan tampilkan label semua bulan sampai bertumpuk.
- Gunakan rotasi label maksimal 35 derajat.
- Jika tetap padat, tampilkan label tiap quarter atau tiap 2 bulan.

Untuk chart quarter:

```text
Q1 2026
Q2 2026
Q3 2026
Q4 2026
```

---

## Revisi Empty / Error State

Jika data Q3 2026 tidak ada, jangan biarkan chart kosong tanpa penjelasan.

Tampilkan:

```text
Data Q3 2026 belum tersedia dari MySQL API.
```

Jika API gagal:

```text
Data belum bisa dimuat. Periksa endpoint API dan koneksi database.
```

---

## Checklist Setelah Revisi

Pastikan:

```text
Tab 1 memakai Q3 2026.
Tab 2 memakai Q3 2026 dan pembanding Q2 2026 jika tersedia.
Tab 3 hanya memakai Q1-Q4 2026.
Tab 4 memakai Q3 2026.
Tab 5 memakai Q3 2026.
Tab 6 memakai Q3 2026.
Tab 7 merangkum Q3 2026 dan konteks tren 2026.
Tidak ada visual utama yang memakai 2023, 2024, atau 2025.
Tidak ada chart multi-year.
Semua data berasal dari MySQL API.
Semua query memakai tabel `order` dengan backtick.
Tooltip informatif.
Warna merah hanya untuk masalah.
Judul dan subjudul mulai mengikuti storyboard.
Dashboard tetap punya 7 tab.
```

---

## Instruksi Eksekusi untuk Codex

Baca file revisi ini dari awal sampai akhir.

Dashboard sudah jadi, jadi jangan membuat ulang dari nol. Lakukan revisi bertahap:

1. Cek struktur project dan endpoint API yang sudah ada.
2. Tambahkan parameter `year` dan `quarter` pada endpoint yang relevan.
3. Tambahkan endpoint `sales-by-quarter` jika belum ada.
4. Ubah frontend agar memakai `YEAR = 2026` dan `FOCUS_QUARTER = 3`.
5. Revisi setiap tab sesuai scope baru.
6. Pastikan chart multi-year diganti dengan chart 2026 atau Q3 2026.
7. Pastikan semua tooltip dan warna semantik benar.
8. Jalankan project dan cek tidak ada error.
9. Jangan menambahkan storytelling final yang terlalu panjang dulu, cukup pastikan storyboard structure sudah benar.

Output akhir yang diharapkan:

```text
Dashboard Superstore 7 tab tetap berjalan, tetapi sekarang fokus pada 2026 dan Q3 2026 sesuai storyboard.
```
