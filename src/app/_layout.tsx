import "../../global.css";

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts as useInterFonts } from "@expo-google-fonts/inter";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts as useSpaceGroteskFonts
} from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "@/core/theme";

export default function RootLayout() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold
  });
  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold
  });

  if (!interLoaded || !spaceGroteskLoaded) {
    return <View style={{ backgroundColor: theme.colors.background, flex: 1 }} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          animation: "fade",
          contentStyle: { backgroundColor: theme.colors.background },
          headerShown: false
        }}
      />
    </SafeAreaProvider>
  );
}
