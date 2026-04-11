import { Pressable } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface IconButtonProps {
  icon: string;
  label?: string;
  onPress?: () => void;
}

export function IconButton({ icon, label, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        borderColor: theme.colors.accent,
        borderWidth: 1,
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 8
      }}
    >
      <Text variant="label">{icon}</Text>
      {label ? <Text variant="label">{label}</Text> : null}
    </Pressable>
  );
}
