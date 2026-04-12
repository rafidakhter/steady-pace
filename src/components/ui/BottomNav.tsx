import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/core/theme";
import { TabRoute } from "@/types/navigation";

import { Text } from "./Text";

interface BottomNavItem {
  icon: keyof typeof MaterialIcons.glyphMap;
  key: TabRoute;
  label: string;
}

interface BottomNavProps {
  activeTab: TabRoute;
  items?: BottomNavItem[];
  onSelect?: (tab: TabRoute) => void;
}

const defaultItems: BottomNavItem[] = [
  { icon: "home-filled", key: "home", label: "HOME" },
  { icon: "calendar-today", key: "plan", label: "PLAN" },
  { icon: "bar-chart", key: "progress", label: "PROGRESS" },
  { icon: "person-outline", key: "profile", label: "PROFILE" }
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
              flex: 1,
              gap: 2,
              justifyContent: "center",
              minHeight: 54
            }}
          >
            <MaterialIcons color={isActive ? theme.colors.text : theme.colors.muted} name={item.icon} size={22} />
            <Text
              style={{
                borderBottomColor: isActive ? theme.colors.text : "transparent",
                borderBottomWidth: isActive ? 2 : 0,
                fontFamily: isActive ? theme.typography.fontFamily.headingSemibold : theme.typography.fontFamily.headingMedium,
                letterSpacing: 0.2,
                paddingBottom: isActive ? 2 : 0
              }}
              tone={isActive ? "default" : "muted"}
              variant="caption"
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
