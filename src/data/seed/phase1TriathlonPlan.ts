import { Workout } from "@/domain/entities/Workout";
import { TrainingPlan } from "@/domain/entities/TrainingPlan";

function createWorkout(
  weekNumber: number,
  orderIndex: number,
  sportId: Workout["sportId"],
  type: Workout["type"],
  title: string,
  description: string,
  targetDistanceKm: number | undefined,
  targetDurationMin: number | undefined,
  notes?: string
): Workout {
  const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

  return {
    dayKey: dayKeys[orderIndex],
    description,
    id: `w${weekNumber}-${dayKeys[orderIndex]}-${sportId}`,
    notes,
    orderIndex,
    sportId,
    targetDistanceKm,
    targetDurationMin,
    title,
    type,
    weekNumber
  };
}

export const phase1TriathlonPlan: TrainingPlan = {
  challengeId: "sprint-triathlon",
  id: "phase1-triathlon-plan",
  name: "Sprint Triathlon Beginner Build",
  phase: "Phase 1",
  weeks: [
    {
      goal: "Establish comfort across swim, bike, run, and recovery rhythm.",
      milestone: "Complete your first full training week.",
      weekNumber: 1,
      workouts: [
        createWorkout(1, 0, "swim", "technique", "Technique Swim", "Technique swim + easy laps", 0.2, 25, "Keep the effort easy and focus on comfort in the water."),
        createWorkout(1, 1, "run", "interval", "Run/Walk Intervals", "Run/walk intervals", 2.0, 20, "Keep the pace conversational and use the walk breaks fully."),
        createWorkout(1, 2, "bike", "endurance", "Easy Spin", "Easy spin", 8, 30, "Stay smooth and light on the pedals."),
        createWorkout(1, 3, "mobility", "mobility", "Mobility Session", "Mobility + optional walk", 0, 20, "This session supports recovery, not intensity."),
        createWorkout(1, 4, "swim", "endurance", "Short Swim Endurance", "Short swim endurance", 0.25, 25, "Relax your breathing and keep the pace even."),
        createWorkout(1, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 10, 40, "Ride at a pace where you can still speak in short sentences."),
        createWorkout(1, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0, "Take the day fully off.")
      ]
    },
    {
      goal: "Add a small amount of volume without increasing stress too quickly.",
      milestone: "Swim continuously with better control.",
      weekNumber: 2,
      workouts: [
        createWorkout(2, 0, "swim", "technique", "Technique Swim", "Technique swim + easy laps", 0.25, 25),
        createWorkout(2, 1, "run", "interval", "Run/Walk Intervals", "Run/walk intervals", 2.25, 22),
        createWorkout(2, 2, "bike", "endurance", "Easy Spin", "Easy spin", 9, 32),
        createWorkout(2, 3, "strength", "strength", "Light Strength", "Light strength + mobility", 0, 25),
        createWorkout(2, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.3, 28),
        createWorkout(2, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 12, 45),
        createWorkout(2, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Increase comfort with consistent aerobic work.",
      milestone: "Build confidence across all three sports.",
      weekNumber: 3,
      workouts: [
        createWorkout(3, 0, "swim", "technique", "Technique Swim", "Technique + pull buoy/drills", 0.3, 28),
        createWorkout(3, 1, "run", "interval", "Run/Walk Intervals", "Run/walk intervals", 2.5, 24),
        createWorkout(3, 2, "bike", "endurance", "Easy Spin", "Easy spin", 10, 35),
        createWorkout(3, 3, "mobility", "mobility", "Mobility Session", "Mobility + optional walk", 0, 20),
        createWorkout(3, 4, "swim", "endurance", "Short Endurance Swim", "Short endurance swim", 0.35, 30),
        createWorkout(3, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 14, 50),
        createWorkout(3, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Hold steady volume and support consistency.",
      milestone: "Complete four weeks of structured training.",
      weekNumber: 4,
      workouts: [
        createWorkout(4, 0, "swim", "technique", "Technique Swim", "Technique swim", 0.35, 30),
        createWorkout(4, 1, "run", "endurance", "Easy Run/Walk", "Easy run/walk", 2.75, 25),
        createWorkout(4, 2, "bike", "endurance", "Easy Spin", "Easy spin", 11, 36),
        createWorkout(4, 3, "strength", "strength", "Light Strength", "Light strength + mobility", 0, 25),
        createWorkout(4, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.4, 32),
        createWorkout(4, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 15, 55),
        createWorkout(4, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Introduce beginner multisport transitions with a short brick.",
      milestone: "Complete your first brick-style session.",
      weekNumber: 5,
      workouts: [
        createWorkout(5, 0, "swim", "technique", "Technique + Endurance Swim", "Technique + endurance", 0.4, 30),
        createWorkout(5, 1, "run", "interval", "Run/Walk Progression", "Run/walk progression", 3.0, 28),
        createWorkout(5, 2, "bike", "endurance", "Easy Spin", "Easy spin", 12, 38),
        createWorkout(5, 3, "bike", "brick", "Short Brick", "Short bike + short run", 6.0, 30, "Treat this as a gentle introduction to changing sports while tired."),
        createWorkout(5, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.45, 32),
        createWorkout(5, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 16, 60),
        createWorkout(5, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Increase sustainable volume while preserving recovery.",
      milestone: "Feel more efficient in all three disciplines.",
      weekNumber: 6,
      workouts: [
        createWorkout(6, 0, "swim", "technique", "Technique + Endurance Swim", "Technique + endurance", 0.45, 32),
        createWorkout(6, 1, "run", "endurance", "Easy Run/Walk", "Easy run/walk", 3.25, 30),
        createWorkout(6, 2, "bike", "endurance", "Easy Spin", "Easy spin", 13, 40),
        createWorkout(6, 3, "strength", "strength", "Strength Session", "Strength + mobility", 0, 25),
        createWorkout(6, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.5, 35),
        createWorkout(6, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 18, 65),
        createWorkout(6, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Build endurance confidence and repeat the brick pattern.",
      milestone: "Hold your longest ride so far with steady pacing.",
      weekNumber: 7,
      workouts: [
        createWorkout(7, 0, "swim", "technique", "Technique + Endurance Swim", "Technique + endurance", 0.5, 35),
        createWorkout(7, 1, "run", "endurance", "Easy Run/Walk", "Easy run/walk", 3.5, 32),
        createWorkout(7, 2, "bike", "endurance", "Easy Spin", "Easy spin", 14, 42),
        createWorkout(7, 3, "bike", "brick", "Short Brick", "Short bike + short run", 7.0, 35),
        createWorkout(7, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.55, 36),
        createWorkout(7, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 20, 70),
        createWorkout(7, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    },
    {
      goal: "Finish the phase with your strongest overall volume yet.",
      milestone: "Complete the full 8-week beginner base.",
      weekNumber: 8,
      workouts: [
        createWorkout(8, 0, "swim", "technique", "Technique + Endurance Swim", "Technique + endurance", 0.55, 35),
        createWorkout(8, 1, "run", "endurance", "Easy Run/Walk", "Easy run/walk", 4.0, 35),
        createWorkout(8, 2, "bike", "endurance", "Easy Spin", "Easy spin", 15, 45),
        createWorkout(8, 3, "mobility", "mobility", "Mobility Session", "Mobility + optional walk", 0, 20),
        createWorkout(8, 4, "swim", "endurance", "Continuous Easy Swim", "Continuous easy swim", 0.6, 38),
        createWorkout(8, 5, "bike", "endurance", "Long Easy Bike", "Long easy bike", 22, 75),
        createWorkout(8, 6, "rest", "rest", "Full Rest", "Full rest", 0, 0)
      ]
    }
  ]
};
