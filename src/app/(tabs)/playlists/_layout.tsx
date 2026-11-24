import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/token";
import { Stack } from "expo-router";

const PlaylistsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: "Playlists",
        }}
      />
      <Stack.Screen
        name="[name]"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: "",
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
        }}
      />
    </Stack>
  );
};

export default PlaylistsScreenLayout;
