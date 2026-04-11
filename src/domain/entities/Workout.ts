import { SportKey } from "@/core/constants/sports";
import { WorkoutType } from "@/core/constants/workoutTypes";

export interface Workout {
  dayKey: string;
  description: string;
  id: string;
  notes?: string;
  orderIndex: number;
  sportId: SportKey;
  targetDistanceKm?: number;
  targetDurationMin?: number;
  targetZone?: string;
  title: string;
  type: WorkoutType;
  weekNumber: number;
}
