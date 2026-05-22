# Audit Dashboard Q4 Furniture Storytelling

## 1. Executive Summary

- Dashboard sudah menjawab pertanyaan bisnis utama: mengapa Furniture tidak profitable meski revenue tinggi. Data Q4 menunjukkan Furniture memiliki revenue sekitar $91.2K, tetapi profit negatif sekitar -$841.9 dan margin -0.9%.
- Fokus Q4 2026 sudah konsisten. Q3 digunakan sebagai pembanding, sementara tren Q1 sampai Q4 digunakan untuk membaca momentum 2026.
- Furniture sudah dianalisis sebagai `category`, bukan `segment`. Backend memakai filter `category = 'Furniture'` pada endpoint khusus Furniture dan endpoint generik yang relevan.
- Visual sudah mendukung story arc manajerial: hook, context, momentum, conflict, root cause, insight, dan action.
- Dashboard layak untuk audiens manajerial dengan revisi kecil. Area yang paling perlu dirapikan adalah beberapa judul chart yang masih deskriptif, label "Top Segment" yang berpotensi membingungkan, dan anotasi yang masih lebih banyak berupa highlight warna serta insight card daripada callout langsung pada chart.

## 2. Skor Audit per Area

| Area Audit | Skor 1-5 | Status | Catatan Singkat |
| --- | ---: | --- | --- |
| Scope Q4 2026 | 5 | Sesuai | Q4 menjadi fokus utama di API, narasi, dan tab. |
| Fokus Furniture Profitability | 5 | Sesuai | Dashboard membahas revenue, profit, margin, discount, cost ratio, sub-category, region, customer, dan loss order. |
| Akurasi istilah Furniture sebagai Category | 4 | Cukup Sesuai | Filter backend benar memakai `category`. Satu label "Top Segment" di tab customer perlu dijelaskan sebagai customer segment, bukan Furniture segment. |
| Story Arc | 5 | Sesuai | Tujuh tab mengikuti alur Hook, Context, Momentum, Conflict, Root Cause, Insight, Action. |
| SCR Statement | 5 | Sesuai | SCR ada di dokumen story plan dan tercermin dalam urutan tab. |
| So What / Implikasi Bisnis | 4 | Cukup Sesuai | Setiap tab punya catatan analisis, tetapi beberapa catatan bisa lebih spesifik menyebut angka kunci. |
| Judul Naratif | 4 | Cukup Sesuai | Mayoritas judul naratif. Beberapa judul chart masih deskriptif, misalnya Profit Sub-Category Furniture Q4. |
| Pemilihan Chart | 5 | Sesuai | Chart sesuai narrative moment. |
| Data Label | 4 | Cukup Sesuai | Bar chart dan line chart punya label. Overlap label sudah diperbaiki, tetap perlu cek visual manual di mobile. |
| Tooltip | 4 | Cukup Sesuai | Tooltip informatif dan berisi metrik utama. Tidak semua tooltip memuat quantity, tetapi cukup untuk konteks chart. |
| Anotasi | 4 | Cukup Sesuai | Ada highlight Q4, peak, trough, worst sub-category, discount tertinggi, dan region risk. Callout langsung di dalam chart masih bisa diperkuat. |
| Warna Semantik | 5 | Sesuai | Merah untuk negatif atau risk, hijau untuk positif, kuning untuk warning, biru untuk fokus atau netral. |
| Visual Hierarchy | 4 | Cukup Sesuai | Chart dominan dan card pendukung compact. Beberapa slide cukup padat karena menampilkan chart, table, dan insight bersama. |
| Bento Grid | 5 | Sesuai | Layout memakai grid bento dengan card yang konsisten. |
| Glassmorphism | 4 | Cukup Sesuai | Efek glassmorphism modern dan masih terbaca. Background bisa sedikit dikurangi jika presentasi di proyektor kurang kontras. |
| Responsive Desktop | 5 | Sesuai | CSS desktop kuat, grid 12 kolom rapi. |
| Responsive Tablet | 4 | Cukup Sesuai | Grid sudah berubah menjadi 2 kolom atau 1 kolom. Perlu cek visual manual untuk chart panjang. |
| Responsive Mobile | 4 | Cukup Sesuai | Card stack vertikal dan tab scroll horizontal. Tooltip dan label perlu dicek manual pada layar kecil. |
| Kesiapan Presentasi 5 Menit | 5 | Sesuai | Script 5 menit tersedia dan struktur waktunya jelas. |
| Call to Action | 5 | Sesuai | Call to action jelas: pilot margin control untuk Furniture Q1 tahun depan. |

