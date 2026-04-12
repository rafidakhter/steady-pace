import { View } from "react-native";

import { theme } from "@/core/theme";

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
  const isRestDay = workout.type === "rest";

  return (
    <Card
      style={{
        borderLeftColor: completed ? theme.colors.primary : theme.colors.accent,
        borderLeftWidth: 3,
        paddingLeft: 12
      }}
    >
      <View style={{ gap: 10 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text tone="muted" variant="label">
            {workout.dayKey}
          </Text>
          <CompletionBadge completed={completed} isRestDay={isRestDay} />
        </View>
        <Text variant="title">{workout.title}</Text>
        <WorkoutMetaRow workout={workout} />
        <Text tone="muted" variant="body">
          {workout.description}
        </Text>
        {completed ? <Text tone="success" variant="caption">Logged and saved locally.</Text> : null}
      </View>
    </Card>
  );
}
