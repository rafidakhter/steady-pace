import { addDays, startOfDay } from "@/core/utils/date";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { trainingPlanRepository } from "@/data/repositories/trainingPlanRepository";
import { workoutRepository } from "@/data/repositories/workoutRepository";
import { trainingPlanService } from "@/domain/services/trainingPlanService";
import { workoutProgressService } from "@/domain/services/workoutProgressService";
import { Challenge } from "@/domain/entities/Challenge";
import { TrainingPlan } from "@/domain/entities/TrainingPlan";
import { Workout } from "@/domain/entities/Workout";
import { WorkoutLog } from "@/domain/entities/WorkoutLog";

interface PreviewTrainingState {
  challenge: Challenge;
  currentWeekNumber: number;
  logs: Record<string, WorkoutLog>;
  plan: TrainingPlan;
  planStartDate: Date;
  today: Date;
  todayWorkout: Workout | null;
  weekWorkouts: Workout[];
}

function createPreviewLogs(workouts: Workout[]) {
  return workouts.slice(0, 3).reduce<Record<string, WorkoutLog>>((logs, workout, index) => {
    logs[workout.id] = {
      actualDistanceKm: workout.targetDistanceKm,
      actualDurationMin: workout.targetDurationMin,
      completed: true,
      completedAt: addDays(new Date(), -(index + 1)).toISOString(),
      id: `preview-log-${workout.id}`,
      notes: index === 0 ? "Felt controlled and steady." : undefined,
      perceivedEffort: 5 + index,
      workoutId: workout.id
    };

    return logs;
  }, {});
}

export function getPreviewTrainingState(): PreviewTrainingState {
  const challenge = challengeRepository.getById("sprint-triathlon");
  const plan = trainingPlanRepository.getById("phase1-triathlon-plan");

  if (!challenge || !plan) {
    throw new Error("Preview plan data is missing.");
  }

  const today = startOfDay(new Date());
  const planStartDate = addDays(today, -8);
  const currentWeekNumber = trainingPlanService.getCurrentTrainingWeek(planStartDate, today, plan.weeks.length);
  const weekWorkouts = workoutRepository.getWeekWorkouts(plan, currentWeekNumber);
  const todayWorkout = workoutRepository.getForDate(plan, planStartDate, today);
  const previousWeekWorkouts = workoutRepository.getWeekWorkouts(plan, Math.max(currentWeekNumber - 1, 1));
  const logs = createPreviewLogs([...previousWeekWorkouts, ...weekWorkouts]);

  return {
    challenge,
    currentWeekNumber,
    logs,
    plan,
    planStartDate,
    today,
    todayWorkout,
    weekWorkouts
  };
}

export function getPreviewWorkoutSummary() {
  const state = getPreviewTrainingState();

  return {
    ...state,
    summary: workoutProgressService.calculateWeeklySummary(state.weekWorkouts, state.logs)
  };
}
