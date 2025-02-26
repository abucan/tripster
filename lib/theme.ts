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

export const colors = {
  light: {
    brand: '#02023d',
    primary: '#02023d',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#cccccc',
  },
  dark: {
    brand: '#02023d',
    primary: '#4a4a8c',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#2c2c2c',
  },
};

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
