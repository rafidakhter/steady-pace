import { create } from "zustand";

interface WorkoutStoreState {
  logs: Record<string, unknown>;
}

export const useWorkoutStore = create<WorkoutStoreState>(() => ({
  logs: {}
}));
