export function formatPrice(price) {
  if (price == null || isNaN(Number(price))) {
    return "€0.00";
  }
  const numericPrice = Number(price);
  return `€${numericPrice.toFixed(2)}`;
}
