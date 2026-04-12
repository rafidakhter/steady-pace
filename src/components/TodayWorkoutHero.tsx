import { View } from "react-native";

import { Workout } from "@/domain/entities/Workout";

import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { EmptyState } from "./ui/EmptyState";
import { Text } from "./ui/Text";
import { WorkoutMetaRow } from "./WorkoutMetaRow";

interface TodayWorkoutHeroProps {
  completed?: boolean;
  dateLabel: string;
  onPress?: () => void;
  workout: Workout | null;
}

export function TodayWorkoutHero({ completed, dateLabel, onPress, workout }: TodayWorkoutHeroProps) {
  if (!workout) {
    return <EmptyState description="Once a challenge is active, today’s workout will appear here." title="No workout yet" />;
  }

  if (workout.type === "rest") {
    return (
      <Card>
        <View style={{ gap: 12 }}>
          <Text tone="muted" variant="label">
            {dateLabel}
          </Text>
          <Text variant="display">Rest Day</Text>
          <Text tone="muted" variant="body">
            Take the day fully off and recover for the next session.
          </Text>
          <Text variant="caption">Recovery is part of the plan, not a missed workout.</Text>
          <Button label="View week" onPress={onPress} variant="outline" />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View style={{ gap: 12 }}>
        <Text tone="muted" variant="label">
          {dateLabel}
        </Text>
        {completed ? <Text tone="success" variant="label">Completed</Text> : null}
        <Text variant="display">{workout.title}</Text>
        <WorkoutMetaRow workout={workout} />
        <Text tone="muted" variant="body">
          {completed ? "Your actuals are saved. You can reopen the workout to review or update them." : workout.description}
        </Text>
        <Button label={completed ? "Review workout" : "View workout"} onPress={onPress} variant="outline" />
      </View>
    </Card>
  );
}
