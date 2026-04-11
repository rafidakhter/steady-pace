import { trainingPlanService } from "@/domain/services/trainingPlanService";
import { useCurrentPlanState } from "@/features/plan/hooks";

export function useProgressScreenData() {
  const { currentWeekNumber, logs, plan, summary, weekWorkouts } = useCurrentPlanState();
  const workoutsByWeek = plan ? trainingPlanService.groupWorkoutsByWeek(plan.weeks.flatMap((week) => week.workouts)) : {};

  return {
    completionChartData: [
      { label: "Done", value: summary.completedSessions },
      { label: "Left", value: Math.max(summary.totalSessions - summary.completedSessions, 0) }
    ],
    hasActivePlan: Boolean(plan),
    distanceChartData: weekWorkouts.map((workout) => ({
      actual: logs[workout.id]?.actualDistanceKm ?? 0,
      label: workout.dayKey.slice(0, 3).toUpperCase(),
      target: workout.targetDistanceKm ?? 0
    })),
    summary,
    timeChartData: Object.entries(workoutsByWeek)
      .sort(([left], [right]) => Number(left) - Number(right))
      .map(([weekNumber, workouts]) => ({
        label: `W${weekNumber}`,
        value: workouts.reduce((total, workout) => total + (logs[workout.id]?.actualDurationMin ?? 0), 0)
      })),
    weekNumber: currentWeekNumber
  };
}
