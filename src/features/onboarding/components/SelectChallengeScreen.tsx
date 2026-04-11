import { Redirect, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { challengeSelectionService } from "@/domain/services/challengeSelectionService";
import { useAppSession } from "@/features/auth/hooks";
import { useAppStore } from "@/store/appStore";

export function SelectChallengeScreen() {
  const router = useRouter();
  const selectChallenge = useAppStore((state) => state.selectChallenge);
  const existingChallengeId = useAppStore((state) => state.selectedChallengeId);
  const { hasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const challenges = useMemo(() => challengeRepository.getAll(), []);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(existingChallengeId ?? "sprint-triathlon");

  useEffect(() => {
    if (existingChallengeId) {
      setSelectedChallengeId(existingChallengeId);
    }
  }, [existingChallengeId]);

  if (hydrated && !isAuthenticated) {
    return <Redirect href="../(auth)/sign-in" />;
  }

  if (hydrated && hasActivePlan) {
    return <Redirect href="../(tabs)/home" />;
  }

  const selectedChallenge = challenges.find((challenge) => challenge.id === selectedChallengeId) ?? null;
  const selectedChallengeSelectable = selectedChallenge ? challengeSelectionService.isChallengeSelectable(selectedChallenge.id) : false;

  return (
    <Screen
      footer={
        <Button
          disabled={!selectedChallenge || !selectedChallengeSelectable}
          label={selectedChallenge ? `Continue with ${selectedChallenge.name}` : "Select a challenge"}
          onPress={() => {
            if (!selectedChallenge) {
              return;
            }

            const result = selectChallenge(selectedChallenge.id);

            if (result.ok) {
              router.replace("/");
            }
          }}
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
