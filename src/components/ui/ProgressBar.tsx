import { View } from "react-native";

import { theme } from "@/core/theme";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={{ backgroundColor: theme.colors.accent, height: 8, overflow: "hidden" }}>
      <View style={{ backgroundColor: theme.colors.primary, height: 8, width: `${Math.max(0, Math.min(100, progress))}%` }} />
    </View>
  );
}
