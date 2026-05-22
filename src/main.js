import { COMPARISON_QUARTER, FOCUS_CATEGORY, FOCUS_QUARTER, YEAR, loadAnalyticsData } from "./api.js";
import {
  chartColors,
  renderErrorState,
  renderHorizontalBarChart,
  renderInsightCards,
  renderInsightNote,
  renderKpiCards,
  renderLineChart,
  renderScatterPlot,
  renderSummaryTable,
  renderTextCards,
  renderVerticalBarChart,
  tooltipRows
} from "./charts.js";
import {
  byDescending,
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
  safeNumber,
  shareOf
} from "./utils.js";

let analyticsData;
let resizeTimer;

const focusLabel = `Q${FOCUS_QUARTER} ${YEAR}`;
const comparisonLabel = `Q${COMPARISON_QUARTER} ${YEAR}`;
const focusCategoryLabel = `Kategori ${FOCUS_CATEGORY}`;

const ids = [
  "hero-kpis",
  "opening-monthly-sales",
  "opening-insight",
  "opening-note",
  "overview-sales-year",
  "overview-profit-year",
  "overview-table",
  "overview-insight",
  "overview-note",
  "trend-sales-line",
  "trend-profit-bar",
  "trend-scatter",
  "trend-insight",
  "trend-note",
  "category-sales",
  "category-margin",
  "subcategory-profit",
  "category-insight",
  "category-note",
  "region-sales",
  "region-profit",
  "region-table",
  "region-insight",
  "region-note",
  "customer-top-sales",
  "segment-sales",
  "segment-profit",
  "customer-insight",
  "customer-note",
  "summary-insights",
  "recommendation-box",
  "summary-note"
];

const setLoading = () => {
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.innerHTML = '<div class="loading-state">Memuat data dari API...</div>';
  });
};

const setGlobalError = error => {
  ids.forEach(id => renderErrorState(document.getElementById(id), `Data belum bisa dimuat. Periksa endpoint API dan koneksi database. ${error.message}`));
};

const setText = (id, text) => {
  const element = document.getElementById(id);
  if (element && text) element.textContent = text;
};

const maxBy = (items, key) => [...(items || [])].sort((a, b) => safeNumber(b[key]) - safeNumber(a[key]))[0] || {};
const minBy = (items, key) => [...(items || [])].sort((a, b) => safeNumber(a[key]) - safeNumber(b[key]))[0] || {};
const growth = (current, previous) => {
  const base = safeNumber(previous);
  return base === 0 ? 0 : (safeNumber(current) - base) / base;
};
const trendWord = value => safeNumber(value) >= 0 ? "naik" : "turun";
const trendTone = value => safeNumber(value) >= 0 ? "positive" : "negative";
const marginTone = value => {
  const margin = safeNumber(value);
  if (margin < 0) return "negative";
  if (margin < 0.08) return "warning";
  return "positive";
};
const profitColor = value => safeNumber(value) < 0 ? chartColors.error : chartColors.seaGreen;
const marginColor = value => {
  const margin = safeNumber(value);
  if (margin < 0) return chartColors.error;
  if (margin < 0.08) return chartColors.tertiary;
  if (margin >= 0.18) return chartColors.seaGreen;
  return chartColors.airForceBlue;
};
const revenueLevelMeta = (items, item) => {
  const sorted = [...(items || [])].sort((a, b) => safeNumber(a.sales) - safeNumber(b.sales));
  const index = Math.max(0, sorted.findIndex(row => row.quarter === item.quarter));
  const levels = [
    { label: "Revenue rendah", color: chartColors.coolSteel },
    { label: "Revenue sedang", color: chartColors.airForceBlue },
    { label: "Revenue tinggi", color: chartColors.primary },
    { label: "Revenue tertinggi", color: chartColors.seaGreen }
  ];

  return levels[Math.min(index, levels.length - 1)];
};
const storyCard = (label, value, note, tone = "neutral", badge = null) => ({
  label,
  value,
  note,
  tone,
  badge,
  variant: "story"
});
const rankByDescending = (items, key, target) =>
  [...(items || [])]
    .sort((a, b) => safeNumber(b[key]) - safeNumber(a[key]))
    .findIndex(item => item === target) + 1;

const furnitureTooltip = (title, rows) => tooltipRows(title, rows);

function furnitureShare(data) {
  return shareOf(data.furnitureSummary?.sales, data.summaryQ4?.totalSales);
}

function furnitureProfitShare(data) {
  return shareOf(data.furnitureSummary?.profit, data.summaryQ4?.totalProfit);
}

