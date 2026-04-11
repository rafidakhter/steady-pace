import { View } from "react-native";

import { Text } from "./Text";

export function BottomNav() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Text variant="label">Home</Text>
      <Text tone="muted" variant="label">
        Plan
      </Text>
      <Text tone="muted" variant="label">
        Progress
      </Text>
      <Text tone="muted" variant="label">
        Profile
      </Text>
    </View>
  );
}