## 3. Temuan Utama

1. Dashboard sudah kuat secara analitis karena semua angka utama berasal dari endpoint API yang query ke MySQL table `` `order` ``.
2. Bukti profit leakage sudah lengkap: Q4 Furniture revenue $91.2K, profit -$841.9, margin -0.9%, loss rows 102, loss profit -$9.5K.
3. Sub-category penyebab utama terlihat jelas: Tables profit -$4.5K, margin -13.2%, average discount 24.8%, cost ratio 113.2%.
4. Region bermasalah juga terlihat: South profit -$1.35K, margin -6.9%; Central profit -$928, margin -6.2%, average discount 31.0%.
5. Risiko UX utama bukan pada data, tetapi pada penyempurnaan presentasi: beberapa judul chart masih deskriptif, beberapa anotasi belum menjadi callout eksplisit, dan label customer segment bisa disalahpahami.

## 4. Checklist Kepatuhan

### A. Scope Data

- [x] Dashboard fokus pada Q4 2026.
- [x] Q3 hanya digunakan sebagai pembanding Q4.
- [x] Tren 2026 hanya digunakan untuk melihat Q1 sampai Q4.
- [x] Tab kategori, region, dan customer memakai data Q4.
- [x] Tidak ada teks lama yang masih menyebut Q3 sebagai fokus utama.
- [x] Tidak ada visual utama yang kembali memakai data multi-year tanpa tujuan.

Catatan: `categorySummaryQ3` masih diambil oleh frontend, tetapi tidak menjadi fokus visual utama. Jika ingin lebih bersih, endpoint ini bisa dihapus dari `loadAnalyticsData` bila tidak dipakai.

### B. Fokus Pertanyaan Bisnis

- [x] Ada penjelasan bahwa Furniture adalah kategori, bukan segment.
- [x] Ada perbandingan revenue Furniture vs profit Furniture.
- [x] Ada profit margin Furniture.
- [x] Ada revenue share Furniture.
- [x] Ada profit share Furniture.
- [x] Ada analisis sub-category Furniture.
- [x] Ada analisis discount Furniture.
- [x] Ada analisis region Furniture.
- [x] Ada analisis customer Furniture.
- [x] Ada analisis cost structure proxy.
- [x] Ada rekomendasi konkret untuk tahun depan.

Kesimpulan: Dashboard sudah menjawab pertanyaan "Mengapa Furniture tidak profitable meski revenue tinggi?"

### C. SCR Statement

- [x] Setup menjelaskan konteks Furniture Q4.
- [x] Conflict menjelaskan masalah revenue tinggi tetapi profit rendah.
- [x] Resolution memberi arah analisis dan rekomendasi.
- [x] SCR terlihat dalam urutan tab, bukan hanya di dokumen.

SCR yang terlihat:

- Setup: Furniture menjadi kategori revenue penting pada Q4.
- Conflict: Furniture revenue besar tetapi profit negatif dan margin -0.9%.
- Resolution: Dashboard mengarahkan margin control melalui Tables, Bookcases, discount, South/Central, dan customer loss.

### D. Story Arc 7 Tab

- [x] Setiap tab punya satu pesan utama.
- [x] Urutan tab membentuk cerita yang logis.
- [x] Tidak ada tab yang terasa hanya kumpulan chart.
- [x] Tidak ada slide yang mencoba menyampaikan terlalu banyak insight.
- [x] Tab akhir memberikan keputusan atau rekomendasi yang jelas.

Catatan: Tab 6 menggabungkan customer, region profit, dan loss orders. Ini masih relevan, tetapi saat presentasi perlu dipandu dengan kalimat transisi agar audiens tidak membaca tab ini sebagai tiga analisis terpisah.

