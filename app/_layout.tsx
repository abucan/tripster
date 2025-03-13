import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { loadTheme, saveTheme, ThemeContext, ThemeType } from '@/lib/theme';

import 'react-native-reanimated';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [theme, setTheme] = useState<ThemeType>('light');
  const { session, setSession, isLoading, setIsLoading } = useAuthStore();

  const [loaded] = useFonts({
    'Helvetica-Now-Display-Regular': require('@/assets/fonts/HelveticaNowDisplay-Regular.ttf'),
    'Helvetica-Now-Display-Medium': require('@/assets/fonts/HelveticaNowDisplay-Medium.ttf'),
    'Helvetica-Now-Display-Bold': require('@/assets/fonts/HelveticaNowDisplay-Bold.ttf'),
  });

  useEffect(() => {
    loadTheme().then(setTheme);
  }, []);

  useEffect(() => {
    if (loaded) {
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

      if (process.env.NODE_ENV === 'development') {
        console.log('DEV: Fonts and theme loaded.');
      }

      return () => subscription.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  useProtectedRoute(session, isLoading);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        }}
      >
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
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
        <SheetProvider context="global">
          <View
            style={[
              styles.container,
              { backgroundColor: theme === 'light' ? '#F7F7F7' : '#121212' },
            ]}
          >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Slot />
          </View>
        </SheetProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
