import { useRouter } from "expo-router";
import { View } from "react-native";

import { CompletionBadge } from "@/components/CompletionBadge";
import { WorkoutLogForm } from "@/components/WorkoutLogForm";
import { WorkoutMetaRow } from "@/components/WorkoutMetaRow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

import { useWorkoutDetailScreenData } from "../hooks/useWorkoutDetailScreenData";

interface WorkoutDetailScreenProps {
  workoutId?: string;
}

export function WorkoutDetailScreen({ workoutId }: WorkoutDetailScreenProps) {
  const router = useRouter();
  const { completion, log, workout } = useWorkoutDetailScreenData(workoutId);

  if (!workout) {
    return (
      <Screen subtitle="Workout" title="Workout detail">
        <EmptyState
          actionLabel="Back to plan"
          description="We could not find that workout in the preview plan."
          onActionPress={() => router.push("../(tabs)/plan")}
          title="Workout not found"
        />
      </Screen>
    );
  }

  return (
    <Screen
      footer={<Button disabled label="Logging connects in Phase 6" />}
      subtitle={`Week ${workout.weekNumber} • ${workout.dayKey}`}
      title={workout.title}
    >
      <Card>
        <View style={{ gap: 12 }}>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text tone="muted" variant="label">
              Session overview
            </Text>
            <CompletionBadge completed={log?.completed} isRestDay={workout.type === "rest"} />
          </View>
          <WorkoutMetaRow workout={workout} />
          <Text tone="muted" variant="body">
            {workout.description}
          </Text>
          {workout.notes ? (
            <Text variant="caption">{workout.notes}</Text>
          ) : null}
        </View>
      </Card>

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">Completion</Text>
          <ProgressBar currentLabel={`${completion}%`} label="Preview progress" progress={completion} targetLabel="100%" />
        </View>
      </Card>

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">Workout log</Text>
          <WorkoutLogForm
            actualDistanceKm={log?.actualDistanceKm?.toFixed(2)}
            actualDurationMin={log?.actualDurationMin?.toString()}
            notes={log?.notes}
          />
        </View>
      </Card>
    </Screen>
  );
}
