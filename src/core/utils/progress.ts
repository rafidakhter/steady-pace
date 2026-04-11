import { Workout } from "@/domain/entities/Workout";
import { WorkoutLog } from "@/domain/entities/WorkoutLog";

import { safeNumber } from "./metrics";

export function calculateProgressPercent(target: number, actual: number) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((actual / target) * 100));
}

export function calculateWorkoutCompletion(workout: Workout, log?: WorkoutLog | null) {
  if (workout.type === "rest") {
    return 100;
  }

  if (!log?.completed) {
    return 0;
  }

  const targetSignals = [workout.targetDurationMin, workout.targetDistanceKm].filter((value) => value !== undefined);

  if (!targetSignals.length) {
    return 100;
  }

  const durationPercent =
    workout.targetDurationMin && workout.targetDurationMin > 0
      ? safeNumber(log.actualDurationMin) / workout.targetDurationMin
      : undefined;
  const distancePercent =
    workout.targetDistanceKm && workout.targetDistanceKm > 0
      ? safeNumber(log.actualDistanceKm) / workout.targetDistanceKm
      : undefined;

  const percentages = [durationPercent, distancePercent].filter((value): value is number => value !== undefined);

  if (!percentages.length) {
    return 100;
  }

  const averagePercent = percentages.reduce((total, value) => total + value, 0) / percentages.length;
  return Math.max(0, Math.min(100, Math.round(averagePercent * 100)));
}
