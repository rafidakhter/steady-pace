import { getCurrentTrainingWeek as getCurrentTrainingWeekFromDates, getDayIndexFromPlanStart } from "@/core/utils/date";
import { TrainingPlan } from "@/domain/entities/TrainingPlan";
import { Workout } from "@/domain/entities/Workout";

export const trainingPlanService = {
  getCurrentTrainingWeek(startDate: Date, today: Date, totalWeeks?: number) {
    const rawWeek = getCurrentTrainingWeekFromDates(startDate, today);

    if (!totalWeeks) {
      return rawWeek;
    }

    return Math.min(Math.max(rawWeek, 1), totalWeeks);
  },
  getWeekWorkouts(plan: TrainingPlan, weekNumber: number) {
    return plan.weeks.find((week) => week.weekNumber === weekNumber)?.workouts ?? [];
  },
  getWorkoutForDate(plan: TrainingPlan, startDate: Date, date: Date) {
    const dayIndex = getDayIndexFromPlanStart(startDate, date);

    if (dayIndex < 0) {
      return null;
    }

    const weekIndex = Math.floor(dayIndex / 7);
    const workoutIndex = dayIndex % 7;
    const targetWeek = plan.weeks[weekIndex];

    if (!targetWeek) {
      return null;
    }

    return targetWeek.workouts[workoutIndex] ?? null;
  },
  groupWorkoutsByWeek(workouts: Workout[]) {
    return workouts.reduce<Record<number, Workout[]>>((groups, workout) => {
      if (!groups[workout.weekNumber]) {
        groups[workout.weekNumber] = [];
      }

      groups[workout.weekNumber].push(workout);
      return groups;
    }, {});
  }
};
