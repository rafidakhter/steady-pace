import { View } from "react-native";

import { formatDistanceKm, formatDurationMin } from "@/core/utils/format";
import { Workout } from "@/domain/entities/Workout";

import { Text } from "./ui/Text";

interface WorkoutMetaRowProps {
  workout: Workout;
}

export function WorkoutMetaRow({ workout }: WorkoutMetaRowProps) {
  const tokens = [formatDurationMin(workout.targetDurationMin), workout.targetZone, formatDistanceKm(workout.targetDistanceKm)].filter(
    (token) => token && token !== "-"
  );

  return (
    <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {tokens.map((token, index) => (
        <Text key={`${token}-${index}`} tone="muted" variant="caption">
          {index === 0 ? token : `/ ${token}`}
        </Text>
      ))}
    </View>
  );
}
