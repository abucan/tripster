import React from 'react';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/Button';
import { MyInput } from '@/components/form/MyInput';

interface Props {
  control: any;
  errors: any;
  onNext: () => void;
  rangeBottomSheetRef: React.RefObject<any>;
}

export const DatesStep: React.FC<Props> = ({
  control,
  errors,
  onNext,
  rangeBottomSheetRef,
}) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        name="range"
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            onPress={() => rangeBottomSheetRef.current?.expand()}
          >
            <MyInput
              label="Travel Dates"
              placeholder="Select travel dates"
              value={
                value?.startDate && value?.endDate
                  ? `${dayjs(value.startDate).format('MMM DD, YYYY')} - ${dayjs(
                      value.endDate,
                    ).format('MMM DD, YYYY')}`
                  : ''
              }
              onChangeText={onChange}
              editable={false}
              icon="chevron-down-outline"
              error={
                errors?.range?.startDate?.message ||
                errors?.range?.endDate?.message
              }
            />
          </TouchableOpacity>
        )}
      />
      <Button title="Continue" size="lg" onPress={onNext} />
    </View>
  );
};
