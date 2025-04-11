import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { Button } from '@/components/Button';
import { TripForm } from '@/components/form/TripForm';
import { ScreenHeader } from '@/components/ScreenHeader';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TripsStackParamList } from '@/navigation/TripsStack';

export default function EditTripScreen() {
  const route = useRoute<RouteProp<TripsStackParamList, 'TripDetails'>>();
  const { id } = route.params;

  const {
    control,
    imageUri,
    destinationBottomSheetRef,
    rangeBottomSheetRef,
    showModal,
    isLoading,
    isSubmitting,
    errors,
    onSubmit,
    onErrors,
    handleSubmit,
    handleSelectImage,
    handleDestinationChange,
    handleDateRangeChange,
    setShowModal,
    reset,
  } = useTripForm({ tripId: id });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScreenHeader
          title="Edit Trip"
          leftIcon="close"
          rightIcon="ellipsis-horizontal"
        />
        <TripForm
          control={control}
          imageUri={imageUri}
          destinationBottomSheetRef={destinationBottomSheetRef}
          rangeBottomSheetRef={rangeBottomSheetRef}
          errors={errors}
          handleSelectImage={handleSelectImage}
        />
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            backgroundColor: '#F7F7F7',
          }}
        >
          <Button
            title={isSubmitting ? 'Editing Trip...' : 'Edit Trip'}
            size="lg"
            isLoading={isLoading || isSubmitting}
            disabled={isLoading || isSubmitting}
            onPress={handleSubmit(onSubmit, onErrors)}
          />
        </View>
      </KeyboardAvoidingView>

      <SelectDestinationSheet
        bottomSheetRef={destinationBottomSheetRef}
        onDestinationChange={handleDestinationChange}
        onClose={() => destinationBottomSheetRef.current?.hide()}
      />

      <SelectDateRangeSheet
        bottomSheetRef={rangeBottomSheetRef}
        onDateRangeChange={handleDateRangeChange}
        onClose={() => rangeBottomSheetRef.current?.close()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
