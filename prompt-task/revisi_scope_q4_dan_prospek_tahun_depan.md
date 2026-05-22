# revisi_scope_q4_dan_prospek_tahun_depan.md

## Tujuan Revisi

Dashboard saat ini sudah fokus pada Q3 2026. Namun karena data Q4 sudah tersedia, narasi bisnis perlu diperbarui.

Fokus baru dashboard:

```text
Q4 2026 sebagai periode utama
2026 full year sebagai konteks
Q4 sebagai dasar membaca prospek tahun depan
```

Alasan perubahan:

```text
Q4 adalah kuartal penutup tahun.
Q4 lebih relevan untuk menilai momentum menuju tahun berikutnya.
Q4 dapat menunjukkan apakah performa akhir tahun menguat, melemah, atau berisiko.
```

Dashboard harus menjawab pertanyaan utama:

```text
Apakah performa Superstore di akhir 2026 memberi sinyal tahun depan akan lebih baik atau lebih buruk?
```

---

## Perubahan Scope Data

### Scope lama

```text
Tab 1 Pembuka      : Q3 2026
Tab 2 Overview     : Q3 2026, dibandingkan Q2 2026
Tab 3 Tren Sales   : Q1, Q2, Q3, Q4 2026
Tab 4 Per Kategori : Q3 2026
Tab 5 Per Region   : Q3 2026
Tab 6 Customer     : Q3 2026
Tab 7 Kesimpulan   : Q3 2026 + konteks tren 2026
```

### Scope baru

```text
Tab 1 Pembuka      : Q4 2026
Tab 2 Overview     : Q4 2026 dibandingkan Q3 2026
Tab 3 Tren Sales   : Q1, Q2, Q3, Q4 2026
Tab 4 Per Kategori : Q4 2026
Tab 5 Per Region   : Q4 2026
Tab 6 Customer     : Q4 2026
Tab 7 Kesimpulan   : prospek tahun depan berdasarkan Q4 dan tren 2026
```

---

## Konsep Storytelling Baru

Gunakan alur:

```text
Hook -> Context -> Momentum -> Driver -> Risk -> Outlook -> Action
```

Mapping ke tab:

```text
Tab 1 Pembuka      = Hook, performa Q4 sebagai sinyal akhir tahun
Tab 2 Overview     = Context, Q4 vs Q3
Tab 3 Tren Sales   = Momentum, posisi Q4 dalam tren 2026
Tab 4 Per Kategori = Driver, kategori pendorong atau penekan performa Q4
Tab 5 Per Region   = Risk / Opportunity, region yang memperkuat atau melemahkan outlook
Tab 6 Customer     = Outlook Support, customer dan segment sebagai dasar keberlanjutan
Tab 7 Kesimpulan   = Action, keputusan untuk tahun depan
```

---

## Pertanyaan Utama Dashboard

Semua slide harus membantu menjawab:

```text
Apakah momentum Q4 cukup kuat untuk menjadi dasar pertumbuhan tahun depan?
```

Pertanyaan pendukung:

```text
1. Apakah sales Q4 naik atau turun dari Q3?
2. Apakah profit Q4 ikut membaik?
3. Apakah margin Q4 sehat?
4. Kategori apa yang mendorong Q4?
5. Region mana yang memperkuat atau melemahkan performa Q4?
6. Customer utama Q4 menghasilkan profit sehat atau hanya volume?
7. Apa prioritas tahun depan berdasarkan pola Q4?
```

---

## Revisi API dan Frontend Scope

Ubah konstanta frontend:

```js
const YEAR = 2026;
const FOCUS_QUARTER = 4;
const COMPARISON_QUARTER = 3;
```

Gunakan parameter:

```js
const q4Params = `year=${YEAR}&quarter=${FOCUS_QUARTER}`;
const q3Params = `year=${YEAR}&quarter=${COMPARISON_QUARTER}`;
```

Data utama:

```js
const [
  summaryQ4,
  summaryQ3,
  salesByQuarter2026,
  categorySummaryQ4,
  subCategorySummaryQ4,
  regionSummaryQ4,
  segmentSummaryQ4,
  topCustomersQ4
] = await Promise.all([
  getJson(`/summary?${q4Params}`),
  getJson(`/summary?${q3Params}`),
  getJson(`/sales-by-quarter?year=${YEAR}`),
  getJson(`/category-summary?${q4Params}`),
  getJson(`/subcategory-summary?${q4Params}`),
  getJson(`/region-summary?${q4Params}`),
  getJson(`/segment-summary?${q4Params}`),
  getJson(`/top-customers?${q4Params}&limit=10`)
]);
```

