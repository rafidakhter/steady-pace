import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ScreenProps extends PropsWithChildren {
  footer?: React.ReactNode;
  scrollable?: boolean;
  subtitle?: string;
  title: string;
}

export function Screen({ children, footer, scrollable = true, subtitle, title }: ScreenProps) {
  const content = (
    <View style={{ flex: 1, gap: 18, padding: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
      {subtitle ? <Text tone="muted" variant="label">{subtitle}</Text> : null}
      <Text variant="headline">{title}</Text>
      <View style={{ gap: 18 }}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {scrollable ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : content}
      {footer ? <View style={{ borderTopColor: theme.colors.accent, borderTopWidth: 1, padding: theme.spacing.lg, paddingTop: theme.spacing.md }}>{footer}</View> : null}
    </SafeAreaView>
  );
}
