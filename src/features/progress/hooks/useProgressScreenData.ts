import { getPreviewWorkoutSummary } from "@/core/utils/trainingPreview";

export function useProgressScreenData() {
  const { logs, plan, summary, weekWorkouts } = getPreviewWorkoutSummary();

  return {
    completionChartData: [
      { label: "Done", value: summary.completedSessions },
      { label: "Left", value: Math.max(summary.totalSessions - summary.completedSessions, 0) }
    ],
    distanceChartData: weekWorkouts.map((workout) => ({
      actual: logs[workout.id]?.actualDistanceKm ?? 0,
      label: workout.dayKey.slice(0, 3).toUpperCase(),
      target: workout.targetDistanceKm ?? 0
    })),
    summary,
    timeChartData: plan.weeks.map((week) => ({
      label: `W${week.weekNumber}`,
      value: week.workouts.reduce((total, workout) => total + (workout.targetDurationMin ?? 0), 0)
    }))
  };
}
