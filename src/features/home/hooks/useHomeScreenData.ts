import { formatDistanceKm, formatDurationMin } from "@/core/utils/format";
import { workoutProgressService } from "@/domain/services/workoutProgressService";
import { useCurrentPlanState } from "@/features/plan/hooks";

export function useHomeScreenData() {
  const currentPlanState = useCurrentPlanState();
  const completion = currentPlanState.todayWorkout
    ? workoutProgressService.calculateWorkoutCompletion(
        currentPlanState.todayWorkout,
        currentPlanState.logs[currentPlanState.todayWorkout.id]
      )
    : 0;

  return {
    challengeName: currentPlanState.challenge?.name ?? "No challenge selected",
    completion,
    dateLabel: currentPlanState.today.toLocaleDateString("en-US", { day: "numeric", month: "long" }),
    hasActivePlan: Boolean(currentPlanState.plan && currentPlanState.planStartDate),
    isCompleted: currentPlanState.todayWorkout ? Boolean(currentPlanState.logs[currentPlanState.todayWorkout.id]?.completed) : false,
    primaryMetric: currentPlanState.todayWorkout
      ? [formatDurationMin(currentPlanState.todayWorkout.targetDurationMin), formatDistanceKm(currentPlanState.todayWorkout.targetDistanceKm)]
          .filter((value) => value !== "-")
          .join(" / ")
      : null,
    todayWorkout: currentPlanState.todayWorkout,
    weekLabel: currentPlanState.currentWeekNumber ? `Week ${currentPlanState.currentWeekNumber}` : "No active plan"
  };
}
