import { View } from "react-native";

import { theme } from "@/core/theme";

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
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.accent,
        borderWidth: 1,
        gap: 12,
        padding: theme.spacing.xl
      }}
    >
      <Text style={{ textAlign: "center" }} variant="title">
        {title}
      </Text>
      <Text style={{ textAlign: "center" }} tone="muted" variant="body">
        {description}
      </Text>
      {actionLabel ? <Button label={actionLabel} onPress={onActionPress} variant="outline" /> : null}
    </View>
  );
}
