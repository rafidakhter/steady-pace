import { Redirect } from "expo-router";
import { View } from "react-native";

import { WeeklyWorkoutList } from "@/components/WeeklyWorkoutList";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAppSession } from "@/features/auth/hooks";

import { usePlanScreenData } from "../hooks/usePlanScreenData";

export function PlanScreen() {
  const { hasActivePlan: sessionHasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const { completedWorkoutIds, hasActivePlan, milestone, planName, weekGoal, weekNumber, workouts } = usePlanScreenData();

  if (hydrated && !isAuthenticated) {
    return <Redirect href="../(auth)/sign-in" />;
  }

  if (hydrated && !sessionHasActivePlan) {
    return <Redirect href="../(onboarding)/select-challenge" />;
  }

  if (!hasActivePlan || !weekNumber) {
    return (
      <Screen subtitle="No active plan" title="Plan">
        <EmptyState description="Select a challenge to unlock your weekly schedule." title="No weekly plan yet" />
      </Screen>
    );
  }

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
