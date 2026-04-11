export const workoutTypes = ["technique", "endurance", "interval", "brick", "strength", "mobility", "rest"] as const;

export type WorkoutType = (typeof workoutTypes)[number];
