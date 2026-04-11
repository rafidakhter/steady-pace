import { SportCategoryKey } from "@/core/constants/sports";

export interface Challenge {
  category: SportCategoryKey;
  description: string;
  estimatedDurationLabel: string;
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  name: string;
  planId: string;
}
