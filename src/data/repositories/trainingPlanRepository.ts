import { phase1TriathlonPlan } from "../seed/phase1TriathlonPlan";

export const trainingPlanRepository = {
  getAll() {
    return [phase1TriathlonPlan];
  },
  getByChallengeId(challengeId: string) {
    return this.getAll().find((plan) => plan.challengeId === challengeId) ?? null;
  },
  getById(id: string) {
    return this.getAll().find((plan) => plan.id === id) ?? null;
  }
};
