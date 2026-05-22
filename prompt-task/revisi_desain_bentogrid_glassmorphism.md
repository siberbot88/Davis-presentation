# revisi_desain_bentogrid_glassmorphism.md

## Tujuan Revisi

Dashboard Superstore sudah berjalan dan storytelling sudah mulai terbentuk. Revisi ini berfokus pada **polishing desain visual** agar dashboard terlihat lebih modern, clean, profesional, dan layak dipresentasikan ke audiens manajerial atau eksekutif.

Jangan membangun ulang dashboard dari nol. Pertahankan struktur 7 tab, data, D3.js chart, API, dan storytelling yang sudah ada.

Fokus revisi:

```text
Clean executive dashboard
Primary blue sebagai warna utama
Bento grid layout
Glassmorphism cards
Background blur dengan gradient biru, hijau, dan ungu
Visual hierarchy yang lebih premium
Tetap readable dan profesional
```

---

## Referensi Style Lama Project

CSS project sebelumnya sudah memiliki fondasi warna yang bagus:

```css
:root {
  --surface: #fbf8ff;
  --surface-container-lowest: #ffffff;
  --surface-container-low: #f3f2ff;
  --surface-container: #ededfa;
  --surface-container-high: #e8e7f4;
  --surface-container-highest: #e2e1ef;

  --on-surface: #191b24;
  --on-surface-variant: #434656;

  --outline: #747688;
  --outline-variant: #c4c5d9;

  --primary: #2d5afe;
  --primary-deep: #003fde;

  --secondary: #8b5cf6;
  --tertiary: #f59e0b;
  --success: #10b981;
  --error: #ba1a1a;

  --background: #f8fafc;
  --deep-obsidian: #121212;
}
```

Pertahankan karakter ini, tetapi naikkan kualitas visualnya menjadi lebih modern.

---

## Arah Desain Baru

Gunakan style:

```text
Modern executive presentation
Bento dashboard
Soft glassmorphism
Clean blue primary
Subtle luxury gradient
Large whitespace
Clear hierarchy
Rounded cards
Soft shadows
Readable chart panels
```

Jangan membuat desain menjadi terlalu ramai atau terlalu futuristik. Tetap jaga kesan profesional.

---

## Palette Baru yang Disarankan

Tambahkan atau sesuaikan CSS variables berikut:

```css
:root {
  --primary: #2d5afe;
  --primary-deep: #003fde;
  --primary-soft: rgba(45, 90, 254, 0.12);

  --accent-purple: #8b5cf6;
  --accent-purple-soft: rgba(139, 92, 246, 0.14);

  --accent-green: #10b981;
  --accent-green-deep: #0a8754;
  --accent-green-soft: rgba(16, 185, 129, 0.14);

  --glass-bg: rgba(255, 255, 255, 0.68);
  --glass-bg-strong: rgba(255, 255, 255, 0.82);
  --glass-border: rgba(255, 255, 255, 0.56);
  --glass-border-strong: rgba(196, 197, 217, 0.72);

  --text-main: #111827;
  --text-muted: #4b5563;
  --text-soft: #6b7280;

  --bento-shadow: 0 24px 80px rgba(15, 23, 42, 0.10);
  --bento-shadow-hover: 0 28px 96px rgba(45, 90, 254, 0.16);

  --radius-bento: 28px;
  --radius-card: 24px;
  --radius-pill: 999px;
}
```

Tetap gunakan warna semantik:

```text
Blue    = data normal, primary insight
Green   = positive, profit, growth, best performance
Yellow  = warning, discount tinggi, perhatian
Red     = loss, profit negatif, risiko
Purple  = secondary highlight, premium accent
```

---

## Background Baru

Ubah background dashboard menjadi layered gradient dengan blur.

Gunakan konsep:

```text
Base background: very light blue / off white
Gradient blob kiri atas: blue
Gradient blob kanan atas: purple
Gradient blob bawah: green
Layer blur besar
Subtle noise optional
```

Contoh CSS:

```css
html {
  min-width: 320px;
  background: #f8fafc;
}

body {
  min-height: 100vh;
  margin: 0;
  color: var(--text-main);
  background:
    radial-gradient(circle at 12% 8%, rgba(45, 90, 254, 0.22), transparent 30rem),
    radial-gradient(circle at 88% 12%, rgba(139, 92, 246, 0.18), transparent 32rem),
    radial-gradient(circle at 70% 86%, rgba(16, 185, 129, 0.16), transparent 30rem),
    linear-gradient(135deg, #f8fbff 0%, #f6f7ff 48%, #f4fbf8 100%);
  font-family: "Google Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

Tambahkan pseudo-element untuk efek blur mewah:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 16%, rgba(45, 90, 254, 0.18), transparent 22rem),
    radial-gradient(circle at 82% 22%, rgba(139, 92, 246, 0.16), transparent 24rem),
    radial-gradient(circle at 76% 78%, rgba(16, 185, 129, 0.16), transparent 26rem);
  filter: blur(18px);
  opacity: 0.9;
  z-index: -1;
}
```

