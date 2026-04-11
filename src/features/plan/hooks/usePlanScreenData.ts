import { getPreviewTrainingState } from "@/core/utils/trainingPreview";

export function usePlanScreenData() {
  const preview = getPreviewTrainingState();
  const completedWorkoutIds = Object.values(preview.logs)
    .filter((log) => log.completed)
    .map((log) => log.workoutId);

  return {
    completedWorkoutIds,
    milestone: preview.plan.weeks[preview.currentWeekNumber - 1]?.milestone ?? null,
    planName: preview.plan.name,
    weekGoal: preview.plan.weeks[preview.currentWeekNumber - 1]?.goal ?? null,
    weekNumber: preview.currentWeekNumber,
    workouts: preview.weekWorkouts
  };
}
