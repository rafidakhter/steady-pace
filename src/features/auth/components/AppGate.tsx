import { Redirect, RelativePathString } from "expo-router";
import { PropsWithChildren } from "react";
import { View } from "react-native";

import { theme } from "@/core/theme";

import { useAppSession } from "../hooks";
import { Text } from "@/components/ui/Text";

interface AppGateProps extends PropsWithChildren {
  requirePlan?: boolean;
  redirectTo?: RelativePathString;
}

export function AppGate({ children, redirectTo = "../(auth)/sign-in", requirePlan }: AppGateProps) {
  const { hasActivePlan, hydrated, isAuthenticated } = useAppSession();

  if (!hydrated) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: theme.colors.background,
          flex: 1,
          justifyContent: "center",
          padding: theme.spacing.lg
        }}
      >
        <Text tone="muted" variant="label">
          Loading your plan
        </Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={redirectTo} />;
  }

  if (requirePlan && !hasActivePlan) {
    return <Redirect href="../(onboarding)/select-challenge" />;
  }

  return <>{children}</>;
}
