import { Text, View } from "react-native";

import { getChallengeCatalogSummary } from "@/features/training/services/challenge-catalog-service";

const summary = getChallengeCatalogSummary();

export function HelloWorldScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas px-6">
      <View className="w-full max-w-sm gap-4 rounded-none border border-zinc-200 bg-surface p-6">
        <Text className="text-center font-semibold text-4xl text-ink">Hello world</Text>
        <Text className="text-center text-sm uppercase tracking-[2px] text-muted">
          Expo Router + TypeScript foundation
        </Text>
        <Text className="text-center text-base text-ink">
          {summary.sportCount} sports, {summary.workoutTypeCount} workout types, {summary.challengeCount} starter
          challenges seeded.
        </Text>
      </View>
    </View>
  );
}
