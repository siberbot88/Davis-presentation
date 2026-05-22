import { formatCompactCurrency, formatNumber, safeNumber } from "./utils.js";

const d3 = window.d3;

export const chartColors = {
  primary: "#2d5afe",
  primaryDeep: "#003fde",
  secondary: "#8b5cf6",
  tertiary: "#f59e0b",
  success: "#10b981",
  error: "#ba1a1a",
  paleSky: "#bfd7ea",
  coolSteel: "#91aec1",
  airForceBlue: "#508ca4",
  seaGreen: "#0a8754",
  darkSpruce: "#004f2d",
  onSurface: "#191b24",
  onSurfaceVariant: "#434656",
  grid: "#e2e1ef"
};

let tooltip;

const getElement = container =>
  typeof container === "string" ? document.querySelector(container) : container;

const escapeHtml = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const clearContainer = container => {
  const element = getElement(container);
  if (element) element.innerHTML = "";
  return element;
};

const getWidth = element => Math.max(320, Math.floor(element.getBoundingClientRect().width || element.clientWidth || 720));

const renderState = (container, className, message) => {
  const element = clearContainer(container);
  if (!element) return;
  element.innerHTML = `<div class="${className}">${escapeHtml(message)}</div>`;
};

export const renderEmptyState = (container, message = "Data tidak tersedia.") =>
  renderState(container, "empty-state", message);

export const renderErrorState = (container, message = "Data gagal dimuat.") =>
  renderState(container, "error-state", message);

export function initTooltip() {
  tooltip = d3.select("body")
    .append("div")
    .attr("class", "chart-tooltip");

  return tooltip;
}

