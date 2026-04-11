import { View } from "react-native";

import { Input } from "./ui/Input";

interface WorkoutLogFormProps {
  actualDistanceKm?: string;
  actualDurationMin?: string;
  notes?: string;
}

export function WorkoutLogForm({ actualDistanceKm, actualDurationMin, notes }: WorkoutLogFormProps) {
  return (
    <View style={{ gap: 16 }}>
      <Input editable={false} label="Actual time" value={actualDurationMin ?? ""} />
      <Input editable={false} label="Actual distance" value={actualDistanceKm ?? ""} />
      <Input editable={false} label="Notes" multiline value={notes ?? ""} />
    </View>
  );
}
