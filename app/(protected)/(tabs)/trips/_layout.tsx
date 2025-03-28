import { Stack } from 'expo-router';

export default function TripsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
      <Stack.Screen
        name="edit/[id]"
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}
