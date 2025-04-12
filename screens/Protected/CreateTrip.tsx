import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Button } from '@/components/Button';
import { TripForm } from '@/components/form/TripForm';
import { CreateTripModal } from '@/components/modals/CreateTripModal';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/ScreenHeader';

// TODO
export default function CreateTripScreen() {
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
  } = useTripForm({});

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        styles.safeArea,
        {
          top: insets.top,
          bottom: insets.bottom,
        },
      ]}
    >
      <ScreenHeader
        title="Create Trip"
        leftIcon="arrow-back"
        rightIcon="ellipsis-horizontal"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingTop: insets.top / 4 }}
      >
        <TripForm
          control={control}
          imageUri={imageUri}
          destinationBottomSheetRef={destinationBottomSheetRef}
          rangeBottomSheetRef={rangeBottomSheetRef}
          errors={errors}
          handleSelectImage={handleSelectImage}
        />

        <View style={{ marginHorizontal: 20 }}>
          <Button
            title={isSubmitting ? 'Creating Trip...' : 'Create Trip'}
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

      <CreateTripModal
        showModal={showModal}
        setShowModal={setShowModal}
        onDonePress={() => {
          setShowModal(false);
          reset();
          // add a delay to the navigation
          setTimeout(() => {
            //  router.push('/(protected)/(tabs)/trips');
            // TODO: use navigation
          }, 500);
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
