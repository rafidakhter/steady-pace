import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistStorage } from "@/shared/storage";

interface AppShellState {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding(value: boolean): void;
}

export const useAppShellStore = create<AppShellState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value })
    }),
    {
      name: "steady-pace-app-shell",
      storage: createPersistStorage()
    }
  )
);
