import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import CreateTripScreen from '@/screens/Protected/CreateTrip';

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