### E. So What / Implikasi Bisnis

- [x] Setiap tab punya catatan analisis singkat.
- [x] Label tidak memakai "SO WHAT".
- [x] Label memakai "Implikasi Bisnis", "Insight Utama", "Prioritas Perhatian", atau "Arahan Keputusan".
- [x] Catatan memakai angka aktual dari data.
- [x] Catatan maksimal 1 sampai 2 kalimat.
- [x] Catatan tidak mengulang judul chart secara mentah.
- [x] Catatan memberi makna bisnis, risiko, atau arah keputusan.

Catatan: Beberapa catatan sudah kuat, tetapi bisa lebih baik jika selalu menyebut angka kunci, misalnya margin Furniture -0.9%, Tables -13.2%, atau Central discount 31.0%.

### F. Judul Naratif

- [x] Judul menyebut metrik atau temuan.
- [x] Judul menyebut periode Q4 atau konteks tahun depan jika relevan.
- [x] Judul tidak generik.
- [x] Judul tidak hanya menjelaskan jenis chart.
- [x] Judul cocok untuk audiens manajerial.

Catatan: Judul slide sudah naratif. Beberapa judul chart masih bisa ditingkatkan:

- Profit Sub-Category Furniture Q4
- Profit Region Furniture Q4
- Top Loss Orders Furniture Q4

Judul tersebut masih benar, tetapi belum sekuat judul temuan.

### G. Chart Selection

- [x] Hook memakai KPI atau big number.
- [x] Context memakai comparison chart.
- [x] Momentum memakai trend Q1 sampai Q4.
- [x] Conflict memakai breakdown sub-category.
- [x] Root cause memakai discount vs margin atau cost burden.
- [x] Insight memakai region/customer breakdown.
- [x] Action memakai recommendation card.

Kesimpulan: Pemilihan chart sudah sesuai dengan narrative moment.

### H. Visual Hierarchy

- [x] Chart utama lebih dominan daripada teks.
- [x] Teks tidak terlalu besar.
- [x] KPI card tidak mengalahkan chart.
- [x] Insight card tidak terlalu ramai.
- [x] Elemen paling penting mudah dilihat.
- [x] Layout tidak membuat audiens bingung harus membaca dari mana.
- [x] Setiap slide punya fokus visual yang jelas.

Catatan: Setelah perbaikan label bar negatif, risiko tumpang tindih label berkurang. Tetap perlu cek manual pada layar kecil.

### I. Warna Semantik

- [x] Biru untuk data utama atau netral.
- [x] Hijau untuk profit positif, margin sehat, atau best performance.
- [x] Kuning/oranye untuk warning seperti discount tinggi.
- [x] Merah hanya untuk profit negatif, loss, margin negatif, atau risiko.
- [x] Tidak ada merah yang dipakai hanya karena item ranking pertama.
- [x] Warna tidak terlalu ramai.
- [x] Warna membantu cerita, bukan dekorasi.

### J. Anotasi

- [x] Ada peak marker.
- [x] Ada trough marker.
- [x] Ada highlight Q4.
- [x] Ada callout untuk profit negatif.
- [x] Ada callout untuk margin terendah.
- [x] Ada callout untuk discount tertinggi.
- [x] Ada anotasi pada sub-category penyebab profit leakage.
- [x] Anotasi tidak terlalu banyak.
- [x] Anotasi tidak mengulang visual.

Catatan: Anotasi sebagian besar muncul sebagai data label, warna, chart insight chip, dan insight card. Untuk kualitas presentasi yang lebih tinggi, 1 sampai 2 callout teks langsung di chart sub-category dan scatter discount bisa ditambahkan.

### K. Data Label dan Tooltip

- [x] Bar chart menampilkan angka langsung.
- [x] Line chart menampilkan label pada titik penting.
- [x] Scatter chart memberi label hanya pada titik penting.
- [x] Label tidak bertumpuk pada kasus desktop yang sudah diperbaiki.
- [x] Format angka konsisten.
- [x] Tooltip informatif.
- [x] Tooltip berisi Sales.
- [x] Tooltip berisi Profit.
- [x] Tooltip berisi Profit Margin.
- [x] Tooltip berisi Average Discount jika relevan.
- [x] Tooltip berisi Orders atau Quantity jika relevan.
- [ ] Tooltip belum divalidasi dengan screenshot mobile.

