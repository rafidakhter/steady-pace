export function formatDistanceKm(value?: number) {
  if (value === undefined) {
    return "-";
  }

  return `${value.toFixed(2)} km`;
}

export function formatDurationMin(value?: number) {
  if (value === undefined) {
    return "-";
  }

  return `${value} min`;
}
