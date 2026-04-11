import { ChallengeDefinition } from "../domain/types";

export const challengeCatalog: ChallengeDefinition[] = [
  {
    id: "run-5k",
    sportIds: ["run"],
    title: "5K Run",
    summary: "A beginner-friendly running plan focused on steady aerobic progress."
  },
  {
    id: "run-10k",
    sportIds: ["run"],
    title: "10K Run",
    summary: "A longer running build with more volume and pacing work."
  },
  {
    id: "tri-sprint",
    sportIds: ["swim", "ride", "run"],
    title: "Sprint Triathlon",
    summary: "A multisport progression that combines swim, bike, and run training."
  }
];
