import { z } from "zod";

const numericString = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || !Number.isNaN(Number(value)), "Enter a valid number.");

export const workoutLogSchema = z.object({
  actualDistanceKm: numericString,
  actualDurationMin: numericString,
  notes: z.string().max(240, "Keep notes under 240 characters.").optional().default("")
});

export type WorkoutLogFormValues = z.infer<typeof workoutLogSchema>;
