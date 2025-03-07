import dayjs from 'dayjs';
import { Minus, Plus } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import InputSpinner from 'react-native-input-spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { CategoryTagSelector } from '@/components/CategoryTagSelector';
import { MyInput } from '@/components/form/MyInput';
import { CreateTripModal } from '@/components/modals/CreateTripModal';
import { ScreenHeader } from '@/components/ScreenHeader';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { useTripForm } from '@/hooks/forms/useTripForm';
import { Ionicons } from '@expo/vector-icons';

export default function CreateTripScreen() {
  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  const {
    imageUri,
    destinationBottomSheetRef,
    rangeBottomSheetRef,
    control,
    errors,
    isLoading,
    showModal,
    handleSubmit,
    onSubmit,
    onErrors,
    handleSelectImage,
    handleDestinationChange,
    handleDateRangeChange,
    setShowModal,
  } = useTripForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            title="Create Trip"
            leftIcon="arrow-back"
            rightIcon="ellipsis-horizontal"
          />

          {/* trip image */}
          <View style={styles.imageWrapper}>
            <Image
              source={imageUri ? { uri: imageUri } : DEFAULT_IMAGE}
              resizeMode="cover"
              style={styles.image}
              fadeDuration={0}
            />
            <View style={styles.overlay} />
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={handleSelectImage}
              >
                <Ionicons name="camera-outline" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* trip details */}
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <MyInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter trip name"
                  label="Trip Name"
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <MyInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter trip description"
                  label="Trip Description"
                  error={errors.description?.message}
                  height={125}
                  isTextArea
                />
              )}
            />
            <Controller
              control={control}
              name="destination"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() => {
                    destinationBottomSheetRef.current?.expand();
                  }}
                >
                  <MyInput
                    onChangeText={onChange}
                    value={value}
                    placeholder="Select travel destination"
                    label="Travel Destination"
                    error={errors.destination?.message}
                    icon="chevron-down-outline"
                    editable={false}
                  />
                </TouchableOpacity>
              )}
            />
            <Controller
              control={control}
              name="range"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() => {
                    rangeBottomSheetRef.current?.expand();
                  }}
                >
                  <MyInput
                    onChangeText={onChange}
                    value={
                      value?.startDate && value?.endDate
                        ? `${dayjs(value.startDate).format(
                            'MMM DD, YYYY',
                          )} - ${dayjs(value.endDate).format('MMM DD, YYYY')}`
                        : ''
                    }
                    placeholder="Select travel dates"
                    label="Travel Dates"
                    error={
                      errors.range?.startDate?.message ||
                      errors.range?.endDate?.message
                    }
                    icon="chevron-down-outline"
                    editable={false}
                  />
                </TouchableOpacity>
              )}
            />

            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
              }}
            >
              <Controller
                control={control}
                name="budget"
                render={({ field: { onChange, value } }) => (
                  <CurrencyInput
                    value={value}
                    onChangeValue={onChange}
                    prefix="$ "
                    delimiter="."
                    separator=","
                    minValue={0}
                    precision={2}
                    returnKeyType="done"
                    renderTextInput={(textInputProps) => (
                      <MyInput
                        {...textInputProps}
                        placeholder="Enter your budget"
                        label="Budget"
                        customStyle={{ flex: 1 }}
                        error={errors.budget?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="persons"
                render={({ field: { onChange, value } }) => (
                  <InputSpinner
                    max={50}
                    min={1}
                    step={1}
                    colorMax={'#000'}
                    colorMin={'#000'}
                    skin="modern"
                    style={{
                      flex: 1,
                      shadowOffset: { width: 0, height: 0 },
                      shadowColor: 'transparent',
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                      borderWidth: StyleSheet.hairlineWidth,
                    }}
                    fontSize={18}
                    buttonLeftImage={<Minus size={24} color="#000" />}
                    buttonRightImage={<Plus size={24} color="#000" />}
                    buttonStyle={{
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                    }}
                    inputStyle={{
                      borderRadius: 10,
                      backgroundColor: 'transparent',
                    }}
                    value={value}
                    onChange={(num) => {
                      onChange(num);
                    }}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="categories"
              render={({ field: { onChange, value } }) => (
                <CategoryTagSelector
                  selectedCategories={value?.toString().split(',') || []}
                  onCategoriesChange={(categories) => {
                    onChange(categories);
                  }}
                  selectedTags={[]}
                  onTagsChange={() => {}}
                />
              )}
            />

            <Button
              title="Create Trip"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit(onSubmit, onErrors)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectDestinationSheet
        bottomSheetRef={destinationBottomSheetRef}
        onDestinationChange={handleDestinationChange}
        onClose={() => destinationBottomSheetRef.current?.close()}
      />

      <SelectDateRangeSheet
        bottomSheetRef={rangeBottomSheetRef}
        onDateRangeChange={handleDateRangeChange}
        onClose={() => rangeBottomSheetRef.current?.close()}
      />

      <CreateTripModal
        showModal={showModal}
        setShowModal={setShowModal}
        onDonePress={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageWrapper: {
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    transform: [{ scale: 1 }],
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 12,
    opacity: 0.8,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 16,
  },
});
