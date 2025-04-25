import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

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

  const { categories, error } = useTripStore();

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  return (
    <>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              {
                backgroundColor: selectedCategories.includes(
                  category.id.toString()
                )
                  ? themeColors.primary
                  : '#F7F7F7',
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
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 'auto',
    gap: 4,
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
    backgroundColor: '#F7F7F7',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});