Jangan lagi memakai Q3 sebagai fokus utama kecuali sebagai pembanding Q4.

---

## Revisi Judul Besar Dashboard

Gunakan judul berbasis temuan dan outlook.

Contoh jika Q4 naik:

```text
Q4 2026 Menguat, Momentum Tahun Depan Perlu Dijaga
```

Contoh jika Q4 turun:

```text
Q4 2026 Melemah, Risiko Awal Tahun Depan Perlu Diantisipasi
```

Contoh jika sales naik tetapi margin turun:

```text
Sales Q4 Naik, Margin Menentukan Kualitas Momentum Tahun Depan
```

Contoh jika profit kuat:

```text
Profit Q4 Menguat, Outlook Tahun Depan Lebih Positif
```

Contoh netral:

```text
Q4 2026 Menjadi Dasar Membaca Prospek Superstore Tahun Depan
```

---

# Revisi Per Tab

## Tab 1, Pembuka

### Fungsi

```text
Hook
```

Tab ini harus langsung menjelaskan bahwa Q4 menjadi dasar membaca tahun depan.

### Scope

```text
Q4 2026
```

### KPI utama

```text
Total Sales Q4 2026
Total Profit Q4 2026
Total Orders Q4 2026
Total Customers Q4 2026
Profit Margin Q4 2026
Average Discount Q4 2026
Average Order Value Q4 2026
```

### Judul yang disarankan

Jika Q4 positif:

```text
Q4 2026 Menguat sebagai Modal Awal Tahun Depan
```

Jika Q4 negatif:

```text
Q4 2026 Melemah dan Perlu Diantisipasi Sebelum Tahun Depan
```

Jika netral:

```text
Q4 2026 Menjadi Titik Baca Prospek Tahun Depan
```

### Catatan analisis

Label:

```text
Implikasi Bisnis
```

Template:

```text
Q4 2026 mencatat sales {salesQ4}, profit {profitQ4}, dan margin {marginQ4}. Angka ini menjadi dasar awal untuk menilai kesiapan Superstore memasuki tahun depan.
```

Jika Q4 naik dari Q3:

```text
Q4 mencatat sales {salesQ4}, naik {salesGrowth} dari Q3. Momentum ini positif jika profit dan margin juga ikut membaik.
```

Jika Q4 turun dari Q3:

```text
Q4 mencatat sales {salesQ4}, turun {salesGrowth} dari Q3. Risiko ini perlu ditelusuri sebelum menetapkan target tahun depan.
```

---

## Tab 2, Overview

### Fungsi

```text
Context
```

Tab ini membandingkan Q4 dengan Q3.

### Scope

```text
Q4 2026 vs Q3 2026
```

### Visual yang disarankan

```text
Sales Q3 vs Q4
Profit Q3 vs Q4
Margin Q3 vs Q4
Orders / Customers Q3 vs Q4
```

### Judul yang disarankan

Jika Q4 membaik:

```text
Q4 Membaik dari Q3, Profit Menentukan Kualitas Momentum
```

Jika Q4 melemah:

```text
Q4 Melemah dari Q3, Margin Menjadi Sinyal Risiko Tahun Depan
```

Jika sales naik profit turun:

```text
Sales Q4 Naik, Profit Tidak Mengikuti Arah yang Sama
```

Jika sales dan profit naik:

```text
Sales dan Profit Q4 Bergerak Naik dari Q3
```

### Catatan analisis

Label:

```text
Insight Utama
```

Template:

```text
Sales Q4 {naik/turun} {salesGrowth} dari Q3, sementara profit {naik/turun} {profitGrowth}. Prospek tahun depan lebih kuat jika kenaikan sales juga didukung margin yang sehat.
```

---

## Tab 3, Tren Sales

### Fungsi

```text
Momentum
```

Tab ini menunjukkan posisi Q4 dalam tahun 2026.

### Scope

```text
Q1, Q2, Q3, Q4 2026
```

### Visual utama

```text
Sales by Quarter 2026
Profit by Quarter 2026
Sales vs Profit by Quarter
```

### Judul yang disarankan

Jika Q4 tertinggi:

```text
Q4 Menjadi Puncak Sales 2026
```

Jika Q4 naik dari Q3 tetapi bukan tertinggi:

```text
Q4 Memperbaiki Momentum Setelah Q3
```

Jika Q4 turun:

```text
Q4 Menutup 2026 dengan Pelemahan Momentum
```

