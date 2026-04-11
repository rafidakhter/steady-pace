import { getPreviewTrainingState } from "@/core/utils/trainingPreview";
import { workoutRepository } from "@/data/repositories/workoutRepository";
import { workoutProgressService } from "@/domain/services/workoutProgressService";

export function useWorkoutDetailScreenData(workoutId?: string) {
  const preview = getPreviewTrainingState();
  const workout = workoutId ? workoutRepository.getById(preview.plan, workoutId) : null;
  const log = workout ? preview.logs[workout.id] ?? null : null;
  const completion = workout ? workoutProgressService.calculateWorkoutCompletion(workout, log) : 0;

  return {
    completion,
    log,
    workout
  };
}
