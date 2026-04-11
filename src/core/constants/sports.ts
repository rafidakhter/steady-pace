export const sportKeys = ["swim", "bike", "run", "strength", "mobility", "rest"] as const;

export type SportKey = (typeof sportKeys)[number];
