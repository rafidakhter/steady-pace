import { Challenge } from "@/domain/entities/Challenge";

export const challengesSeed: Challenge[] = [
  {
    category: "run",
    description: "A beginner-friendly running progression focused on finishing your first 5K.",
    estimatedDurationLabel: "6 weeks",
    id: "run-5k",
    level: "beginner",
    name: "5K Run",
    planId: "run-5k-placeholder"
  },
  {
    category: "run",
    description: "A steadier endurance build for athletes moving beyond the 5K distance.",
    estimatedDurationLabel: "8 weeks",
    id: "run-10k",
    level: "intermediate",
    name: "10K Run",
    planId: "run-10k-placeholder"
  },
  {
    category: "triathlon",
    description: "A calm, beginner sprint triathlon plan built around swim, bike, run, and recovery.",
    estimatedDurationLabel: "8 weeks",
    id: "sprint-triathlon",
    level: "beginner",
    name: "Sprint Triathlon",
    planId: "phase1-triathlon-plan"
  },
  {
    category: "custom",
    description: "Track a target weight alongside your training plan, or use it as a standalone body composition focus.",
    estimatedDurationLabel: "Self paced",
    id: "weight-loss",
    level: "beginner",
    name: "Weight Loss",
    planId: "weight-loss-goal"
  }
];
