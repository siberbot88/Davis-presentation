# prompt_storytelling_dashboard_superstore.md

## Tujuan

Dashboard Superstore sudah jadi dan sudah direvisi agar fokus pada:

```text
Tahun utama: 2026
Fokus utama analisis: Q3 2026
Tab Tren Sales: Q1, Q2, Q3, Q4 tahun 2026
Tab lain: Q3 2026
```

Tugas sekarang adalah **membaca, menganalisis, dan memperbaiki storytelling dashboard** berdasarkan prinsip data storytelling yang sudah diberikan.

Jangan membangun ulang dashboard dari awal. Fokus pada:

```text
Judul naratif
Subjudul
Anotasi
Insight box
Callout
Kesimpulan
Rekomendasi
Urutan cerita antar tab
"So What?" tiap chart
```

---

## Instruksi Utama untuk Codex

Baca seluruh project dashboard yang sudah ada, khususnya:

```text
Struktur 7 tab
Komponen visual D3.js
Endpoint API yang dipakai
Data hasil query MySQL
Judul chart
Subjudul
Tooltip
Data label
Insight box
Kesimpulan
```

Setelah membaca, lakukan analisis storytelling.

Dashboard ini harus menjadi **web presentasi berbentuk storyboard**, bukan dashboard operasional biasa.

Gunakan prinsip:

```text
Data -> Narasi -> Visual
```

Data menjawab apa yang terjadi.  
Narasi menjawab mengapa ini penting.  
Visual membantu audiens memahami pola dengan cepat.

---

## Prinsip Storytelling yang Harus Dipakai

Gunakan langkah berikut:

```text
Hook
Context
Tension
Climax
Insight
Action
```

Mapping ke 7 tab:

```text
Tab 1 Pembuka      = Hook
Tab 2 Overview     = Context
Tab 3 Tren Sales   = Context + Tension awal
Tab 4 Per Kategori = Tension
Tab 5 Per Region   = Climax / area peluang dan risiko
Tab 6 Customer     = Insight pendukung
Tab 7 Kesimpulan   = Action
```

Setiap tab harus punya satu pesan utama.

Jangan membuat satu tab berisi terlalu banyak cerita.

---

## Prinsip "So What?" Test

Setiap chart harus lolos pertanyaan:

```text
So what?
```

Jika chart hanya menjawab "apa datanya", revisi judul atau anotasinya agar menjawab "apa artinya".

Contoh kurang baik:

```text
Sales by Region Q3 2026
```

Contoh lebih baik:

```text
West Menjadi Kontributor Utama, tetapi Profitability Region Perlu Dibaca Lebih Dalam
```

Contoh kurang baik:

```text
Top 10 Customer by Sales
```

Contoh lebih baik:

```text
Kontribusi Sales Terkonsentrasi pada Customer Utama, tetapi Profit Tetap Perlu Dicek
```

---

## Prinsip Minto Pyramid

Gunakan gaya top-down:

```text
Kesimpulan dulu -> bukti -> detail
```

Jangan membuat audiens menebak kesimpulan dari chart.

Setiap tab sebaiknya dimulai dengan:

```text
Judul naratif
Subjudul konteks
Chart pendukung
Anotasi / insight box
```

---

## Prinsip SCR Framework

Gunakan struktur:

```text
Setup    = kondisi awal / baseline
Conflict = masalah, gap, anomaly, tension
Resolution = insight dan rekomendasi
```

Contoh penerapan:

```text
Setup:
Q3 2026 menjadi fokus analisis performa Superstore.

Conflict:
Sales tidak selalu sejalan dengan profit. Beberapa area mungkin besar secara sales tetapi lemah secara margin.

Resolution:
Prioritaskan area dengan sales tinggi dan profit sehat, lalu evaluasi discount atau kategori yang menekan margin.
```

---

## Prinsip Visual Hierarchy

Pastikan visual mengarahkan mata audiens.

