import { Tabs, useRouter } from "expo-router";

import { BottomNav } from "@/components/ui/BottomNav";
import { TabRoute } from "@/types/navigation";

const tabPaths: Record<TabRoute, "/home" | "/plan" | "/progress" | "/profile"> = {
  home: "/home",
  plan: "/plan",
  progress: "/progress",
  profile: "/profile"
};

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      tabBar={({ state }) => (
        <BottomNav
          activeTab={state.routeNames[state.index] as TabRoute}
          onSelect={(tab) => router.navigate(tabPaths[tab])}
        />
      )}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: "#FFFFFF"
        }
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="plan" options={{ title: "Plan" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
