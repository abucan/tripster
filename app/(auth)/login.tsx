import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Logo } from '@/components/logo/Logo';
import { SignUpButtons } from '@/components/SignUpButtons';
import { useAuthStore } from '@/lib/store';
import { colors, useTheme } from '@/lib/theme';
import { LoginFormData, loginSchema } from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginScreen() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const { signIn, isLoading } = useAuthStore();

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  watch('password');

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data.email, data.password);

    if (result.success) {
      // router.replace('/(protected)/(tabs)/home/index');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 80}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formWrapper}>
        <View style={styles.formContainer}>
          <Logo />
          <View style={styles.formTitleContainer}>
            <Text style={styles.formTitle}>Login to your account</Text>
            <Text style={styles.formDescription}>
              Please enter your details
            </Text>
          </View>

          <View style={{ gap: 20 }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  icon="mail"
                  placeholder="Email"
                  secureTextEntry={false}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  icon="lock-closed"
                  placeholder="Password"
                  secureTextEntry={true}
                  error={errors.password?.message}
                  textContentType="password"
                  autoComplete="password"
                />
              )}
            />
          </View>

          <View style={styles.methodsContainer}>
            <Button
              title="Login"
              onPress={handleSubmit(onSubmit)}
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Text style={styles.smallText}>Or using other method</Text>
            <SignUpButtons />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.smallText}>
            Don't have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/(auth)/register')}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  formContainer: {
    gap: 24,
  },
  formTitleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formTitle: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 26,
    textAlign: 'center',
  },

  formDescription: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  smallText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  linkText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 16,
    color: '#02023d',
    textDecorationLine: 'underline',
  },
  methodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  footerContainer: {},
});
