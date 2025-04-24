import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { MyInput } from '@/components/form/MyInput';
import { Button } from '@/components/Button';
import { Counter } from '@/components/Counter';

interface Props {
  control: any;
  errors: any;
  onNext: () => void;
}

export const BudgetPersonsStep: React.FC<Props> = ({
  control,
  errors,
  onNext,
}) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Controller
          control={control}
          name="budget"
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              prefix="$ "
              delimiter="."
              separator=","
              minValue={0}
              precision={2}
              renderTextInput={(props) => (
                <MyInput
                  {...props}
                  label="Budget"
                  customStyle={{ flex: 1 }}
                  error={errors?.budget?.message}
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="persons"
          render={({ field: { value, onChange } }) => (
            <Counter
              initialValue={value}
              min={1}
              max={50}
              onChange={onChange}
              error={errors?.persons?.message}
            />
          )}
        />
      </View>

      <Button title="Continue" size="lg" onPress={onNext} />
    </View>
  );
};
