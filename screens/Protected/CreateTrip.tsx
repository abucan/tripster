// new imports
import { useState } from 'react';
import dayjs from 'dayjs';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BudgetPersonsStep } from '@/components/create-trip-form/BudgetPersonsStep';
import { CategoriesStep } from '@/components/create-trip-form/CategoriesStep';
import { DatesStep } from '@/components/create-trip-form/DatesStep';
import { DestinationStep } from '@/components/create-trip-form/DestinationStep';
import { TripDetailsStep } from '@/components/create-trip-form/TripDetailsStep';
import { CreateTripModal } from '@/components/modals/CreateTripModal';
import { ScreenHeader } from '@/components/ScreenHeader';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { StepperForm } from '@/components/StepperForm';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
    watch,
  } = useTripForm({});

  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState(1);

  const navigation = useNavigation();

  return (
    <ScrollView
      style={[
        styles.safeArea,
        {
          top: insets.top,
          bottom: insets.bottom,
        },
      ]}
      contentContainerStyle={{
        flexGrow: 1,
        gap: 16,
      }}
    >
      <ScreenHeader
        title="New Trip"
        leftIcon="close"
        onBackPress={() => navigation.goBack()}
      />
      <StepperForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={[
          {
            key: 'tripDetails',
            content: (
              <TripDetailsStep
                control={control}
                errors={errors}
                onNext={() => setStep(2)}
              />
            ),
            summary: (
              <View style={{ gap: 4 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons name="note-add" size={24} color="black" />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {watch('title') || 'Untitled Trip'}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#555', marginLeft: 28 }}>
                  {watch('description') || 'No description provided.'}
                </Text>
              </View>
            ),
          },
          {
            key: 'destination',
            content: (
              <DestinationStep
                control={control}
                errors={errors}
                destinationBottomSheetRef={destinationBottomSheetRef}
                onNext={() => setStep(3)}
              />
            ),
            summary: (
              <View style={{ gap: 8 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons name="location-on" size={24} color="black" />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {watch('destination') || 'No destination selected'}
                  </Text>
                </View>
              </View>
            ),
          },
          {
            key: 'dates',
            content: (
              <DatesStep
                control={control}
                errors={errors}
                rangeBottomSheetRef={rangeBottomSheetRef}
                onNext={() => setStep(4)}
              />
            ),
            summary: (
              <View style={{ gap: 8 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons
                    name="calendar-month"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {watch('range.startDate') && watch('range.endDate')
                      ? `${dayjs(watch('range.startDate')).format(
                          'MMM DD'
                        )} - ${dayjs(watch('range.endDate')).format(
                          'MMM DD, YYYY'
                        )}`
                      : 'No travel dates selected'}
                  </Text>
                </View>
              </View>
            ),
          },
          {
            key: 'budgetPersons',
            content: (
              <BudgetPersonsStep
                control={control}
                errors={errors}
                onNext={() => setStep(5)}
              />
            ),
            summary: (
              <View style={{ flexDirection: 'row', gap: 24 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons name="attach-money" size={24} color="black" />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {watch('budget')
                      ? `$${watch('budget')?.toFixed(2)}`
                      : 'No budget set'}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons name="person" size={24} color="black" />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {`${watch('persons') || 1} ${
                      (watch('persons') || 1) === 1 ? 'traveler' : 'travelers'
                    }`}
                  </Text>
                </View>
              </View>
            ),
          },
          {
            key: 'categories',
            onNext: () => handleSubmit(onSubmit, onErrors)(),
            content: <CategoriesStep control={control} />,
            summary: (
              <View style={{ gap: 8 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialIcons name="category" size={24} color="black" />
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    Categories
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#555', marginLeft: 28 }}>
                  {(watch('categories') || []).join(', ') ||
                    'No categories selected'}
                </Text>
              </View>
            ),
          },
        ]}
      />

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
            // router.push('/(protected)/(tabs)/trips');
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