Catatan: Tooltip sudah punya reposition logic agar tidak keluar viewport, tetapi audit visual mobile belum dilakukan dengan browser screenshot.

### L. Cost Structure Proxy

- [x] Ada penjelasan bahwa cost structure memakai proxy.
- [x] Proxy dihitung sebagai Sales minus Profit.
- [x] Cost Ratio dihitung sebagai `(Sales - Profit) / Sales`.
- [x] Tidak ada klaim biaya aktual jika data tidak menyediakan biaya aktual.
- [x] Bahasa tetap jujur dan profesional.

Kesimpulan: Sudah sesuai.

### M. Desain Bento Grid dan Glassmorphism

- [x] Layout memakai bento grid.
- [x] Card terlihat modern dan bersih.
- [x] Glassmorphism tidak mengganggu keterbacaan.
- [x] Background gradient tidak terlalu ramai.
- [x] Border dan shadow halus.
- [x] Tidak ada dekorasi yang mengalahkan chart.
- [x] Card tidak terlalu besar.
- [x] Chart mendapat ruang paling besar.

### N. Responsive

Checklist desktop:

- [x] 7 tab terlihat rapi.
- [x] KPI card tidak terlalu tinggi.
- [x] Chart utama dominan.
- [x] Insight card compact.

Checklist tablet:

- [x] Grid tidak pecah menurut CSS.
- [x] KPI berubah menjadi 2 kolom jika perlu.
- [x] Chart tetap punya ruang minimum.
- [x] Tab masih bisa digunakan melalui horizontal scroll.

Checklist mobile:

- [x] Semua card stack vertikal.
- [x] Tab bisa scroll horizontal.
- [x] Chart tidak overflow menurut CSS container.
- [x] Font dibuat lebih kecil di breakpoint mobile.
- [ ] Tooltip mobile belum divalidasi dengan screenshot.
- [ ] Data label mobile belum divalidasi dengan screenshot.

### O. Script Presentasi 5 Menit

- [x] Ada pembuka yang kuat.
- [x] Ada konflik yang jelas.
- [x] Ada bukti dari chart.
- [x] Ada rekomendasi konkret.
- [x] Ada call to action.
- [x] Tidak terlalu banyak chart untuk 5 menit jika presenter mengikuti script.

Catatan: Script presentasi sudah tersedia di `docs/furniture_q4_presentation_script.md`. Untuk presentasi aktual, bagian Konflik & Bukti sebaiknya memakai angka detail yang sudah dihitung dari API.

## 5. Rekomendasi Perbaikan Prioritas

### Prioritas 1, Wajib

Masalah:
Beberapa judul chart masih deskriptif.

Dampak:
Audiens eksekutif harus menafsirkan sendiri pesan chart.

Rekomendasi:
Ubah judul chart yang masih generik menjadi berbasis temuan.

Contoh revisi:
`Profit Sub-Category Furniture Q4` menjadi `Tables Menjadi Penekan Profit Terbesar di Furniture Q4`.

### Prioritas 2, Wajib

Masalah:
Label "Top Segment" di Tab 6 bisa membingungkan karena audit menekankan Furniture sebagai category, bukan segment.

Dampak:
Audiens bisa salah memahami bahwa Furniture adalah segment.

Rekomendasi:
Ubah label menjadi `Customer Segment Furniture` atau `Segment Customer pada Order Furniture`.

Contoh revisi:
`Top Segment` menjadi `Customer Segment`.

### Prioritas 3, Wajib

Masalah:
Validasi mobile belum dilakukan dengan screenshot aktual.

Dampak:
Label dan tooltip berisiko bertumpuk pada layar kecil saat presentasi atau demo.

Rekomendasi:
Lakukan cek desktop, tablet, dan mobile dengan browser screenshot. Fokus pada chart sub-category, profit region, dan table loss orders.

Contoh revisi:
Jika label tetap padat di mobile, tampilkan label hanya untuk titik ekstrem.

