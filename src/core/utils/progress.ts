export function calculateProgressPercent(target: number, actual: number) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((actual / target) * 100));
}
