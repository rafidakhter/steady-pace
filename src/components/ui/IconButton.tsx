import { Pressable } from "react-native";

import { Text } from "./Text";

interface IconButtonProps {
  icon: string;
  onPress?: () => void;
}

export function IconButton({ icon, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={{ padding: 8 }}>
      <Text variant="label">{icon}</Text>
    </Pressable>
  );
}
