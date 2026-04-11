import { Link } from "expo-router";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

export default function SignInRoute() {
  return (
    <Screen subtitle="Phase 1 route scaffold" title="Hello world">
      <Card>
        <Text tone="muted" variant="body">
          Sign-in route is in place under the required src/app structure.
        </Text>
        <Link asChild href="./sign-up">
          <Button label="Go to sign up" variant="outline" />
        </Link>
      </Card>
    </Screen>
  );
}
