import { View } from "react-native";

import { Text } from "./Text";

interface StatRowProps {
  emphasis?: boolean;
  label: string;
  value: string;
}

export function StatRow({ emphasis, label, value }: StatRowProps) {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
      <Text tone="muted" variant="label">
        {label}
      </Text>
      <Text variant={emphasis ? "title" : "body"}>{value}</Text>
    </View>
  );
}