### Prioritas 4, Penting

Masalah:
Anotasi masih banyak disampaikan melalui insight card, bukan callout langsung di chart.

Dampak:
Audiens perlu berpindah perhatian dari chart ke card untuk memahami titik penting.

Rekomendasi:
Tambahkan callout kecil langsung pada Tables, Q4, South, dan discount tertinggi.

Contoh revisi:
Callout pada bar Tables: `Profit terendah: -$4.5K`.

### Prioritas 5, Penting

Masalah:
Tab 6 memuat customer, region, dan loss orders sekaligus.

Dampak:
Slide bisa terasa padat jika presenter tidak mengarahkan alur baca.

Rekomendasi:
Urutkan narasi Tab 6: region dulu, customer kedua, loss order sebagai bukti terakhir.

Contoh revisi:
Insight note Tab 6 dimulai dengan `South dan Central menunjukkan tekanan region, lalu loss order menunjukkan contoh transaksi penyebabnya.`

### Prioritas 6, Penting

Masalah:
Beberapa insight note belum selalu menyebut angka kunci.

Dampak:
Narasi bisa terasa benar tetapi kurang tajam secara evidence-based.

Rekomendasi:
Masukkan angka terpenting pada note utama.

Contoh revisi:
`Tables menjadi prioritas review` menjadi `Tables mencatat profit -$4.5K dan margin -13.2%, sehingga menjadi prioritas review discount.`

### Prioritas 7, Opsional

Masalah:
Background glassmorphism cukup kuat.

Dampak:
Pada proyektor yang kontrasnya rendah, chart bisa kalah oleh efek visual.

Rekomendasi:
Kurangi opacity background gradient atau naikkan kontras chart card.

Contoh revisi:
Gunakan background card lebih solid pada mode presentasi.

### Prioritas 8, Opsional

Masalah:
Table loss orders berpotensi terlalu lebar di mobile.

Dampak:
Pengguna mobile harus scroll horizontal.

Rekomendasi:
Untuk mobile, tampilkan loss orders sebagai compact cards.

Contoh revisi:
Order ID, customer, sub-category, discount, profit, margin.

### Prioritas 9, Opsional

Masalah:
Dokumentasi script presentasi masih berupa poin umum.

Dampak:
Presenter perlu menambahkan angka secara manual.

Rekomendasi:
Tambahkan versi script dengan angka Q4 aktual dari API.

Contoh revisi:
Masukkan angka $91.2K, -$841.9, Tables -$4.5K, South -$1.35K.

## 6. Before-After Copywriting

### 1. Judul Slide

Sebelum:
Furniture Mendorong Revenue Q4, tetapi Margin Perlu Diuji

Sesudah:
Furniture Mencetak Revenue $91.2K di Q4, tetapi Profit Berakhir Negatif

Alasan:
Judul baru langsung menyebut angka, periode, dan konflik utama.

### 2. Judul Chart

Sebelum:
Profit Sub-Category Furniture Q4

Sesudah:
Tables Menekan Profit Furniture Q4 sebesar -$4.5K

Alasan:
Judul baru langsung menyampaikan temuan dan bukti utama.

### 3. Catatan Analisis

Sebelum:
Sub-category ini menjadi prioritas utama untuk evaluasi pricing dan discount.

Sesudah:
Tables mencatat margin -13.2% dan average discount 24.8%, sehingga review pricing dan batas discount perlu menjadi prioritas Q1.

Alasan:
Catatan baru lebih evidence-based dan lebih actionable.

### 4. Callout

Sebelum:
Discount tertinggi.

Sesudah:
Tables memiliki average discount 24.8% dan cost ratio 113.2%, sinyal profit leakage terbesar di Furniture Q4.

Alasan:
Callout baru menghubungkan discount dengan cost burden dan profit leakage.

### 5. Kesimpulan

Sebelum:
Furniture Perlu Strategi Margin Baru untuk Tahun Depan

Sesudah:
Pilot Margin Control Furniture Q1 Harus Dimulai dari Tables, South, dan Customer Loss

Alasan:
Kesimpulan baru lebih konkret karena menyebut area tindakan.

### 6. Customer Insight

