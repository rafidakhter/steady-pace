import { useAppStore } from "@/store/appStore";
import { useWorkoutStore } from "@/store/workoutStore";

import { useCurrentPlanState } from "./useCurrentPlanState";

export function usePlanScreenData() {
  const currentPlanState = useCurrentPlanState();
  const advancePlanWeek = useAppStore((state) => state.advancePlanWeek);
  const markComplete = useWorkoutStore((state) => state.markComplete);
  const completedWorkoutIds = Object.values(currentPlanState.logs)
    .filter((log) => log.completed)
    .map((log) => log.workoutId);
  const activeWeek = currentPlanState.currentWeekNumber ? currentPlanState.plan?.weeks[currentPlanState.currentWeekNumber - 1] : null;
  const hasFinishedPlan = Boolean(
    currentPlanState.currentWeekNumber && currentPlanState.plan && currentPlanState.currentWeekNumber >= currentPlanState.plan.weeks.length
  );
  const completeWeekAndAdvance = () => {
    if (!currentPlanState.plan) {
      return;
    }

    currentPlanState.weekWorkouts
      .filter((workout) => workout.type !== "rest")
      .forEach((workout) => markComplete(workout.id));

    advancePlanWeek(currentPlanState.plan?.weeks.length);
  };

  return {
    completeWeekAndAdvance,
    completedWorkoutIds,
    hasNextWeek: Boolean(currentPlanState.plan && !hasFinishedPlan),
    hasActivePlan: Boolean(currentPlanState.plan && currentPlanState.planStartDate),
    milestone: activeWeek?.milestone ?? null,
    planName: currentPlanState.plan?.name ?? currentPlanState.challenge?.name ?? "No plan selected",
    weekGoal: activeWeek?.goal ?? null,
    weekNumber: currentPlanState.currentWeekNumber,
    workouts: currentPlanState.weekWorkouts
  };
}
