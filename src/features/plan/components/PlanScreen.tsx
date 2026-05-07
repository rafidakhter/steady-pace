import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
import { theme } from "@/core/theme";
import { sportsSeed } from "@/data/seed/sports";
import { AppGate } from "@/features/auth/components";

import { usePlanScreenData } from "../hooks/usePlanScreenData";

const sportNames = Object.fromEntries(sportsSeed.map((sport) => [sport.id, sport.name])) as Record<string, string>;

export function PlanScreen() {
  const router = useRouter();
  const { completeWeekAndAdvance, completedWorkoutIds, hasNextWeek, milestone, planName, weekGoal, weekNumber, workouts } =
    usePlanScreenData();
  const [isAdvancing, setIsAdvancing] = useState(false);
  const transitionProgress = useRef(new Animated.Value(0)).current;
  const activeWorkoutId = workouts.find(
    (workout) => workout.type !== "rest" && !completedWorkoutIds.includes(workout.id)
  )?.id;
  const weekContentAnimatedStyle = {
    opacity: transitionProgress.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 1, 0]
    }),
    transform: [
      {
        translateY: transitionProgress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [18, 0, -18]
        })
      }
    ]
  };
  const handleCompleteWeek = () => {
    if (!hasNextWeek || isAdvancing) {
      return;
    }

    setIsAdvancing(true);
    Animated.timing(transitionProgress, {
      duration: 320,
      toValue: 1,
      useNativeDriver: true
    }).start(() => {
      completeWeekAndAdvance();
      transitionProgress.setValue(-1);

      requestAnimationFrame(() => {
        Animated.timing(transitionProgress, {
          duration: 260,
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
          setIsAdvancing(false);
        });
      });
    });
  };

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

        <ScrollView
          contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <Animated.View style={weekContentAnimatedStyle}>
            {workouts.map((workout, index) => {
              const completed = completedWorkoutIds.includes(workout.id);
              const isRest = workout.type === "rest";
              const isActive = workout.id === activeWorkoutId;
              const sessionNumber = String(index + 1).padStart(2, "0");

              return (
                <Pressable
                  disabled={isAdvancing}
                  key={workout.id}
                  onPress={() => {
                    if (!isRest) {
                      router.push(`../workout/${workout.id}`);
                    }
                  }}
                  style={{
                    backgroundColor: isActive ? theme.colors.surface : theme.colors.background,
                    borderBottomColor: theme.colors.accent,
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    minHeight: 72,
                    paddingHorizontal: theme.spacing.lg,
                    paddingVertical: 16
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={{ width: 64 }}>
                      <Text
                        numberOfLines={1}
                        style={{ letterSpacing: 1.2, textTransform: "uppercase" }}
                        tone={completed || isRest ? "muted" : "default"}
                        variant="label"
                      >
                        Session
                      </Text>
                      <Text tone={completed || isRest ? "muted" : "default"} variant="title">
                        {sessionNumber}
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
          </Animated.View>

          <View style={{ paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl }}>
            <Pressable
              disabled={!hasNextWeek || isAdvancing}
              onPress={handleCompleteWeek}
              style={{
                alignItems: "center",
                backgroundColor: hasNextWeek ? theme.colors.highVisGreen : theme.colors.surface,
                justifyContent: "center",
                minHeight: 64,
                opacity: hasNextWeek && !isAdvancing ? 1 : 0.7,
                paddingHorizontal: 18,
                paddingVertical: 18
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  letterSpacing: 4,
                  textAlign: "center",
                  textTransform: "uppercase"
                }}
                variant="label"
              >
                {isAdvancing ? "Loading next week" : hasNextWeek ? "Complete week & start next" : "Plan complete"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppGate>
  );
}