Gunakan warna secara semantik:

```text
Air Force Blue  = data normal
Sea Green       = hasil positif, profit sehat, growth, highest
Dark Spruce     = highlight positif kuat
Tertiary Yellow = warning, perhatian, target, discount tinggi
Error Red       = loss, profit negatif, titik terendah, masalah
Pale Sky        = background track
Cool Steel      = data sekunder
```

Larangan:

```text
Jangan memakai merah hanya karena bar berada di urutan pertama.
Jangan memakai terlalu banyak warna tanpa arti.
Jangan membuat semua kategori punya warna berbeda jika tidak ada pesan.
Jangan label semua titik jika membuat chart berantakan.
```

---

## Prinsip Anotasi

Tambahkan anotasi yang membantu, bukan mengulang visual.

Anotasi yang harus ada:

```text
Peak / trough marker
Event marker jika ada alasan data
Target line atau benchmark jika relevan
Callout pada area masalah
Mini insight chips di bawah line chart
```

Hindari:

```text
Memberi label semua titik data.
Callout terlalu besar.
Anotasi yang hanya mengulang judul.
Anotasi tanpa interpretasi.
```

Contoh anotasi baik:

```text
Q3 menjadi titik pemulihan setelah Q2 melemah.
Region West menyumbang sales terbesar, tetapi margin tetap perlu dibandingkan.
Customer tertinggi belum tentu paling menguntungkan jika profit negatif.
```

---

## Scope Data yang Tidak Boleh Diubah

Pertahankan scope data:

```text
Tab 1 Pembuka      : Q3 2026
Tab 2 Overview     : Q3 2026, boleh dibandingkan Q2 2026
Tab 3 Tren Sales   : Q1, Q2, Q3, Q4 tahun 2026
Tab 4 Per Kategori : Q3 2026
Tab 5 Per Region   : Q3 2026
Tab 6 Customer     : Q3 2026
Tab 7 Kesimpulan   : Q3 2026 + konteks tren 2026
```

Jangan kembalikan chart ke multi-year.

Jangan tampilkan 2023, 2024, atau 2025 sebagai visual utama.

---

# Revisi Storytelling per Tab

## Tab 1, Pembuka

### Fungsi naratif

```text
Hook
```

Tab ini harus membuat audiens langsung paham:

```text
Apa topik dashboard?
Periode apa yang dianalisis?
Kenapa Q3 2026 penting?
Apa metrik utama yang perlu dilihat?
```

### Revisi yang harus dilakukan

Buat judul naratif, bukan hanya deskriptif.

Contoh judul:

```text
Q3 2026 Menjadi Fokus Evaluasi Kinerja Superstore
```

Alternatif jika data mendukung:

```text
Sales Q3 2026 Kuat, tetapi Profit Tetap Harus Dibaca Lebih Dalam
```

Subjudul:

```text
Analisis ini merangkum sales, profit, order, customer, category, region, dan customer contribution pada Q3 2026.
```

Tambahkan hook box singkat:

```text
Pertanyaan utama:
Apakah pertumbuhan sales Q3 2026 sudah diikuti profit yang sehat?
```

Jangan terlalu banyak chart di tab pembuka.

---

## Tab 2, Overview

### Fungsi naratif

```text
Context
```

Tab ini harus menjawab:

```text
Bagaimana performa Q3 2026 secara umum?
Apakah Q3 lebih baik atau lebih buruk dari Q2?
Apakah sales dan profit bergerak searah?
```

### Revisi yang harus dilakukan

Gunakan judul yang menunjukkan konteks.

Contoh:

```text
Q3 2026 Perlu Dibaca dari Sales dan Profit, Bukan Sales Saja
```

Tambahkan comparison box:

```text
Q3 vs Q2
Sales: naik/turun ...
Profit: naik/turun ...
Margin: membaik/memburuk ...
```

Jangan hanya menampilkan angka, tambahkan kalimat interpretasi.

