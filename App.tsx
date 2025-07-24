import React from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthStore } from '@/lib/store';
import { RootProvider } from '@/providers/RootProvider';

import RootNavigator from './navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isLoading } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'Helvetica-Now-Display-Light': require('@/assets/fonts/HelveticaNowDisplay-Light.ttf'),
    'Helvetica-Now-Display-Regular': require('@/assets/fonts/HelveticaNowDisplay-Regular.ttf'),
    'Helvetica-Now-Display-Medium': require('@/assets/fonts/HelveticaNowDisplay-Medium.ttf'),
    'Helvetica-Now-Display-Bold': require('@/assets/fonts/HelveticaNowDisplay-Bold.ttf'),
  });

  if (isLoading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#02023d" />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootProvider>
        <SheetProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </SheetProvider>
      </RootProvider>
    </GestureHandlerRootView>
  );
}
