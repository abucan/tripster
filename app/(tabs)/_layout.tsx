import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create-trip/index"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
