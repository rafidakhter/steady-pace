import { View } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ProgressBarProps {
  currentLabel?: string;
  label?: string;
  progress: number;
  targetLabel?: string;
}

export function ProgressBar({ currentLabel, label, progress, targetLabel }: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={{ gap: 6 }}>
      {label || currentLabel || targetLabel ? (
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            {label ? <Text variant="label">{label}</Text> : null}
          </View>
          {currentLabel || targetLabel ? (
            <Text tone="muted" variant="caption">
              {[currentLabel, targetLabel].filter(Boolean).join(" / ")}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View style={{ backgroundColor: theme.colors.accent, height: 8, overflow: "hidden" }}>
        <View style={{ backgroundColor: theme.colors.primary, height: 8, width: `${clampedProgress}%` }} />
      </View>
    </View>
  );
}
