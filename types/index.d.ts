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

export interface SlideProps {
  image: ImageSourcePropType;
  header: string;
  description: string;
}

export interface SelectDestinationSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onDestinationChange: (destination: string) => void;
  onClose: () => void;
}

export interface SelectDateRangeSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onDateRangeChange: (dateRange: {
    startDate: string;
    endDate: string;
  }) => void;
  onClose: () => void;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  created_at: string;
};

export type TripCategory = {
  trip_id: string;
  category_id: string;
};

export type Tag = {
  id: string;
  name: string;
  created_at: string;
};

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  description: string;
  destination: string;
  start_date: Date;
  end_date: Date;
  budget: number;
  persons: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface Place {
  place_name: string;
  center: [number, number];
}

export interface PlacesAutocompleteProps {
  value: string;
  onSelect: (place: { name: string; coordinates: [number, number] }) => void;
  placeholder?: string;
}
