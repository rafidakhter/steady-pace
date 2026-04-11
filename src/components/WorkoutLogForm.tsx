import { View } from "react-native";

import { Input } from "./ui/Input";

interface WorkoutLogFormProps {
  actualDistanceKm: string;
  actualDurationMin: string;
  distanceError?: string;
  durationError?: string;
  notes: string;
  notesError?: string;
  onChangeActualDistanceKm?: (value: string) => void;
  onChangeActualDurationMin?: (value: string) => void;
  onChangeNotes?: (value: string) => void;
  readOnly?: boolean;
}

export function WorkoutLogForm({
  actualDistanceKm,
  actualDurationMin,
  distanceError,
  durationError,
  notes,
  notesError,
  onChangeActualDistanceKm,
  onChangeActualDurationMin,
  onChangeNotes,
  readOnly
}: WorkoutLogFormProps) {
  return (
    <View style={{ gap: 16 }}>
      <Input
        editable={!readOnly}
        error={durationError}
        keyboardType="numeric"
        label="Actual time"
        onChangeText={onChangeActualDurationMin}
        placeholder="Minutes completed"
        value={actualDurationMin}
      />
      <Input
        editable={!readOnly}
        error={distanceError}
        keyboardType="numeric"
        label="Actual distance"
        onChangeText={onChangeActualDistanceKm}
        placeholder="Distance in km"
        value={actualDistanceKm}
      />
      <Input
        editable={!readOnly}
        error={notesError}
        label="Notes"
        multiline
        onChangeText={onChangeNotes}
        placeholder="How did it feel?"
        value={notes}
      />
    </View>
  );
}
