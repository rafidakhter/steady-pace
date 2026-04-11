import { Redirect } from "expo-router";
import { View } from "react-native";

import { SummaryStatCard } from "@/components/SummaryStatCard";
import { WeeklySummaryCard } from "@/components/WeeklySummaryCard";
import { CompletionChart } from "@/components/charts/CompletionChart";
import { WeeklyDistanceChart } from "@/components/charts/WeeklyDistanceChart";
import { WeeklyTimeChart } from "@/components/charts/WeeklyTimeChart";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAppSession } from "@/features/auth/hooks";

import { useProgressScreenData } from "../hooks/useProgressScreenData";

export function ProgressScreen() {
  const { hasActivePlan: sessionHasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const { completionChartData, distanceChartData, hasActivePlan, summary, timeChartData, weekNumber } = useProgressScreenData();

  if (hydrated && !isAuthenticated) {
    return <Redirect href="../(auth)/sign-in" />;
  }

  if (hydrated && !sessionHasActivePlan) {
    return <Redirect href="../(onboarding)/select-challenge" />;
  }

  if (!hasActivePlan) {
    return (
      <Screen subtitle="No active plan" title="Progress">
        <EmptyState description="Progress unlocks once your challenge and plan are active." title="Nothing to summarize yet" />
      </Screen>
    );
  }

  return (
    <Screen subtitle={weekNumber ? `Week ${weekNumber} summary` : "Progress summary"} title="Progress">
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <SummaryStatCard label="Completed" value={`${summary.completedSessions}/${summary.totalSessions}`} />
        </View>
        <View style={{ flex: 1 }}>
          <SummaryStatCard label="Completion rate" value={`${summary.completionRate}%`} />
        </View>
      </View>

      <WeeklySummaryCard summary={summary} />

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">Weekly time trend</Text>
          <WeeklyTimeChart data={timeChartData} />
        </View>
      </Card>

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">This week distance</Text>
          <WeeklyDistanceChart data={distanceChartData} />
        </View>
      </Card>

      <Card>
        <View style={{ gap: 12 }}>
          <Text variant="title">Session split</Text>
          <CompletionChart data={completionChartData} />
        </View>
      </Card>
    </Screen>
  );
}