function renderNarrativeTitles(data) {
  const furniture = data.furnitureSummary || {};
  const furnitureQ3 = data.furnitureSummaryQ3 || {};
  const salesGrowth = growth(furniture.sales, furnitureQ3.sales);
  const profitGrowth = growth(furniture.profit, furnitureQ3.profit);
  const categories = data.categorySummary || [];
  const furnitureCategory = categories.find(item => item.category === FOCUS_CATEGORY) || furniture;
  const bestMarginCategory = maxBy(categories, "profitMargin");
  const worstSub = minBy(data.furnitureSubCategory, "profit");
  const highestDiscountSub = maxBy(data.furnitureDiscountProfit, "averageDiscount");
  const worstRegion = minBy(data.furnitureRegion, "profitMargin");
  const topRegion = maxBy(data.furnitureRegion, "sales");
  const topCustomer = maxBy(data.furnitureCustomers, "sales");
  const lossCustomer = minBy(data.furnitureCustomers, "profit");
  const peakFurnitureQuarter = maxBy(data.furnitureQuarterTrend, "sales");
  const troughFurnitureQuarter = minBy(data.furnitureQuarterTrend, "profit");

  const mainTitle = safeNumber(furniture.profit) < 0
    ? `${FOCUS_CATEGORY} Mencetak Revenue ${formatCompactCurrency(furniture.sales)}, tetapi Profit Negatif`
    : safeNumber(furniture.profitMargin) < 0.08
      ? `${FOCUS_CATEGORY} Menyumbang Revenue Q4, Profitabilitas Menjadi Risiko Tahun Depan`
      : `${FOCUS_CATEGORY} Menghasilkan Revenue ${formatCompactCurrency(furniture.sales)}, Margin Tetap Perlu Dikendalikan`;

  setText("title-pembuka", mainTitle);
  setText("subtitle-pembuka", `Pertanyaan bisnis: mengapa ${focusCategoryLabel} belum menghasilkan profit seimbang meski revenue Q4 signifikan.`);
  setText("chart-title-opening-monthly", `Revenue ${FOCUS_CATEGORY} Q4 Bergerak per Bulan`);

  setText("title-overview", `${FOCUS_CATEGORY} Menyumbang ${formatPercent(furnitureShare(data))} Revenue Q4, Profit Share ${formatPercent(furnitureProfitShare(data))}`);
  setText("subtitle-overview", `${FOCUS_CATEGORY} dibandingkan dengan kategori lain untuk menilai apakah kontribusi revenue sudah seimbang dengan margin dan profit.`);
  setText("chart-title-overview-sales", `Revenue Kategori Q4: ${FOCUS_CATEGORY} Dibanding Kategori Lain`);
  setText("chart-title-overview-profit", `Margin Kategori Q4: ${FOCUS_CATEGORY} vs ${bestMarginCategory.category || "Kategori Terbaik"}`);

  setText("title-tren", `${FOCUS_CATEGORY} Q4 ${trendWord(salesGrowth)} dari Q3, Profit ${trendWord(profitGrowth)}`);
  setText("subtitle-tren", `Tren Q1 sampai Q4 menguji apakah tekanan profit ${FOCUS_CATEGORY} hanya terjadi di Q4 atau berulang sepanjang 2026.`);
  setText("chart-title-trend-sales", `${peakFurnitureQuarter.quarterLabel || focusLabel} Menjadi Revenue Tertinggi ${FOCUS_CATEGORY}`);
  setText("chart-title-trend-profit", `${troughFurnitureQuarter.quarterLabel || focusLabel} Menjadi Titik Profit Terlemah ${FOCUS_CATEGORY}`);

  setText("title-kategori", `${worstSub.subCategory || "Sub-Category Furniture"} Menjadi Sumber Profit Leakage Q4`);
  setText("subtitle-kategori", `Sub-category ${FOCUS_CATEGORY} dinilai dari revenue, profit, margin, cost ratio, dan discount untuk menemukan sumber tekanan profit.`);
  setText("chart-title-category-sales", `Revenue Sub-Category ${FOCUS_CATEGORY} Q4`);
  setText("chart-title-category-margin", `Margin Sub-Category ${FOCUS_CATEGORY} Q4`);

  setText("title-region", `${highestDiscountSub.subCategory || "Discount"} dan Cost Burden Menekan Margin ${FOCUS_CATEGORY} Q4`);
  setText("subtitle-region", `Discount dan proxy cost structure (Sales minus Profit) digunakan untuk membaca profit leakage karena database tidak menyediakan komponen biaya aktual.`);
  setText("chart-title-region-sales", `Average Discount vs Margin ${FOCUS_CATEGORY}`);
  setText("chart-title-region-profit", `Cost Ratio Sub-Category ${FOCUS_CATEGORY}`);

  setText("title-customer", `${worstRegion.region || "Region"} dan Customer Tertentu Menentukan Risiko Profit ${FOCUS_CATEGORY}`);
  setText("subtitle-customer", `${FOCUS_CATEGORY} dianalisis per region dan customer untuk melihat apakah profit leakage terkonsentrasi pada pasar atau akun tertentu.`);
  setText("chart-title-customer-top", `Top Customer ${FOCUS_CATEGORY}: Revenue dan Profit Q4`);

  setText("title-kesimpulan", `${FOCUS_CATEGORY} Perlu Strategi Margin Baru untuk Tahun Depan`);
  setText("subtitle-kesimpulan", `Prioritas Q1 tahun depan diarahkan pada sub-category ${worstSub.subCategory || "-"}, region ${worstRegion.region || "-"}, dan customer ${safeNumber(lossCustomer.profit) < 0 ? lossCustomer.customerName : topCustomer.customerName || "-"}.`);

  return {
    furnitureCategory,
    bestMarginCategory,
    worstSub,
    highestDiscountSub,
    worstRegion,
    topRegion,
    topCustomer,
    lossCustomer
  };
}

