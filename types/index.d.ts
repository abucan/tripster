import { ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// Text Input Props
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
  value?: string;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  height?: number;
  isTextArea?: boolean;
  editable?: boolean;
  customStyle?: ViewStyle | ViewStyle[];
};

// Feature Item Component
export interface FeatureItemProps {
  title: string;
  icon: React.ReactElement;
}

// Onboarding Slide Props
export interface SlideProps {
  image: ImageSourcePropType;
  header: string;
  description: string;
}

// Destination & Date Selectors
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

// Places & Autocomplete
export type Place = {
  place_name: string;
  center: [number, number];
};

export interface PlacesAutocompleteProps {
  value: string;
  placeholder?: string;
  onSelect: (place: { name: string; coordinates: [number, number] }) => void;
}

// Categories & Tags
export interface CategoryTagSelectorProps {
  selectedCategories: string[];
  selectedTags: string[];
  onCategoriesChange: (categories: string[]) => void;
  onTagsChange: (tags: string[]) => void;
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

// Trip Data
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

export interface TripCardItemProps {
  id: string;
}

export interface TripCardListProps {
  trips: TripCardItemProps[];
  type: 'upcoming' | 'recommended';
  title: string;
  cta?: boolean;
  ctaText?: string;
}

// Screen Header Props
export interface ScreenHeaderProps {
  title: string;
  leftIcon: keyof typeof Ionicons.glyphMap;
  rightIcon: keyof typeof Ionicons.glyphMap;
  onMorePress?: () => void;
}

export interface ViewTitleProps {
  title: string;
  cta?: boolean;
  ctaText?: string;
}

// Default Modal Props
export interface DefaultModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onDonePress: () => void;
}

// Counter Props
export interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  error?: string;
}
