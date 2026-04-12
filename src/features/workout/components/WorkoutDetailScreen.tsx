import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { CompletionBadge } from "@/components/CompletionBadge";
import { WorkoutLogForm } from "@/components/WorkoutLogForm";
import { WorkoutMetaRow } from "@/components/WorkoutMetaRow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
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
  const { completion, hasActivePlan, log, workout } = useWorkoutDetailScreenData(workoutId);
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
      <Screen
        footer={<Button label={workout.type === "rest" ? "Mark rest day complete" : "Save workout"} loading={isSubmitting} onPress={onSubmit} />}
        subtitle={`Week ${workout.weekNumber} • ${workout.dayKey}`}
        title={workout.title}
      >
        <Card>
          <View style={{ gap: 12 }}>
            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
              <Text tone="muted" variant="label">
                Session overview
              </Text>
              <CompletionBadge completed={log?.completed} isRestDay={workout.type === "rest"} />
            </View>
            <WorkoutMetaRow workout={workout} />
            <Text tone="muted" variant="body">
              {workout.description}
            </Text>
            {workout.notes ? (
              <Text variant="caption">{workout.notes}</Text>
            ) : null}
          </View>
        </Card>

        <Card>
          <View style={{ gap: 12 }}>
            <Text variant="title">Completion</Text>
            <ProgressBar currentLabel={`${completion}%`} label="Workout progress" progress={completion} targetLabel="100%" />
          </View>
        </Card>

        <Card>
          <View style={{ gap: 12 }}>
            <Text variant="title">Workout log</Text>
            {savedMessage ? (
              <Text tone="success" variant="body">
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
        </Card>
      </Screen>
    </AppGate>
  );
}