function renderPembuka(data) {
  const furniture = data.furnitureSummary || {};
  const total = data.summaryQ4 || {};
  const share = furnitureShare(data);
  const profitShare = furnitureProfitShare(data);
  const lossRate = shareOf(furniture.lossRows, furniture.orders);

  renderKpiCards("#hero-kpis", [
    {
      label: `Revenue ${FOCUS_CATEGORY} ${focusLabel}`,
      value: formatCurrency(furniture.sales),
      support: `Revenue share ${formatPercent(share)} dari total Superstore`,
      tone: "neutral",
      tooltip: furnitureTooltip(`${FOCUS_CATEGORY} Revenue`, [
        ["Period", focusLabel],
        ["Sales", formatCurrency(furniture.sales)],
        ["Total Superstore Sales", formatCurrency(total.totalSales)],
        ["Revenue Share", formatPercent(share)]
      ])
    },
    {
      label: `Profit ${FOCUS_CATEGORY} ${focusLabel}`,
      value: formatCurrency(furniture.profit),
      support: `Profit share ${formatPercent(profitShare)}`,
      tone: safeNumber(furniture.profit) < 0 ? "negative" : "positive",
      tooltip: furnitureTooltip(`${FOCUS_CATEGORY} Profit`, [
        ["Period", focusLabel],
        ["Profit", formatCurrency(furniture.profit)],
        ["Profit Margin", formatPercent(furniture.profitMargin)],
        ["Profit per Order", formatCurrency(furniture.profitPerOrder)]
      ])
    },
    {
      label: `Margin ${FOCUS_CATEGORY}`,
      value: formatPercent(furniture.profitMargin),
      support: `Cost ratio ${formatPercent(furniture.costRatio)}`,
      tone: marginTone(furniture.profitMargin),
      tooltip: furnitureTooltip(`${FOCUS_CATEGORY} Margin`, [
        ["Period", focusLabel],
        ["Profit Margin", formatPercent(furniture.profitMargin)],
        ["Cost Ratio", formatPercent(furniture.costRatio)],
        ["Estimated Cost Burden", formatCurrency(furniture.estimatedCostBurden)]
      ])
    },
    {
      label: "Loss Rows",
      value: formatNumber(furniture.lossRows),
      support: `Loss row rate ${formatPercent(lossRate)}`,
      tone: safeNumber(furniture.lossRows) > 0 ? "warning" : "positive",
      tooltip: furnitureTooltip("Loss Rows Furniture", [
        ["Period", focusLabel],
        ["Loss Rows", formatNumber(furniture.lossRows)],
        ["Loss Sales", formatCurrency(furniture.lossSales)],
        ["Loss Profit", formatCurrency(furniture.lossProfit)]
      ])
    }
  ]);

  const q4Months = data.salesByMonthFurnitureQ4 || [];
  const peakMonth = maxBy(q4Months, "sales");
  const lowMonth = minBy(q4Months, "profit");
  renderVerticalBarChart("#opening-monthly-sales", q4Months, {
    label: d => d.monthLabel,
    value: d => d.sales,
    labelFormatter: formatCompactCurrency,
    color: d => {
      if (d.monthLabel === peakMonth.monthLabel) return chartColors.seaGreen;
      if (safeNumber(d.profit) < 0) return chartColors.error;
      return chartColors.airForceBlue;
    },
    tooltip: d => furnitureTooltip(d.monthLabel, [
      ["Period", focusLabel],
      ["Category", FOCUS_CATEGORY],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Average Discount", formatPercent(d.averageDiscount)],
      ["Orders", formatNumber(d.orders)]
    ])
  });

  renderInsightCards("#opening-insight", [
    storyCard("Revenue Share", formatPercent(share), `${FOCUS_CATEGORY} menyumbang ${formatCurrency(furniture.sales)} revenue Q4 dari total ${formatCurrency(total.totalSales)}.`, "neutral", "Revenue"),
    storyCard("Margin", formatPercent(furniture.profitMargin), `Profit ${formatCurrency(furniture.profit)} dengan cost ratio ${formatPercent(furniture.costRatio)}.`, marginTone(furniture.profitMargin), "Margin"),
    storyCard("Profit Leakage", lowMonth.monthLabel || "-", `${lowMonth.monthLabel || "-"} menjadi bulan profit terlemah di Q4 dengan ${formatCurrency(lowMonth.profit)}.`, safeNumber(lowMonth.profit) < 0 ? "negative" : "warning", "Risk")
  ]);

  renderInsightNote("#opening-note", {
    label: "Implikasi Bisnis",
    tone: marginTone(furniture.profitMargin),
    text: `${FOCUS_CATEGORY} membuka Q4 dengan revenue ${formatCurrency(furniture.sales)}, tetapi profit ${formatCurrency(furniture.profit)} dan margin ${formatPercent(furniture.profitMargin)} menunjukkan tekanan profitabilitas. Permintaan masih kuat, namun rencana Q1 perlu diarahkan pada kontrol margin, bukan penambahan volume semata.`
  });
}

