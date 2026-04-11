import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { challengeSelectionService } from "@/domain/services/challengeSelectionService";

export function SelectChallengeScreen() {
  const router = useRouter();
  const challenges = useMemo(() => challengeRepository.getAll(), []);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>("sprint-triathlon");

  const selectedChallenge = challenges.find((challenge) => challenge.id === selectedChallengeId) ?? null;

  return (
    <Screen
      footer={
        <Button
          disabled={!selectedChallenge || !challengeSelectionService.isChallengeSelectable(selectedChallenge.id)}
          label={selectedChallenge ? `Continue with ${selectedChallenge.name}` : "Select a challenge"}
          onPress={() => router.push("../(tabs)/home")}
        />
      }
      subtitle="Choose your first path"
      title="Select challenge"
    >
      <View style={{ gap: 8 }}>
        <Text tone="muted" variant="body">
          Start with one focused goal. The plan stays simple now, and the architecture leaves room for more sports later.
        </Text>
      </View>

      <View style={{ gap: 16 }}>
        {challenges.map((challenge) => {
          const selectable = challengeSelectionService.isChallengeSelectable(challenge.id);

          return (
            <ChallengeCard
              challenge={challenge}
              isSelected={selectedChallengeId === challenge.id}
              key={challenge.id}
              onPress={selectable ? () => setSelectedChallengeId(challenge.id) : undefined}
              selectable={selectable}
            />
          );
        })}
      </View>
    </Screen>
  );
}
