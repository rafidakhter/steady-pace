import { useEffect, useState } from "react";

import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";

interface AppSessionState {
  hasActivePlan: boolean;
  hydrated: boolean;
  isAuthenticated: boolean;
  selectedChallengeId: string | null;
}

interface PersistStoreApi {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
}

function usePersistHydrated(store: PersistStoreApi) {
  const [hydrated, setHydrated] = useState(() => store.persist.hasHydrated());

  useEffect(() => {
    if (store.persist.hasHydrated()) {
      setHydrated(true);
    }

    return store.persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, [store]);

  return hydrated;
}

export function useAppSession(): AppSessionState {
  const authHydrated = usePersistHydrated(useAuthStore as unknown as PersistStoreApi);
  const appHydrated = usePersistHydrated(useAppStore as unknown as PersistStoreApi);
  const workoutHydrated = usePersistHydrated(useWorkoutStore as unknown as PersistStoreApi);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedChallengeId = useAppStore((state) => state.selectedChallengeId);
  const activePlanId = useAppStore((state) => state.activePlanId);
  const planStartDate = useAppStore((state) => state.planStartDate);
  const weightLossGoal = useAuthStore((state) => state.user?.details?.weightLossGoal);

  return {
    hasActivePlan: Boolean(selectedChallengeId && planStartDate && (activePlanId || weightLossGoal)),
    hydrated: authHydrated && appHydrated && workoutHydrated,
    isAuthenticated,
    selectedChallengeId
  };
}
