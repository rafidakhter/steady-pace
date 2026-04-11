import { Sport } from "@/domain/entities/Sport";

export const sportsSeed: Sport[] = [
  {
    colorToken: "primary",
    icon: "water",
    id: "swim",
    key: "swim",
    name: "Swim",
    unitPreference: "km"
  },
  {
    colorToken: "primary",
    icon: "directions_bike",
    id: "bike",
    key: "bike",
    name: "Bike",
    unitPreference: "km"
  },
  {
    colorToken: "primary",
    icon: "directions_run",
    id: "run",
    key: "run",
    name: "Run",
    unitPreference: "km"
  },
  {
    colorToken: "muted",
    icon: "fitness_center",
    id: "strength",
    key: "strength",
    name: "Strength",
    unitPreference: "min"
  },
  {
    colorToken: "muted",
    icon: "self_improvement",
    id: "mobility",
    key: "mobility",
    name: "Mobility",
    unitPreference: "min"
  },
  {
    colorToken: "muted",
    icon: "hotel",
    id: "rest",
    key: "rest",
    name: "Rest",
    unitPreference: "none"
  }
];
