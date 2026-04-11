import { TrainingWeek } from "./TrainingWeek";

export interface TrainingPlan {
  challengeId: string;
  id: string;
  name: string;
  phase: string;
  weeks: TrainingWeek[];
}
