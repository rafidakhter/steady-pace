import { Redirect } from "expo-router";
import { View } from "react-native";

import { theme } from "@/core/theme";
import { useAppSession } from "@/features/auth/hooks";

export default function IndexRoute() {
  const { hasActivePlan, hydrated, isAuthenticated } = useAppSession();

  if (!hydrated) {
    return <View style={{ backgroundColor: theme.colors.background, flex: 1 }} />;
  }

  if (!isAuthenticated) {
    return <Redirect href="./(auth)/sign-in" />;
  }

  if (!hasActivePlan) {
    return <Redirect href="./(onboarding)/select-challenge" />;
  }

  return <Redirect href="./(tabs)/home" />;
}
