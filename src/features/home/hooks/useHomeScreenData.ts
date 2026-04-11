import { formatDistanceKm, formatDurationMin } from "@/core/utils/format";
import { getPreviewTrainingState } from "@/core/utils/trainingPreview";
import { workoutProgressService } from "@/domain/services/workoutProgressService";

export function useHomeScreenData() {
  const preview = getPreviewTrainingState();
  const completion = preview.todayWorkout
    ? workoutProgressService.calculateWorkoutCompletion(preview.todayWorkout, preview.logs[preview.todayWorkout.id])
    : 0;

  return {
    challengeName: preview.challenge.name,
    completion,
    dateLabel: preview.today.toLocaleDateString("en-US", { day: "numeric", month: "long" }),
    isCompleted: preview.todayWorkout ? Boolean(preview.logs[preview.todayWorkout.id]?.completed) : false,
    primaryMetric: preview.todayWorkout
      ? [formatDurationMin(preview.todayWorkout.targetDurationMin), formatDistanceKm(preview.todayWorkout.targetDistanceKm)]
          .filter((value) => value !== "-")
          .join(" / ")
      : null,
    todayWorkout: preview.todayWorkout,
    weekLabel: `Week ${preview.currentWeekNumber}`
  };
}
