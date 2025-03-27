import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useTripStore } from '@/lib/tripStore';
import { Trip } from '@/types';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const { trips, isLoading } = useTripStore();

  useEffect(() => {
    if (id && trips.length > 0) {
      const foundTrip = trips.find((t) => t.id === id);
      setTrip(foundTrip || null);
    }
  }, [id, trips]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading trip details...</Text>
      </View>
    );
  }

  if (!trip) {
    return (
      <View>
        <Text>Trip not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title={trip?.title}
        leftIcon="arrow-back"
        rightIcon="create-sharp"
        onBackPress={() => router.push('/trips')}
        onMorePress={() => router.push(`/trips/edit/${id}`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
});
