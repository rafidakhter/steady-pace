export interface Challenge {
  category: "run" | "triathlon" | "bike" | "custom";
  description: string;
  estimatedDurationLabel: string;
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  name: string;
  planId: string;
}