Contoh:

```text
Jika sales naik tetapi profit tidak ikut naik, berarti pertumbuhan belum sepenuhnya sehat.
```

---

## Tab 3, Tren Sales

### Fungsi naratif

```text
Context + Tension awal
```

Tab ini harus fokus pada:

```text
Q1, Q2, Q3, Q4 tahun 2026
```

### Revisi yang harus dilakukan

Judul harus menjelaskan posisi Q3 dalam tren 2026.

Contoh:

```text
Tren 2026 Menunjukkan Posisi Q3 di Tengah Perubahan Sales dan Profit
```

Jika Q3 adalah quarter terbaik:

```text
Q3 Menjadi Titik Terkuat 2026, tetapi Profit Perlu Tetap Dibandingkan
```

Jika Q3 bukan terbaik:

```text
Q3 Belum Menjadi Puncak 2026, sehingga Perlu Dilihat Faktor Pendorongnya
```

Tambahkan insight highlight pada line chart atau quarter chart:

```text
Quarter tertinggi
Quarter terendah
Q3 highlight
Periode konsisten naik
Periode profit lemah
```

Gunakan mini insight chips seperti:

```text
Q1: baseline
Q2: penurunan / recovery
Q3: fokus analisis
Q4: pembanding akhir tahun
```

Warna:

```text
Q3 = highlight khusus
Quarter terbaik = hijau
Quarter terlemah = merah
Target / benchmark = kuning
```

---

## Tab 4, Per Kategori

### Fungsi naratif

```text
Tension
```

Tab ini harus menjawab:

```text
Kategori mana yang mendorong sales?
Kategori mana yang profitabilitasnya lemah?
Apakah sales tinggi sama dengan profit tinggi?
```

### Revisi judul

Contoh:

```text
Kategori Q3 2026 Menunjukkan Sales Besar Belum Tentu Margin Terbaik
```

Atau jika data menunjukkan kategori tertentu dominan:

```text
Technology Memimpin Sales Q3, tetapi Margin Perlu Dibandingkan antar Kategori
```

### Anotasi wajib

Tambahkan callout untuk:

```text
Kategori sales tertinggi
Kategori margin tertinggi
Kategori margin terendah
Sub-category dengan profit negatif atau paling rendah
```

Contoh insight box:

```text
Insight:
Kategori dengan sales terbesar belum tentu menjadi kategori paling sehat jika margin lebih rendah dari kategori lain.
```

---

## Tab 5, Per Region

### Fungsi naratif

```text
Climax / area peluang dan risiko
```

Tab ini harus menjawab:

```text
Region mana yang menjadi kontributor utama?
Region mana yang paling profitabel?
Region mana yang perlu perhatian?
Apakah ada region dengan sales tinggi tetapi profit rendah?
```

### Revisi judul

Contoh:

```text
Region Q3 2026 Memperlihatkan Kontributor Utama dan Area yang Perlu Perhatian
```

Atau jika data mendukung:

```text
West Menjadi Penopang Sales, tetapi Kualitas Profit antar Region Tidak Merata
```

### Anotasi wajib

Tambahkan callout:

```text
Region sales tertinggi
Region profit margin tertinggi
Region profit margin terendah
Region dengan discount tinggi jika tersedia
```

Mini insight box:

```text
Kontributor utama
Margin terbaik
Area perhatian
```

---

## Tab 6, Customer

### Fungsi naratif

```text
Insight pendukung
```

Tab ini harus menjawab:

```text
Apakah sales Q3 2026 terkonsentrasi pada customer tertentu?
Apakah top customer juga profitable?
Segment mana yang paling berkontribusi?
Apakah ada customer besar yang profitnya rendah atau negatif?
```

### Revisi judul

Contoh:

```text
Kontribusi Customer Q3 2026 Terkonsentrasi, tetapi Profit Harus Tetap Dicek
```

### Aturan penting

Pada Top 10 Customer chart:

