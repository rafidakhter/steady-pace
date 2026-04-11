import { challengeCatalog } from "../config/challenges";
import { sports } from "../config/sports";
import { workoutTypes } from "../config/workout-types";

export function getChallengeCatalogSummary() {
  return {
    challengeCount: challengeCatalog.length,
    sportCount: sports.length,
    workoutTypeCount: workoutTypes.length
  };
}
