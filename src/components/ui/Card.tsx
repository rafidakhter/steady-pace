import { PropsWithChildren } from "react";
import { View } from "react-native";

import { theme } from "@/core/theme";

export function Card({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        gap: 12,
        padding: theme.spacing.md
      }}
    >
      {children}
    </View>
  );
}
