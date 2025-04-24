import React from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/Button';
import { MyInput } from '@/components/form/MyInput';

interface Props {
  control: any;
  errors: any;
  onNext: () => void;
  destinationBottomSheetRef: React.RefObject<any>;
}

export const DestinationStep: React.FC<Props> = ({
  control,
  errors,
  onNext,
  destinationBottomSheetRef,
}) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        name="destination"
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            onPress={() => destinationBottomSheetRef.current?.show()}
          >
            <MyInput
              label="Destination"
              placeholder="Select travel destination"
              value={value}
              onChangeText={onChange}
              editable={false}
              icon="chevron-down-outline"
              error={errors?.destination?.message}
            />
          </TouchableOpacity>
        )}
      />
      <Button title="Continue" size="lg" onPress={onNext} />
    </View>
  );
};
