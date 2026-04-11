import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export const signUpSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  name: z.string().trim().min(2, "Enter your full name."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
