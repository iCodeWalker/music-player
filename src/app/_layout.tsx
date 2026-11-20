import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;
