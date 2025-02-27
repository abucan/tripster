import { useTheme } from '@/lib/theme';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme === 'light' ? '#F7F7F7' : '#121212' },
      ]}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="verify-otp" />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
