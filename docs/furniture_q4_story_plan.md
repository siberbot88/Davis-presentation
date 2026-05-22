# Furniture Q4 2026 Story Plan

## Setup

Furniture mencatat revenue tinggi pada Q4 2026 dan menjadi salah satu area penting untuk outlook tahun depan.

## Conflict

Profitability Furniture tidak sebanding dengan revenue. Margin ditekan oleh sub-category, discount, region, atau customer tertentu.

## Resolution

Dashboard mengidentifikasi sumber profit leakage dan memberikan rekomendasi margin control untuk Q1 tahun depan.

## Chart Plan

| Chart | Narrative Moment | Insight Expected |
| --- | --- | --- |
| KPI Furniture Q4 | Hook | Revenue Furniture besar, margin perlu diuji |
| Category Sales vs Margin | Context | Furniture dibandingkan dengan kategori lain |
| Furniture Quarterly Trend | Momentum | Masalah profit terjadi di Q4 saja atau berulang sepanjang 2026 |
| Furniture Sub-Category Profit | Conflict | Sub-category penyebab profit leakage |
| Discount vs Margin | Root Cause | Discount atau cost burden menekan margin |
| Furniture Region and Customer | Insight | Masalah terkonsentrasi di region atau customer tertentu |
| Recommendation Summary | Action | Keputusan untuk Q1 tahun depan |

## Visual Decision Log

Warna:

- Merah dipakai hanya untuk profit negatif, margin negatif, loss order, atau risiko.
- Hijau dipakai untuk profit sehat dan margin terbaik.
- Kuning dipakai untuk discount tinggi atau area warning.
- Biru dipakai untuk Furniture sebagai fokus utama.

Judul:

- Semua judul diarahkan dari deskriptif menjadi berbasis temuan.
- Q4 2026 menjadi periode utama karena menjadi dasar outlook tahun depan.
- Furniture ditulis sebagai kategori, bukan segment, karena field database yang benar adalah `category`.

Anotasi:

- Anotasi dipakai pada sub-category, region, customer, dan quarter yang menjadi penyebab utama masalah.
- Q4 diberi highlight sebagai periode outlook.
- Profit negatif, margin rendah, dan discount tinggi diberi warna semantik.

Declutter:

- Chart tidak menampilkan semua label jika membuat padat.
- Label diprioritaskan untuk nilai utama, titik ekstrem, atau item yang menjadi fokus cerita.

## Cost Structure Note

Database tidak menyediakan komponen biaya aktual seperti COGS, shipping cost, atau operating cost. Karena itu, analisis cost structure memakai proxy `Sales - Profit` sebagai estimated cost burden dan `Estimated Cost Burden / Sales` sebagai cost ratio.