Catatan:

```text
Background harus terlihat premium tetapi tidak mengganggu keterbacaan chart.
Jangan membuat gradient terlalu kuat.
Chart card tetap harus punya surface yang cukup terang.
```

---

## Glassmorphism Card

Ubah semua card utama menjadi glass card.

Target elemen:

```text
KPI cards
Chart cards
Insight note
Tab navigation
Conclusion cards
Tooltip boleh tetap gelap agar kontras
```

Contoh CSS:

```css
.glass-card,
.chart-card,
.kpi-card,
.insight-note {
  border: 1px solid var(--glass-border-strong);
  border-radius: var(--radius-card);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.62));
  box-shadow: var(--bento-shadow);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
```

Untuk card penting:

```css
.kpi-card.featured,
.chart-card.featured {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(243, 247, 255, 0.76));
  box-shadow: 0 28px 90px rgba(45, 90, 254, 0.16);
}
```

Hover boleh halus:

```css
.chart-card,
.kpi-card {
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.chart-card:hover,
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--bento-shadow-hover);
  border-color: rgba(45, 90, 254, 0.28);
}
```

Jangan terlalu banyak animasi.

---

## Bento Grid Layout

Ubah layout dashboard menjadi bento grid yang lebih modern.

Prinsip:

```text
Gunakan grid 12 kolom di desktop.
Card penting bisa span lebih besar.
KPI cards bisa compact tetapi tetap premium.
Chart utama lebih besar.
Chart pendukung lebih kecil.
Insight note menjadi card horizontal penuh.
```

Contoh CSS:

```css
.bento-grid,
.visual-grid,
.chart-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
}

.bento-card {
  min-width: 0;
  border-radius: var(--radius-bento);
}

.bento-span-3 {
  grid-column: span 3;
}

.bento-span-4 {
  grid-column: span 4;
}

.bento-span-5 {
  grid-column: span 5;
}

.bento-span-6 {
  grid-column: span 6;
}

.bento-span-7 {
  grid-column: span 7;
}

.bento-span-8 {
  grid-column: span 8;
}

.bento-span-12 {
  grid-column: span 12;
}
```

Responsive:

```css
@media (max-width: 1100px) {
  .bento-span-3,
  .bento-span-4,
  .bento-span-5,
  .bento-span-6,
  .bento-span-7,
  .bento-span-8 {
    grid-column: span 6;
  }
}

@media (max-width: 760px) {
  .bento-grid,
  .visual-grid,
  .chart-grid {
    grid-template-columns: 1fr;
  }

  .bento-span-3,
  .bento-span-4,
  .bento-span-5,
  .bento-span-6,
  .bento-span-7,
  .bento-span-8,
  .bento-span-12 {
    grid-column: auto;
  }
}
```

---

## Layout Tab per Slide

Gunakan pola bento berikut.

### Tab 1 Pembuka

```text
Hero header: full width
KPI cards: 4 card, masing-masing span 3
Chart Q3 summary: span 8
Insight note: span 4 atau span 12
```

Contoh:

```text
[ Hero Header span 12 ]
[ KPI 3 ][ KPI 3 ][ KPI 3 ][ KPI 3 ]
[ Chart Sales Q3 span 8 ][ Insight / Question card span 4 ]
```

### Tab 2 Overview

```text
Q3 vs Q2 comparison cards
Sales comparison chart
Profit comparison chart
Insight note full width
```

Layout:

```text
[ KPI comparison span 12 ]
[ Sales chart span 6 ][ Profit chart span 6 ]
[ Insight note span 12 ]
```

### Tab 3 Tren Sales

```text
Quarter trend chart dibuat besar.
Profit chart dan scatter jadi pendukung.
```

Layout:

```text
[ Sales by Quarter 2026 span 12 ]
[ Profit by Quarter span 6 ][ Sales vs Profit span 6 ]
[ Insight note span 12 ]
```

### Tab 4 Per Kategori

```text
Kategori sales chart besar.
Margin dan sub-category sebagai pendukung.
```

Layout:

