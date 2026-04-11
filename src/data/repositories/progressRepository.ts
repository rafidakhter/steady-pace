import { Workout } from "@/domain/entities/Workout";
import { WorkoutLog } from "@/domain/entities/WorkoutLog";
import { workoutProgressService } from "@/domain/services/workoutProgressService";

export const progressRepository = {
  getWeeklySummary(workouts: Workout[], logs: Record<string, WorkoutLog | undefined>) {
    return workoutProgressService.calculateWeeklySummary(workouts, logs);
  }
};
