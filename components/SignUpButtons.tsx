import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import AppleIcon from '@/assets/icons/apple.svg';
import GoogleIcon from '@/assets/icons/google.svg';

import { Button } from './Button';

export const SignUpButtons = ({
  isAuthPage = false,
}: {
  isAuthPage?: boolean;
}) => {
  const handleGoogleSignUp = () => {
    // TODO: implement Google sign-up logic here
    console.log('Google sign-up pressed');
  };

  const handleAppleSignUp = () => {
    // TODO: implement Apple sign-up logic here
    console.log('Apple sign-up pressed');
  };

  return (
    <View style={styles.wrapper}>
      <Button
        title={!isAuthPage ? 'Google' : 'Continue with Google'}
        variant="outline"
        style={{ flex: 1 }}
        size="lg"
        onPress={handleGoogleSignUp}
        leftIcon={<GoogleIcon width={24} height={24} />}
      />
      {Platform.OS === 'ios' && (
        <Button
          title={!isAuthPage ? 'Apple' : 'Continue with Apple'}
          variant="outline"
          style={{ flex: 1 }}
          size="lg"
          onPress={handleAppleSignUp}
          leftIcon={<AppleIcon width={24} height={24} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 12,
  },
});
