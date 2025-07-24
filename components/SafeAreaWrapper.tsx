import React from 'react';
import { SafeAreaView } from 'react-native';

import { colors } from '@/constants/theme';
import { useTheme } from '@/lib/theme';

export const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      {children}
    </SafeAreaView>
  );
};