function renderOverview(data) {
  const categories = [...(data.categorySummary || [])].sort(byDescending("sales"));
  const furniture = data.furnitureSummary || {};
  const furnitureQ3 = data.furnitureSummaryQ3 || {};
  const totalProfit = data.summaryQ4?.totalProfit;
  const furnitureCategory = categories.find(item => item.category === FOCUS_CATEGORY) || furniture;
  const bestMarginCategory = maxBy(categories, "profitMargin");

  renderHorizontalBarChart("#overview-sales-year", categories, {
    label: d => d.category,
    value: d => d.sales,
    labelFormatter: formatCompactCurrency,
    color: d => d.category === FOCUS_CATEGORY ? chartColors.primary : chartColors.airForceBlue,
    tooltip: d => furnitureTooltip(d.category, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Average Discount", formatPercent(d.averageDiscount)],
      ["Orders", formatNumber(d.orders)]
    ])
  });

  renderVerticalBarChart("#overview-profit-year", categories, {
    label: d => d.category,
    value: d => d.profitMargin,
    formatValue: formatPercent,
    labelFormatter: formatPercent,
    rotateLabels: false,
    color: d => d.category === FOCUS_CATEGORY ? marginColor(d.profitMargin) : chartColors.coolSteel,
    tooltip: d => furnitureTooltip(d.category, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Average Discount", formatPercent(d.averageDiscount)]
    ])
  });

  renderSummaryTable("#overview-table", categories, {
    columns: [
      { label: "Category", format: row => row.category },
      { label: "Sales", format: row => formatCurrency(row.sales) },
      { label: "Profit", format: row => formatCurrency(row.profit), className: row => safeNumber(row.profit) < 0 ? "negative" : "positive" },
      { label: "Margin", format: row => formatPercent(row.profitMargin), className: row => marginTone(row.profitMargin) },
      { label: "Discount", format: row => formatPercent(row.averageDiscount), className: row => safeNumber(row.averageDiscount) > 0.18 ? "warning" : "" },
      { label: "Revenue Share", format: row => formatPercent(shareOf(row.sales, data.summaryQ4?.totalSales)) },
      { label: "Profit Share", format: row => formatPercent(shareOf(row.profit, totalProfit)) }
    ]
  });

  const salesGrowth = growth(furniture.sales, furnitureQ3.sales);
  const profitGrowth = growth(furniture.profit, furnitureQ3.profit);
  renderInsightCards("#overview-insight", [
    storyCard("Furniture vs Q3", trendWord(salesGrowth), `Revenue ${trendWord(salesGrowth)} ${formatPercent(Math.abs(salesGrowth))}: ${formatCurrency(furnitureQ3.sales)} ke ${formatCurrency(furniture.sales)}.`, trendTone(salesGrowth), comparisonLabel),
    storyCard("Profit Trend", trendWord(profitGrowth), `Profit ${trendWord(profitGrowth)} ${formatPercent(Math.abs(profitGrowth))}: ${formatCurrency(furnitureQ3.profit)} ke ${formatCurrency(furniture.profit)}.`, trendTone(profitGrowth), "Profit"),
    storyCard("Best Margin", bestMarginCategory.category || "-", `${bestMarginCategory.category || "-"} memiliki margin ${formatPercent(bestMarginCategory.profitMargin)} sebagai benchmark kategori.`, "positive", "Benchmark")
  ]);

  renderInsightNote("#overview-note", {
    label: "Insight Utama",
    tone: safeNumber(furniture.profitMargin) < safeNumber(bestMarginCategory.profitMargin) ? "warning" : "positive",
    text: `Dalam konteks kategori, ${FOCUS_CATEGORY} menyumbang ${formatPercent(furnitureShare(data))} revenue Q4, tetapi profit share hanya ${formatPercent(furnitureProfitShare(data))}. Ketidakseimbangan ini menunjukkan kontribusi penjualan belum sejalan dengan kontribusi laba.`
  });
}

