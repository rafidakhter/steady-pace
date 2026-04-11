import { Text as RNText, TextProps } from "react-native";

import { theme } from "@/core/theme";

type Variant = "body" | "caption" | "display" | "headline" | "label" | "title";
type Tone = "default" | "danger" | "muted" | "success";

interface AppTextProps extends TextProps {
  tone?: Tone;
  variant?: Variant;
}

const variantStyles: Record<Variant, TextProps["style"]> = {
  body: { fontFamily: theme.typography.fontFamily.bodyRegular, fontSize: theme.typography.size.body },
  caption: { fontFamily: theme.typography.fontFamily.bodyMedium, fontSize: theme.typography.size.caption },
  display: {
    fontFamily: theme.typography.fontFamily.headingSemibold,
    fontSize: theme.typography.size.display,
    letterSpacing: -1.5,
    lineHeight: 54
  },
  headline: { fontFamily: theme.typography.fontFamily.headingSemibold, fontSize: theme.typography.size.headline },
  label: {
    fontFamily: theme.typography.fontFamily.headingMedium,
    fontSize: theme.typography.size.label,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: { fontFamily: theme.typography.fontFamily.headingSemibold, fontSize: theme.typography.size.title }
};

const toneStyles: Record<Tone, { color: string }> = {
  danger: { color: theme.colors.danger },
  default: { color: theme.colors.text },
  muted: { color: theme.colors.muted },
  success: { color: theme.colors.success }
};

export function Text({ style, tone = "default", variant = "body", ...props }: AppTextProps) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        toneStyles[tone],
        style
      ]}
      {...props}
    />
  );
}
