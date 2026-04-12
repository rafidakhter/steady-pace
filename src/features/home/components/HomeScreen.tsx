import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { theme } from "@/core/theme";
import { AppGate } from "@/features/auth/components";

import { useHomeScreenData } from "../hooks/useHomeScreenData";

export function HomeScreen() {
  const router = useRouter();
  const { challengeName, dateLabel, isCompleted, primaryMetric, todayWorkout, weekLabel } = useHomeScreenData();

  return (
    <AppGate requirePlan>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl }}>
          <Text
            style={{ letterSpacing: 2, marginBottom: 16, textAlign: "center", textTransform: "uppercase" }}
            tone="muted"
            variant="caption"
          >
            TODAY • {dateLabel}
          </Text>

          <Text style={{ fontSize: 48, lineHeight: 52, marginBottom: 24, textAlign: "center" }} variant="display">
            {todayWorkout?.type === "rest" ? "Rest Day" : todayWorkout?.title ?? "No Workout"}
          </Text>

          <Text
            style={{ letterSpacing: 1, marginBottom: 40, textAlign: "center", textTransform: "uppercase" }}
            tone="muted"
            variant="body"
          >
            {todayWorkout?.type === "rest"
              ? "Recovery / Full Rest"
              : `${primaryMetric ?? ""}${todayWorkout?.targetZone ? ` / ${todayWorkout.targetZone}` : ""}`}
          </Text>

          <View style={{ alignItems: "center" }}>
            <View style={{ width: "100%", maxWidth: 280 }}>
              <Button
                label={todayWorkout?.type === "rest" ? "View week" : isCompleted ? "Review workout" : "View workout"}
                onPress={
                  todayWorkout
                    ? () => router.push(todayWorkout.type === "rest" ? "../(tabs)/plan" : `../workout/${todayWorkout.id}`)
                    : undefined
                }
                variant="outline"
              />
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ textAlign: "center" }} tone="muted" variant="caption">
              {challengeName} {weekLabel ? `• ${weekLabel}` : ""}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </AppGate>
  );
}
