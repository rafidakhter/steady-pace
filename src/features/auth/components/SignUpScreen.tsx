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
import { SignUpFormValues, signUpSchema } from "../validators/authSchemas";
import { AuthScreenShell } from "./AuthScreenShell";

export function SignUpScreen() {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp);
  const hasActivePlan = useAppStore((state) => Boolean(state.selectedChallengeId && state.activePlanId && state.planStartDate));
  const { hydrated, isAuthenticated } = useAppSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      name: "",
      password: ""
    },
    resolver: zodResolver(signUpSchema)
  });

  if (hydrated && isAuthenticated) {
    return <Redirect href={hasActivePlan ? "../(tabs)/home" : "../(onboarding)/select-challenge"} />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    const result = signUp(values);

    if (!result.ok) {
      setSubmitError(result.error ?? "Something went wrong while creating your account.");
      return;
    }

    router.replace("/");
  });

  return (
    <AuthScreenShell
      ctaLabel={isSubmitting ? "Creating account..." : "Create Account"}
      ctaLoading={isSubmitting}
      ctaOnPress={onSubmit}
      mode="signUp"
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
          name="name"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              error={errors.name?.message}
              label="Full Name"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="John Doe"
              value={value}
            />
          )}
        />
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
            A simple challenge flow, a weekly plan, and a focused dashboard that tells you exactly what is next.
          </Text>
        </View>
      </View>
    </AuthScreenShell>
  );
}
