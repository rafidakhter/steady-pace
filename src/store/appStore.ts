import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistStorage } from "@/data/adapters/localStorageAdapter";
import { challengeSelectionService } from "@/domain/services/challengeSelectionService";

interface AppStoreState {
  activePlanId: string | null;
  advancePlanWeek: (totalWeeks?: number) => void;
  currentPlanWeekNumber: number;
  planStartDate: string | null;
  resetAppData: () => void;
  selectChallenge: (challengeId: string, planStartDate?: string) => { ok: boolean; error?: string };
  selectedChallengeId: string | null;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      activePlanId: null,
      advancePlanWeek: (totalWeeks) => {
        set((state) => ({
          currentPlanWeekNumber: Math.min(
            (state.currentPlanWeekNumber ?? 1) + 1,
            totalWeeks ?? (state.currentPlanWeekNumber ?? 1) + 1
          )
        }));
      },
      currentPlanWeekNumber: 1,
      planStartDate: null,
      resetAppData: () => {
        set({
          activePlanId: null,
          currentPlanWeekNumber: 1,
          planStartDate: null,
          selectedChallengeId: null
        });
      },
      selectChallenge: (challengeId, planStartDate = new Date().toISOString()) => {
        const plan = challengeSelectionService.getDefaultPlanForChallenge(challengeId);

        if (!plan && challengeId !== "weight-loss") {
          return { error: "No plan is available for that challenge yet.", ok: false };
        }

        set({
          activePlanId: plan?.id ?? null,
          currentPlanWeekNumber: 1,
          planStartDate,
          selectedChallengeId: challengeId
        });

        return { ok: true };
      },
      selectedChallengeId: null
    }),
    {
      name: "steady-pace-app-store",
      storage: createPersistStorage()
    }
  )
);
