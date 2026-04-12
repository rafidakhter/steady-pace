import { Link, LinkProps } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/core/theme";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

interface AuthScreenShellProps extends PropsWithChildren {
  ctaLabel: string;
  ctaLoading?: boolean;
  ctaOnPress?: () => void;
  mode: "signIn" | "signUp";
  showGoogleButton?: boolean;
  title?: string;
}

export function AuthScreenShell({
  children,
  ctaLabel,
  ctaLoading,
  ctaOnPress,
  mode,
  showGoogleButton = true,
  title = "Steady Pace"
}: AuthScreenShellProps) {
  const isSignIn = mode === "signIn";

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg }}>
          <View style={{ maxWidth: 420, width: "100%" }}>
            <Text variant="label">Back</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl }}>
          <View style={{ alignSelf: "center", maxWidth: 420, width: "100%" }}>
            <View style={{ alignItems: "center", gap: 8, marginBottom: 32 }}>
              <Text style={{ letterSpacing: 1.2, textTransform: "uppercase" }} variant="title">
                {title}
              </Text>
              <Text style={{ letterSpacing: 2.2, textTransform: "uppercase" }} tone="muted" variant="caption">
                Entry point and authentication
              </Text>
            </View>

            <View style={{ borderBottomColor: theme.colors.accent, borderBottomWidth: 1, flexDirection: "row", marginBottom: 40 }}>
              <AuthTab active={isSignIn} href="./sign-in" label="Sign In" />
              <AuthTab active={!isSignIn} href="./sign-up" label="Create Account" />
            </View>

            <View style={{ gap: 24 }}>
              {children}

              <Button label={ctaLabel} loading={ctaLoading} onPress={ctaOnPress} />

              {showGoogleButton ? (
                <>
                  <View style={{ alignItems: "center", flexDirection: "row", gap: 12 }}>
                    <View style={{ backgroundColor: theme.colors.accent, flex: 1, height: 1 }} />
                    <Text tone="muted" variant="label">
                      Or
                    </Text>
                    <View style={{ backgroundColor: theme.colors.accent, flex: 1, height: 1 }} />
                  </View>

                  <Pressable
                    onPress={() => {}}
                    style={{
                      alignItems: "center",
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.accent,
                      borderWidth: 1,
                      flexDirection: "row",
                      gap: 12,
                      justifyContent: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 14
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        height: 20,
                        justifyContent: "center",
                        width: 20
                      }}
                    >
                      <Text variant="label">G</Text>
                    </View>
                    <Text variant="label">Continue with Google</Text>
                  </Pressable>
                </>
              ) : null}
            </View>

            <View style={{ alignItems: "center", gap: 8, marginTop: 40 }}>
              <Text style={{ lineHeight: 18, textAlign: "center", textTransform: "uppercase" }} tone="muted" variant="caption">
                By continuing, you agree to Steady Pace&apos;s{"\n"}Terms of Service and Privacy Policy
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", paddingBottom: theme.spacing.lg }}>
          <View style={{ backgroundColor: theme.colors.accent, height: 4, width: 48 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function AuthTab({ active, href, label }: { active: boolean; href: LinkProps["href"]; label: string }) {
  return (
    <Link asChild href={href}>
      <Pressable
        style={{
          borderBottomColor: active ? theme.colors.primary : "transparent",
          borderBottomWidth: 2,
          flex: 1,
          paddingBottom: 12,
          paddingTop: 12
        }}
      >
        <Text
          style={{ letterSpacing: 2, textAlign: "center", textTransform: "uppercase" }}
          tone={active ? "default" : "muted"}
          variant="caption"
        >
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}
