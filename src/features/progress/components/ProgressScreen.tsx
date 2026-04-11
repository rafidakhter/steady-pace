import { View } from "react-native";

import { SummaryStatCard } from "@/components/SummaryStatCard";
import { WeeklySummaryCard } from "@/components/WeeklySummaryCard";
import { CompletionChart } from "@/components/charts/CompletionChart";
import { WeeklyDistanceChart } from "@/components/charts/WeeklyDistanceChart";
import { WeeklyTimeChart } from "@/components/charts/WeeklyTimeChart";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

import { useProgressScreenData } from "../hooks/useProgressScreenData";

export function ProgressScreen() {
  const { completionChartData, distanceChartData, summary, timeChartData } = useProgressScreenData();

  return (
    <Screen subtitle="Preview summary" title="Progress">
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
