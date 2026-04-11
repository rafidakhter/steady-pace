import { View } from "react-native";

import { WeeklyWorkoutList } from "@/components/WeeklyWorkoutList";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

import { usePlanScreenData } from "../hooks/usePlanScreenData";

export function PlanScreen() {
  const { completedWorkoutIds, milestone, planName, weekGoal, weekNumber, workouts } = usePlanScreenData();

  return (
    <Screen subtitle={`Week ${weekNumber}`} title="Plan">
      <Card>
        <View style={{ gap: 8 }}>
          <Text variant="title">{planName}</Text>
          {weekGoal ? (
            <Text tone="muted" variant="body">
              {weekGoal}
            </Text>
          ) : null}
          {milestone ? <Text variant="caption">{milestone}</Text> : null}
        </View>
      </Card>

      <WeeklyWorkoutList completedWorkoutIds={completedWorkoutIds} workouts={workouts} />
    </Screen>
  );
}
