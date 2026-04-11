import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

import { SignInFormValues, signInSchema } from "../validators/authSchemas";
import { AuthScreenShell } from "./AuthScreenShell";

export function SignInScreen() {
  const router = useRouter();
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

  const onSubmit = handleSubmit(async () => {
    router.push("../(onboarding)/select-challenge");
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
            This flow uses local validation first. Store-backed sign in comes next in Phase 6.
          </Text>
        </View>
      </Card>
    </AuthScreenShell>
  );
}
