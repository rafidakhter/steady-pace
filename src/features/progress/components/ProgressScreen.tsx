import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { Text } from "@/components/ui/Text";
import { theme } from "@/core/theme";
import { AppGate } from "@/features/auth/components";

import { useProgressScreenData } from "../hooks/useProgressScreenData";

export function ProgressScreen() {
  const { distanceChartData, summary, timeChartData, weekNumber } = useProgressScreenData();
  const actualHours = (summary.totalActualTimeMin / 60).toFixed(1);
  const targetHours = (summary.totalTargetTimeMin / 60).toFixed(1);
  const weeklyDistance = distanceChartData.reduce((sum, item) => sum + item.actual, 0).toFixed(1);
  const weeklyTargetDistance = distanceChartData.reduce((sum, item) => sum + item.target, 0).toFixed(1);

  return (
    <AppGate requirePlan>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl }}>
          <View style={{ marginBottom: 48 }}>
            <Text style={{ fontSize: 64, lineHeight: 70 }} variant="display">
              {actualHours}{" "}
              <Text style={{ fontSize: 28, lineHeight: 32 }} variant="headline">
                HRS
              </Text>{" "}
              <Text style={{ fontSize: 20, lineHeight: 24 }} tone="muted" variant="title">
                / {summary.totalActualDistanceKm.toFixed(1)} KM
              </Text>
            </Text>
            <Text
              style={{
                borderBottomColor: theme.colors.text,
                borderBottomWidth: 1,
                letterSpacing: 1.3,
                marginTop: 10,
                paddingBottom: 4,
                textTransform: "uppercase"
              }}
              tone="muted"
              variant="caption"
            >
              Out of {targetHours} hrs planned
            </Text>
          </View>

          <View style={{ gap: 28 }}>
            <DisciplineProgress
              actualDistance={summary.totalActualDistanceKm}
              actualHours={Number(actualHours)}
              label="Overall"
              targetDistance={summary.totalTargetDistanceKm}
              targetHours={Number(targetHours)}
            />
            <DisciplineProgress
              actualDistance={Number(weeklyDistance)}
              actualHours={Number(actualHours)}
              label={weekNumber ? `Week ${weekNumber}` : "Weekly"}
              targetDistance={Number(weeklyTargetDistance)}
              targetHours={Number(targetHours)}
            />
            <DisciplineProgress
              actualDistance={summary.totalActualDistanceKm}
              actualHours={summary.completedSessions}
              label="Sessions"
              targetDistance={summary.totalTargetDistanceKm}
              targetHours={summary.totalSessions}
              unitLabel="sessions"
            />
          </View>

          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.accent,
              borderWidth: 1,
              marginTop: 48,
              padding: theme.spacing.md
            }}
          >
            <Text style={{ fontStyle: "italic" }} variant="body">
              Next milestone: keep the momentum going into {timeChartData.find((item) => item.value > 0)?.label ?? `Week ${weekNumber ?? 1}`}.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </AppGate>
  );
}

function DisciplineProgress({
  actualDistance,
  actualHours,
  label,
  targetDistance,
  targetHours,
  unitLabel = "hrs"
}: {
  actualDistance: number;
  actualHours: number;
  label: string;
  targetDistance: number;
  targetHours: number;
  unitLabel?: string;
}) {
  const progress = targetHours > 0 ? Math.min(100, Math.round((actualHours / targetHours) * 100)) : 0;

  return (
    <View style={{ gap: 8 }}>
      <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ letterSpacing: 1.4, textTransform: "uppercase" }} variant="caption">
          {label}
        </Text>
        <Text style={{ letterSpacing: 1, textTransform: "uppercase" }} tone="muted" variant="caption">
          {actualHours.toFixed(1)} / {targetHours.toFixed(1)} {unitLabel} • {actualDistance.toFixed(1)} / {targetDistance.toFixed(1)} km
        </Text>
      </View>
      <ProgressBar progress={progress} />
    </View>
  );
}
