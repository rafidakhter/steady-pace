import { View } from "react-native";

import { Workout } from "@/domain/entities/Workout";

import { WorkoutCard } from "./WorkoutCard";

interface WeeklyWorkoutListProps {
  completedWorkoutIds?: string[];
  workouts: Workout[];
}

export function WeeklyWorkoutList({ completedWorkoutIds = [], workouts }: WeeklyWorkoutListProps) {
  return (
    <View style={{ gap: 12 }}>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} completed={completedWorkoutIds.includes(workout.id)} workout={workout} />
      ))}
    </View>
  );
}
