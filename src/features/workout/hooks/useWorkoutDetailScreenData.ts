import { workoutRepository } from "@/data/repositories/workoutRepository";
import { workoutProgressService } from "@/domain/services/workoutProgressService";
import { useCurrentPlanState } from "@/features/plan/hooks";

export function useWorkoutDetailScreenData(workoutId?: string) {
  const currentPlanState = useCurrentPlanState();
  const workout = workoutId && currentPlanState.plan ? workoutRepository.getById(currentPlanState.plan, workoutId) : null;
  const log = workout ? currentPlanState.logs[workout.id] ?? null : null;
  const completion = workout ? workoutProgressService.calculateWorkoutCompletion(workout, log) : 0;

  return {
    completion,
    hasActivePlan: Boolean(currentPlanState.plan && currentPlanState.planStartDate),
    log,
    workout
  };
}
