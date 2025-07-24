import React from 'react';

import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuthStore } from '@/lib/store';
import SignInScreen from '@/screens/Auth/SignIn';
import SignUpScreen from '@/screens/Auth/SignUp';
import VerifyOtpScreen from '@/screens/Auth/VerifyOtp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { isAwaitingVerification } = useAuthStore();
  return (
    <Stack.Navigator
      initialRouteName={isAwaitingVerification ? 'VerifyOtp' : 'SignIn'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn">
        {() => (
          <SafeAreaWrapper>
            <SignInScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {() => (
          <SafeAreaWrapper>
            <SignUpScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="VerifyOtp">
        {() => (
          <SafeAreaWrapper>
            <VerifyOtpScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