```text
[ Sales by Category span 7 ][ Profit Margin by Category span 5 ]
[ Profit by Sub-Category span 12 ]
[ Insight note span 12 ]
```

### Tab 5 Per Region

```text
Region sales dan profit side by side.
Table atau summary di bawah.
```

Layout:

```text
[ Sales by Region span 7 ][ Profit by Region span 5 ]
[ Region Summary Table span 12 ]
[ Insight note span 12 ]
```

### Tab 6 Customer

```text
Top customer chart besar.
Segment charts lebih kecil.
```

Layout:

```text
[ Top 10 Customer span 8 ][ Segment summary span 4 ]
[ Sales by Segment span 6 ][ Profit by Segment span 6 ]
[ Insight note span 12 ]
```

### Tab 7 Kesimpulan

```text
Conclusion bento cards.
Action cards jelas.
```

Layout:

```text
[ Positive card span 4 ][ Attention card span 4 ][ Action card span 4 ]
[ Final recommendation span 12 ]
```

---

## Tab Navigation

Ubah tab navigation agar lebih clean dan premium, tetapi tetap mirip web presentasi.

Style:

```text
Sticky top
Glass surface
Pill number
Active tab primary blue atau red accent jika ingin mempertahankan style lama
Text uppercase kecil
Border bawah halus
```

Rekomendasi: gunakan primary blue, bukan merah, agar lebih konsisten dengan clean executive theme.

Contoh CSS:

```css
.slide-tabs {
  position: sticky;
  top: 16px;
  z-index: 50;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  margin: 16px auto 28px;
  border: 1px solid rgba(255, 255, 255, 0.56);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 52px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  overflow-x: auto;
}

.tab-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--primary-deep);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}

.tab-button span {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: rgba(45, 90, 254, 0.10);
  color: var(--primary-deep);
  letter-spacing: 0;
}

.tab-button.is-active {
  background: var(--primary);
  color: white;
  box-shadow: 0 12px 28px rgba(45, 90, 254, 0.28);
}

.tab-button.is-active span {
  background: rgba(255, 255, 255, 0.22);
  color: white;
}
```

---

## Header Slide

Perbaiki header agar lebih executive.

Aturan:

```text
Judul besar tetap kuat.
Kurangi gaya terlalu playful.
Gunakan line-height rapat tetapi readable.
Subjudul maksimal 1 sampai 2 baris.
Eyebrow kecil tetap boleh, tetapi clean.
```

Contoh CSS:

```css
.slide-header {
  margin-bottom: 32px;
}

.slide-eyebrow {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.slide-header h1 {
  max-width: 1120px;
  margin: 0 0 14px;
  color: var(--text-main);
  font-size: clamp(44px, 5.6vw, 88px);
  line-height: 0.96;
  letter-spacing: -0.06em;
}

.slide-subtitle {
  max-width: 920px;
  margin: 0;
  color: var(--primary-deep);
  font-size: 16px;
  line-height: 1.65;
}
```

---

## KPI Card Premium

KPI card harus terlihat seperti executive summary.

Style:

```css
.kpi-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--radius-bento);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.60));
  box-shadow: var(--bento-shadow);
  backdrop-filter: blur(18px);
}

.kpi-card::after {
  content: "";
  position: absolute;
  right: -32px;
  top: -32px;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(45, 90, 254, 0.14), transparent 70%);
}

.kpi-card span {
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.kpi-card strong {
  position: relative;
  z-index: 1;
  display: block;
  margin: 12px 0 8px;
  color: var(--air-force-blue, #508ca4);
  font-size: clamp(34px, 4vw, 56px);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.kpi-card small {
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 13px;
}
```

Warna KPI:

```text
Sales        = Air Force Blue / Primary
Profit       = Success jika positif, Error jika negatif
Orders       = Primary Deep
Customers    = Tertiary atau Purple
Margin       = Success, Warning, atau Error sesuai threshold
```

---

## Chart Card

Chart card harus lebih ringan dan bersih.

```css
.chart-card {
  min-width: 0;
  padding: 26px;
  border-radius: var(--radius-bento);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.64));
  border: 1px solid var(--glass-border-strong);
  box-shadow: var(--bento-shadow);
  backdrop-filter: blur(18px);
}

.chart-card-header {
  margin-bottom: 20px;
}

.chart-card-header h2 {
  margin: 0;
  color: var(--text-main);
  font-size: 22px;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.chart-card-header p {
  max-width: 560px;
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}
```

Chart host:

```css
.chart-host {
  position: relative;
  min-height: 380px;
  border: 1px solid rgba(196, 197, 217, 0.36);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.74), rgba(255, 255, 255, 0.56));
  overflow: hidden;
}
```

