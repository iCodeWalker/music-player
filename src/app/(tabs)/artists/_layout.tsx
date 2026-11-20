import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";

const ArtistsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: "Artists",
        }}
      />
    </Stack>
  );
};

export default ArtistsScreenLayout;