```text
Jangan memberi warna merah pada customer ranking pertama jika tidak ada masalah.
Merah hanya untuk profit negatif atau margin negatif.
Top customer dengan profit sehat gunakan hijau atau dark spruce.
Customer normal gunakan Air Force Blue.
```

### Anotasi wajib

Tambahkan callout untuk:

```text
Top customer by sales
Top customer by profit jika berbeda
Customer dengan profit negatif
Segment dengan kontribusi terbesar
```

---

## Tab 7, Kesimpulan

### Fungsi naratif

```text
Action
```

Tab ini harus menjadi penutup yang actionable.

Jangan hanya berisi angka.

Susun menjadi:

```text
1. Apa yang berjalan baik
2. Apa yang perlu perhatian
3. Apa yang harus dilakukan
```

Contoh struktur:

```text
Positif:
- Q3 2026 menunjukkan kontribusi sales yang kuat pada periode analisis.
- Region/category tertentu menjadi pendorong utama performa.

Perhatian:
- Sales tinggi belum tentu menghasilkan profit margin terbaik.
- Beberapa area perlu dicek karena profit rendah, margin lemah, atau discount tinggi.

Action:
- Prioritaskan kategori dan region dengan kombinasi sales dan margin sehat.
- Evaluasi discount pada sub-category atau customer yang menekan profit.
- Fokus follow-up pada area Q3 yang punya sales besar tetapi profit rendah.
```

Pastikan angka penting tetap berasal dari API.

---

## Output yang Diminta dari Codex

Lakukan revisi pada project yang sudah ada:

```text
1. Baca semua visual dan data yang sudah tersedia.
2. Identifikasi insight utama dari setiap tab.
3. Revisi judul tab dan judul chart agar lebih naratif.
4. Tambahkan subjudul yang menjelaskan konteks.
5. Tambahkan anotasi dan mini insight box pada chart penting.
6. Pastikan line chart memiliki highlight seperti titik tertinggi, terendah, Q3, dan periode penting.
7. Pastikan bar chart memiliki data label dan callout untuk item utama.
8. Revisi kesimpulan agar berisi positive, attention, dan action.
9. Jangan mengubah scope data.
10. Jangan membangun ulang dashboard dari nol.
```

---

## Checklist Storytelling Final

Sebelum selesai, pastikan:

```text
Setiap tab punya satu pesan utama.
Setiap chart lolos So What test.
Judul chart tidak hanya deskriptif, tetapi mulai naratif.
Ada anotasi pada grafik penting.
Ada warna semantik yang konsisten.
Ada mini insight box untuk highlight penting.
Tooltip tetap informatif.
Data labels tetap tampil pada chart utama.
Kesimpulan punya rekomendasi yang actionable.
Dashboard tetap 7 tab.
Data tetap fokus pada 2026 dan Q3 2026.
```

---

## Instruksi Singkat untuk Eksekusi

Baca prompt ini dari awal sampai akhir. Setelah itu, analisis dashboard yang sudah jadi, lalu revisi storytelling-nya sesuai prinsip:

```text
Hook -> Context -> Tension -> Climax -> Insight -> Action
```

Jangan langsung menulis ulang semua kode tanpa melihat struktur project. Pertahankan visual yang sudah berjalan, lalu tambahkan narasi, anotasi, highlight, dan kesimpulan yang lebih kuat.

---

# Revisi Tambahan: Catatan Analisis “So What” di Setiap Slide

## Tujuan

Tambahkan **catatan analisis singkat** pada setiap slide seperti contoh referensi:

```text
Revenue bulanan menunjukkan tren positif sejak April 2024. Sejak Juli, Northwind konsisten melampaui target bulanan $90K.
```

Namun untuk dashboard Superstore, catatan tersebut harus:

```text
Singkat.
Berbasis angka aktual dari grafik/API.
Menjawab “So what?”
Tidak hanya menjelaskan ulang chart.
Tidak terlalu panjang.
Diletakkan di bawah visual utama atau di bagian akhir slide.
```

