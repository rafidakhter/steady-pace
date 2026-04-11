import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

export default function WorkoutDetailRoute() {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  return (
    <Screen subtitle="Workout stack scaffold" title="Workout detail">
      <Text tone="muted" variant="body">
        Workout route placeholder for id: {workoutId ?? "unknown"}
      </Text>
    </Screen>
  );
}
