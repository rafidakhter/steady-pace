import { Pressable, ViewStyle } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: "outline" | "primary";
}

export function Button({ label, onPress, style, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: isPrimary ? theme.colors.primary : "transparent",
          borderColor: isPrimary ? theme.colors.primary : theme.colors.text,
          borderWidth: 1,
          paddingHorizontal: 16,
          paddingVertical: 14
        },
        style
      ]}
    >
      <Text style={{ textAlign: "center" }} variant="label">
        {label}
      </Text>
    </Pressable>
  );
}
