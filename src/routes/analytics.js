import express from "express";
import { pool } from "../db.js";

const router = express.Router();

const clampLimit = value => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 10;
  return Math.min(Math.max(parsed, 1), 50);
};

const asyncRoute = handler => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database query failed",
      message: error?.message || String(error),
      code: error?.code || null,
      sqlMessage: error?.sqlMessage || null,
      sqlState: error?.sqlState || null
    });
  }
};

const queryRows = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

const ORDER_TABLE = "`order`";
const C = {
  orderId: "`Order ID`",
  orderDate: "`Order Date`",
  customerId: "`Customer ID`",
  customerName: "`Customer Name`",
  productId: "`Product ID`",
  productName: "`Product Name`",
  region: "`Region`",
  subCategory: "`Sub-Category`",
  segment: "`segment`",
  category: "`category`",
  sales: "`sales`",
  profit: "`profit`",
  quantity: "`quantity`",
  discount: "`discount`"
};

const parseDateScope = req => ({
  year: Number.parseInt(req.query.year || "2026", 10),
  quarter: req.query.quarter ? Number.parseInt(req.query.quarter, 10) : null,
  category: req.query.category || null
});

const scopedDateColumn = alias => alias ? `${alias}.${C.orderDate}` : C.orderDate;

function buildDateFilter({ year, quarter }, alias = "") {
  const dateColumn = scopedDateColumn(alias);
  const conditions = [];
  const params = [];

  if (Number.isFinite(year)) {
    conditions.push(`YEAR(${dateColumn}) = ?`);
    params.push(year);
  }

  if (Number.isFinite(quarter)) {
    conditions.push(`QUARTER(${dateColumn}) = ?`);
    params.push(quarter);
  }

  return {
    whereClause: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    params
  };
}

function buildScopeFilter(scope, alias = "") {
  const dateColumn = scopedDateColumn(alias);
  const categoryColumn = alias ? `${alias}.${C.category}` : C.category;
  const conditions = [];
  const params = [];

  if (Number.isFinite(scope.year)) {
    conditions.push(`YEAR(${dateColumn}) = ?`);
    params.push(scope.year);
  }

  if (Number.isFinite(scope.quarter)) {
    conditions.push(`QUARTER(${dateColumn}) = ?`);
    params.push(scope.quarter);
  }

  if (scope.category) {
    conditions.push(`${categoryColumn} = ?`);
    params.push(scope.category);
  }

  return {
    whereClause: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    params
  };
}

router.get("/summary", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      SUM(${C.sales}) AS totalSales,
      SUM(${C.profit}) AS totalProfit,
      SUM(${C.quantity}) AS totalQuantity,
      COUNT(DISTINCT ${C.orderId}) AS totalOrders,
      COUNT(DISTINCT ${C.customerId}) AS totalCustomers,
      SUM(${C.sales}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS averageOrderValue,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      AVG(${C.discount}) AS averageDiscount
    FROM ${ORDER_TABLE}
    ${whereClause};
  `, params);

  res.json(rows[0] || {});
}));

router.get("/sales-by-month", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      DATE_FORMAT(${C.orderDate}, '%Y-%m') AS monthKey,
      DATE_FORMAT(${C.orderDate}, '%b %Y') AS monthLabel,
      YEAR(${C.orderDate}) AS year,
      MONTH(${C.orderDate}) AS month,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY
      DATE_FORMAT(${C.orderDate}, '%Y-%m'),
      DATE_FORMAT(${C.orderDate}, '%b %Y'),
      YEAR(${C.orderDate}),
      MONTH(${C.orderDate})
    ORDER BY year, month;
  `, params);

  res.json(rows);
}));

