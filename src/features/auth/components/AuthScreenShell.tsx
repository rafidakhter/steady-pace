import { Link, LinkProps } from "expo-router";
import { PropsWithChildren } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

interface AuthScreenShellProps extends PropsWithChildren {
  alternateCtaHref: LinkProps["href"];
  alternateCtaLabel: string;
  eyebrow: string;
  footer?: React.ReactNode;
  title: string;
}

export function AuthScreenShell({
  alternateCtaHref,
  alternateCtaLabel,
  children,
  eyebrow,
  footer,
  title
}: AuthScreenShellProps) {
  return (
    <Screen
      footer={footer}
      scrollable={false}
      subtitle={eyebrow}
      title={title}
    >
      <View style={{ flex: 1, gap: 24, justifyContent: "space-between" }}>
        <View style={{ gap: 12 }}>
          <Text tone="muted" variant="body">
            Calm structure, one clear next step, and a training path you can actually follow.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          {children}

          <View style={{ gap: 8 }}>
            <Text tone="muted" variant="caption">
              You can switch flows at any time.
            </Text>
            <LinkButton href={alternateCtaHref} label={alternateCtaLabel} />
          </View>
        </View>
      </View>
    </Screen>
  );
}

function LinkButton({ href, label }: { href: LinkProps["href"]; label: string }) {
  return (
    <Link asChild href={href}>
      <Button label={label} variant="ghost" />
    </Link>
  );
}
