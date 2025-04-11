// navigation/TripsStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripsScreen from '@/screens/Protected/Trips';
import TripDetailScreen from '@/screens/Protected/Trips/TripDetails';
import EditTripScreen from '@/screens/Protected/Trips/EditTrip';

export type TripsStackParamList = {
  TripsIndex: undefined;
  TripDetails: { id: string };
  TripEdit: { id: string };
};

const Stack = createNativeStackNavigator<TripsStackParamList>();

export default function TripsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TripsIndex" component={TripsScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailScreen} />
      <Stack.Screen
        name="TripEdit"
        component={EditTripScreen}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  );
}
