import { View } from "react-native";

import { ProgressSummary } from "@/domain/entities/ProgressSummary";

import { ProgressBar } from "./ui/ProgressBar";
import { StatRow } from "./ui/StatRow";
import { Card } from "./ui/Card";
import { Text } from "./ui/Text";

interface WeeklySummaryCardProps {
  summary: ProgressSummary;
}

export function WeeklySummaryCard({ summary }: WeeklySummaryCardProps) {
  return (
    <Card>
      <View style={{ gap: 12 }}>
        <Text variant="title">Weekly summary</Text>
        <StatRow emphasis label="Completion" value={`${summary.completionRate}%`} />
        <StatRow label="Completed sessions" value={`${summary.completedSessions}/${summary.totalSessions}`} />
        <StatRow label="Target time" value={`${summary.totalTargetTimeMin} min`} />
        <StatRow label="Actual time" value={`${summary.totalActualTimeMin} min`} />
        <StatRow label="Target distance" value={`${summary.totalTargetDistanceKm.toFixed(2)} km`} />
        <StatRow label="Actual distance" value={`${summary.totalActualDistanceKm.toFixed(2)} km`} />
        <ProgressBar label="Completion rate" progress={summary.completionRate} />
      </View>
    </Card>
  );
}
