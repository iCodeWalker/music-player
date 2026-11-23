import { NativeStackNavigationOptions } from "expo-router";
import { Platform } from "react-native";
import { colors } from "./token";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    color: colors.text,
  },
  headerTitleStyle: {
    color: colors.text,
  },
  headerTintColor: colors.text,
  headerTransparent: false,
  headerShadowVisible: false,
  ...(Platform.OS === "ios" && { headerLargeTitle: true }),
};
