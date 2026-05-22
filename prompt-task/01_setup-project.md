# Step 1, Setup Project

## Tujuan

Siapkan project dashboard Superstore agar siap dikembangkan menjadi web presentasi 7 tab berbasis D3.js dan MySQL API.

## Referensi

Repository:

```text
https://github.com/siberbot88/Dashboard-Analitik-Superstore.git
```

Gunakan struktur project yang sudah ada jika memungkinkan. Jangan merusak style lama tanpa alasan. Jika struktur lama belum rapi, boleh rapikan menjadi struktur seperti ini:

```text
index.html
styles/style.css
src/main.js
src/data.js
src/charts.js
src/utils.js
src/api.js
server.js
src/db.js
src/routes/analytics.js
.env.example
```

## Teknologi

Gunakan:

```text
HTML
CSS
JavaScript
D3.js
Node.js
Express
mysql2
cors
dotenv
```

Install dependency:

```bash
npm install d3 express mysql2 cors dotenv
```

Jika project memakai Vite atau bundler lain, sesuaikan tanpa mengubah tujuan utama.

## Font

Gunakan Google Sans.

Tambahkan di `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

CSS:

```css
body {
  font-family: "Google Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

## Palette utama

Gunakan palette lama project:

```css
:root {
  --surface: #fbf8ff;
  --surface-dim: #d9d9e6;
  --surface-bright: #fbf8ff;
  --surface-container-lowest: #ffffff;
  --surface-container-low: #f3f2ff;
  --surface-container: #ededfa;
  --surface-container-high: #e8e7f4;
  --surface-container-highest: #e2e1ef;

  --on-surface: #191b24;
  --on-surface-variant: #434656;
  --inverse-surface: #2e303a;
  --inverse-on-surface: #f0effd;

  --outline: #747688;
  --outline-variant: #c4c5d9;

  --primary: #2d5afe;
  --primary-deep: #003fde;
  --on-primary: #ffffff;

  --secondary: #8b5cf6;
  --tertiary: #f59e0b;
  --success: #10b981;
  --error: #ba1a1a;

  --background: #f8fafc;
  --deep-obsidian: #121212;
}
```

## Palette tambahan

Tambahkan palette variasi:

```css
:root {
  --pale-sky: #bfd7ea;
  --cool-steel: #91aec1;
  --air-force-blue: #508ca4;
  --sea-green: #0a8754;
  --dark-spruce: #004f2d;
}
```

Makna warna:

```text
Pale Sky: background lembut, track, pembanding
Cool Steel: data sekunder, gridline, label pendukung
Air Force Blue: data utama normal
Sea Green: profit positif, growth, above target
Dark Spruce: highlight positif kuat, nilai terbaik
Error Red: loss, profit negatif, masalah
Tertiary Yellow: warning, discount tinggi, perhatian
```

## Kriteria selesai step ini

- Project bisa dijalankan lokal.
- D3.js tersedia.
- Font Google Sans dimuat.
- Palette CSS utama dan tambahan tersedia.
- Struktur file siap untuk API dan frontend.
