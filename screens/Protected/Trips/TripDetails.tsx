import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyStateTripCard } from '@/components/EmptyStateTripCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTripsNavigation } from '@/hooks/useNavigation';
import { useTripStore } from '@/lib/tripStore';
import { TripsStackParamList } from '@/navigation/TripsStack';
import { Trip } from '@/types';
import { RouteProp, useRoute } from '@react-navigation/native';

export default function TripDetailScreen() {
  const route = useRoute<RouteProp<TripsStackParamList, 'TripDetails'>>();
  const { id } = route.params;

  const navigation = useTripsNavigation();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

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

  const DEFAULT_IMAGE = require('@/assets/images/home_header.png');

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={DEFAULT_IMAGE}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.heartCutout}>
          <TouchableOpacity onPress={() => {}}>
            <Text>HeartIcon</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.description}>{trip.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageWrapper: {
    height: 300,
    overflow: 'visible',
    position: 'relative',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1 }],
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  heartCutout: {
    position: 'absolute',
    bottom: -22,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Now-Display-Bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
