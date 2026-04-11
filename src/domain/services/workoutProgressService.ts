import { calculateProgressPercent, calculateWorkoutCompletion } from "@/core/utils/progress";
import { ProgressSummary } from "@/domain/entities/ProgressSummary";
import { Workout } from "@/domain/entities/Workout";
import { WorkoutLog } from "@/domain/entities/WorkoutLog";

export const workoutProgressService = {
  calculateWorkoutCompletion,
  calculateWeeklySummary(workouts: Workout[], logs: Record<string, WorkoutLog | undefined>): ProgressSummary {
    const totals = workouts.reduce(
      (summary, workout) => {
        const log = logs[workout.id];

        summary.totalTargetDistanceKm += workout.targetDistanceKm ?? 0;
        summary.totalTargetTimeMin += workout.targetDurationMin ?? 0;
        summary.totalActualDistanceKm += log?.actualDistanceKm ?? 0;
        summary.totalActualTimeMin += log?.actualDurationMin ?? 0;
        summary.totalSessions += 1;

        if (log?.completed || workout.type === "rest") {
          summary.completedSessions += 1;
        }

        return summary;
      },
      {
        completedSessions: 0,
        completionRate: 0,
        totalActualDistanceKm: 0,
        totalActualTimeMin: 0,
        totalSessions: 0,
        totalTargetDistanceKm: 0,
        totalTargetTimeMin: 0
      } as ProgressSummary
    );

    totals.completionRate = calculateProgressPercent(totals.totalSessions, totals.completedSessions);

    return totals;
  },
  getWorkoutLog(workoutId: string, logs: Record<string, WorkoutLog | undefined>) {
    return logs[workoutId] ?? null;
  }
};
