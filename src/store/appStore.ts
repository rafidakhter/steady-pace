import { create } from "zustand";

interface AppStoreState {
  activePlanId: string | null;
  planStartDate: string | null;
  selectedChallengeId: string | null;
}

export const useAppStore = create<AppStoreState>(() => ({
  activePlanId: null,
  planStartDate: null,
  selectedChallengeId: null
}));
