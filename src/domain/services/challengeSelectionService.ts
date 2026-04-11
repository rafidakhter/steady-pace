import { challengesSeed } from "@/data/seed/challenges";
import { phase1TriathlonPlan } from "@/data/seed/phase1TriathlonPlan";

export const challengeSelectionService = {
  getDefaultPlanForChallenge(challengeId: string) {
    const challenge = challengesSeed.find((entry) => entry.id === challengeId);

    if (!challenge) {
      return null;
    }

    return challenge.planId === phase1TriathlonPlan.id ? phase1TriathlonPlan : null;
  },
  isChallengeSelectable(challengeId: string) {
    return challengeId === "sprint-triathlon";
  }
};
