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
    <View style={{ flex: 1, gap: 16, padding: theme.spacing.lg }}>
      {subtitle ? <Text tone="muted" variant="label">{subtitle}</Text> : null}
      <Text variant="headline">{title}</Text>
      <View style={{ gap: 16 }}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {scrollable ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : content}
      {footer ? <View style={{ padding: theme.spacing.lg, paddingTop: 0 }}>{footer}</View> : null}
    </SafeAreaView>
  );
}
