import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

import { SignUpFormValues, signUpSchema } from "../validators/authSchemas";
import { AuthScreenShell } from "./AuthScreenShell";

export function SignUpScreen() {
  const router = useRouter();
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

  const onSubmit = handleSubmit(async () => {
    router.push("../(onboarding)/select-challenge");
  });

  return (
    <AuthScreenShell
      alternateCtaHref="./sign-in"
      alternateCtaLabel="Back to sign in"
      eyebrow="Create account"
      footer={<Button label="Create account" loading={isSubmitting} onPress={onSubmit} />}
      title="Start steady"
    >
      <Card>
        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                error={errors.name?.message}
                label="Full name"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Your full name"
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
          <Text variant="label">What you get</Text>
          <Text tone="muted" variant="body">
            A simple challenge flow, a weekly plan, and a focused dashboard that tells you exactly what is next.
          </Text>
        </View>
      </Card>
    </AuthScreenShell>
  );
}
