import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FieldErrors, useForm } from 'react-hook-form';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { useTripStore } from '@/lib/tripStore';
import { TripFormData, tripSchema } from '@/utils/schemas/trips.schemas';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
// TODO
export function useTripForm({
  tripId,
  isEditing,
}: {
  tripId?: string;
  isEditing?: boolean;
}) {
  const [imageUri, setImageUri] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const destinationBottomSheetRef = useRef<ActionSheetRef>(null);
  const rangeBottomSheetRef = useRef<BottomSheet>(null);

  const { createTrip, isLoading, trips } = useTripStore();

  const trip = trips.find((trip) => trip.id === tripId);

  useEffect(() => {
    setImageUri(trip?.image_url || '');
    console.log('trip', trip?.image_url);
  }, [trip]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: trip?.title || '',
      description: trip?.description || '',
      destination: trip?.destination || '',
      range: {
        startDate: trip?.start_date || new Date(),
        endDate: trip?.end_date || new Date(),
      },
      budget: trip?.budget || 0,
      persons: trip?.persons || 1,
      categories:
        trip?.trip_categories.map((category) => category.category_id) || [],
    },
  });
  // TODO: fix the date range
  const onSubmit = async (data: TripFormData) => {
    if (!isEditing) {
      const result = await createTrip({
        ...data,
        image_url: imageUri,
      });
      if (result) {
        setShowModal(true);
      }
    } else {
    }
  };

  const onErrors = (errors: FieldErrors<TripFormData>) => {
    console.log('errors', errors);
  };

  const handleSelectImage = async () => {
    console.log('handleSelectImage');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
    destinationBottomSheetRef?.current?.hide();
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

  return {
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
  };
}
