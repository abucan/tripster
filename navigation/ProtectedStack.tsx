// navigation/ProtectedStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import CreateTripScreen from '@/screens/Protected/CreateTrip';

const Stack = createNativeStackNavigator();

export default function ProtectedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* This replicates your (tabs) group */}
      <Stack.Screen name="Tabs" component={TabsNavigator} />

      {/* This replicates your create-trip screen with custom options */}
      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          // React Navigation doesn't support 'flip' out of the box.
          // You might need to use custom animations or use react-navigation-shared-element.
          animation: 'flip', // if supported, or adjust as needed
          animationDuration: 1, // duration in seconds if supported
        }}
      />
    </Stack.Navigator>
  );
}
