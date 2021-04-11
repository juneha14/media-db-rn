export function formatMinutesToHM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);

  const hStr = h < 1 ? "" : h.toString();
  const mStr = m < 10 ? "0" + m : m.toString();

  if (hStr.length === 0) return mStr + "min";
  return `${hStr}h ${mStr}min`;
}
