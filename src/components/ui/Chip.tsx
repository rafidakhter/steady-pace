import { View } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ChipProps {
  label: string;
  tone?: "default" | "selected";
}

export function Chip({ label, tone = "default" }: ChipProps) {
  const isSelected = tone === "selected";

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
        borderColor: isSelected ? theme.colors.text : theme.colors.accent,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6
      }}
    >
      <Text tone={isSelected ? "default" : "muted"} variant="label">
        {label}
      </Text>
    </View>
  );
}
