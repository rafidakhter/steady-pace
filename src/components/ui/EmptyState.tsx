import { View } from "react-native";

import { Text } from "./Text";

interface EmptyStateProps {
  description: string;
  title: string;
}

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <View style={{ gap: 8 }}>
      <Text variant="title">{title}</Text>
      <Text tone="muted" variant="body">
        {description}
      </Text>
    </View>
  );
}