function renderTrenSales(data) {
  const quarters = data.furnitureQuarterTrend || [];
  const peakSales = maxBy(quarters, "sales");
  const lowProfit = minBy(quarters, "profit");
  const q4 = quarters.find(item => item.quarter === FOCUS_QUARTER) || {};
  const q3 = quarters.find(item => item.quarter === COMPARISON_QUARTER) || {};
  const q4Rank = rankByDescending(quarters, "sales", q4);

  const quarterTooltip = d => furnitureTooltip(d.quarterLabel, [
    ["Period", d.quarterLabel],
    ["Category", FOCUS_CATEGORY],
    ["Sales", formatCurrency(d.sales)],
    ["Profit", formatCurrency(d.profit)],
    ["Profit Margin", formatPercent(d.profitMargin)],
    ["Average Discount", formatPercent(d.averageDiscount)],
    ["Estimated Cost Burden", formatCurrency(d.estimatedCostBurden)]
  ]);

  renderLineChart("#trend-sales-line", quarters, {
    label: d => d.quarterLabel,
    value: d => d.sales,
    showAllLabels: true,
    labelFormatter: formatCompactCurrency,
    color: d => revenueLevelMeta(quarters, d).color,
    tooltip: quarterTooltip,
    insights: quarters.map(item => {
      const level = revenueLevelMeta(quarters, item);
      return {
        color: level.color,
        text: `${item.quarterLabel}: ${level.label} ${formatCompactCurrency(item.sales)}`
      };
    })
  });

  renderVerticalBarChart("#trend-profit-bar", quarters, {
    label: d => d.quarterLabel,
    value: d => d.profit,
    zeroLine: true,
    rotateLabels: false,
    labelFormatter: formatCompactCurrency,
    color: d => d.quarter === FOCUS_QUARTER ? chartColors.primary : profitColor(d.profit),
    tooltip: quarterTooltip
  });

  renderScatterPlot("#trend-scatter", quarters, {
    x: d => d.sales,
    y: d => d.profitMargin,
    size: d => d.orders,
    xFormat: formatCompactCurrency,
    yFormat: formatPercent,
    color: d => d.quarter === FOCUS_QUARTER ? chartColors.primary : marginColor(d.profitMargin),
    label: d => d.quarterLabel,
    labelFilter: d => d.quarter === FOCUS_QUARTER || d.quarterLabel === peakSales.quarterLabel || d.quarterLabel === lowProfit.quarterLabel,
    tooltip: quarterTooltip
  });

  renderInsightCards("#trend-insight", [
    storyCard("Peak Revenue", peakSales.quarterLabel || "-", `${peakSales.quarterLabel || "-"} mencatat revenue tertinggi ${formatCurrency(peakSales.sales)}.`, "positive", "Peak"),
    storyCard("Profit Low", lowProfit.quarterLabel || "-", `${lowProfit.quarterLabel || "-"} menjadi titik profit terendah: ${formatCurrency(lowProfit.profit)}.`, safeNumber(lowProfit.profit) < 0 ? "negative" : "warning", "Low"),
    storyCard("Outlook Q4", `Rank ${q4Rank}`, `${focusLabel} berada di posisi ${q4Rank} dari empat quarter berdasarkan revenue Furniture.`, "warning", "Q4")
  ]);

  renderInsightNote("#trend-note", {
    label: "Catatan Analisis",
    tone: q4.quarterLabel === peakSales.quarterLabel ? "positive" : "warning",
    text: `${focusLabel} menjadi puncak revenue ${FOCUS_CATEGORY} sebesar ${formatCurrency(q4.sales)}, namun profit turun dari ${formatCurrency(q3.profit)} di ${comparisonLabel} menjadi ${formatCurrency(q4.profit)}. Kenaikan penjualan belum berkualitas karena profit melemah menjelang outlook Q1.`
  });
}

function renderKategori(data) {
  const subCategories = [...(data.furnitureSubCategory || [])];
  const salesSorted = [...subCategories].sort(byDescending("sales"));
  const marginSorted = [...subCategories].sort(byDescending("profitMargin"));
  const worstSub = minBy(subCategories, "profit");

  renderHorizontalBarChart("#category-sales", salesSorted, {
    label: d => d.subCategory,
    value: d => d.sales,
    labelFormatter: formatCompactCurrency,
    color: d => d.subCategory === worstSub.subCategory ? chartColors.tertiary : chartColors.primary,
    tooltip: d => furnitureTooltip(d.subCategory, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Cost Ratio", formatPercent(d.costRatio)],
      ["Average Discount", formatPercent(d.averageDiscount)],
      ["Orders", formatNumber(d.orders)]
    ])
  });

  renderHorizontalBarChart("#category-margin", marginSorted, {
    label: d => d.subCategory,
    value: d => d.profitMargin,
    formatValue: formatPercent,
    labelFormatter: formatPercent,
    color: d => marginColor(d.profitMargin),
    tooltip: d => furnitureTooltip(d.subCategory, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Profit per Unit", formatCurrency(d.profitPerUnit)],
      ["Average Discount", formatPercent(d.averageDiscount)]
    ])
  });

  renderHorizontalBarChart("#subcategory-profit", subCategories, {
    label: d => d.subCategory,
    value: d => d.profit,
    left: 150,
    labelFormatter: formatCompactCurrency,
    color: d => safeNumber(d.profit) < 0 ? chartColors.error : chartColors.seaGreen,
    tooltip: d => furnitureTooltip(d.subCategory, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Estimated Cost Burden", formatCurrency(d.estimatedCostBurden)],
      ["Cost Ratio", formatPercent(d.costRatio)]
    ])
  });

  renderInsightCards("#category-insight", [
    storyCard("Worst Profit", worstSub.subCategory || "-", `${worstSub.subCategory || "-"} mencatat profit ${formatCurrency(worstSub.profit)} dengan margin ${formatPercent(worstSub.profitMargin)}.`, safeNumber(worstSub.profit) < 0 ? "negative" : "warning", "Leakage"),
    storyCard("Top Revenue", salesSorted[0]?.subCategory || "-", `${salesSorted[0]?.subCategory || "-"} mencatat revenue ${formatCurrency(salesSorted[0]?.sales)}.`, "neutral", "Revenue"),
    storyCard("Best Margin", marginSorted[0]?.subCategory || "-", `${marginSorted[0]?.subCategory || "-"} memiliki margin ${formatPercent(marginSorted[0]?.profitMargin)}.`, "positive", "Margin")
  ]);

  renderInsightNote("#category-note", {
    label: "Prioritas Perhatian",
    tone: safeNumber(worstSub.profit) < 0 ? "negative" : "warning",
    text: `${worstSub.subCategory || "-"} menjadi titik konflik utama: profit ${formatCurrency(worstSub.profit)}, margin ${formatPercent(worstSub.profitMargin)}, cost ratio ${formatPercent(worstSub.costRatio)}. Sub-category ini menunjukkan profit leakage di level produk, sehingga pricing dan discount perlu dikoreksi sebelum volume diperbesar.`
  });
}

