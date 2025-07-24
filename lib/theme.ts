import { createContext, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const saveTheme = async (theme: ThemeType) => {
  try {
    await AsyncStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const loadTheme = async (): Promise<ThemeType> => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'light';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'light';
  }
};
