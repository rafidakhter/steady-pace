import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistStorage } from "@/data/adapters/localStorageAdapter";
import { challengeSelectionService } from "@/domain/services/challengeSelectionService";

interface AppStoreState {
  activePlanId: string | null;
  planStartDate: string | null;
  resetAppData: () => void;
  selectChallenge: (challengeId: string, planStartDate?: string) => { ok: boolean; error?: string };
  selectedChallengeId: string | null;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      activePlanId: null,
      planStartDate: null,
      resetAppData: () => {
        set({
          activePlanId: null,
          planStartDate: null,
          selectedChallengeId: null
        });
      },
      selectChallenge: (challengeId, planStartDate = new Date().toISOString()) => {
        const plan = challengeSelectionService.getDefaultPlanForChallenge(challengeId);

        if (!plan) {
          return { error: "No plan is available for that challenge yet.", ok: false };
        }

        set({
          activePlanId: plan.id,
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
