# Step 4, D3 Utilities, API Client, Tooltip, dan Chart Reusable

## Tujuan

Buat fondasi D3.js agar semua tab bisa memakai fungsi chart yang sama.

## API Client

Buat `src/api.js`:

```js
const API_BASE = window.SUPERSTORE_API_BASE || "/api/analytics";

export async function getJson(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
}

export async function loadAnalyticsData() {
  const [
    summary,
    salesByMonth,
    overviewByYear,
    overviewByQuarter,
    categorySummary,
    subCategorySummary,
    regionSummary,
    segmentSummary,
    topCustomers,
    topProducts
  ] = await Promise.all([
    getJson("/summary"),
    getJson("/sales-by-month"),
    getJson("/overview-by-year"),
    getJson("/overview-by-quarter"),
    getJson("/category-summary"),
    getJson("/subcategory-summary"),
    getJson("/region-summary"),
    getJson("/segment-summary"),
    getJson("/top-customers?limit=10"),
    getJson("/top-products?limit=10&sortBy=sales")
  ]);

  return {
    summary,
    salesByMonth,
    overviewByYear,
    overviewByQuarter,
    categorySummary,
    subCategorySummary,
    regionSummary,
    segmentSummary,
    topCustomers,
    topProducts
  };
}
```

## Format angka

Buat `src/utils.js`:

```js
export const formatCurrency = value =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value || 0);

export const formatCurrencyFull = value =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value || 0);

export const formatCompactCurrency = value => {
  const number = Number(value || 0);
  if (Math.abs(number) >= 1_000_000) return `$${(number / 1_000_000).toFixed(2)}M`;
  if (Math.abs(number) >= 1_000) return `$${(number / 1_000).toFixed(0)}K`;
  return `$${number.toFixed(0)}`;
};

export const formatNumber = value =>
  new Intl.NumberFormat("en-US").format(value || 0);

export const formatPercent = value =>
  `${((value || 0) * 100).toFixed(1)}%`;

export const safeNumber = value => Number.isFinite(+value) ? +value : 0;
```

## Tooltip global

Buat tooltip reusable di `src/charts.js` atau `src/tooltip.js`.

CSS:

```css
.chart-tooltip {
  position: fixed;
  z-index: 9999;
  max-width: 320px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #191b24;
  color: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  font-size: 12px;
  line-height: 1.55;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.chart-tooltip.is-visible {
  opacity: 1;
  visibility: visible;
}

.tooltip-title {
  margin-bottom: 8px;
  font-weight: 700;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.tooltip-row span:first-child {
  color: #cfd1df;
}
```

JS:

```js
let tooltip;

export function initTooltip() {
  tooltip = d3.select("body")
    .append("div")
    .attr("class", "chart-tooltip");

  return tooltip;
}

export function showTooltip(event, html) {
  if (!tooltip) initTooltip();

  tooltip
    .html(html)
    .classed("is-visible", true);

  moveTooltip(event);
}

export function moveTooltip(event) {
  if (!tooltip) return;

  const padding = 16;
  const node = tooltip.node();
  const rect = node.getBoundingClientRect();

  let left = event.clientX + padding;
  let top = event.clientY + padding;

  if (left + rect.width > window.innerWidth) {
    left = event.clientX - rect.width - padding;
  }

  if (top + rect.height > window.innerHeight) {
    top = event.clientY - rect.height - padding;
  }

  tooltip
    .style("left", `${left}px`)
    .style("top", `${top}px`);
}

export function hideTooltip() {
  if (!tooltip) return;
  tooltip.classed("is-visible", false);
}
```

## Chart reusable wajib

Buat fungsi:

```js
renderKpiCards(container, metrics)
renderHorizontalBarChart(container, data, options)
renderVerticalBarChart(container, data, options)
renderLineChart(container, data, options)
renderScatterPlot(container, data, options)
renderSummaryTable(container, data, options)
renderInsightCards(container, insights)
```

Semua chart harus:

- Clear container sebelum render ulang.
- Menghitung width dari container.
- Memakai SVG `viewBox`.
- Responsif.
- Ada tooltip.
- Ada empty state jika data kosong.
- Ada error state jika endpoint gagal.

## Tooltip content helper

Buat helper:

```js
export function tooltipRows(title, rows) {
  return `
    <div class="tooltip-title">${title}</div>
    ${rows.map(([label, value]) => `
      <div class="tooltip-row">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("")}
  `;
}
```

## Warna chart

Gunakan aturan:

```text
Normal bar: Air Force Blue
Secondary: Cool Steel
Track: Pale Sky
Positive: Sea Green
Strong positive: Dark Spruce
Warning: Tertiary
Negative: Error
```

## Kriteria selesai step ini

- API client siap.
- Formatter siap.
- Tooltip global siap.
- Chart reusable minimal bisa render bar, line, scatter, table, KPI.