export function tooltipRows(title, rows) {
  return `
    <div class="tooltip-title">${escapeHtml(title)}</div>
    ${rows.map(([label, value]) => `
      <div class="tooltip-row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `).join("")}
  `;
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

function requireD3(container) {
  if (!d3) {
    renderErrorState(container, "D3.js tidak tersedia.");
    return false;
  }
  return true;
}

export function renderKpiCards(container, metrics) {
  const element = clearContainer(container);
  if (!element) return;
  if (!metrics?.length) {
    renderEmptyState(element);
    return;
  }

  element.innerHTML = metrics.map(metric => `
    <article class="metric-card ${escapeHtml(metric.tone || "")}" data-tooltip="${escapeHtml(metric.tooltip || "")}">
      <p class="metric-label">${escapeHtml(metric.label)}</p>
      <p class="metric-value">${escapeHtml(metric.value)}</p>
      <p class="metric-support">${escapeHtml(metric.support || "")}</p>
    </article>
  `).join("");

  element.querySelectorAll(".metric-card").forEach(card => {
    card.addEventListener("mouseenter", event => showTooltip(event, card.dataset.tooltip));
    card.addEventListener("mousemove", moveTooltip);
    card.addEventListener("mouseleave", hideTooltip);
  });
}

export function renderInsightCards(container, insights) {
  const element = clearContainer(container);
  if (!element) return;
  if (!insights?.length) {
    renderEmptyState(element);
    return;
  }

  element.innerHTML = insights.map(insight => `
    <article class="insight-card ${escapeHtml(insight.variant || "")} ${escapeHtml(insight.tone || "")}">
      <span class="insight-status-badge">${escapeHtml(insight.badge || insight.tone || "Info")}</span>
      <p class="insight-label">${escapeHtml(insight.label)}</p>
      <p class="insight-value">${escapeHtml(insight.value)}</p>
      <p class="insight-note">${escapeHtml(insight.note || "")}</p>
    </article>
  `).join("");
}

export function renderInsightNote(container, note) {
  const element = clearContainer(container);
  if (!element) return;
  const notes = Array.isArray(note) ? note : [note];
  if (!notes.some(item => item?.text)) {
    renderEmptyState(element, "Catatan analisis belum tersedia.");
    return;
  }

  element.innerHTML = notes.filter(item => item?.text).map(item => `
    <div class="so-what-note ${escapeHtml(item.tone || "neutral")}">
      ${item.label ? `<strong>${escapeHtml(item.label)}</strong>` : ""}
      ${escapeHtml(item.text)}
    </div>
  `).join("");
}

export function renderHorizontalBarChart(container, data, options) {
  const element = clearContainer(container);
  if (!element || !requireD3(element)) return;
  if (!data?.length) {
    renderEmptyState(element);
    return;
  }

  const width = getWidth(element);
  const margin = { top: 18, right: 34, bottom: 42, left: options.left ?? 132 };
  const height = options.height ?? Math.max(340, data.length * 46 + margin.top + margin.bottom);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const label = options.label;
  const value = options.value;
  const values = data.map(d => safeNumber(value(d)));
  const min = Math.min(0, d3.min(values));
  const max = d3.max(values) || 1;
  const x = d3.scaleLinear()
    .domain([min, max * 1.08])
    .nice()
    .range([0, innerWidth]);
  const y = d3.scaleBand()
    .domain(data.map(label))
    .range([0, innerHeight])
    .padding(0.28);

  const svg = d3.select(element)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "grid-line")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).ticks(5).tickSize(-innerHeight).tickFormat(""))
    .call(axis => axis.select(".domain").remove());

  if (min < 0) {
    g.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", chartColors.onSurface)
      .attr("stroke-width", 1);
  } else if (options.showTrack !== false) {
    g.selectAll(".bar-track")
      .data(data)
      .join("rect")
      .attr("class", "bar-track")
      .attr("x", x(0))
      .attr("y", d => y(label(d)))
      .attr("width", innerWidth)
      .attr("height", y.bandwidth())
      .attr("rx", 5)
      .attr("fill", chartColors.paleSky)
      .attr("opacity", 0.28);
  }

  g.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => Math.min(x(0), x(safeNumber(value(d)))))
    .attr("y", d => y(label(d)))
    .attr("width", d => Math.abs(x(safeNumber(value(d))) - x(0)))
    .attr("height", y.bandwidth())
    .attr("rx", 5)
    .attr("fill", (d, i) => options.color?.(d, i) || chartColors.airForceBlue)
    .on("mouseenter", (event, d) => showTooltip(event, options.tooltip(d)))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  const labelFormatter = options.labelFormatter || options.formatValue || formatCompactCurrency;
  g.selectAll(".bar-value-label")
    .data(data)
    .join("text")
    .attr("class", "bar-value-label")
    .attr("x", d => {
      const numeric = safeNumber(value(d));
      const barWidth = Math.abs(x(numeric) - x(0));
      const end = x(numeric);
      if (numeric < 0) return barWidth > 38 ? x(0) - 8 : Math.max(end - 8, 4);
      return Math.min(end + 8, innerWidth - 4);
    })
    .attr("y", d => y(label(d)) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => safeNumber(value(d)) < 0 ? "end" : "start")
    .attr("fill", d => {
      const numeric = safeNumber(value(d));
      const barWidth = Math.abs(x(numeric) - x(0));
      return numeric < 0 && barWidth > 38 ? "#ffffff" : chartColors.onSurface;
    })
    .attr("font-size", 11)
    .attr("font-weight", 700)
    .text(d => labelFormatter(safeNumber(value(d))));

  g.append("g")
    .attr("class", "chart-axis")
    .call(d3.axisLeft(y).tickSize(0))
    .call(axis => axis.select(".domain").remove());

  g.append("g")
    .attr("class", "chart-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(options.formatValue || formatCompactCurrency))
    .call(axis => axis.select(".domain").remove());
}

export function renderVerticalBarChart(container, data, options) {
  const element = clearContainer(container);
  if (!element || !requireD3(element)) return;
  if (!data?.length) {
    renderEmptyState(element);
    return;
  }

  const width = getWidth(element);
  const margin = { top: 20, right: 28, bottom: options.bottom ?? 72, left: 70 };
  const height = options.height ?? 430;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const label = options.label;
  const value = options.value;
  const values = data.map(d => safeNumber(value(d)));
  const min = Math.min(0, d3.min(values));
  const max = d3.max(values) || 1;
  const x = d3.scaleBand()
    .domain(data.map(label))
    .range([0, innerWidth])
    .padding(0.28);
  const y = d3.scaleLinear()
    .domain([min, max * 1.1])
    .nice()
    .range([innerHeight, 0]);

  const svg = d3.select(element)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "grid-line")
    .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth).tickFormat(""))
    .call(axis => axis.select(".domain").remove());

  if (min < 0 || options.zeroLine) {
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", chartColors.onSurface)
      .attr("stroke-width", 1);
  }

  g.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(label(d)))
    .attr("y", d => Math.min(y(0), y(safeNumber(value(d)))))
    .attr("width", x.bandwidth())
    .attr("height", d => Math.abs(y(safeNumber(value(d))) - y(0)))
    .attr("rx", 5)
    .attr("fill", (d, i) => options.color?.(d, i) || chartColors.airForceBlue)
    .on("mouseenter", (event, d) => showTooltip(event, options.tooltip(d)))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  const labelFormatter = options.labelFormatter || options.formatValue || formatCompactCurrency;
  g.selectAll(".bar-value-label")
    .data(data)
    .join("text")
    .attr("class", "bar-value-label")
    .attr("x", d => x(label(d)) + x.bandwidth() / 2)
    .attr("y", d => {
      const numeric = safeNumber(value(d));
      const barHeight = Math.abs(y(numeric) - y(0));
      if (numeric < 0) return barHeight > 24 ? y(0) + 16 : Math.min(y(numeric) + 14, innerHeight - 8);
      return y(numeric) - 8;
    })
    .attr("text-anchor", "middle")
    .attr("fill", d => {
      const numeric = safeNumber(value(d));
      const barHeight = Math.abs(y(numeric) - y(0));
      return numeric < 0 && barHeight > 24 ? "#ffffff" : chartColors.onSurface;
    })
    .attr("font-size", 11)
    .attr("font-weight", 700)
    .text(d => labelFormatter(safeNumber(value(d))));

  g.append("g")
    .attr("class", "chart-axis")
    .call(d3.axisLeft(y).ticks(5).tickFormat(options.formatValue || formatCompactCurrency));

  g.append("g")
    .attr("class", "chart-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call(axis => {
      axis.select(".domain").remove();
      axis.selectAll("text")
        .attr("transform", options.rotateLabels === false ? null : "rotate(-35)")
        .attr("text-anchor", options.rotateLabels === false ? "middle" : "end")
        .attr("dx", options.rotateLabels === false ? 0 : "-0.6em")
        .attr("dy", options.rotateLabels === false ? "0.8em" : "0.2em");
    });
}

export function renderLineChart(container, data, options) {
  const element = clearContainer(container);
  if (!element || !requireD3(element)) return;
  if (!data?.length) {
    renderEmptyState(element);
    return;
  }

  const width = getWidth(element);
  const margin = { top: 24, right: 34, bottom: 78, left: 76 };
  const height = options.height ?? 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const label = options.label;
  const value = options.value;
  const x = d3.scalePoint()
    .domain(data.map(label))
    .range([0, innerWidth])
    .padding(0.3);
  const y = d3.scaleLinear()
    .domain([0, (d3.max(data, d => safeNumber(value(d))) || 1) * 1.12])
    .nice()
    .range([innerHeight, 0]);
  const line = d3.line()
    .x(d => x(label(d)))
    .y(d => y(safeNumber(value(d))))
    .curve(d3.curveMonotoneX);

  const svg = d3.select(element)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "grid-line")
    .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth).tickFormat(""))
    .call(axis => axis.select(".domain").remove());

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", options.lineColor || chartColors.primary)
    .attr("stroke-width", 3)
    .attr("d", line);

  if (Number.isFinite(options.target)) {
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", y(options.target))
      .attr("y2", y(options.target))
      .attr("stroke", chartColors.tertiary)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "6 6");

    g.append("text")
      .attr("x", innerWidth)
      .attr("y", y(options.target) - 8)
      .attr("text-anchor", "end")
      .attr("fill", chartColors.tertiary)
      .attr("font-size", 11)
      .attr("font-weight", 700)
      .text(options.targetLabel || `Target ${formatCompactCurrency(options.target)}`);
  }

  g.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => x(label(d)))
    .attr("cy", d => y(safeNumber(value(d))))
    .attr("r", 5)
    .attr("fill", (d, i) => options.color?.(d, i) || chartColors.airForceBlue)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .on("mouseenter", (event, d) => showTooltip(event, options.tooltip(d)))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  const labelFormatter = options.labelFormatter || options.formatValue || formatCompactCurrency;
  const labelFilter = options.labelFilter || (() => false);
  g.selectAll(".line-value-label")
    .data(data.filter((d, i) => options.showAllLabels || labelFilter(d, i)))
    .join("text")
    .attr("class", "line-value-label")
    .attr("x", d => x(label(d)))
    .attr("y", d => y(safeNumber(value(d))) - 12)
    .attr("text-anchor", "middle")
    .attr("fill", d => options.color?.(d) || chartColors.onSurface)
    .attr("font-size", 11)
    .attr("font-weight", 700)
    .text(d => options.pointLabel?.(d) || labelFormatter(safeNumber(value(d))));

  g.append("g")
    .attr("class", "chart-axis")
    .call(d3.axisLeft(y).ticks(5).tickFormat(options.formatValue || formatCompactCurrency));

  g.append("g")
    .attr("class", "chart-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickValues(x.domain().filter((_, i) => i % Math.ceil(data.length / 10) === 0)))
    .call(axis => {
      axis.select(".domain").remove();
      axis.selectAll("text")
        .attr("transform", "rotate(-35)")
        .attr("text-anchor", "end")
        .attr("dx", "-0.6em")
        .attr("dy", "0.2em");
    });

  if (options.insights?.length) {
    const chips = d3.select(element)
      .append("div")
      .attr("class", "chart-insight-chips");

    chips.selectAll(".chart-insight-chip")
      .data(options.insights)
      .join("div")
      .attr("class", d => `chart-insight-chip ${d.tone || ""}`)
      .text(d => d.text);
  }
}

export function renderScatterPlot(container, data, options) {
  const element = clearContainer(container);
  if (!element || !requireD3(element)) return;
  if (!data?.length) {
    renderEmptyState(element);
    return;
  }

  const width = getWidth(element);
  const margin = { top: 24, right: 34, bottom: 58, left: 76 };
  const height = options.height ?? 430;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xValue = options.x;
  const yValue = options.y;
  const sizeValue = options.size;
  const x = d3.scaleLinear()
    .domain([0, (d3.max(data, d => safeNumber(xValue(d))) || 1) * 1.12])
    .nice()
    .range([0, innerWidth]);
  const yMin = Math.min(0, d3.min(data, d => safeNumber(yValue(d))));
  const yMax = d3.max(data, d => safeNumber(yValue(d))) || 1;
  const y = d3.scaleLinear()
    .domain([yMin, yMax * 1.12])
    .nice()
    .range([innerHeight, 0]);
  const radius = d3.scaleSqrt()
    .domain([0, d3.max(data, d => safeNumber(sizeValue(d))) || 1])
    .range([5, 18]);

  const svg = d3.select(element)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "grid-line")
    .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth).tickFormat(""))
    .call(axis => axis.select(".domain").remove());

  g.append("line")
    .attr("x1", 0)
    .attr("x2", innerWidth)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", chartColors.outline || chartColors.grid);

  g.selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => x(safeNumber(xValue(d))))
    .attr("cy", d => y(safeNumber(yValue(d))))
    .attr("r", d => radius(safeNumber(sizeValue(d))))
    .attr("fill", (d, i) => options.color?.(d, i) || chartColors.airForceBlue)
    .attr("fill-opacity", 0.78)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1.5)
    .on("mouseenter", (event, d) => showTooltip(event, options.tooltip(d)))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  if (options.label) {
    const labelData = data.filter((d, i) => options.labelFilter?.(d, i) || false);
    g.selectAll(".scatter-value-label")
      .data(labelData)
      .join("text")
      .attr("class", "scatter-value-label")
      .attr("x", d => x(safeNumber(xValue(d))) + radius(safeNumber(sizeValue(d))) + 5)
      .attr("y", d => y(safeNumber(yValue(d))) - 4)
      .attr("fill", chartColors.onSurface)
      .attr("font-size", 11)
      .attr("font-weight", 700)
      .text(d => options.label(d));
  }

  g.append("g")
    .attr("class", "chart-axis")
    .call(d3.axisLeft(y).ticks(5).tickFormat(options.yFormat || formatCompactCurrency));

  g.append("g")
    .attr("class", "chart-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(options.xFormat || formatCompactCurrency));
}

export function renderSummaryTable(container, data, options) {
  const element = clearContainer(container);
  if (!element) return;
  if (!data?.length) {
    renderEmptyState(element);
    return;
  }

  const columns = options.columns || [];
  element.innerHTML = `
    <table class="summary-table">
      <thead>
        <tr>${columns.map(column => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>
            ${columns.map(column => `
              <td class="${escapeHtml(column.className?.(row) || "")}">
                ${escapeHtml(column.format ? column.format(row) : row[column.key])}
              </td>
            `).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

export function renderTextCards(container, cards) {
  const element = clearContainer(container);
  if (!element) return;
  if (!cards?.length) {
    renderEmptyState(element);
    return;
  }

  element.innerHTML = cards.map(card => `
    <article class="recommendation-card">
      <p>${escapeHtml(card)}</p>
    </article>
  `).join("");
}

export const defaultNumberFormatter = formatNumber;
