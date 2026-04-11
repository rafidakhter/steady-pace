import { View } from "react-native";

import { Text } from "./Text";

interface StatRowProps {
  label: string;
  value: string;
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
      <Text tone="muted" variant="label">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}
