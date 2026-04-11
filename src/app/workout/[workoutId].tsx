import { useLocalSearchParams } from "expo-router";

import { WorkoutDetailScreen } from "@/features/workout/components";

export default function WorkoutDetailRoute() {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  return <WorkoutDetailScreen workoutId={workoutId} />;
}
