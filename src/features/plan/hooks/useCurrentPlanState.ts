import { startOfDay } from "@/core/utils/date";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { progressRepository } from "@/data/repositories/progressRepository";
import { trainingPlanRepository } from "@/data/repositories/trainingPlanRepository";
import { workoutRepository } from "@/data/repositories/workoutRepository";
import { trainingPlanService } from "@/domain/services/trainingPlanService";
import { useAppStore } from "@/store/appStore";
import { useWorkoutStore } from "@/store/workoutStore";

export function useCurrentPlanState() {
  const activePlanId = useAppStore((state) => state.activePlanId);
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
  const currentWeekNumber = plan && startedAt ? trainingPlanService.getCurrentTrainingWeek(startedAt, today, plan.weeks.length) : null;
  const weekWorkouts = plan && currentWeekNumber ? workoutRepository.getWeekWorkouts(plan, currentWeekNumber) : [];
  const todayWorkout = plan && startedAt ? workoutRepository.getForDate(plan, startedAt, today) : null;
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
