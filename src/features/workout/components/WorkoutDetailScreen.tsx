import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { WorkoutLogForm } from "@/components/WorkoutLogForm";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { theme } from "@/core/theme";
import { useWorkoutStore } from "@/store/workoutStore";
import { AppGate } from "@/features/auth/components";

import { useWorkoutDetailScreenData } from "../hooks/useWorkoutDetailScreenData";
import { WorkoutLogFormValues, workoutLogSchema } from "../validators";

interface WorkoutDetailScreenProps {
  workoutId?: string;
}

export function WorkoutDetailScreen({ workoutId }: WorkoutDetailScreenProps) {
  const router = useRouter();
  const saveWorkoutLog = useWorkoutStore((state) => state.saveWorkoutLog);
  const markComplete = useWorkoutStore((state) => state.markComplete);
  const { hasActivePlan, log, metaTokens, sections, workout } = useWorkoutDetailScreenData(workoutId);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const defaultValues = useMemo<WorkoutLogFormValues>(
    () => ({
      actualDistanceKm: log?.actualDistanceKm?.toString() ?? "",
      actualDurationMin: log?.actualDurationMin?.toString() ?? "",
      notes: log?.notes ?? ""
    }),
    [log?.actualDistanceKm, log?.actualDurationMin, log?.notes]
  );
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<WorkoutLogFormValues>({
    defaultValues,
    resolver: zodResolver(workoutLogSchema)
  });
  const actualDistanceKm = watch("actualDistanceKm") ?? "";
  const actualDurationMin = watch("actualDurationMin") ?? "";
  const notes = watch("notes") ?? "";

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (!hasActivePlan) {
    return (
      <AppGate requirePlan>
        <Screen subtitle="Workout" title="Workout detail">
          <EmptyState
            actionLabel="Choose challenge"
            description="You need an active challenge before workouts can be opened."
            onActionPress={() => router.push("../(onboarding)/select-challenge")}
            title="No active plan"
          />
        </Screen>
      </AppGate>
    );
  }

  if (!workout) {
    return (
      <AppGate requirePlan>
        <Screen subtitle="Workout" title="Workout detail">
          <EmptyState
            actionLabel="Back to plan"
            description="We could not find that workout in the current plan."
            onActionPress={() => router.push("../(tabs)/plan")}
            title="Workout not found"
          />
        </Screen>
      </AppGate>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    if (workout.type === "rest") {
      markComplete(workout.id);
      setSavedMessage("Rest day marked complete.");
      return;
    }

    saveWorkoutLog({
      actualDistanceKm: values.actualDistanceKm ? Number(values.actualDistanceKm) : undefined,
      actualDurationMin: values.actualDurationMin ? Number(values.actualDurationMin) : undefined,
      completed: true,
      notes: values.notes?.trim() ? values.notes.trim() : undefined,
      workoutId: workout.id
    });
    setSavedMessage("Workout saved locally.");
  });

  return (
    <AppGate requirePlan>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            borderBottomColor: theme.colors.accent,
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md
          }}
        >
          <Pressable hitSlop={12} onPress={() => router.back()} style={{ width: 24 }}>
            <MaterialIcons color={theme.colors.text} name="arrow-back" size={24} />
          </Pressable>
          <Text style={{ letterSpacing: 2, textTransform: "uppercase" }} tone="muted" variant="caption">
            Today&apos;s Session
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 220 }} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl }}>
            <Text style={{ marginBottom: 8 }} variant="headline">
              {workout.title}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {metaTokens.map((token, index) => (
                <Text
                  key={`${token}-${index}`}
                  style={{ letterSpacing: 1.2, textTransform: "uppercase" }}
                  tone="muted"
                  variant="caption"
                >
                  {index === 0 ? token : `/ ${token}`}
                </Text>
              ))}
            </View>
          </View>

          <View style={{ gap: 24, paddingHorizontal: theme.spacing.lg }}>
            {sections.map((section) => (
              <View
                key={section.title}
                style={
                  section.variant === "accent"
                    ? {
                        backgroundColor: theme.colors.background,
                        borderLeftColor: theme.colors.text,
                        borderLeftWidth: 2,
                        paddingLeft: 16,
                        paddingVertical: 8
                      }
                    : {
                        backgroundColor: theme.colors.surface,
                        padding: theme.spacing.md
                      }
                }
              >
                <Text style={{ letterSpacing: 1.4, marginBottom: 12, textTransform: "uppercase" }} tone="muted" variant="caption">
                  {section.title}
                </Text>
                <Text style={{ lineHeight: 26 }} variant="body">
                  {section.body}
                </Text>
                {section.note ? (
                  <Text style={{ lineHeight: 20, marginTop: 10 }} tone="muted" variant="caption">
                    {section.note}
                  </Text>
                ) : null}
              </View>
            ))}

            <View style={{ backgroundColor: theme.colors.surface, padding: theme.spacing.md }}>
              <Text style={{ letterSpacing: 1.4, marginBottom: 12, textTransform: "uppercase" }} tone="muted" variant="caption">
                Session Log
              </Text>
              {savedMessage ? (
                <Text style={{ marginBottom: 12 }} tone="success" variant="body">
                  {savedMessage}
                </Text>
              ) : null}
              <WorkoutLogForm
                actualDistanceKm={actualDistanceKm}
                actualDurationMin={actualDurationMin}
                distanceError={errors.actualDistanceKm?.message}
                durationError={errors.actualDurationMin?.message}
                notes={notes}
                notesError={errors.notes?.message}
                onChangeActualDistanceKm={(value) => setValue("actualDistanceKm", value, { shouldValidate: true })}
                onChangeActualDurationMin={(value) => setValue("actualDurationMin", value, { shouldValidate: true })}
                onChangeNotes={(value) => setValue("notes", value, { shouldValidate: true })}
                readOnly={workout.type === "rest"}
              />
            </View>

            {log?.completed ? (
              <Text style={{ textAlign: "center" }} tone="muted" variant="caption">
                This session is already marked complete.
              </Text>
            ) : null}
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: theme.colors.background,
            paddingBottom: theme.spacing.lg,
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.md
          }}
        >
          <Button
            label={workout.type === "rest" ? "Mark Completed" : "Save Workout"}
            loading={isSubmitting}
            onPress={onSubmit}
          />
        </View>
      </SafeAreaView>
    </AppGate>
  );
}
