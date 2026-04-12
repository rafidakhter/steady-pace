import { useRouter } from "expo-router";
import { View } from "react-native";

import { SummaryStatCard } from "@/components/SummaryStatCard";
import { TodayWorkoutHero } from "@/components/TodayWorkoutHero";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { AppGate } from "@/features/auth/components";

import { useHomeScreenData } from "../hooks/useHomeScreenData";

export function HomeScreen() {
  const router = useRouter();
  const { challengeName, completion, dateLabel, isCompleted, primaryMetric, todayWorkout, weekLabel } = useHomeScreenData();

  return (
    <AppGate requirePlan>
      <Screen subtitle={weekLabel} title="Home">
        <TodayWorkoutHero
          completed={isCompleted}
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
    </AppGate>
  );
}