Sebelum:
Customer terbesar perlu tetap menghasilkan profit.

Sesudah:
Ross Baird Mencatat Sales $3.6K, tetapi Profit -$557

Alasan:
Judul baru menunjukkan bahwa customer besar belum tentu profitable.

## 7. Before-After Visual / Layout

### 1. Elemen:
Judul chart sub-category profit.

Masalah:
Masih deskriptif dan belum menyebut Tables sebagai penyebab utama.

Rekomendasi:
Ubah menjadi judul temuan dan tambahkan callout pada bar Tables.

Alasan:
Audiens langsung melihat konflik utama tanpa perlu membaca semua bar.

### 2. Elemen:
Tab 6 insight cards.

Masalah:
Ada label "Top Segment" yang berpotensi disalahpahami.

Rekomendasi:
Ubah menjadi "Customer Segment" atau "Segment Customer Furniture".

Alasan:
Menjaga konsistensi terminologi Furniture sebagai category.

### 3. Elemen:
Scatter discount vs margin.

Masalah:
Label titik penting ada, tetapi callout bisnis belum cukup eksplisit.

Rekomendasi:
Tambahkan callout kecil pada Tables: `discount 24.8%, margin -13.2%`.

Alasan:
Scatter perlu membantu audiens melihat hubungan discount dan margin.

### 4. Elemen:
Table loss orders.

Masalah:
Tabel detail bagus untuk bukti, tetapi bisa terlalu padat di mobile.

Rekomendasi:
Pada mobile, ubah menjadi daftar compact cards atau tampilkan 5 order teratas saja.

Alasan:
Meningkatkan keterbacaan di layar kecil.

### 5. Elemen:
Glassmorphism background.

Masalah:
Efek visual sudah modern, tetapi bisa menurunkan kontras pada proyektor.

Rekomendasi:
Siapkan opsi CSS mode presentasi dengan card lebih solid dan background lebih tenang.

Alasan:
Presentasi eksekutif membutuhkan kontras tinggi dan fokus pada chart.

### 6. Elemen:
Insight note per tab.

Masalah:
Beberapa note belum selalu menampilkan angka kunci.

Rekomendasi:
Masukkan 1 angka utama per note, bukan semua angka.

Alasan:
Membuat narasi lebih tajam tanpa memenuhi slide dengan teks.

## 8. Keputusan Akhir

Keputusan: Layak dengan revisi kecil

Alasan:

1. Dashboard sudah menjawab pertanyaan utama dengan bukti dari revenue, profit, margin, sub-category, discount, cost ratio, region, customer, dan loss orders.
2. Scope Q4 2026 sudah konsisten, dan Furniture sudah dianalisis sebagai `category`.
3. Story arc tujuh tab sudah logis dan cocok untuk presentasi manajerial 5 menit.
4. Visual sudah modern, menggunakan bento grid dan glassmorphism, serta warna semantik sudah sesuai.
5. Revisi kecil masih diperlukan untuk memperkuat judul chart, memperjelas label customer segment, dan memvalidasi responsive mobile melalui screenshot.

## Checklist Ringkas Final

- [x] Q4 2026 menjadi fokus utama.
- [x] Furniture dianalisis sebagai category.
- [x] Pertanyaan "Mengapa Furniture tidak profitable meski revenue tinggi?" terjawab.
- [x] Ada bukti dari sub-category.
- [x] Ada bukti dari discount.
- [x] Ada bukti dari cost structure proxy.
- [x] Ada bukti dari region.
- [x] Ada bukti dari customer.
- [x] Ada rekomendasi margin control untuk tahun depan.
- [x] Ada call to action.
- [x] Setiap tab punya satu pesan utama.
- [x] Chart dipilih sesuai narrative moment.
- [x] Warna semantik digunakan dengan benar.
- [x] Anotasi membantu cerita.
- [x] Data label dan tooltip informatif.
- [x] Desain bersih, responsive, dan chart tetap dominan menurut audit kode.

Catatan akhir: Dashboard memenuhi standar utama audit, tetapi belum mencapai skor maksimal karena masih perlu validasi responsive aktual dan penyempurnaan copywriting pada beberapa judul chart.
