import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

export default function ProfileRoute() {
  return (
    <Screen subtitle="Profile" title="Your account">
      <Card>
        <View style={{ gap: 8 }}>
          <Text variant="title">Profile placeholder</Text>
          <Text tone="muted" variant="body">
            Account details, settings, and challenge management will land here after the main flow is connected.
          </Text>
        </View>
      </Card>

      <Card>
        <View style={{ gap: 8 }}>
          <Text variant="label">Next up</Text>
          <Text tone="muted" variant="body">
            Sign-out, challenge reset, and preferences will be wired in the next phase.
          </Text>
          <Button disabled label="Actions connect in Phase 6" variant="outline" />
        </View>
      </Card>
    </Screen>
  );
}