router.get("/sales-by-quarter", asyncRoute(async (req, res) => {
  const year = Number.parseInt(req.query.year || "2026", 10);
  const category = req.query.category || null;
  const categoryClause = category ? `AND ${C.category} = ?` : "";
  const params = category ? [year, category] : [year];

  const rows = await queryRows(`
    SELECT
      year,
      quarter,
      CONCAT('Q', quarter, ' ', year) AS quarterLabel,
      sales,
      profit,
      quantity,
      orders,
      customers,
      averageDiscount,
      profitMargin
    FROM (
      SELECT
        YEAR(${C.orderDate}) AS year,
        QUARTER(${C.orderDate}) AS quarter,
        SUM(${C.sales}) AS sales,
        SUM(${C.profit}) AS profit,
        SUM(${C.quantity}) AS quantity,
        COUNT(DISTINCT ${C.orderId}) AS orders,
        COUNT(DISTINCT ${C.customerId}) AS customers,
        AVG(${C.discount}) AS averageDiscount,
        SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
      FROM ${ORDER_TABLE}
      WHERE YEAR(${C.orderDate}) = ?
        ${categoryClause}
      GROUP BY
        YEAR(${C.orderDate}),
        QUARTER(${C.orderDate})
    ) quarterly
    ORDER BY year, quarter;
  `, params);

  res.json(rows);
}));

router.get("/category-by-quarter", asyncRoute(async (req, res) => {
  const year = Number.parseInt(req.query.year || "2026", 10);
  const category = req.query.category || "Furniture";

  const rows = await queryRows(`
    SELECT
      year,
      quarter,
      CONCAT('Q', quarter, ' ', year) AS quarterLabel,
      category,
      sales,
      profit,
      quantity,
      orders,
      customers,
      averageDiscount,
      averageOrderValue,
      profitMargin,
      profitPerOrder,
      profitPerUnit,
      estimatedCostBurden,
      costRatio,
      lossRows
    FROM (
      SELECT
        YEAR(${C.orderDate}) AS year,
        QUARTER(${C.orderDate}) AS quarter,
        ${C.category} AS category,
        SUM(${C.sales}) AS sales,
        SUM(${C.profit}) AS profit,
        SUM(${C.quantity}) AS quantity,
        COUNT(DISTINCT ${C.orderId}) AS orders,
        COUNT(DISTINCT ${C.customerId}) AS customers,
        AVG(${C.discount}) AS averageDiscount,
        SUM(${C.sales}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS averageOrderValue,
        SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
        SUM(${C.profit}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS profitPerOrder,
        SUM(${C.profit}) / NULLIF(SUM(${C.quantity}), 0) AS profitPerUnit,
        SUM(${C.sales} - ${C.profit}) AS estimatedCostBurden,
        SUM(${C.sales} - ${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS costRatio,
        SUM(CASE WHEN ${C.profit} < 0 THEN 1 ELSE 0 END) AS lossRows
      FROM ${ORDER_TABLE}
      WHERE YEAR(${C.orderDate}) = ?
        AND ${C.category} = ?
      GROUP BY
        YEAR(${C.orderDate}),
        QUARTER(${C.orderDate}),
        ${C.category}
    ) quarterly
    ORDER BY quarter;
  `, [year, category]);

  res.json(rows);
}));

router.get("/overview-by-year", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildDateFilter(parseDateScope(req));
  const rows = await queryRows(`
    WITH yearly AS (
      SELECT
        YEAR(${C.orderDate}) AS year,
        SUM(${C.sales}) AS sales,
        SUM(${C.profit}) AS profit,
        SUM(${C.quantity}) AS quantity,
        COUNT(DISTINCT ${C.orderId}) AS orders,
        COUNT(DISTINCT ${C.customerId}) AS customers,
        AVG(${C.discount}) AS averageDiscount,
        SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
      FROM ${ORDER_TABLE}
      ${whereClause}
      GROUP BY YEAR(${C.orderDate})
    )
    SELECT
      year,
      sales,
      profit,
      quantity,
      orders,
      customers,
      averageDiscount,
      profitMargin,
      (sales - LAG(sales) OVER (ORDER BY year)) / NULLIF(LAG(sales) OVER (ORDER BY year), 0) AS salesGrowth,
      (profit - LAG(profit) OVER (ORDER BY year)) / NULLIF(LAG(profit) OVER (ORDER BY year), 0) AS profitGrowth
    FROM yearly
    ORDER BY year;
  `, params);

  res.json(rows);
}));