Jika Q4 profit terbaik:

```text
Profit Q4 Menjadi Sinyal Positif untuk Tahun Depan
```

### Anotasi wajib

Tandai:

```text
Quarter sales tertinggi
Quarter sales terendah
Q4 sebagai fokus outlook
Quarter profit tertinggi
Quarter profit terendah
```

### Mini insight chips

Contoh:

```text
Q1: baseline awal tahun
Q2: pelemahan / kenaikan
Q3: pembanding
Q4: outlook tahun depan
```

Gunakan data aktual untuk menentukan teks.

### Catatan analisis

Label:

```text
Catatan Analisis
```

Template:

```text
Q4 berada di posisi {rankQ4} dari empat quarter 2026. Posisi ini menjadi sinyal awal apakah target tahun depan perlu dibuat agresif atau lebih konservatif.
```

Jika Q4 tertinggi:

```text
Q4 menjadi quarter sales tertinggi 2026 dengan {salesQ4}. Momentum ini mendukung outlook positif jika profit dan margin juga berada di level sehat.
```

Jika Q4 terendah:

```text
Q4 menjadi quarter terlemah 2026 dengan {salesQ4}. Target tahun depan perlu disusun lebih hati-hati dengan fokus pada pemulihan profit.
```

---

## Tab 4, Per Kategori

### Fungsi

```text
Driver
```

Tab ini menjelaskan kategori apa yang mendorong atau menekan Q4.

### Scope

```text
Q4 2026
```

### Visual

```text
Sales by Category Q4
Profit Margin by Category Q4
Profit by Sub-Category Q4
```

### Judul yang disarankan

Jika satu kategori dominan:

```text
{TopCategory} Menjadi Pendorong Sales Q4
```

Jika top category margin rendah:

```text
{TopCategory} Memimpin Sales Q4, Margin Perlu Dikendalikan
```

Jika ada sub-category rugi:

```text
Sub-Category Rugi Menjadi Risiko Profit Q4
```

### Catatan analisis

Label:

```text
Prioritas Perhatian
```

Template:

```text
{topCategory} mencatat sales Q4 terbesar sebesar {topCategorySales}. Prioritas tahun depan adalah menjaga kontribusi kategori ini tanpa menekan margin.
```

Jika margin top category rendah:

```text
{topCategory} memimpin sales Q4, tetapi margin berada di bawah kategori lain. Strategi tahun depan perlu menyeimbangkan volume dan profitabilitas.
```

---

## Tab 5, Per Region

### Fungsi

```text
Risk / Opportunity
```

Tab ini menunjukkan region yang memperkuat atau melemahkan outlook tahun depan.

### Scope

```text
Q4 2026
```

### Visual

```text
Sales by Region Q4
Profit by Region Q4
Region Summary Q4
```

### Judul yang disarankan

Jika satu region kuat:

```text
{TopRegion} Menjadi Penopang Sales Q4
```

Jika top region margin terbaik juga:

```text
{TopRegion} Memimpin Sales dan Margin Q4
```

Jika ada region lemah:

```text
{WeakRegion} Menjadi Area Risiko untuk Tahun Depan
```

### Catatan analisis

Label:

```text
Insight Utama
```

Template:

```text
{topRegion} menyumbang sales region terbesar Q4 sebesar {topRegionSales}. Region dengan margin rendah perlu menjadi prioritas evaluasi sebelum target tahun depan ditetapkan.
```

Jika ada region negatif:

```text
{negativeRegion} mencatat profit negatif di Q4. Region ini perlu dievaluasi dari discount, product mix, dan efisiensi pemenuhan order.
```

---

## Tab 6, Customer

### Fungsi

```text
Outlook Support
```

Tab ini membaca apakah customer utama mendukung prospek tahun depan.

### Scope

```text
Q4 2026
```

### Visual

```text
Top 10 Customer by Sales Q4
Sales by Segment Q4
Profit by Segment Q4
```

### Judul yang disarankan

Jika top customer sehat:

```text
Customer Utama Q4 Mendukung Outlook Tahun Depan
```

Jika top customer profit negatif:

```text
Customer Sales Terbesar Q4 Menekan Profit
```

Jika kontribusi terkonsentrasi:

```text
Sales Q4 Bergantung pada Customer Utama
```

### Catatan analisis

Label:

```text
Insight Utama
```

Template:

```text
{topCustomer} mencatat sales Q4 terbesar sebesar {topCustomerSales}. Retensi customer utama penting, tetapi prioritas tahun depan harus tetap mempertimbangkan profit dan discount.
```

