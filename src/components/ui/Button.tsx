import { ActivityIndicator, Pressable, ViewStyle } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ButtonProps {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: "ghost" | "outline" | "primary";
}

export function Button({ disabled, label, loading, onPress, style, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={[
        {
          alignItems: "center",
          backgroundColor: isPrimary ? theme.colors.primary : "transparent",
          borderColor: isGhost ? "transparent" : isPrimary ? theme.colors.primary : theme.colors.text,
          borderWidth: isGhost ? 0 : 1,
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          opacity: isDisabled ? 0.6 : 1,
          paddingHorizontal: 16,
          paddingVertical: 14
        },
        style
      ]}
    >
      {loading ? <ActivityIndicator color={theme.colors.text} size="small" /> : null}
      <Text style={{ textAlign: "center" }} variant="label">
        {label}
      </Text>
    </Pressable>
  );
}
