import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";

const FavoritesScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: "Favorites",
        }}
      />
    </Stack>
  );
};

export default FavoritesScreenLayout;
