import { TextInput, TextInputProps, View } from "react-native";

import { theme } from "@/core/theme";

import { Text } from "./Text";

interface InputProps extends TextInputProps {
  error?: string;
  label: string;
}

export function Input({ error, label, ...props }: InputProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text tone="muted" variant="label">
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.muted}
        style={{
          backgroundColor: theme.colors.surface,
          borderBottomColor: error ? theme.colors.danger : theme.colors.accent,
          borderBottomWidth: 1,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily.bodyRegular,
          fontSize: theme.typography.size.body,
          minHeight: 48,
          paddingHorizontal: 0,
          paddingVertical: 12
        }}
        {...props}
      />
      {error ? (
        <Text style={{ color: theme.colors.danger }} variant="caption">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
