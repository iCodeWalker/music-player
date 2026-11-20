import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";

const SongsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: "Songs",
        }}
      />
    </Stack>
  );
};

export default SongsScreenLayout;
