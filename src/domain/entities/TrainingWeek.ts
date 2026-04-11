import { Workout } from "./Workout";

export interface TrainingWeek {
  goal?: string;
  milestone?: string;
  weekNumber: number;
  workouts: Workout[];
}
