import React, { useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { colors, useTheme } from '../lib/theme';

import { Button } from './Button';
import { SignUpButtons } from './SignUpButtons';

interface ChooseAuthSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
}

export function ChooseAuthSheet({
  bottomSheetRef,
  onClose,
}: ChooseAuthSheetProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const snapPoints = useMemo(() => ['25%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: themeColors.card,
      }}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="Create Account"
              variant="default"
              size="lg"
              onPress={() => router.push('/(auth)/register')}
            />
            <SignUpButtons />
          </View>
          <View style={styles.altTextContainer}>
            <Text style={styles.altText}>
              Already have an account?{' '}
              <Text style={styles.signText}>Sign In</Text>
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  altTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    color: '#6b7280',
  },
  signText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 16,
    color: '#1e3a8a',
    textDecorationLine: 'underline',
  },
});
