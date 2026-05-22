const API_BASE = window.SUPERSTORE_API_BASE || "/api/analytics";
export const YEAR = 2026;
export const FOCUS_QUARTER = 4;
export const COMPARISON_QUARTER = 3;
export const FOCUS_CATEGORY = "Furniture";

export async function getJson(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    let message = `Failed to fetch ${endpoint}: ${response.status}`;
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  return response.json();
}

export async function loadAnalyticsData() {
  const focusParams = `year=${YEAR}&quarter=${FOCUS_QUARTER}`;
  const comparisonParams = `year=${YEAR}&quarter=${COMPARISON_QUARTER}`;
  const furnitureFocusParams = `${focusParams}&category=${encodeURIComponent(FOCUS_CATEGORY)}`;
  const furnitureComparisonParams = `${comparisonParams}&category=${encodeURIComponent(FOCUS_CATEGORY)}`;
  const [
    summaryQ4,
    summaryQ3,
    salesByQuarter2026,
    furnitureQuarterTrend,
    salesByMonthFurnitureQ4,
    categorySummaryQ4,
    categorySummaryQ3,
    furnitureSummaryQ4,
    furnitureSummaryQ3,
    furnitureSubCategoryQ4,
    furnitureRegionQ4,
    furnitureCustomersQ4,
    furnitureDiscountProfitQ4,
    furnitureLossOrdersQ4,
    segmentSummaryQ4
  ] = await Promise.all([
    getJson(`/summary?${focusParams}`),
    getJson(`/summary?${comparisonParams}`),
    getJson(`/sales-by-quarter?year=${YEAR}`),
    getJson(`/category-by-quarter?year=${YEAR}&category=${encodeURIComponent(FOCUS_CATEGORY)}`),
    getJson(`/sales-by-month?${furnitureFocusParams}`),
    getJson(`/category-summary?${focusParams}`),
    getJson(`/category-summary?${comparisonParams}`),
    getJson(`/furniture-summary?${focusParams}`),
    getJson(`/furniture-summary?${comparisonParams}`),
    getJson(`/furniture-subcategory?${focusParams}`),
    getJson(`/furniture-region?${focusParams}`),
    getJson(`/furniture-customer?${focusParams}&limit=10`),
    getJson(`/furniture-discount-profit?${focusParams}`),
    getJson(`/furniture-loss-orders?${focusParams}&limit=10`),
    getJson(`/segment-summary?${furnitureFocusParams}`)
  ]);

  return {
    summary: summaryQ4,
    summaryQ4,
    summaryQ3,
    salesByQuarter2026,
    furnitureQuarterTrend,
    salesByMonthFurnitureQ4,
    categorySummary: categorySummaryQ4,
    categorySummaryQ4,
    categorySummaryQ3,
    furnitureSummary: furnitureSummaryQ4,
    furnitureSummaryQ4,
    furnitureSummaryQ3,
    furnitureSubCategory: furnitureSubCategoryQ4,
    furnitureRegion: furnitureRegionQ4,
    furnitureCustomers: furnitureCustomersQ4,
    furnitureDiscountProfit: furnitureDiscountProfitQ4,
    furnitureLossOrders: furnitureLossOrdersQ4,
    segmentSummary: segmentSummaryQ4,
    scope: {
      year: YEAR,
      focusQuarter: FOCUS_QUARTER,
      comparisonQuarter: COMPARISON_QUARTER,
      focusCategory: FOCUS_CATEGORY,
      focusLabel: `Q${FOCUS_QUARTER} ${YEAR}`,
      comparisonLabel: `Q${COMPARISON_QUARTER} ${YEAR}`
    }
  };
}
