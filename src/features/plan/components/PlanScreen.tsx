import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
import { addDays } from "@/core/utils/date";
import { theme } from "@/core/theme";
import { sportsSeed } from "@/data/seed/sports";
import { AppGate } from "@/features/auth/components";

import { usePlanScreenData } from "../hooks/usePlanScreenData";

const sportNames = Object.fromEntries(sportsSeed.map((sport) => [sport.id, sport.name])) as Record<string, string>;

export function PlanScreen() {
  const router = useRouter();
  const { completedWorkoutIds, milestone, planName, planStartDate, weekGoal, weekNumber, workouts } = usePlanScreenData();

  return (
    <AppGate requirePlan>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 1, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl }}>
          <Text style={{ textTransform: "uppercase" }} variant="headline">
            {weekNumber ? `Week ${weekNumber}: ${planName}` : "Plan"}
          </Text>
          {weekGoal ? (
            <Text style={{ marginTop: 8 }} tone="muted" variant="body">
              {weekGoal}
            </Text>
          ) : null}
          {milestone ? (
            <Text style={{ marginTop: 6 }} tone="muted" variant="caption">
              {milestone}
            </Text>
          ) : null}
        </View>

        <View style={{ flex: 1 }}>
          {workouts.map((workout, index) => {
            const completed = completedWorkoutIds.includes(workout.id);
            const isRest = workout.type === "rest";
            const workoutDate =
              planStartDate && weekNumber ? addDays(planStartDate, (weekNumber - 1) * 7 + index) : null;
            const dayLabel = workoutDate
              ? workoutDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
              : workout.dayKey.slice(0, 3).toUpperCase();
            const dayNumber = workoutDate ? workoutDate.getDate() : index + 1;

            return (
              <Pressable
                key={workout.id}
                onPress={() => {
                  if (!isRest) {
                    router.push(`../workout/${workout.id}`);
                  }
                }}
                style={{
                  backgroundColor: index === 1 && !completed && !isRest ? theme.colors.surface : theme.colors.background,
                  borderBottomColor: theme.colors.accent,
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minHeight: 72,
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical: 16
                }}
              >
                <View style={{ flexDirection: "row", gap: 24 }}>
                  <View style={{ width: 48 }}>
                    <Text style={{ textTransform: "uppercase" }} tone={completed || isRest ? "muted" : "default"} variant="body">
                      {dayLabel}
                    </Text>
                    <Text tone={completed || isRest ? "muted" : "default"} variant="title">
                      {dayNumber}
                    </Text>
                  </View>

                  <View style={{ flexShrink: 1, gap: 4 }}>
                    <Text style={{ letterSpacing: 1.4, textTransform: "uppercase" }} tone="muted" variant="caption">
                      {isRest ? "Recovery" : sportNames[workout.sportId] ?? workout.sportId}
                    </Text>
                    <Text
                      style={{ textDecorationLine: completed ? "line-through" : "none" }}
                      tone={completed || isRest ? "muted" : "default"}
                      variant="body"
                    >
                      {isRest ? "Rest Day" : workout.title}
                    </Text>
                  </View>
                </View>

                {!isRest && !completed ? <Text variant="title">›</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </AppGate>
  );
}
