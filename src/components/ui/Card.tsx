import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

import { theme } from "@/core/theme";

interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.accent,
        borderWidth: 1,
        gap: 12,
        padding: theme.spacing.md
      }}
    >
      <View style={style}>{children}</View>
    </View>
  );
}
