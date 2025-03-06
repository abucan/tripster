import { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { FieldErrors, useForm } from 'react-hook-form';

import { useTripStore } from '@/lib/tripStore';
import { TripFormData, tripSchema } from '@/utils/schemas/trips.schemas';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';

export function useTripForm() {
  const [imageUri, setImageUri] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const destinationBottomSheetRef = useRef<BottomSheet>(null);
  const rangeBottomSheetRef = useRef<BottomSheet>(null);

  const { createTrip, isLoading } = useTripStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: '',
      description: '',
      destination: '',
      range: {
        startDate: undefined,
        endDate: undefined,
      },
      budget: 0,
      persons: 0,
      categories: [],
    },
  });

  const onSubmit = async (data: TripFormData) => {
    const result = await createTrip(data);
    console.log('result', result);

    if (result) {
      router.push('/');
    }
  };

  const onErrors = (errors: FieldErrors<TripFormData>) => {
    console.log('errors', errors);
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

  return {
    imageUri,
    destinationBottomSheetRef,
    rangeBottomSheetRef,
    control,
    showModal,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    onErrors,
    handleSelectImage,
    handleDestinationChange,
    handleDateRangeChange,
    setShowModal,
  };
}
