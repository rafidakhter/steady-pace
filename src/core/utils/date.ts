export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function differenceInCalendarDays(startDate: Date, endDate: Date) {
  const start = startOfDay(startDate).getTime();
  const end = startOfDay(endDate).getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((end - start) / millisecondsPerDay);
}

export function getCurrentTrainingWeek(startDate: Date, today: Date) {
  const daysSinceStart = differenceInCalendarDays(startDate, today);

  if (daysSinceStart < 0) {
    return 1;
  }

  return Math.floor(daysSinceStart / 7) + 1;
}

export function getDayIndexFromPlanStart(startDate: Date, targetDate: Date) {
  return differenceInCalendarDays(startDate, targetDate);
}

export function isSameDay(left: Date, right: Date) {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

export function toDayKey(date: Date) {
  return startOfDay(date)
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toIsoDate(date: Date) {
  return startOfDay(date).toISOString();
}
