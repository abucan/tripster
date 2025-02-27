import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadTheme, saveTheme, ThemeContext, ThemeType } from '@/lib/theme';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [theme, setTheme] = useState<ThemeType>('light');

  const [loaded] = useFonts({
    'Helvetica-Now-Display-Regular': require('@/assets/fonts/HelveticaNowDisplay-Regular.ttf'),
    'Helvetica-Now-Display-Medium': require('@/assets/fonts/HelveticaNowDisplay-Medium.ttf'),
    'Helvetica-Now-Display-Bold': require('@/assets/fonts/HelveticaNowDisplay-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      loadTheme().then((savedTheme) => setTheme(savedTheme));

      if (process.env.NODE_ENV === 'development') {
        console.log('DEV: Fonts and theme loaded.');
      }
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme === 'light' ? '#ffffff' : '#121212' },
          ]}
        >
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <SafeAreaView
            style={[
              styles.safeArea,
              { backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212' },
            ]}
          >
            <Slot />
          </SafeAreaView>
        </View>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
