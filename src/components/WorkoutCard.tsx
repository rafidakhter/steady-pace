import { View } from "react-native";

import { Workout } from "@/domain/entities/Workout";

import { CompletionBadge } from "./CompletionBadge";
import { Card } from "./ui/Card";
import { Text } from "./ui/Text";
import { WorkoutMetaRow } from "./WorkoutMetaRow";

interface WorkoutCardProps {
  completed?: boolean;
  workout: Workout;
}

export function WorkoutCard({ completed, workout }: WorkoutCardProps) {
  return (
    <Card>
      <View style={{ gap: 10 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text tone="muted" variant="label">
            {workout.dayKey}
          </Text>
          <CompletionBadge completed={completed} isRestDay={workout.type === "rest"} />
        </View>
        <Text variant="title">{workout.title}</Text>
        <WorkoutMetaRow workout={workout} />
        <Text tone="muted" variant="body">
          {workout.description}
        </Text>
      </View>
    </Card>
  );
}
