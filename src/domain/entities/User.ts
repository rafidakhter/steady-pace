export interface User {
  email: string;
  id: string;
  details?: UserDetails;
  name: string;
}

export interface UserDetails {
  weightLossGoal?: WeightLossGoal;
}

export interface WeightLossGoal {
  currentWeightLbs: number;
  targetDate: string;
  targetWeightLbs: number;
}
