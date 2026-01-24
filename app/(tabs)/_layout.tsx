import React from "react";
import { Tabs } from "expo-router";

import { Colors } from "@/constants/theme";
import { TabIcon } from "@/components";
import { colorPalette } from "@/styles";
import { useColorScheme } from "@/hooks";
import { homeIcon, dashboardIcon, chatsIcon, profileIcon } from "@/assets";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: colorPalette.primaryBg.primaryWhite,
          borderTopWidth: 1,
          borderTopColor: colorPalette.primaryBg.primaryGrey,
          elevation: 1,
          shadowOpacity: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <TabIcon source={homeIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <TabIcon source={dashboardIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => <TabIcon source={chatsIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <TabIcon source={profileIcon} color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
