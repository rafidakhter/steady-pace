import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { AppGate } from "@/features/auth/components";
import { useAppSession } from "@/features/auth/hooks";
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
      <Screen subtitle="Profile" title="Your account">
        <Card>
          <View style={{ gap: 8 }}>
            <Text variant="title">{user?.name ?? "Steady Pace user"}</Text>
            <Text tone="muted" variant="body">
              {user?.email ?? "Local account"}
            </Text>
          </View>
        </Card>

        <Card>
          <View style={{ gap: 8 }}>
            <Text variant="label">Challenge</Text>
            <Text tone="muted" variant="body">
              {hasActivePlan
                ? "Your current challenge is active. You can reset it and pick again."
                : "No challenge is selected right now."}
            </Text>
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
        </Card>
      </Screen>
    </AppGate>
  );
}
