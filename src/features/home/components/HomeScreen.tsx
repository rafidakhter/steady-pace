import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

import { SummaryStatCard } from "@/components/SummaryStatCard";
import { TodayWorkoutHero } from "@/components/TodayWorkoutHero";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAppSession } from "@/features/auth/hooks";

import { useHomeScreenData } from "../hooks/useHomeScreenData";

export function HomeScreen() {
  const router = useRouter();
  const { hasActivePlan: sessionHasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const { challengeName, completion, dateLabel, hasActivePlan, isCompleted, primaryMetric, todayWorkout, weekLabel } = useHomeScreenData();

  if (hydrated && !isAuthenticated) {
    return <Redirect href="../(auth)/sign-in" />;
  }

  if (hydrated && !sessionHasActivePlan) {
    return <Redirect href="../(onboarding)/select-challenge" />;
  }

  if (!hasActivePlan) {
    return (
      <Screen subtitle="No active plan" title="Home">
        <EmptyState
          actionLabel="Choose challenge"
          description="Select a challenge first so we can build your weekly flow."
          onActionPress={() => router.push("../(onboarding)/select-challenge")}
          title="Nothing scheduled yet"
        />
      </Screen>
    );
  }

  return (
    <Screen subtitle={weekLabel} title="Home">
      <TodayWorkoutHero
        dateLabel={dateLabel}
        onPress={todayWorkout ? () => router.push(`../workout/${todayWorkout.id}`) : undefined}
        workout={todayWorkout}
      />

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <SummaryStatCard label="Active challenge" value={challengeName} />
        </View>
        <View style={{ flex: 1 }}>
          <SummaryStatCard label="Today" value={primaryMetric ?? "Rest"} />
        </View>
      </View>

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">Today&apos;s status</Text>
          <Text tone="muted" variant="body">
            {isCompleted
              ? "This session is already logged as completed."
              : "You can open the workout and save your actuals from the detail screen."}
          </Text>
          <ProgressBar
            currentLabel={`${completion}%`}
            label="Session completion"
            progress={completion}
            targetLabel="100%"
          />
        </View>
      </Card>
    </Screen>
  );
}
