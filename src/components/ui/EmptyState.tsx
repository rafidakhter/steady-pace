import { View } from "react-native";

import { Button } from "./Button";
import { Text } from "./Text";

interface EmptyStateProps {
  actionLabel?: string;
  onActionPress?: () => void;
  description: string;
  title: string;
}

export function EmptyState({ actionLabel, description, onActionPress, title }: EmptyStateProps) {
  return (
    <View style={{ gap: 8 }}>
      <Text variant="title">{title}</Text>
      <Text tone="muted" variant="body">
        {description}
      </Text>
      {actionLabel ? <Button label={actionLabel} onPress={onActionPress} variant="outline" /> : null}
    </View>
  );
}
