import { challengesSeed } from "../seed/challenges";

export const challengeRepository = {
  getById(id: string) {
    return challengesSeed.find((challenge) => challenge.id === id) ?? null;
  },
  getAll() {
    return challengesSeed;
  }
};
