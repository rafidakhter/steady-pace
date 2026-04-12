import { useCurrentPlanState } from "./useCurrentPlanState";

export function usePlanScreenData() {
  const currentPlanState = useCurrentPlanState();
  const completedWorkoutIds = Object.values(currentPlanState.logs)
    .filter((log) => log.completed)
    .map((log) => log.workoutId);
  const activeWeek = currentPlanState.currentWeekNumber ? currentPlanState.plan?.weeks[currentPlanState.currentWeekNumber - 1] : null;

  return {
    completedWorkoutIds,
    hasActivePlan: Boolean(currentPlanState.plan && currentPlanState.planStartDate),
    milestone: activeWeek?.milestone ?? null,
    planName: currentPlanState.plan?.name ?? "No plan selected",
    planStartDate: currentPlanState.planStartDate,
    weekGoal: activeWeek?.goal ?? null,
    weekNumber: currentPlanState.currentWeekNumber,
    workouts: currentPlanState.weekWorkouts
  };
}
