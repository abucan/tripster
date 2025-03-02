import { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema, TripFormData } from '@/utils/schemas/trips.schemas';
import { MyInput } from '@/components/form/MyInput';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';

export default function CreateTripScreen() {
  const [imageUri, setImageUri] = useState<string>('');
  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  // refs
  const destinationBottomSheetRef = useRef<BottomSheet>(null);
  const rangeBottomSheetRef = useRef<BottomSheet>(null);

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: 'Vacation with family',
      description:
        'We are going to Split, Croatia to enjoy the sun and the sea',
      destination: 'Split, Split-Dalmatia, Croatia',
    },
  });

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleDestinationChange = (destination: string) => {
    setValue('destination', destination);
    destinationBottomSheetRef.current?.close();
  };

  const handleDateRangeChange = (dateRange: {
    startDate: string;
    endDate: string;
  }) => {
    setValue('range', {
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate),
    });
    rangeBottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Create Trip</Text>

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
      {/* trip name, description, travel destination, trip dates, budget, persons */}
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
                value={`${value?.startDate} - ${value?.endDate}`}
                placeholder="Select travel dates"
                label="Travel Dates"
                error={errors.range?.message}
                icon="chevron-down-outline"
                editable={false}
              />
            </TouchableOpacity>
          )}
        />
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Now-Display-Bold',
    textAlign: 'center',
    paddingVertical: 12,
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
