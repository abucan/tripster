import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTripStore } from '@/lib/tripStore';
import { CategoryTagSelectorProps } from '@/types/index';
import { FontAwesome6 } from '@expo/vector-icons';

import { colors, useTheme } from '../lib/theme';

export function CategoryTagSelector({
  selectedCategories,
  onCategoriesChange,
}: CategoryTagSelectorProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withSpring(1);
    translateX.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const { categories, error } = useTripStore();

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  return (
    <View style={[styles.container]}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* <Text style={styles.sectionTitle}>Categories</Text> */}
      <ScrollView
        style={[animatedStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategories.includes(
                    category.id.toString(),
                  )
                    ? themeColors.primary
                    : themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
              onPress={() => handleCategoryToggle(category.id.toString())}
            >
              <FontAwesome6
                name={category.icon as any}
                size={16}
                color={
                  selectedCategories.includes(category.id.toString())
                    ? 'white'
                    : themeColors.text
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategories.includes(category.id.toString())
                      ? 'white'
                      : themeColors.text,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 12,
    // borderColor: '#6b7280',
    // gap: 6,
    flexGrow: 1,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});