Catatan ini berfungsi sebagai **interpretasi cepat** agar audiens tidak perlu menebak makna grafik.

---

## Aturan Umum Catatan “So What”

Setiap slide wajib memiliki minimal **1 catatan analisis**.

Format tampilan:

```text
Satu kotak catatan pendek di bawah visual utama.
Gunakan background lembut seperti surface-container atau pale-sky.
Berikan border kiri tebal warna primary atau warna semantik sesuai isi.
Teks maksimal 1 sampai 2 kalimat.
```

Gaya visual seperti contoh:

```css
.insight-note {
  margin-top: 24px;
  padding: 18px 22px;
  border-left: 4px solid var(--primary);
  background: var(--surface-container-high);
  color: var(--primary-deep);
  line-height: 1.7;
  font-size: 14px;
}
```

Jika catatan berisi warning atau masalah:

```css
.insight-note.warning {
  border-left-color: var(--tertiary);
}

.insight-note.negative {
  border-left-color: var(--error);
}

.insight-note.positive {
  border-left-color: var(--sea-green);
}
```

---

## Isi Catatan Harus Berbasis Data Aktual

Catatan tidak boleh hardcode.

Ambil angka dari data API yang sudah dipakai chart.

Contoh pola:

```js
const topCategory = categorySummaryQ3[0];
const lowestMarginCategory = [...categorySummaryQ3].sort((a, b) => a.profitMargin - b.profitMargin)[0];

const note = `${topCategory.category} menjadi kategori sales terbesar Q3 2026 dengan ${formatCurrency(topCategory.sales)}, tetapi ${lowestMarginCategory.category} memiliki margin terendah (${formatPercent(lowestMarginCategory.profitMargin)}).`;
```

Catatan harus berubah otomatis jika data berubah.

---

## Panjang Catatan

Maksimal:

```text
1 sampai 2 kalimat.
Idealnya 18 sampai 35 kata.
Jangan membuat paragraf panjang.
```

Contoh baik:

```text
Technology menjadi kontributor sales terbesar Q3 2026 dengan $245K, tetapi margin tertinggi justru datang dari kategori lain. Fokus berikutnya adalah menjaga sales tanpa menekan profit.
```

Contoh terlalu panjang:

```text
Pada slide ini kita dapat melihat bahwa Technology memiliki sales tertinggi dibandingkan kategori lain, kemudian Furniture berada di urutan kedua, lalu Office Supplies berada di urutan ketiga, dan jika kita lihat lebih jauh profit margin masing-masing kategori menunjukkan perbedaan yang cukup penting untuk dianalisis...
```

Hindari yang terlalu panjang seperti itu.

---

## Struktur Kalimat yang Disarankan

Gunakan salah satu pola berikut:

### Pola 1, Temuan + Makna

```text
{Dimensi utama} mencatat {angka utama}, menunjukkan {makna bisnis singkat}.
```

Contoh:

```text
West menyumbang sales terbesar Q3 2026 sebesar $725K, sehingga region ini menjadi penopang utama performa kuartal.
```

### Pola 2, Kontras Sales vs Profit

```text
{Dimensi A} unggul dalam sales, tetapi {metrik profit/margin} menunjukkan area yang perlu dicek.
```

Contoh:

```text
Technology unggul dalam sales Q3 2026, tetapi margin per kategori menunjukkan profitabilitas tidak selalu mengikuti volume penjualan.
```

### Pola 3, Ranking + Action

```text
{Item teratas} menjadi kontributor utama, jadi strategi Q4 perlu {aksi singkat}.
```

Contoh:

```text
Top customer menyumbang sales terbesar di Q3 2026, jadi retensi customer utama perlu diprioritaskan tanpa mengabaikan margin.
```

### Pola 4, Warning

