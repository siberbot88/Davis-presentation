# Step 3, Frontend Shell dan Style 7 Tab

## Tujuan

Buat layout web presentasi dengan 7 tab, mengikuti gaya visual contoh pembelajaran, tetapi memakai warna project Superstore.

## Struktur HTML

Gunakan struktur seperti ini:

```html
<body>
  <main class="presentation-shell">
    <nav class="slide-tabs" aria-label="Navigasi dashboard">
      <button class="tab-button is-active" data-tab="pembuka">
        <span>1</span> PEMBUKA
      </button>
      <button class="tab-button" data-tab="overview">
        <span>2</span> OVERVIEW
      </button>
      <button class="tab-button" data-tab="tren-sales">
        <span>3</span> TREN SALES
      </button>
      <button class="tab-button" data-tab="kategori">
        <span>4</span> PER KATEGORI
      </button>
      <button class="tab-button" data-tab="region">
        <span>5</span> PER REGION
      </button>
      <button class="tab-button" data-tab="customer">
        <span>6</span> CUSTOMER
      </button>
      <button class="tab-button" data-tab="kesimpulan">
        <span>7</span> KESIMPULAN
      </button>
    </nav>

    <section class="slide-panel is-active" id="tab-pembuka"></section>
    <section class="slide-panel" id="tab-overview"></section>
    <section class="slide-panel" id="tab-tren-sales"></section>
    <section class="slide-panel" id="tab-kategori"></section>
    <section class="slide-panel" id="tab-region"></section>
    <section class="slide-panel" id="tab-customer"></section>
    <section class="slide-panel" id="tab-kesimpulan"></section>
  </main>
</body>
```

## Style dasar

Gunakan CSS berikut sebagai dasar, lalu sesuaikan dengan project:

```css
.presentation-shell {
  width: min(1440px, 100%);
  margin: 0 auto;
  padding: 0 40px 56px;
}

.slide-tabs {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  gap: 24px;
  align-items: center;
  min-height: 56px;
  border-bottom: 1px solid var(--outline-variant);
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(12px);
}

.tab-button {
  height: 56px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--primary-deep);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  cursor: pointer;
}

.tab-button span {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
  background: var(--surface-container-high);
  color: var(--primary-deep);
  letter-spacing: 0;
}

.tab-button.is-active {
  color: var(--error);
  border-bottom-color: var(--error);
}

.tab-button.is-active span {
  background: var(--error);
  color: white;
}

.slide-panel {
  display: none;
  padding: 56px 0;
}

.slide-panel.is-active {
  display: block;
}

.slide-eyebrow {
  color: var(--error);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.slide-header h1 {
  max-width: 1100px;
  margin: 14px 0 12px;
  color: var(--deep-obsidian);
  font-size: clamp(36px, 5vw, 72px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.slide-subtitle {
  max-width: 900px;
  color: var(--primary-deep);
  font-size: 15px;
  line-height: 1.7;
}

.visual-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  margin-top: 36px;
}

.chart-card {
  grid-column: span 12;
  padding: 28px;
  border: 1px solid var(--outline-variant);
  background: var(--surface-container-lowest);
}

.chart-card.half {
  grid-column: span 6;
}

.chart-host {
  min-height: 380px;
}
```

## Responsive

```css
@media (max-width: 900px) {
  .presentation-shell {
    padding: 0 20px 40px;
  }

  .slide-tabs {
    overflow-x: auto;
    gap: 12px;
  }

  .chart-card.half {
    grid-column: span 12;
  }

  .slide-header h1 {
    font-size: 40px;
  }
}
```

## Tab behavior

Buat logic JS:

```js
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;

    document.querySelectorAll(".tab-button").forEach(item => {
      item.classList.toggle("is-active", item === button);
    });

    document.querySelectorAll(".slide-panel").forEach(panel => {
      panel.classList.toggle("is-active", panel.id === `tab-${tab}`);
    });

    window.dispatchEvent(new Event("resize"));
  });
});
```

## Kriteria selesai step ini

- Ada 7 tab.
- Tab bisa diklik.
- Hanya satu panel aktif.
- Tampilan mirip web presentasi, bukan dashboard grid biasa.
- Style memakai warna project dan palette tambahan.
