import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, TextInput, View } from "react-native";

import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { theme } from "@/core/theme";
import { challengeRepository } from "@/data/repositories/challengeRepository";
import { challengeSelectionService } from "@/domain/services/challengeSelectionService";
import { useAppSession } from "@/features/auth/hooks";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function SelectChallengeScreen() {
  const router = useRouter();
  const selectChallenge = useAppStore((state) => state.selectChallenge);
  const updateUserDetails = useAuthStore((state) => state.updateUserDetails);
  const savedWeightLossGoal = useAuthStore((state) => state.user?.details?.weightLossGoal);
  const existingChallengeId = useAppStore((state) => state.selectedChallengeId);
  const { hasActivePlan, hydrated, isAuthenticated } = useAppSession();
  const challenges = useMemo(() => challengeRepository.getAll(), []);
  const trainingChallenges = useMemo(() => challenges.filter((challenge) => challenge.id !== "weight-loss"), [challenges]);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    existingChallengeId && existingChallengeId !== "weight-loss" ? existingChallengeId : "sprint-triathlon"
  );
  const [weightLossGoalEnabled, setWeightLossGoalEnabled] = useState(Boolean(savedWeightLossGoal));
  const [weightGoalModalVisible, setWeightGoalModalVisible] = useState(false);
  const [currentWeightLbs, setCurrentWeightLbs] = useState(savedWeightLossGoal?.currentWeightLbs.toString() ?? "");
  const [targetDate, setTargetDate] = useState(savedWeightLossGoal?.targetDate ?? "");
  const [targetWeightLbs, setTargetWeightLbs] = useState(savedWeightLossGoal?.targetWeightLbs.toString() ?? "");
  const [weightGoalError, setWeightGoalError] = useState<string | null>(null);

  useEffect(() => {
    if (existingChallengeId && existingChallengeId !== "weight-loss") {
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
  const hasValidWeightGoal =
    weightLossGoalEnabled && currentWeightLbs.trim().length > 0 && targetWeightLbs.trim().length > 0 && targetDate.trim().length > 0;
  const canContinue = Boolean((selectedChallenge && selectedChallengeSelectable) || hasValidWeightGoal);
  const continueLabel = hasValidWeightGoal
    ? selectedChallenge
      ? `Continue with ${selectedChallenge.name} + Weight Loss`
      : "Continue with Weight Loss"
    : selectedChallenge
      ? `Continue with ${selectedChallenge.name}`
      : "Select a challenge";
  const saveWeightGoal = () => {
    const currentWeight = Number(currentWeightLbs);
    const targetWeight = Number(targetWeightLbs);
    const parsedTargetDate = parseDateValue(targetDate);

    if (!currentWeight || !targetWeight || !targetDate.trim()) {
      setWeightGoalError("Add your current weight, target weight, and target date.");
      return false;
    }

    if (!parsedTargetDate) {
      setWeightGoalError("Use a valid target date in YYYY-MM-DD format.");
      return false;
    }

    if (toDateValue(parsedTargetDate) < toDateValue(new Date())) {
      setWeightGoalError("Choose today or a future target date.");
      return false;
    }

    setWeightGoalError(null);
    setWeightLossGoalEnabled(true);
    setWeightGoalModalVisible(false);
    return true;
  };
  const commitSelection = () => {
    const challengeIdToStart = selectedChallenge?.id ?? (hasValidWeightGoal ? "weight-loss" : null);

    if (!challengeIdToStart) {
      return;
    }

    if (weightLossGoalEnabled) {
      const goalSaved = saveWeightGoal();

      if (!goalSaved) {
        setWeightGoalModalVisible(true);
        return;
      }

      updateUserDetails({
        weightLossGoal: {
          currentWeightLbs: Number(currentWeightLbs),
          targetDate: targetDate.trim(),
          targetWeightLbs: Number(targetWeightLbs)
        }
      });
    }

    const result = selectChallenge(challengeIdToStart);

    if (result.ok) {
      router.replace("/");
    }
  };

  return (
    <Screen
      footer={
        <Button
          disabled={!canContinue}
          label={continueLabel}
          onPress={commitSelection}
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
        {trainingChallenges.map((challenge) => {
          const selectable = challengeSelectionService.isChallengeSelectable(challenge.id);

          return (
            <ChallengeCard
              challenge={challenge}
              isSelected={selectedChallengeId === challenge.id}
              key={challenge.id}
              onPress={selectable ? () => setSelectedChallengeId(selectedChallengeId === challenge.id ? null : challenge.id) : undefined}
              selectable={selectable}
            />
          );
        })}
        {selectedChallengeId ? (
          <Button label="Use weight loss only" onPress={() => setSelectedChallengeId(null)} variant="outline" />
        ) : null}
      </View>

      <View style={{ borderTopColor: theme.colors.accent, borderTopWidth: 1, gap: 14, paddingTop: 18 }}>
        <View style={{ gap: 6 }}>
          <Text style={{ textTransform: "uppercase" }} variant="title">
            Body Composition
          </Text>
          <Text tone="muted" variant="body">
            Add weight loss as its own goal, or combine it with your training challenge.
          </Text>
        </View>

        <Pressable
          onPress={() => setWeightGoalModalVisible(true)}
          style={{
            backgroundColor: weightLossGoalEnabled ? theme.colors.accent : theme.colors.surface,
            borderLeftColor: weightLossGoalEnabled ? theme.colors.text : theme.colors.accent,
            borderLeftWidth: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: theme.spacing.md
          }}
        >
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ textTransform: "uppercase" }} variant="body">
              {weightLossGoalEnabled ? "Weight Goal Active" : "Weight Loss"}
            </Text>
            <Text tone="muted" variant="caption">
              {weightLossGoalEnabled ? `${currentWeightLbs || "-"} lbs to ${targetWeightLbs || "-"} lbs` : "Set a target weight and date"}
            </Text>
          </View>
          <Text style={{ letterSpacing: 1.4, textTransform: "uppercase" }} tone={weightLossGoalEnabled ? "success" : "muted"} variant="caption">
            {weightLossGoalEnabled ? "Configured" : "Add"}
          </Text>
        </Pressable>
      </View>

      <WeightGoalModal
        currentWeightLbs={currentWeightLbs}
        error={weightGoalError}
        onClose={() => setWeightGoalModalVisible(false)}
        onCurrentWeightChange={setCurrentWeightLbs}
        onSave={saveWeightGoal}
        onTargetDateChange={setTargetDate}
        onTargetWeightChange={setTargetWeightLbs}
        targetDate={targetDate}
        targetWeightLbs={targetWeightLbs}
        visible={weightGoalModalVisible}
      />
    </Screen>
  );
}

function WeightGoalModal({
  currentWeightLbs,
  error,
  onClose,
  onCurrentWeightChange,
  onSave,
  onTargetDateChange,
  onTargetWeightChange,
  targetDate,
  targetWeightLbs,
  visible
}: {
  currentWeightLbs: string;
  error: string | null;
  onClose: () => void;
  onCurrentWeightChange: (value: string) => void;
  onSave: () => boolean;
  onTargetDateChange: (value: string) => void;
  onTargetWeightChange: (value: string) => void;
  targetDate: string;
  targetWeightLbs: string;
  visible: boolean;
}) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Pressable onPress={onClose} style={{ backgroundColor: "rgba(17, 17, 17, 0.4)", flex: 1 }} />
        <View style={{ backgroundColor: theme.colors.background, borderTopColor: theme.colors.highVisGreen, borderTopWidth: 4 }}>
          <View
            style={{
              alignItems: "center",
              borderBottomColor: theme.colors.accent,
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: theme.spacing.lg
            }}
          >
            <Text style={{ textTransform: "uppercase" }} variant="title">
              Set Weight Target
            </Text>
            <Pressable onPress={onClose} style={{ padding: 8 }}>
              <Text style={{ fontSize: 32, lineHeight: 32 }} tone="muted" variant="title">
                X
              </Text>
            </Pressable>
          </View>

          <View style={{ gap: 22, padding: theme.spacing.lg }}>
            <WeightGoalInput
              keyboardType="decimal-pad"
              label="Current Weight"
              onChangeText={onCurrentWeightChange}
              unit="LBS"
              value={currentWeightLbs}
            />
            <WeightGoalInput
              keyboardType="decimal-pad"
              label="Target Weight"
              onChangeText={onTargetWeightChange}
              unit="LBS"
              value={targetWeightLbs}
            />
            <WeightGoalDateField
              label="Target Date"
              onChangeText={onTargetDateChange}
              onPress={() => setDatePickerVisible(true)}
              value={targetDate}
            />
            {error ? (
              <Text tone="danger" variant="caption">
                {error}
              </Text>
            ) : null}
            <Button label="Lock in target ->" onPress={onSave} />
          </View>
        </View>
        <DatePickerModal
          onClose={() => setDatePickerVisible(false)}
          onSelect={(date) => {
            onTargetDateChange(date);
            setDatePickerVisible(false);
          }}
          selectedDate={targetDate}
          visible={datePickerVisible}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

function WeightGoalDateField({
  label,
  onChangeText,
  onPress,
  value
}: {
  label: string;
  onChangeText: (value: string) => void;
  onPress: () => void;
  value: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text tone="muted" variant="label">
        {label}
      </Text>
      <View
        style={{
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          flexDirection: "row",
          justifyContent: "space-between",
          minHeight: 64,
          paddingHorizontal: theme.spacing.md
        }}
      >
        <TextInput
          keyboardType="numbers-and-punctuation"
          onChangeText={onChangeText}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={theme.colors.muted}
          style={{
            color: theme.colors.text,
            flex: 1,
            fontFamily: theme.typography.fontFamily.headingSemibold,
            fontSize: 24,
            minHeight: 64,
            paddingRight: theme.spacing.md
          }}
          value={value}
        />
        <Pressable
          accessibilityLabel="Open date picker"
          onPress={onPress}
          style={{
            alignItems: "center",
            borderLeftColor: theme.colors.accent,
            borderLeftWidth: 1,
            justifyContent: "center",
            minHeight: 64,
            paddingLeft: theme.spacing.md
          }}
        >
          <Text style={{ fontSize: 18 }} tone="muted" variant="title">
            CAL
          </Text>
        </Pressable>
      </View>
      {value && parseDateValue(value) ? (
        <Text tone="muted" variant="caption">
          {formatDateLabel(value)}
        </Text>
      ) : null}
    </View>
  );
}

function DatePickerModal({
  onClose,
  onSelect,
  selectedDate,
  visible
}: {
  onClose: () => void;
  onSelect: (date: string) => void;
  selectedDate: string;
  visible: boolean;
}) {
  const [draftDate, setDraftDate] = useState(() => parseDateValue(selectedDate) ?? new Date());

  useEffect(() => {
    if (visible) {
      setDraftDate(parseDateValue(selectedDate) ?? new Date());
    }
  }, [selectedDate, visible]);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "dismissed") {
      onClose();
      return;
    }

    if (!date) {
      return;
    }

    setDraftDate(date);

    if (Platform.OS !== "ios") {
      onSelect(toDateValue(date));
    }
  };

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable onPress={onClose} style={{ backgroundColor: "rgba(17, 17, 17, 0.35)", flex: 1 }} />
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.highVisGreen,
            borderTopWidth: 4,
            padding: theme.spacing.lg
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 18 }}>
            <Text style={{ textTransform: "uppercase" }} variant="title">
              Pick Target Date
            </Text>
            <Pressable onPress={onClose} style={{ padding: 8 }}>
              <Text style={{ fontSize: 24, lineHeight: 28 }} tone="muted" variant="title">
                X
              </Text>
            </Pressable>
          </View>

          <View style={{ backgroundColor: theme.colors.surface, paddingVertical: theme.spacing.sm }}>
            <DateTimePicker
              accentColor={theme.colors.highVisGreen}
              display={Platform.OS === "ios" ? "inline" : "calendar"}
              minimumDate={new Date()}
              mode="date"
              onChange={handleChange}
              themeVariant="light"
              value={draftDate}
            />
          </View>

          <View style={{ gap: 12, marginTop: 18 }}>
            <Text tone="muted" variant="caption">
              {formatDateLabel(toDateValue(draftDate))}
            </Text>
            {Platform.OS === "ios" ? (
              <Button label="Use selected date" onPress={() => onSelect(toDateValue(draftDate))} />
            ) : null}
            <Button label="Cancel" onPress={onClose} variant={Platform.OS === "ios" ? "outline" : "ghost"} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function WeightGoalInput({
  keyboardType,
  label,
  onChangeText,
  placeholder = "0.0",
  unit,
  value
}: {
  keyboardType?: "decimal-pad";
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  unit?: string;
  value: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text tone="muted" variant="label">
          {label}
        </Text>
        {unit ? (
          <Text tone="muted" variant="label">
            {unit}
          </Text>
        ) : null}
      </View>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily.headingSemibold,
          fontSize: 28,
          minHeight: 64,
          paddingHorizontal: theme.spacing.md
        }}
        value={value}
      />
    </View>
  );
}

function formatDateLabel(value: string) {
  const date = parseDateValue(value);

  if (!date) {
    return value;
  }

  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function parseDateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
