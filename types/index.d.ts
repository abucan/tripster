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

export type Category = {
  id: number;
  name: string;
  icon: string;
  created_at: string;
};

export type Tag = {
  id: string;
  name: string;
  created_at: string;
};

export interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  budget: number;
  persons: number;
  start_date: Date;
  end_date: Date;
  image_url: string;
  user_id: string;
}
