import { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ScreenProps extends PropsWithChildren {
  subtitle?: string;
  title: string;
}

export function Screen({ children, subtitle, title }: ScreenProps) {
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ flex: 1, gap: 16, padding: theme.spacing.lg }}>
        {subtitle ? <Text tone="muted" variant="label">{subtitle}</Text> : null}
        <Text variant="headline">{title}</Text>
        <View style={{ gap: 16 }}>{children}</View>
      </View>
    </SafeAreaView>
  );
}
