import React from 'react';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { TripFormProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';

import { CategoryTagSelector } from '../CategoryTagSelector';
import { Counter } from '../Counter';

import { MyInput } from './MyInput';

const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

export function TripForm({
  control,
  imageUri,
  destinationBottomSheetRef,
  rangeBottomSheetRef,
  errors,
  handleSelectImage,
}: TripFormProps) {
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                destinationBottomSheetRef.current?.show();
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
            justifyContent: 'space-between',
            overflow: 'hidden',
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
                    customStyle={{ width: 'auto', flex: 1 }}
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
              <Counter
                initialValue={value}
                min={1}
                max={50}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
                error={errors.persons?.message}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="categories"
          render={({ field: { onChange, value } }) => {
            const selectedCategories = Array.isArray(value)
              ? value.filter((v) => v)
              : [];
            return (
              <CategoryTagSelector
                selectedCategories={selectedCategories}
                onCategoriesChange={(categories) => {
                  onChange(categories);
                }}
                selectedTags={[]}
                onTagsChange={() => {}}
              />
            );
          }}
        />
      </View>
    </ScrollView>
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
    marginVertical: 16,
    gap: 16,
  },
});
