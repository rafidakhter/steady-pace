import { Text as RNText, TextProps } from "react-native";

import { theme } from "@/core/theme";

type Variant = "body" | "caption" | "headline" | "label" | "title";
type Tone = "default" | "muted";

interface AppTextProps extends TextProps {
  tone?: Tone;
  variant?: Variant;
}

const variantStyles: Record<Variant, TextProps["style"]> = {
  body: { fontFamily: theme.typography.fontFamily.bodyRegular, fontSize: theme.typography.size.body },
  caption: { fontFamily: theme.typography.fontFamily.bodyMedium, fontSize: theme.typography.size.caption },
  headline: { fontFamily: theme.typography.fontFamily.headingSemibold, fontSize: theme.typography.size.headline },
  label: {
    fontFamily: theme.typography.fontFamily.headingMedium,
    fontSize: theme.typography.size.label,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: { fontFamily: theme.typography.fontFamily.headingSemibold, fontSize: theme.typography.size.title }
};

export function Text({ style, tone = "default", variant = "body", ...props }: AppTextProps) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        {
          color: tone === "muted" ? theme.colors.muted : theme.colors.text
        },
        style
      ]}
      {...props}
    />
  );
}