function renderRegion(data) {
  const discountRows = data.furnitureDiscountProfit || [];
  const regionRows = data.furnitureRegion || [];
  const highestDiscount = maxBy(discountRows, "averageDiscount");
  const worstMarginSub = minBy(discountRows, "profitMargin");
  const highestCost = maxBy(discountRows, "costRatio");
  const worstRegion = minBy(regionRows, "profitMargin");

  renderScatterPlot("#region-sales", discountRows, {
    x: d => d.averageDiscount,
    y: d => d.profitMargin,
    size: d => d.sales,
    xFormat: formatPercent,
    yFormat: formatPercent,
    color: d => marginColor(d.profitMargin),
    label: d => d.subCategory,
    labelFilter: d => d.subCategory === highestDiscount.subCategory || d.subCategory === worstMarginSub.subCategory,
    tooltip: d => furnitureTooltip(d.subCategory, [
      ["Period", focusLabel],
      ["Average Discount", formatPercent(d.averageDiscount)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Estimated Cost Burden", formatCurrency(d.estimatedCostBurden)]
    ])
  });

  renderHorizontalBarChart("#region-profit", discountRows, {
    label: d => d.subCategory,
    value: d => d.costRatio,
    formatValue: formatPercent,
    labelFormatter: formatPercent,
    color: d => d.subCategory === highestCost.subCategory ? chartColors.tertiary : chartColors.airForceBlue,
    tooltip: d => furnitureTooltip(d.subCategory, [
      ["Period", focusLabel],
      ["Cost Ratio", formatPercent(d.costRatio)],
      ["Estimated Cost Burden", formatCurrency(d.estimatedCostBurden)],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Average Discount", formatPercent(d.averageDiscount)]
    ])
  });

  renderSummaryTable("#region-table", regionRows, {
    columns: [
      { label: "Region", format: row => row.region },
      { label: "Sales", format: row => formatCurrency(row.sales) },
      { label: "Profit", format: row => formatCurrency(row.profit), className: row => safeNumber(row.profit) < 0 ? "negative" : "positive" },
      { label: "Margin", format: row => formatPercent(row.profitMargin), className: row => marginTone(row.profitMargin) },
      { label: "Discount", format: row => formatPercent(row.averageDiscount), className: row => safeNumber(row.averageDiscount) > 0.18 ? "warning" : "" },
      { label: "Cost Ratio", format: row => formatPercent(row.costRatio) },
      { label: "Cost Burden", format: row => formatCurrency(row.estimatedCostBurden) }
    ]
  });

  renderInsightCards("#region-insight", [
    storyCard("Discount Tertinggi", highestDiscount.subCategory || "-", `${highestDiscount.subCategory || "-"} memiliki average discount ${formatPercent(highestDiscount.averageDiscount)}.`, "warning", "Discount"),
    storyCard("Margin Terendah", worstMarginSub.subCategory || "-", `${worstMarginSub.subCategory || "-"} memiliki margin ${formatPercent(worstMarginSub.profitMargin)}.`, marginTone(worstMarginSub.profitMargin), "Margin"),
    storyCard("Region Risk", worstRegion.region || "-", `${worstRegion.region || "-"} memiliki margin Furniture terendah ${formatPercent(worstRegion.profitMargin)}.`, marginTone(worstRegion.profitMargin), "Region")
  ]);

  renderInsightNote("#region-note", {
    label: "Insight Utama",
    tone: marginTone(worstRegion.profitMargin),
    text: `Masalah tidak berhenti di produk. ${highestDiscount.subCategory || "-"} membawa discount tertinggi ${formatPercent(highestDiscount.averageDiscount)}, sementara ${worstRegion.region || "-"} menjadi region margin terendah ${formatPercent(worstRegion.profitMargin)}. Q1 perlu mengunci discount dan memilih region yang tidak menggerus profit.`
  });
}

function renderCustomer(data) {
  const customers = data.furnitureCustomers || [];
  const regions = data.furnitureRegion || [];
  const segments = data.segmentSummary || [];
  const lossOrders = data.furnitureLossOrders || [];
  const topCustomer = maxBy(customers, "sales");
  const worstCustomer = minBy(customers, "profit");
  const worstRegion = minBy(regions, "profitMargin");
  const topSegment = maxBy(segments, "sales");

  renderHorizontalBarChart("#customer-top-sales", customers, {
    label: d => d.customerName,
    value: d => d.sales,
    left: 190,
    labelFormatter: formatCompactCurrency,
    color: d => safeNumber(d.profit) < 0 ? chartColors.error : d.customerName === topCustomer.customerName ? chartColors.primary : chartColors.airForceBlue,
    tooltip: d => furnitureTooltip(d.customerName, [
      ["Period", focusLabel],
      ["Segment", d.segment],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Profit per Order", formatCurrency(d.profitPerOrder)],
      ["Average Discount", formatPercent(d.averageDiscount)]
    ])
  });

  renderVerticalBarChart("#segment-sales", regions, {
    label: d => d.region,
    value: d => d.profit,
    zeroLine: true,
    rotateLabels: false,
    labelFormatter: formatCompactCurrency,
    color: d => d.region === worstRegion.region ? chartColors.error : profitColor(d.profit),
    tooltip: d => furnitureTooltip(d.region, [
      ["Period", focusLabel],
      ["Sales", formatCurrency(d.sales)],
      ["Profit", formatCurrency(d.profit)],
      ["Profit Margin", formatPercent(d.profitMargin)],
      ["Average Discount", formatPercent(d.averageDiscount)],
      ["Cost Ratio", formatPercent(d.costRatio)]
    ])
  });

  renderSummaryTable("#segment-profit", lossOrders, {
    columns: [
      { label: "Order", format: row => row.orderId },
      { label: "Customer", format: row => row.customerName },
      { label: "Region", format: row => row.region },
      { label: "Sub-Category", format: row => row.subCategory },
      { label: "Sales", format: row => formatCurrency(row.sales) },
      { label: "Discount", format: row => formatPercent(row.discount), className: row => safeNumber(row.discount) > 0.2 ? "warning" : "" },
      { label: "Profit", format: row => formatCurrency(row.profit), className: () => "negative" },
      { label: "Margin", format: row => formatPercent(row.profitMargin), className: () => "negative" }
    ]
  });

  renderInsightCards("#customer-insight", [
    storyCard("Top Customer", topCustomer.customerName || "-", `${topCustomer.customerName || "-"} mencatat revenue ${formatCurrency(topCustomer.sales)} dan profit ${formatCurrency(topCustomer.profit)}.`, safeNumber(topCustomer.profit) < 0 ? "negative" : "positive", "Customer"),
    storyCard("Loss Customer", worstCustomer.customerName || "-", `${worstCustomer.customerName || "-"} memiliki profit terendah ${formatCurrency(worstCustomer.profit)}.`, safeNumber(worstCustomer.profit) < 0 ? "negative" : "warning", "Loss"),
    storyCard("Top Segment", topSegment.segment || "-", `${topSegment.segment || "-"} menyumbang revenue Furniture terbesar: ${formatCurrency(topSegment.sales)}.`, "neutral", "Segment")
  ]);

  const customerText = safeNumber(worstCustomer.profit) < 0
    ? `Profil customer menunjukkan risiko retensi berbasis revenue: ${topCustomer.customerName || "-"} mencatat revenue ${formatCurrency(topCustomer.sales)}, sedangkan ${worstCustomer.customerName || "-"} menjadi loss terbesar ${formatCurrency(worstCustomer.profit)}. Prioritas Q1 perlu berbasis margin dan profit per order.`
    : `${topCustomer.customerName || "-"} menjadi customer revenue terbesar ${formatCurrency(topCustomer.sales)} dengan profit ${formatCurrency(topCustomer.profit)}. Ini peluang retensi, tetapi tetap perlu batas discount agar order besar tidak berubah menjadi sumber leakage Q1.`;
  renderInsightNote("#customer-note", {
    label: "Insight Utama",
    tone: safeNumber(worstCustomer.profit) < 0 ? "negative" : "warning",
    text: customerText
  });
}

function renderKesimpulan(data) {
  const furniture = data.furnitureSummary || {};
  const worstSub = minBy(data.furnitureSubCategory, "profit");
  const highestDiscount = maxBy(data.furnitureDiscountProfit, "averageDiscount");
  const worstRegion = minBy(data.furnitureRegion, "profitMargin");
  const worstCustomer = minBy(data.furnitureCustomers, "profit");
  const topRegion = maxBy(data.furnitureRegion, "sales");

  renderInsightCards("#summary-insights", [
    storyCard("Temuan Utama", formatCompactCurrency(furniture.sales), `${FOCUS_CATEGORY} mencatat revenue Q4 ${formatCurrency(furniture.sales)} dengan margin ${formatPercent(furniture.profitMargin)}.`, marginTone(furniture.profitMargin), "Finding"),
    storyCard("Penyebab Utama", worstSub.subCategory || "-", `${worstSub.subCategory || "-"} menjadi sub-category profit terendah dengan ${formatCurrency(worstSub.profit)}.`, safeNumber(worstSub.profit) < 0 ? "negative" : "warning", "Cause"),
    storyCard("Discount Risk", highestDiscount.subCategory || "-", `${highestDiscount.subCategory || "-"} memiliki average discount ${formatPercent(highestDiscount.averageDiscount)} dan cost ratio ${formatPercent(highestDiscount.costRatio)}.`, "warning", "Discount"),
    storyCard("Region Review", worstRegion.region || "-", `${worstRegion.region || "-"} mencatat margin region terendah ${formatPercent(worstRegion.profitMargin)}.`, marginTone(worstRegion.profitMargin), "Region"),
    storyCard("Customer Review", worstCustomer.customerName || "-", `${worstCustomer.customerName || "-"} memiliki profit ${formatCurrency(worstCustomer.profit)}.`, safeNumber(worstCustomer.profit) < 0 ? "negative" : "warning", "Customer"),
    storyCard("Q1 Action", "Pilot Control", `Mulai dari ${worstSub.subCategory || "-"}, ${worstRegion.region || "-"}, dan customer loss terbesar.`, "positive", "Action")
  ]);

  renderTextCards("#recommendation-box", [
    `Tetapkan guardrail discount untuk ${worstSub.subCategory || "sub-category Furniture"} dan sub-category dengan margin rendah.`,
    `Review pricing dan product mix pada ${worstSub.subCategory || "sub-category profit negatif"} sebelum target Q1 ditetapkan.`,
    `Prioritaskan region ${topRegion.region || "-"} dan customer dengan margin positif, batasi promosi pada order loss.`,
    `Pantau profit per order, profit per unit, cost ratio, dan loss order rate sebagai KPI Furniture Q1.`,
    `Setujui pilot margin control untuk Furniture pada Q1 tahun depan.`
  ]);

  renderInsightNote("#summary-note", [
    {
      label: "Sinyal Positif",
      tone: safeNumber(furniture.profit) >= 0 ? "positive" : "warning",
      text: `${FOCUS_CATEGORY} masih menunjukkan permintaan kuat: revenue Q4 ${formatCurrency(furniture.sales)} dan kontribusi terbesar dari ${topRegion.region || "-"}. Peluang ini layak dipertahankan hanya jika setiap order baru memenuhi guardrail margin Q1.`
    },
    {
      label: "Risiko Utama",
      tone: safeNumber(worstSub.profit) < 0 ? "negative" : "warning",
      text: `Risiko utama terkonsentrasi, bukan menyebar rata: ${worstSub.subCategory || "-"} rugi ${formatCurrency(worstSub.profit)}, ${worstRegion.region || "-"} margin ${formatPercent(worstRegion.profitMargin)}, dan ${worstCustomer.customerName || "-"} profit ${formatCurrency(worstCustomer.profit)}. Fokus Q1 harus dimulai dari titik leakage ini.`
    },
    {
      label: "Arahan Keputusan",
      tone: "positive",
      text: `Arah keputusan sudah jelas: jalankan pilot margin control Q1 dengan guardrail discount, review pricing untuk sub-category loss, dan prioritas customer yang terbukti memberi profit per order positif.`
    }
  ]);
}

const tabRenderers = {
  pembuka: renderPembuka,
  overview: renderOverview,
  "tren-sales": renderTrenSales,
  kategori: renderKategori,
  region: renderRegion,
  customer: renderCustomer,
  kesimpulan: renderKesimpulan
};

const getActiveTab = () => document.querySelector(".tab-button.is-active")?.dataset.tab || "pembuka";

function renderActiveTab(tab = getActiveTab()) {
  if (!analyticsData) return;
  renderNarrativeTitles(analyticsData);
  tabRenderers[tab]?.(analyticsData);
}

function renderAll() {
  renderActiveTab();
}

const setupTabs = () => {
  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      document.querySelectorAll(".tab-button").forEach(item => {
        item.classList.toggle("is-active", item === button);
      });

      document.querySelectorAll(".slide-panel").forEach(panel => {
        panel.classList.toggle("is-active", panel.id === `tab-${tab}`);
      });

      window.clearTimeout(resizeTimer);
      window.requestAnimationFrame(() => renderActiveTab(tab));
    });
  });
};

const setupResize = () => {
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderAll, 120);
  });
};

async function init() {
  setupTabs();
  setupResize();
  setLoading();

  try {
    analyticsData = await loadAnalyticsData();
    renderAll();
  } catch (error) {
    setGlobalError(error);
  }
}

init();
