import { View } from "react-native";

import { Card } from "./ui/Card";
import { Text } from "./ui/Text";

interface SummaryStatCardProps {
  label: string;
  value: string;
}

export function SummaryStatCard({ label, value }: SummaryStatCardProps) {
  return (
    <Card>
      <View style={{ gap: 8 }}>
        <Text tone="muted" variant="label">
          {label}
        </Text>
        <Text variant="title">{value}</Text>
      </View>
    </Card>
  );
}
