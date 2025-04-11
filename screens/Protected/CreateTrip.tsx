import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { TripForm } from '@/components/form/TripForm';
import { CreateTripModal } from '@/components/modals/CreateTripModal';
import { ScreenHeader } from '@/components/ScreenHeader';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { StatusBar } from 'expo-status-bar';
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScreenHeader
          title="Create Trip"
          leftIcon="arrow-back"
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
