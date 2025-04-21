import React from 'react';

import CreateTripScreen from '@/screens/Protected/CreateTrip';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator();

export default function ProtectedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{
          gestureEnabled: false,
          animation: 'flip',
          animationDuration: 1,
        }}
      />
    </Stack.Navigator>
  );
}
