export function parseDisorders(raw: string) {
  if (!raw) return [];

  const lower = raw.toLowerCase();

  const parts = lower
    .split(/\.|and|,/g)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return [...new Set(parts)];
}

// consistent color assignment
const chipColors = ["primary", "secondary", "success", "warning", "info"];

export function getChipColor(text: string) {
  const hash = [...text].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return chipColors[hash % chipColors.length];
}