export const sportKeys = ["swim", "bike", "run", "strength", "mobility", "rest"] as const;

export type SportKey = (typeof sportKeys)[number];

export const sportCategoryKeys = ["run", "triathlon", "bike", "custom"] as const;

export type SportCategoryKey = (typeof sportCategoryKeys)[number];