```text
{Item bermasalah} menunjukkan {angka negatif/rendah}, sehingga perlu evaluasi {penyebab potensial}.
```

Contoh:

```text
Sub-category dengan profit negatif perlu segera dicek, terutama terkait discount, harga jual, dan biaya pemenuhan order.
```

---

# Revisi Per Slide untuk Catatan “So What”

## Tab 1, Pembuka

Tambahkan catatan di bawah KPI atau chart ringkas.

Catatan harus menjawab:

```text
Apa kondisi utama Q3 2026?
Apakah sales dan profit terlihat sehat?
Apa pertanyaan utama analisis?
```

Template dinamis:

```text
Q3 2026 mencatat sales {totalSales} dan profit {totalProfit}, dengan margin {profitMargin}. Fokus analisis adalah memastikan sales besar juga menghasilkan profit yang sehat.
```

Jika profit negatif:

```text
Q3 2026 mencatat sales {totalSales}, tetapi profit masih negatif sebesar {totalProfit}. Analisis perlu fokus pada area yang menekan margin.
```

---

## Tab 2, Overview

Tambahkan catatan di bawah visual Q3 vs Q2.

Catatan harus menjawab:

```text
Q3 membaik atau melemah dibanding Q2?
Apakah profit ikut bergerak searah dengan sales?
```

Template dinamis:

```text
Dibanding Q2, sales Q3 2026 {naik/turun} {growthSales}, sementara profit {naik/turun} {growthProfit}. Ini menunjukkan apakah pertumbuhan kuartal sudah sehat atau masih perlu diperiksa dari sisi margin.
```

Jika tidak ada Q2:

```text
Overview Q3 2026 menunjukkan sales {totalSales} dengan profit {totalProfit}. Tanpa pembanding Q2, fokus analisis diarahkan pada kontribusi kategori, region, dan customer.
```

---

## Tab 3, Tren Sales

Tambahkan catatan di bawah chart Q1-Q4 2026.

Catatan harus menjawab:

```text
Quarter mana tertinggi?
Quarter mana terendah?
Bagaimana posisi Q3?
```

Template dinamis:

```text
{bestQuarter} menjadi quarter sales tertinggi 2026 dengan {bestSales}, sedangkan {lowestQuarter} menjadi terendah. Q3 berada di posisi {rankQ3}, sehingga perlu dilihat apakah performanya didorong profit yang sehat.
```

Jika Q3 adalah tertinggi:

```text
Q3 menjadi quarter sales tertinggi 2026 dengan {q3Sales}. Pertanyaan berikutnya adalah apakah kenaikan ini juga tercermin pada profit dan margin.
```

Untuk line chart bulanan 2026, tambahkan mini insight chips:

```text
{lowestMonth}: terendah {lowestSales}
{highestMonth}: tertinggi {highestSales}
{consistentPeriod}: konsisten above target / naik
```

---

## Tab 4, Per Kategori

Tambahkan catatan di bawah grafik kategori.

Catatan harus menjawab:

```text
Kategori mana sales terbesar?
Kategori mana margin/profit terbaik?
Apakah ada gap antara sales dan profit?
```

Template dinamis:

```text
{topCategory} menjadi kategori sales terbesar Q3 2026 dengan {topCategorySales}, tetapi margin terbaik ada pada {bestMarginCategory} ({bestMargin}). Ini menunjukkan sales terbesar belum tentu paling menguntungkan.
```

Jika kategori sales terbesar juga margin terbaik:

```text
{topCategory} memimpin sales sekaligus margin Q3 2026, sehingga kategori ini menjadi kontributor paling sehat untuk dipertahankan.
```

Jika ada sub-category profit negatif:

```text
{worstSubCategory} mencatat profit terendah sebesar {worstProfit}, sehingga perlu dicek dari sisi discount, pricing, atau biaya pemenuhan.
```

---

## Tab 5, Per Region

Tambahkan catatan di bawah grafik region.

