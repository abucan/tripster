import React, { PropsWithChildren } from 'react';

import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';

export const RootProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};