export function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return sum(values) / values.length;
}

export function safeNumber(value?: number) {
  return value ?? 0;
}