---

## Insight Note

Insight note harus terlihat seperti executive callout, bukan catatan kelas.

Gunakan label:

```text
Implikasi Bisnis
Insight Utama
Prioritas Perhatian
Arahan Keputusan
```

Style:

```css
.insight-note {
  position: relative;
  padding: 22px 24px;
  border: 1px solid var(--glass-border-strong);
  border-left: 5px solid var(--primary);
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(243, 247, 255, 0.64));
  box-shadow: var(--bento-shadow);
  backdrop-filter: blur(18px);
  color: var(--text-main);
}

.insight-note-label {
  margin: 0 0 8px;
  color: var(--primary-deep);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.insight-note p {
  margin: 0;
  color: var(--primary-deep);
  font-size: 16px;
  line-height: 1.65;
}

.insight-note.positive {
  border-left-color: var(--accent-green);
}

.insight-note.warning {
  border-left-color: var(--tertiary);
}

.insight-note.negative {
  border-left-color: var(--error);
}
```

Jangan gunakan label `SO WHAT`.

---

## Chart Color Treatment

Gunakan warna chart yang clean.

```text
Bar normal            : Air Force Blue #508CA4 atau Primary #2D5AFE
Bar terbaik           : Sea Green #0A8754 atau Success #10B981
Bar negatif           : Error #BA1A1A
Background track      : Pale Sky #BFD7EA dengan opacity 0.35
Gridline              : Cool Steel #91AEC1 dengan opacity 0.25
Line utama            : Primary #2D5AFE
Highlight line point  : Success / Error / Tertiary sesuai makna
Scatter normal        : Air Force Blue opacity 0.75
Scatter positive      : Success
Scatter warning       : Tertiary
Scatter negative      : Error
```

Pastikan chart tetap readable di atas glass card.

---

## Tooltip

Tooltip tetap gelap agar kontras.

Revisi sedikit agar lebih premium:

```css
.chart-tooltip {
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.94));
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(14px);
}
```

---

## Motion dan Interaction

Gunakan animasi sangat halus.

```text
Hover card naik 2px.
Tab active smooth.
Chart hover highlight opacity.
Tidak perlu animasi berlebihan.
Tidak perlu efek 3D.
```

CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## Perbandingan dengan Desain Sekarang

Lakukan audit ringan terhadap style yang sekarang:

```text
Apakah card masih terlalu flat?
Apakah background terlalu polos?
Apakah tab navigation terasa seperti materi kelas?
Apakah chart cards terlalu kotak?
Apakah spacing antar visual sudah premium?
Apakah KPI card sudah terlihat seperti executive summary?
```

Setelah itu revisi CSS agar hasil akhir:

```text
Lebih clean
Lebih premium
Lebih modern
Tetap profesional
Tidak mengurangi keterbacaan data
```

---

## Hal yang Jangan Diubah

Jangan ubah:

```text
Struktur data API
Query MySQL
D3 chart logic utama
Scope data 2026 dan Q3 2026
Isi storytelling yang sudah dibuat
Tooltip content
Data labels
7 tab utama
```

Boleh ubah:

```text
CSS
Class layout
Card wrapper
Grid span
Spacing
Background
Glass effect
Typography sizing
Tab styling
Card styling
Chart container styling
```

Jika perlu menambah wrapper class untuk bento layout, boleh dilakukan selama tidak merusak rendering chart.

---

## Checklist Akhir

Sebelum selesai, pastikan:

```text
Dashboard tetap berjalan.
7 tab tetap ada.
Tidak ada error console karena perubahan CSS.
Layout desktop rapi.
Layout mobile masih bisa dibaca.
Background gradient tidak mengganggu chart.
Glassmorphism tidak membuat teks kabur.
KPI card terlihat premium.
Chart card lebih modern.
Insight note terlihat seperti executive callout.
Primary blue tetap dominan.
Warna hijau, ungu, dan biru hanya menjadi aksen gradient dan highlight.
Semua chart tetap jelas dan readable.
```

---

## Instruksi untuk Codex

Baca file ini dari awal sampai akhir, lalu poles desain dashboard yang sudah ada.

Jangan membangun ulang dashboard. Fokus pada revisi CSS dan layout agar dashboard menjadi:

```text
Clean executive dashboard
Bento grid
Glassmorphism
Primary blue
Gradient background biru, hijau, dan ungu
Premium tetapi tetap readable
```

Bandingkan style lama project dengan style sekarang, lalu terapkan perubahan yang paling aman dan efektif.