router.get("/overview-by-quarter", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildDateFilter(parseDateScope(req));

  const rows = await queryRows(`
    WITH quarterly AS (
      SELECT
        YEAR(${C.orderDate}) AS year,
        QUARTER(${C.orderDate}) AS quarter,
        SUM(${C.sales}) AS sales,
        SUM(${C.profit}) AS profit,
        SUM(${C.quantity}) AS quantity,
        COUNT(DISTINCT ${C.orderId}) AS orders,
        COUNT(DISTINCT ${C.customerId}) AS customers,
        AVG(${C.discount}) AS averageDiscount,
        SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
      FROM ${ORDER_TABLE}
      ${whereClause}
      GROUP BY
        YEAR(${C.orderDate}),
        QUARTER(${C.orderDate})
    )
    SELECT
      CONCAT(year, '-Q', quarter) AS quarterKey,
      year,
      quarter,
      sales,
      profit,
      quantity,
      orders,
      customers,
      averageDiscount,
      profitMargin,
      (sales - LAG(sales) OVER (ORDER BY year, quarter)) / NULLIF(LAG(sales) OVER (ORDER BY year, quarter), 0) AS salesGrowth,
      (profit - LAG(profit) OVER (ORDER BY year, quarter)) / NULLIF(LAG(profit) OVER (ORDER BY year, quarter), 0) AS profitGrowth
    FROM quarterly
    ORDER BY year, quarter;
  `, params);

  res.json(rows);
}));

router.get("/category-summary", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      ${C.category} AS category,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.category}
    ORDER BY sales DESC;
  `, params);

  res.json(rows);
}));

router.get("/subcategory-summary", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      ${C.category} AS category,
      ${C.subCategory} AS subCategory,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.category}, ${C.subCategory}
    ORDER BY profit DESC;
  `, params);

  res.json(rows);
}));

router.get("/region-summary", asyncRoute(async (req, res) => {
  const scope = parseDateScope(req);
  const baseFilter = buildScopeFilter(scope);
  const orderFilter = buildScopeFilter(scope, "o");
  const rows = await queryRows(`
    WITH region_base AS (
      SELECT
        ${C.region} AS region,
        ${C.category} AS category,
        SUM(${C.sales}) AS categorySales
      FROM ${ORDER_TABLE}
      ${baseFilter.whereClause}
      GROUP BY ${C.region}, ${C.category}
    ),
    top_category AS (
      SELECT region, category AS topCategory
      FROM (
        SELECT
          region,
          category,
          categorySales,
          ROW_NUMBER() OVER (PARTITION BY region ORDER BY categorySales DESC) AS rn
        FROM region_base
      ) ranked
      WHERE rn = 1
    )
    SELECT
      o.${C.region} AS region,
      SUM(o.${C.sales}) AS sales,
      SUM(o.${C.profit}) AS profit,
      SUM(o.${C.quantity}) AS quantity,
      COUNT(DISTINCT o.${C.orderId}) AS orders,
      COUNT(DISTINCT o.${C.customerId}) AS customers,
      AVG(o.${C.discount}) AS averageDiscount,
      SUM(o.${C.profit}) / NULLIF(SUM(o.${C.sales}), 0) AS profitMargin,
      tc.topCategory
    FROM ${ORDER_TABLE} o
    LEFT JOIN top_category tc ON o.${C.region} = tc.region
    ${orderFilter.whereClause}
    GROUP BY o.${C.region}, tc.topCategory
    ORDER BY sales DESC;
  `, [...baseFilter.params, ...orderFilter.params]);

  res.json(rows);
}));

