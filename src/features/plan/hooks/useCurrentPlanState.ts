import { startOfDay } from "@/core/utils/date";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { progressRepository } from "@/data/repositories/progressRepository";
import { trainingPlanRepository } from "@/data/repositories/trainingPlanRepository";
import { workoutRepository } from "@/data/repositories/workoutRepository";
import { useAppStore } from "@/store/appStore";
import { useWorkoutStore } from "@/store/workoutStore";

export function useCurrentPlanState() {
  const activePlanId = useAppStore((state) => state.activePlanId);
  const currentPlanWeekNumber = useAppStore((state) => state.currentPlanWeekNumber);
  const planStartDate = useAppStore((state) => state.planStartDate);
  const selectedChallengeId = useAppStore((state) => state.selectedChallengeId);
  const logs = useWorkoutStore((state) => state.logs);

  const today = startOfDay(new Date());
  const plan = activePlanId ? trainingPlanRepository.getById(activePlanId) : null;
  const challenge = selectedChallengeId
    ? challengeRepository.getById(selectedChallengeId)
    : plan
      ? challengeRepository.getById(plan.challengeId)
      : null;
  const startedAt = planStartDate ? startOfDay(new Date(planStartDate)) : null;
  const pacedWeekNumber = currentPlanWeekNumber ?? 1;
  const currentWeekNumber = plan ? Math.min(Math.max(pacedWeekNumber, 1), plan.weeks.length) : null;
  const weekWorkouts = plan && currentWeekNumber ? workoutRepository.getWeekWorkouts(plan, currentWeekNumber) : [];
  const todayWorkout =
    weekWorkouts.find((workout) => workout.type !== "rest" && !logs[workout.id]?.completed) ??
    weekWorkouts.find((workout) => workout.type !== "rest") ??
    weekWorkouts[0] ??
    null;
  const summary = progressRepository.getWeeklySummary(weekWorkouts, logs);

  return {
    challenge,
    currentWeekNumber,
    logs,
    plan,
    planStartDate: startedAt,
    summary,
    today,
    todayWorkout,
    weekWorkouts
  };
}
