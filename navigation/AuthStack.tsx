import React from 'react';
import { SafeAreaView } from 'react-native';

import SignInScreen from '@/screens/Auth/SignIn';
import SignUpScreen from '@/screens/Auth/SignUp';
import VerifyOtpScreen from '@/screens/Auth/VerifyOtp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
    {children}
  </SafeAreaView>
);

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn">
        {(_) => (
          <SafeAreaWrapper>
            <SignInScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(_) => (
          <SafeAreaWrapper>
            <SignUpScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="VerifyOtp">
        {(_) => (
          <SafeAreaWrapper>
            <VerifyOtpScreen />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
