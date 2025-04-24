import { View } from 'react-native';
import { Button } from '../Button';
import { MyInput } from '../form/MyInput';
import { Controller } from 'react-hook-form';

interface TripDetailsStepProps {
  control: any;
  errors: any;
  onNext: () => void;
}

export const TripDetailsStep = ({
  control,
  errors,
  onNext,
}: TripDetailsStepProps) => (
  <View style={{ gap: 16 }}>
    <Controller
      control={control}
      name="title"
      render={({ field: { onChange, value } }) => (
        <MyInput
          label="Trip Name"
          placeholder="Enter trip name"
          value={value}
          onChangeText={onChange}
          error={errors?.title?.message}
        />
      )}
    />

    <Controller
      control={control}
      name="description"
      render={({ field: { onChange, value } }) => (
        <MyInput
          label="Trip Description"
          placeholder="Enter trip description"
          value={value}
          onChangeText={onChange}
          isTextArea
          height={125}
          error={errors?.description?.message}
        />
      )}
    />

    <Button title="Continue" size="lg" onPress={onNext} />
  </View>
);
