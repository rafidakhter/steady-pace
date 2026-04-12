import { formatDistanceKm, formatDurationMin } from "@/core/utils/format";
import { workoutRepository } from "@/data/repositories/workoutRepository";
import { Workout } from "@/domain/entities/Workout";
import { workoutProgressService } from "@/domain/services/workoutProgressService";
import { useCurrentPlanState } from "@/features/plan/hooks";

interface WorkoutSection {
  body: string;
  note?: string;
  title: string;
  variant: "accent" | "surface";
}

function buildWorkoutSections(workout: Workout): WorkoutSection[] {
  const fallbackNote = workout.notes;

  if (workout.type === "rest") {
    return [
      {
        body: "Full rest. Keep movement light and let your body absorb the work from the week.",
        note: fallbackNote ?? "If you want to move, keep it to an easy walk and some gentle mobility.",
        title: "Recovery",
        variant: "surface"
      }
    ];
  }

  if (workout.type === "interval") {
    return [
      {
        body: `10:00 easy warmup building toward ${workout.targetZone ?? "controlled effort"}.`,
        note: "Let your stride settle in before the harder work starts.",
        title: "Warmup",
        variant: "surface"
      },
      {
        body: workout.description,
        note: fallbackNote ?? "Keep the quality steady across each repeat instead of starting too fast.",
        title: "Main Set",
        variant: "accent"
      },
      {
        body: "5:00 cooldown at very easy effort.",
        note: "Let your breathing return to normal before you finish.",
        title: "Cooldown",
        variant: "surface"
      }
    ];
  }

  if (workout.type === "brick") {
    return [
      {
        body: "Start with a smooth spin and prepare for the transition.",
        note: "Stay controlled in the opening minutes so the second sport feels manageable.",
        title: "Warmup",
        variant: "surface"
      },
      {
        body: workout.description,
        note: fallbackNote ?? "Treat this as rhythm practice, not an all-out effort.",
        title: "Main Set",
        variant: "accent"
      },
      {
        body: "Finish with an easy walk and relaxed breathing.",
        note: "Focus on recovery once the final block is done.",
        title: "Cooldown",
        variant: "surface"
      }
    ];
  }

  if (workout.type === "strength" || workout.type === "mobility") {
    return [
      {
        body: "5:00 light movement to raise temperature and prepare the joints.",
        note: "Keep every rep smooth and controlled.",
        title: "Warmup",
        variant: "surface"
      },
      {
        body: workout.description,
        note: fallbackNote ?? "Move with control and stop before form breaks down.",
        title: "Main Set",
        variant: "accent"
      },
      {
        body: "Finish with gentle breathing and a few relaxed stretches.",
        note: "The goal is to leave this session feeling better than you started.",
        title: "Cooldown",
        variant: "surface"
      }
    ];
  }

  return [
    {
      body: "8:00 easy start at relaxed effort.",
      note: "Settle into the session before adding any pressure.",
      title: "Warmup",
      variant: "surface"
    },
    {
      body: workout.description,
      note: fallbackNote ?? "Keep the effort smooth, sustainable, and technically clean.",
      title: "Main Set",
      variant: "accent"
    },
    {
      body: "5:00 easy finish and reset.",
      note: "Bring effort down gradually and end with controlled breathing.",
      title: "Cooldown",
      variant: "surface"
    }
  ];
}

export function useWorkoutDetailScreenData(workoutId?: string) {
  const currentPlanState = useCurrentPlanState();
  const workout = workoutId && currentPlanState.plan ? workoutRepository.getById(currentPlanState.plan, workoutId) : null;
  const log = workout ? currentPlanState.logs[workout.id] ?? null : null;
  const completion = workout ? workoutProgressService.calculateWorkoutCompletion(workout, log) : 0;
  const metaTokens = workout
    ? [formatDurationMin(workout.targetDurationMin), workout.targetZone, formatDistanceKm(workout.targetDistanceKm)]
        .filter((token) => token && token !== "-")
        .map((token) => token.toUpperCase())
    : [];
  const sections = workout ? buildWorkoutSections(workout) : [];

  return {
    completion,
    hasActivePlan: Boolean(currentPlanState.plan && currentPlanState.planStartDate),
    log,
    metaTokens,
    sections,
    workout
  };
}
