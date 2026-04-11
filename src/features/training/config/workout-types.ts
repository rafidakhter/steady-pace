import { WorkoutTypeDefinition } from "../domain/types";

export const workoutTypes: WorkoutTypeDefinition[] = [
  { id: "base", label: "Base" },
  { id: "intervals", label: "Intervals" },
  { id: "long", label: "Long" },
  { id: "recovery", label: "Recovery" },
  { id: "technique", label: "Technique" }
];
