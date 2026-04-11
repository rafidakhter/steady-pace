import { View } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <View style={{ alignSelf: "flex-start", backgroundColor: theme.colors.surface, paddingHorizontal: 10, paddingVertical: 6 }}>
      <Text variant="label">{label}</Text>
    </View>
  );
}
