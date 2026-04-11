import { create } from "zustand";

interface PlanStoreState {
  activeWeekNumber: number;
}

export const usePlanStore = create<PlanStoreState>(() => ({
  activeWeekNumber: 1
}));
