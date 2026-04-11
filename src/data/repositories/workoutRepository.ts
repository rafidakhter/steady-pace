import { TrainingPlan } from "@/domain/entities/TrainingPlan";
import { trainingPlanService } from "@/domain/services/trainingPlanService";

export const workoutRepository = {
  getById(plan: TrainingPlan, workoutId: string) {
    return plan.weeks.flatMap((week) => week.workouts).find((workout) => workout.id === workoutId) ?? null;
  },
  getForDate(plan: TrainingPlan, startDate: Date, date: Date) {
    return trainingPlanService.getWorkoutForDate(plan, startDate, date);
  },
  getWeekWorkouts(plan: TrainingPlan, weekNumber: number) {
    return trainingPlanService.getWeekWorkouts(plan, weekNumber);
  }
};
