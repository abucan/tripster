import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { CategoryTagSelector } from '@/components/CategoryTagSelector';
import { Button } from '@/components/Button';

interface Props {
  control: any;
  onNext: () => void;
}

export const CategoriesStep: React.FC<Props> = ({ control, onNext }) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        name="categories"
        render={({ field: { value, onChange } }) => (
          <CategoryTagSelector
            selectedCategories={value}
            onCategoriesChange={onChange}
            selectedTags={[]}
            onTagsChange={() => {}}
          />
        )}
      />
      <Button title="Continue" size="lg" onPress={onNext} />
    </View>
  );
};
