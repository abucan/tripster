import { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';
import { Minus, Plus } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import InputSpinner from 'react-native-input-spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { MyInput } from '@/components/form/MyInput';
import SelectDateRangeSheet from '@/components/SelectDateRangeSheet';
import SelectDestinationSheet from '@/components/SelectDestinationSheet';
import { supabase } from '@/lib/supabase';
import { TripFormData, tripSchema } from '@/utils/schemas/trips.schemas';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const onSubmit = async (data: TripFormData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .insert({
          title: data.title,
          description: data.description,
          destination: data.destination,
          budget: data.budget,
          persons: data.persons,
          start_date: data.range.startDate,
          end_date: data.range.endDate,
          image_url: imageUri,
          user_id: user.id,
        })
        .select()
        .single();

      if (tripError) {
        throw tripError;
      }

      if (!trip) {
        throw new Error('Trip not created.');
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flexGrow: 1 }}>
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
                    value={`${dayjs(value?.startDate).format('MMM DD, YYYY') || ''} - ${dayjs(value?.endDate).format('MMM DD, YYYY') || ''}`}
                    placeholder="Select travel dates"
                    label="Travel Dates"
                    error={errors.range?.message}
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
            <Button
              title="Create Trip"
              size="lg"
              onPress={handleSubmit(onSubmit)}
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
