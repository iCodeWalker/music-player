import { NativeStackNavigationOptions } from "expo-router";
import { colors } from "./token";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
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
};
