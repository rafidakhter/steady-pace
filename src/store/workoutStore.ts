import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistStorage } from "@/data/adapters/localStorageAdapter";
import { WorkoutLog } from "@/domain/entities/WorkoutLog";

interface SaveWorkoutLogInput {
  actualDistanceKm?: number;
  actualDurationMin?: number;
  completed: boolean;
  notes?: string;
  perceivedEffort?: number;
  workoutId: string;
}

interface WorkoutStoreState {
  getWorkoutLog: (workoutId: string) => WorkoutLog | null;
  logs: Record<string, WorkoutLog>;
  markComplete: (workoutId: string) => void;
  resetWorkoutLog: (workoutId: string) => void;
  saveWorkoutLog: (input: SaveWorkoutLogInput) => WorkoutLog;
}

export const useWorkoutStore = create<WorkoutStoreState>()(
  persist(
    (set, get) => ({
      getWorkoutLog: (workoutId) => get().logs[workoutId] ?? null,
      logs: {},
      markComplete: (workoutId) => {
        const existing = get().logs[workoutId];

        set((state) => ({
          logs: {
            ...state.logs,
            [workoutId]: {
              actualDistanceKm: existing?.actualDistanceKm,
              actualDurationMin: existing?.actualDurationMin,
              completed: true,
              completedAt: new Date().toISOString(),
              id: existing?.id ?? `log-${workoutId}`,
              notes: existing?.notes,
              perceivedEffort: existing?.perceivedEffort,
              workoutId
            }
          }
        }));
      },
      resetWorkoutLog: (workoutId) => {
        set((state) => {
          const nextLogs = { ...state.logs };
          delete nextLogs[workoutId];

          return {
            logs: nextLogs
          };
        });
      },
      saveWorkoutLog: (input) => {
        const nextLog: WorkoutLog = {
          actualDistanceKm: input.actualDistanceKm,
          actualDurationMin: input.actualDurationMin,
          completed: input.completed,
          completedAt: input.completed ? new Date().toISOString() : undefined,
          id: `log-${input.workoutId}`,
          notes: input.notes,
          perceivedEffort: input.perceivedEffort,
          workoutId: input.workoutId
        };

        set((state) => ({
          logs: {
            ...state.logs,
            [input.workoutId]: nextLog
          }
        }));

        return nextLog;
      }
    }),
    {
      name: "steady-pace-workout-store",
      storage: createPersistStorage()
    }
  )
);