Jika top customer profit negatif:

```text
{topCustomer} mencatat sales terbesar tetapi profit negatif {topCustomerProfit}. Akun ini perlu ditinjau sebelum dijadikan prioritas pertumbuhan tahun depan.
```

---

## Tab 7, Kesimpulan

### Fungsi

```text
Action
```

Tab ini harus menjawab apakah outlook tahun depan cenderung baik atau buruk.

### Scope

```text
Q4 2026 + tren Q1-Q4 2026
```

### Judul

Jika Q4 kuat:

```text
Outlook Tahun Depan Positif, Margin Tetap Harus Dijaga
```

Jika Q4 lemah:

```text
Outlook Tahun Depan Perlu Disusun Lebih Konservatif
```

Jika campuran:

```text
Outlook Tahun Depan Bergantung pada Kualitas Profit Q4
```

### Struktur kesimpulan

Gunakan 3 bagian:

```text
1. Sinyal Positif
2. Risiko Utama
3. Arahan Tahun Depan
```

### Contoh isi dinamis

```text
Sinyal Positif:
Q4 mencatat sales {salesQ4} dan profit {profitQ4}. Kategori {topCategory} dan region {topRegion} menjadi pendorong utama.

Risiko Utama:
Margin rendah, discount tinggi, atau profit negatif pada kategori, region, atau customer tertentu dapat menekan target tahun depan.

Arahan Tahun Depan:
Target tahun depan sebaiknya difokuskan pada area dengan sales tinggi, margin sehat, dan customer yang menghasilkan profit positif.
```

### Catatan akhir

Label:

```text
Arahan Keputusan
```

Template:

```text
Jika momentum Q4 berlanjut, target tahun depan bisa dibuat lebih agresif pada area dengan margin sehat. Area dengan profit rendah perlu diselesaikan lebih dulu agar pertumbuhan tidak hanya berasal dari volume.
```

---

## Aturan Bahasa Baru

Karena dashboard ini sekarang membaca outlook tahun depan, gunakan bahasa seperti:

```text
momentum
outlook
sinyal awal
risiko
prioritas tahun depan
target tahun depan
kesiapan memasuki tahun depan
area pertumbuhan
profitabilitas berkelanjutan
```

Tetap hindari frasa:

```text
SO WHAT
perlu dibaca bersama
bukan satu-satunya ukuran sehat
ini menunjukkan bahwa
perlu dilihat lebih dalam
menjadi fokus evaluasi
```

Jangan gunakan em dash.

---

## Aturan Warna dan Highlight

Gunakan Q4 sebagai highlight utama.

```text
Q4 = primary blue atau dark green jika positif
Q3 = pembanding netral
Quarter terbaik = green
Quarter terlemah = red
Warning / risk = amber
Profit negatif = red
```

Pada tren quarter:

```text
Q4 harus terlihat sebagai titik fokus karena menjadi dasar outlook tahun depan.
```

---

## Checklist Revisi

Pastikan:

```text
Fokus utama berubah dari Q3 ke Q4.
Tab non-trend memakai Q4 2026.
Tab tren tetap memakai Q1-Q4 2026.
Q3 dipakai sebagai pembanding Q4, bukan fokus utama.
Judul dashboard membahas outlook tahun depan.
Catatan analisis mengarah ke keputusan tahun depan.
Kesimpulan menjawab apakah tahun depan cenderung positif, negatif, atau perlu hati-hati.
Semua angka berasal dari API.
Tidak ada teks Q3 sebagai fokus utama yang tertinggal.
Tooltip, data label, dan chart tetap berjalan.
```

---

## Instruksi untuk Codex

Revisi dashboard yang sudah ada. Jangan membangun ulang dari nol.

Lakukan:

```text
1. Ubah konstanta fokus dari quarter 3 ke quarter 4.
2. Jadikan Q4 2026 sebagai scope utama.
3. Gunakan Q3 2026 hanya sebagai pembanding.
4. Revisi semua judul, subtitle, insight note, callout, dan conclusion agar membahas outlook tahun depan.
5. Pastikan chart tren Q1-Q4 tetap ada dan Q4 menjadi highlight utama.
6. Pastikan tab kategori, region, dan customer memakai data Q4.
7. Pastikan kesimpulan memberi arahan untuk tahun depan.
8. Hapus narasi lama yang masih menyebut Q3 sebagai fokus analisis utama.
```

Output akhir:

```text
Dashboard menjadi alat presentasi untuk membaca performa Q4 2026 dan prospek tahun depan.
```
