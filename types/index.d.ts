import { ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export type TextInputProps = {
  onChangeText?: (text: string) => void;
  value?: string;
  label?: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  textContentType?: 'emailAddress' | 'password';
  autoComplete?: 'email' | 'password';
};

export type MyInputProps = {
  onChangeText?: (text: string) => void;
  isTextArea?: boolean;
  height?: number;
  value?: string;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  editable?: boolean;
  customStyle?: ViewStyle | ViewStyle[];
};

export type FeatureItemProps = {
  icon: React.ReactElement;
  title: string;
};
