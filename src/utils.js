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
  if (Math.abs(number) >= 1_000) {
    const scaled = number / 1_000;
    const decimals = Math.abs(scaled) < 10 ? 1 : 0;
    return `$${scaled.toFixed(decimals)}K`;
  }
  return `$${number.toFixed(0)}`;
};

export const formatNumber = value =>
  new Intl.NumberFormat("en-US").format(value || 0);

export const formatPercent = value =>
  `${((value || 0) * 100).toFixed(1)}%`;

export const safeNumber = value => Number.isFinite(+value) ? +value : 0;

export const byDescending = key => (a, b) => safeNumber(b[key]) - safeNumber(a[key]);

export const shareOf = (value, total) => {
  const denominator = safeNumber(total);
  return denominator === 0 ? 0 : safeNumber(value) / denominator;
};
