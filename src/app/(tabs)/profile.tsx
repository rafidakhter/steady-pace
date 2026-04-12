import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { AppGate } from "@/features/auth/components";
import { useAppSession } from "@/features/auth/hooks";
import { theme } from "@/core/theme";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useWorkoutStore } from "@/store/workoutStore";

export default function ProfileRoute() {
  const router = useRouter();
  const { hasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const resetAppData = useAppStore((state) => state.resetAppData);
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const resetAllLogs = useWorkoutStore((state) => state.resetAllLogs);

  if (hydrated && !isAuthenticated) {
    return <Redirect href="../(auth)/sign-in" />;
  }

  return (
    <AppGate>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl }}>
          <Text style={{ textTransform: "uppercase" }} tone="muted" variant="caption">
            Profile
          </Text>
          <Text style={{ marginTop: 12 }} variant="headline">
            {user?.name ?? "Steady Pace user"}
          </Text>
          <Text style={{ marginTop: 6 }} tone="muted" variant="body">
            {user?.email ?? "Local account"}
          </Text>

          <View
            style={{
              borderBottomColor: theme.colors.accent,
              borderBottomWidth: 1,
              marginTop: 32,
              paddingBottom: 20
            }}
          >
            <Text style={{ letterSpacing: 1.4, marginBottom: 8, textTransform: "uppercase" }} variant="caption">
              Challenge
            </Text>
            <Text tone="muted" variant="body">
              {hasActivePlan
                ? "Your current challenge is active. Reset it to choose a different path."
                : "No challenge is selected right now."}
            </Text>
          </View>

          <View style={{ gap: 16, marginTop: 32 }}>
            <Button
              label="Choose challenge again"
              onPress={() => {
                resetAppData();
                resetAllLogs();
                router.replace("/");
              }}
              variant="outline"
            />
            <Button
              label="Sign out"
              onPress={() => {
                signOut();
                resetAppData();
                resetAllLogs();
                router.replace("/");
              }}
              variant="ghost"
            />
          </View>
        </View>
      </SafeAreaView>
    </AppGate>
  );
}
