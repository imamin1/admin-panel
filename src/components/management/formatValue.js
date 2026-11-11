export function formatValue(value, format) {
  if (format === "date") {
    return value
      ? new Date(`${value}T00:00:00`).toLocaleDateString("fa-IR")
      : "—";
  }
  if (format === "money") {
    return `${Number(value).toLocaleString("fa-IR")} تومان`;
  }
  if (format === "list") {
    return Array.isArray(value) && value.length ? value.join("، ") : "—";
  }
  if (format === "excerpt") {
    return value.length > 100 ? `${value.slice(0, 100)}…` : value;
  }
  return value || "—";
}
