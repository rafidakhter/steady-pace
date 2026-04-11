import { Link } from "expo-router";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

export default function SignUpRoute() {
  return (
    <Screen subtitle="Auth scaffold" title="Create account">
      <Card>
        <Text tone="muted" variant="body">
          Sign-up route exists and is ready for the real form in the screen phase.
        </Text>
        <Link asChild href="./sign-in">
          <Button label="Back to sign in" variant="outline" />
        </Link>
      </Card>
    </Screen>
  );
}
