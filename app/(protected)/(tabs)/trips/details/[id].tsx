import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs';
import { Calendar, LocateOffIcon, MapPin } from 'lucide-react-native';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useTripStore } from '@/lib/tripStore';
import { Trip } from '@/types';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);

  const { trips, isLoading } = useTripStore();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const renderScene = SceneMap({
    first: () => (
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text>First</Text>
      </View>
    ),
    second: () => (
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text>Second</Text>
      </View>
    ),
    third: () => (
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text>Third</Text>
      </View>
    ),
  });

  const routes = [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ];

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
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={
            trip.image_url
              ? { uri: trip.image_url }
              : require('@/assets/images/home_header.png')
          }
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <ScreenHeader
            leftIcon="arrow-back"
            rightIcon="create-sharp"
            onBackPress={() => router.push('/trips')}
            onMorePress={() => router.push(`/trips/edit/${id}`)}
          />
        </View>
      </View>

      <View style={[styles.modalContainer]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{trip.title}</Text>
          <View>
            <View style={styles.bodyTagDateContainer}>
              <MapPin size={16} color="#000" />
              <Text style={styles.bodyTagTitle}>{trip.destination}</Text>
            </View>
            <View style={styles.bodyTagDateContainer}>
              <Calendar size={16} color="#000" />
              <Text style={styles.bodyTagDate}>
                {dayjs(trip.start_date).format('DD MMM YYYY')} -{' '}
                {dayjs(trip.end_date).format('DD MMM YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  wrapper: {
    flex: 1,
  },
  imageWrapper: {
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
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
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 60, // fix later
    display: 'none',
  },
  modalContainer: {
    zIndex: 10,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    top: 200,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderCurve: 'continuous',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
    backgroundColor: 'white',
    gap: 32,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Now-Display-Bold',
  },
  bodyTagDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bodyTagTitle: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
  },
  bodyTagDate: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 14,
  },
});
