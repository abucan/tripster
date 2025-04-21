import React from 'react';

import { useAuthStore } from '@/lib/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import ProtectedStack from './ProtectedStack';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { session, isLoading } = useAuthStore();

  if (isLoading) return null; // Or splash/loading

  // You can add onboarding check logic here too
  const isAuthenticated = !!session;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Protected" component={ProtectedStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