router.get("/segment-summary", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      ${C.segment} AS segment,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.segment}
    ORDER BY sales DESC;
  `, params);

  res.json(rows);
}));

router.get("/top-customers", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const rows = await queryRows(`
    SELECT
      ${C.customerId} AS customerId,
      ${C.customerName} AS customerName,
      ${C.segment} AS segment,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.customerId}, ${C.customerName}, ${C.segment}
    ORDER BY sales DESC
    LIMIT ?;
  `, [...params, clampLimit(req.query.limit)]);

  res.json(rows);
}));

router.get("/top-products", asyncRoute(async (req, res) => {
  const { whereClause, params } = buildScopeFilter(parseDateScope(req));
  const sortMap = {
    sales: "sales",
    profit: "profit",
    quantity: "quantity",
    orders: "orders"
  };
  const sortBy = sortMap[req.query.sortBy] || "sales";
  const rows = await queryRows(`
    SELECT
      ${C.productId} AS productId,
      ${C.productName} AS productName,
      ${C.category} AS category,
      ${C.subCategory} AS subCategory,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.productId}, ${C.productName}, ${C.category}, ${C.subCategory}
    ORDER BY ${sortBy} DESC
    LIMIT ?;
  `, [...params, clampLimit(req.query.limit)]);

  res.json(rows);
}));

router.get("/furniture-summary", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.sales}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS averageOrderValue,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      SUM(${C.profit}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS profitPerOrder,
      SUM(${C.profit}) / NULLIF(SUM(${C.quantity}), 0) AS profitPerUnit,
      SUM(${C.sales} - ${C.profit}) AS estimatedCostBurden,
      SUM(${C.sales} - ${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS costRatio,
      SUM(CASE WHEN ${C.profit} < 0 THEN 1 ELSE 0 END) AS lossRows,
      SUM(CASE WHEN ${C.profit} < 0 THEN ${C.sales} ELSE 0 END) AS lossSales,
      SUM(CASE WHEN ${C.profit} < 0 THEN ${C.profit} ELSE 0 END) AS lossProfit
    FROM ${ORDER_TABLE}
    ${whereClause};
  `, params);

  res.json(rows[0] || {});
}));

router.get("/furniture-subcategory", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      ${C.subCategory} AS subCategory,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      SUM(${C.profit}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS profitPerOrder,
      SUM(${C.profit}) / NULLIF(SUM(${C.quantity}), 0) AS profitPerUnit,
      SUM(${C.sales} - ${C.profit}) AS estimatedCostBurden,
      SUM(${C.sales} - ${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS costRatio
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.subCategory}
    ORDER BY profit ASC;
  `, params);

  res.json(rows);
}));

router.get("/furniture-region", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      ${C.region} AS region,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      COUNT(DISTINCT ${C.customerId}) AS customers,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      SUM(${C.sales} - ${C.profit}) AS estimatedCostBurden,
      SUM(${C.sales} - ${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS costRatio
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.region}
    ORDER BY profit ASC;
  `, params);

  res.json(rows);
}));

router.get("/furniture-customer", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      ${C.customerId} AS customerId,
      ${C.customerName} AS customerName,
      ${C.segment} AS segment,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.quantity}) AS quantity,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      SUM(${C.profit}) / NULLIF(COUNT(DISTINCT ${C.orderId}), 0) AS profitPerOrder
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.customerId}, ${C.customerName}, ${C.segment}
    ORDER BY sales DESC
    LIMIT ?;
  `, [...params, clampLimit(req.query.limit)]);

  res.json(rows);
}));

router.get("/furniture-discount-profit", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      ${C.subCategory} AS subCategory,
      AVG(${C.discount}) AS averageDiscount,
      SUM(${C.sales}) AS sales,
      SUM(${C.profit}) AS profit,
      SUM(${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS profitMargin,
      COUNT(DISTINCT ${C.orderId}) AS orders,
      SUM(${C.sales} - ${C.profit}) AS estimatedCostBurden,
      SUM(${C.sales} - ${C.profit}) / NULLIF(SUM(${C.sales}), 0) AS costRatio
    FROM ${ORDER_TABLE}
    ${whereClause}
    GROUP BY ${C.subCategory}
    ORDER BY averageDiscount DESC;
  `, params);

  res.json(rows);
}));

router.get("/furniture-loss-orders", asyncRoute(async (req, res) => {
  const scope = { ...parseDateScope(req), category: "Furniture" };
  const { whereClause, params } = buildScopeFilter(scope);
  const rows = await queryRows(`
    SELECT
      ${C.orderId} AS orderId,
      ${C.orderDate} AS orderDate,
      ${C.customerName} AS customerName,
      ${C.region} AS region,
      ${C.subCategory} AS subCategory,
      ${C.productName} AS productName,
      ${C.sales} AS sales,
      ${C.quantity} AS quantity,
      ${C.discount} AS discount,
      ${C.profit} AS profit,
      ${C.profit} / NULLIF(${C.sales}, 0) AS profitMargin
    FROM ${ORDER_TABLE}
    ${whereClause}
      AND ${C.profit} < 0
    ORDER BY profit ASC
    LIMIT ?;
  `, [...params, clampLimit(req.query.limit)]);

  res.json(rows);
}));

export default router;
