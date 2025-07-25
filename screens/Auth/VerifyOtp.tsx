import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OtpInput } from 'react-native-otp-entry';

import { Button } from '@/components/Button';
import { Logo } from '@/components/logo/Logo';
import { colors } from '@/constants/theme';
import { useAuthStore } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import {
  VerifyOtpFormData,
  verifyOTPSchema,
} from '@/utils/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export default function VerifyOtpScreen() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { verifyOTP, resendOTP, userEmail, isLoading, error } = useAuthStore();

  // form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOTPSchema),
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    const result = await verifyOTP(data.otp);

    if (result.success) {
      //  router.replace('/(auth)/login');
      // TODO
    } else {
      setError('otp', {
        type: 'manual',
        message: result?.error || 'Invalid OTP',
      });
    }
  };

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResend = async () => {
    if (!canResend) return;

    const result = await resendOTP();

    if (result.success) {
      setTimer(60);
      setCanResend(false);
    } else {
      setError('otp', {
        type: 'manual',
        message: result?.error || 'Failed to resend OTP',
      });
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
            <Text style={styles.formTitle}>OTP Verification</Text>
            <Text style={styles.formDescription}>
              Please enter the 6-digit code sent to your email
            </Text>
            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange } }) => (
                <OtpInput
                  type="numeric"
                  numberOfDigits={6}
                  onTextChange={onChange}
                  theme={{
                    pinCodeContainerStyle: {
                      width: 52,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderRadius: 0,
                      borderColor: themeColors.textSecondary,
                      opacity: 0.8,
                    },
                    containerStyle: {
                      paddingHorizontal: 8,
                    },
                    pinCodeTextStyle: {
                      color: themeColors.text,
                    },
                  }}
                />
              )}
            />
            {errors.otp && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.methodsContainer}>
            <Button
              title="Verify"
              onPress={handleSubmit(onSubmit)}
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button
              title={canResend ? 'Resend Code' : `Resend Code (${timer}s)`}
              onPress={handleResend}
              size="lg"
              variant="link"
              disabled={isLoading || !canResend || !userEmail}
              //       style={{
              //   opacity: canResend ? 1 : 0.5,
              //     }}
            />
          </View>
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
  methodsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  errorText: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
});
