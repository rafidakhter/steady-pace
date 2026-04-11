export type SportId = "run" | "ride" | "swim" | "strength";

export type WorkoutTypeId = "base" | "intervals" | "long" | "recovery" | "technique";

export interface SportDefinition {
  id: SportId;
  label: string;
}

export interface WorkoutTypeDefinition {
  id: WorkoutTypeId;
  label: string;
}

export interface ChallengeDefinition {
  id: string;
  sportIds: SportId[];
  title: string;
  summary: string;
}
