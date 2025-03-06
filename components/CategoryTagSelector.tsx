import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Category, CategoryTagSelectorProps } from '@/types/index';
import { FontAwesome6 } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';
import { colors, useTheme } from '../lib/theme';

export function CategoryTagSelector({
  selectedCategories,
  onCategoriesChange,
}: CategoryTagSelectorProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  // states
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  // TODO: Use zustand to store categories and tags
  async function loadCategoriesAndTags() {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              {
                backgroundColor: selectedCategories.includes(
                  category.id.toString()
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
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderColor: '#6b7280',
    gap: 6,
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
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});
