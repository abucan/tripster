import React, { PropsWithChildren, useEffect, useState } from 'react';

import { loadTheme, saveTheme, ThemeContext, ThemeType } from '@/lib/theme';

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    loadTheme().then(setTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};