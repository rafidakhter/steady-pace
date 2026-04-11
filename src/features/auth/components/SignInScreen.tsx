import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
  const hasActivePlan = useAppStore((state) => Boolean(state.selectedChallengeId && state.activePlanId && state.planStartDate));
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
      alternateCtaHref="./sign-up"
      alternateCtaLabel="Create account"
      eyebrow="Sign in"
      footer={<Button label="Continue" loading={isSubmitting} onPress={onSubmit} />}
      title="Welcome back"
    >
      <Card>
        <View style={{ gap: 16 }}>
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
                placeholder="you@example.com"
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
                placeholder="At least 6 characters"
                secureTextEntry
                value={value}
              />
            )}
          />
        </View>
      </Card>

      <Card>
        <View style={{ gap: 8 }}>
          <Text variant="label">V1 auth</Text>
          <Text tone="muted" variant="body">
            This flow uses local validation and persisted mock auth for V1.
          </Text>
        </View>
      </Card>
    </AuthScreenShell>
  );
}
