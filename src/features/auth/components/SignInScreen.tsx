import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

import { useAppSession } from "../hooks";
import { SignInFormValues, signInSchema } from "../validators/authSchemas";
import { AuthScreenShell } from "./AuthScreenShell";

export function SignInScreen() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const weightLossGoal = useAuthStore((state) => state.user?.details?.weightLossGoal);
  const hasActivePlan = useAppStore((state) => Boolean(state.selectedChallengeId && state.planStartDate && (state.activePlanId || weightLossGoal)));
  const { hydrated, isAuthenticated } = useAppSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(signInSchema)
  });

  if (hydrated && isAuthenticated) {
    return <Redirect href={hasActivePlan ? "../(tabs)/home" : "../(onboarding)/select-challenge"} />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    const result = signIn(values);

    if (!result.ok) {
      setSubmitError(result.error ?? "Something went wrong while signing in.");
      return;
    }

    router.replace("/");
  });

  return (
    <AuthScreenShell
      ctaLabel={isSubmitting ? "Signing in..." : "Sign In"}
      ctaLoading={isSubmitting}
      ctaOnPress={onSubmit}
      mode="signIn"
      title="Steady Pace"
    >
      <View style={{ gap: 24 }}>
        {submitError ? (
          <Text tone="danger" variant="body">
            {submitError}
          </Text>
        ) : null}
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email?.message}
              keyboardType="email-address"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="email@example.com"
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              error={errors.password?.message}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="••••••••"
              secureTextEntry
              value={value}
            />
          )}
        />
        <View style={{ paddingTop: 4 }}>
          <Text tone="muted" variant="body">
            This flow uses local validation and persisted mock auth for V1.
          </Text>
        </View>
      </View>
    </AuthScreenShell>
  );
}
