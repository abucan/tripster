import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-trip/index"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
          animationDuration: 1,
        }}
      />
    </Stack>
  );
}
