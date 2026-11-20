import { colors, fontSize } from "@/constants/token";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsNavigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: "500",
        },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "rgba(255, 255, 255, 0.12)",
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderLeftColor: "rgba(255, 255, 255, 0.06)",
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: "rgba(255, 255, 255, 0.06)",
          elevation: 0,
          backgroundColor: "transparent",
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          height: 65 + insets.bottom,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            tint="dark"
            style={{
              ...StyleSheet.absoluteFill,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "rgba(15, 15, 15, 0.75)",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="heart"
              size={20}
              color={
                typeof color === "number"
                  ? colors.primary
                  : (color ?? colors.primary)
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-play"
              size={28}
              color={
                typeof color === "number"
                  ? colors.primary
                  : (color ?? colors.primary)
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(songs)"
        options={{
          title: "Songs",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="musical-notes-sharp"
              size={24}
              color={
                typeof color === "number"
                  ? colors.primary
                  : (color ?? colors.primary)
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: "Artists",
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="users-line"
              size={20}
              color={
                typeof color === "number"
                  ? colors.primary
                  : (color ?? colors.primary)
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsNavigation;
