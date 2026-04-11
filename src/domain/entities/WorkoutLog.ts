export interface WorkoutLog {
  actualDistanceKm?: number;
  actualDurationMin?: number;
  completed: boolean;
  completedAt?: string;
  id: string;
  notes?: string;
  perceivedEffort?: number;
  workoutId: string;
}
