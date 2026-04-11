import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProviders } from "@/shared/providers/app-providers";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          animation: "fade",
          contentStyle: {
            backgroundColor: "#FFFFFF"
          },
          headerShown: false
        }}
      />
    </AppProviders>
  );
}
