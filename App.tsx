import React from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SheetProvider } from 'react-native-actions-sheet';

import { ThemeContext, loadTheme, saveTheme, ThemeType } from '@/lib/theme';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import RootNavigator from './navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [theme, setTheme] = React.useState<ThemeType>('light');
  const { session, setSession, isLoading, setIsLoading } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'Helvetica-Now-Display-Light': require('@/assets/fonts/HelveticaNowDisplay-Light.ttf'),
    'Helvetica-Now-Display-Regular': require('@/assets/fonts/HelveticaNowDisplay-Regular.ttf'),
    'Helvetica-Now-Display-Medium': require('@/assets/fonts/HelveticaNowDisplay-Medium.ttf'),
    'Helvetica-Now-Display-Bold': require('@/assets/fonts/HelveticaNowDisplay-Bold.ttf'),
  });

  React.useEffect(() => {
    loadTheme().then(setTheme);
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      setIsLoading(true);
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setIsLoading(false);
        SplashScreen.hideAsync();
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, [fontsLoaded]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  if (isLoading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#121212',
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
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <SheetProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </SheetProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