Catatan harus menjawab:

```text
Region mana sales terbesar?
Region mana margin terbaik?
Region mana perlu perhatian?
```

Template dinamis:

```text
{topRegion} menjadi region sales terbesar Q3 2026 dengan {topRegionSales}, sementara {bestMarginRegion} memiliki margin terbaik ({bestMargin}). Perbedaan ini penting untuk membedakan volume dan kualitas profit.
```

Jika ada region profit negatif:

```text
{negativeRegion} mencatat profit negatif pada Q3 2026 meski tetap menghasilkan sales. Region ini perlu diprioritaskan untuk evaluasi discount dan product mix.
```

---

## Tab 6, Customer

Tambahkan catatan di bawah Top Customer atau Segment chart.

Catatan harus menjawab:

```text
Apakah sales terkonsentrasi pada customer tertentu?
Apakah top customer menguntungkan?
Segment mana dominan?
```

Template dinamis:

```text
{topCustomer} menjadi customer sales terbesar Q3 2026 dengan {topCustomerSales}. Namun kontribusi customer utama tetap perlu dibandingkan dengan profit agar strategi retensi tidak hanya mengejar volume.
```

Jika top customer profit negatif:

```text
{topCustomer} menjadi customer sales terbesar, tetapi profitnya negatif sebesar {topCustomerProfit}. Ini menjadi sinyal untuk mengevaluasi discount atau biaya layanan customer tersebut.
```

Untuk segment:

```text
Segment {topSegment} menyumbang sales terbesar Q3 2026 sebesar {topSegmentSales}, sehingga strategi customer dapat difokuskan pada segment ini sambil menjaga margin.
```

---

## Tab 7, Kesimpulan

Catatan di slide kesimpulan harus berbentuk final takeaway.

Gunakan 3 kotak singkat:

```text
Positif
Perhatian
Action
```

Contoh dinamis:

```text
Positif:
Q3 2026 menunjukkan sales {totalSales} dengan kontributor utama dari {topRegion} dan {topCategory}.

Perhatian:
Area dengan margin rendah atau profit negatif perlu dicek karena sales besar belum tentu menghasilkan profit sehat.

Action:
Prioritaskan kategori, region, dan customer dengan kombinasi sales tinggi dan margin sehat; evaluasi discount pada area yang menekan profit.
```

---

## Komponen UI yang Harus Ditambahkan

Buat komponen reusable:

```js
renderInsightNote(container, {
  tone: "neutral" | "positive" | "warning" | "negative",
  text: "..."
});
```

Atau jika struktur project lebih cocok dengan HTML string:

```js
function createInsightNote({ tone = "neutral", text }) {
  return `
    <div class="insight-note ${tone}">
      ${text}
    </div>
  `;
}
```

Gunakan di setiap tab.

---

## Aturan Kualitas Catatan

Pastikan:

```text
Setiap slide punya minimal satu catatan So What.
Catatan memakai angka aktual dari data/API.
Catatan tidak lebih dari 2 kalimat.
Catatan tidak hanya mengulang judul chart.
Catatan memberi interpretasi bisnis singkat.
Catatan memakai tone warna yang sesuai.
Catatan tidak hardcode angka.
```

---

## Checklist Tambahan untuk Codex

Sebelum selesai, cek:

```text
Tab 1 memiliki catatan Q3 2026 berbasis KPI aktual.
Tab 2 memiliki catatan Q3 vs Q2 atau overview Q3.
Tab 3 memiliki catatan posisi Q3 dalam Q1-Q4 2026.
Tab 4 memiliki catatan kategori sales vs margin.
Tab 5 memiliki catatan region sales vs margin.
Tab 6 memiliki catatan top customer / segment.
Tab 7 memiliki catatan positif, perhatian, dan action.
Semua catatan singkat.
Semua angka berasal dari API.
Tidak ada placeholder seperti {totalSales} yang tertinggal di UI.
```

---

