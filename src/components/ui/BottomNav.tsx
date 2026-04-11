import { Pressable, View } from "react-native";

import { theme } from "@/core/theme";
import { TabRoute } from "@/types/navigation";

import { Text } from "./Text";

interface BottomNavItem {
  key: TabRoute;
  label: string;
}

interface BottomNavProps {
  activeTab: TabRoute;
  items?: BottomNavItem[];
  onSelect?: (tab: TabRoute) => void;
}

const defaultItems: BottomNavItem[] = [
  { key: "home", label: "Home" },
  { key: "plan", label: "Plan" },
  { key: "progress", label: "Progress" },
  { key: "profile", label: "Profile" }
];

export function BottomNav({ activeTab, items = defaultItems, onSelect }: BottomNavProps) {
  return (
    <View
      style={{
        borderTopColor: theme.colors.accent,
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 12
      }}
    >
      {items.map((item) => {
        const isActive = item.key === activeTab;

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect?.(item.key)}
            style={{
              alignItems: "center",
              borderTopColor: isActive ? theme.colors.text : "transparent",
              borderTopWidth: 2,
              flex: 1,
              gap: 4,
              paddingTop: 8
            }}
          >
            <Text tone={isActive ? "default" : "muted"} variant="label">
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
