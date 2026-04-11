import { View } from "react-native";

import { Challenge } from "@/domain/entities/Challenge";

import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";
import { Text } from "./ui/Text";

interface ChallengeCardProps {
  challenge: Challenge;
  isSelected?: boolean;
  onPress?: () => void;
  selectable?: boolean;
}

export function ChallengeCard({ challenge, isSelected, onPress, selectable = true }: ChallengeCardProps) {
  return (
    <Card>
      <View style={{ gap: 10 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Chip label={challenge.level} tone={isSelected ? "selected" : "default"} />
          <Text tone="muted" variant="caption">
            {challenge.estimatedDurationLabel}
          </Text>
        </View>
        <Text variant="title">{challenge.name}</Text>
        <Text tone="muted" variant="body">
          {challenge.description}
        </Text>
        <Button label={selectable ? (isSelected ? "Selected" : "Select challenge") : "Coming soon"} onPress={onPress} variant={isSelected ? "primary" : "outline"} />
      </View>
    </Card>
  );
}
