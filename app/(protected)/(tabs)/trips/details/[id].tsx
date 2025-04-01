import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs';
import { Calendar, LucideUser, MapPin, Wallet } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useTripStore } from '@/lib/tripStore';
import { Trip } from '@/types';
import { EmptyStateTripCard } from '@/components/EmptyStateTripCard';
import { SheetManager } from 'react-native-actions-sheet';
import { Button } from '@/components/Button';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

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
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: trip.image_url }}
          resizeMode="cover"
          style={styles.image}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
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

      <ScrollView>
        <View style={[styles.modalContainer]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{trip.title}</Text>
            <View style={{ gap: 6 }}>
              <View style={styles.bodyTagDateContainer}>
                <MapPin size={20} color="#000" />
                <Text style={styles.bodyTagDate}>{trip.destination}</Text>
              </View>
              <View style={styles.bodyTagDateContainer}>
                <Calendar size={20} color="#000" />
                <Text style={styles.bodyTagDate}>
                  {dayjs(trip.start_date).format('DD MMM YYYY')} -{' '}
                  {dayjs(trip.end_date).format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={styles.bodyTagDateContainer}>
                <Wallet size={20} color="#000" />
                <Text style={styles.bodyTagDate}>Budget: €{trip.budget}</Text>
              </View>
              <View style={styles.bodyTagDateContainer}>
                <LucideUser size={20} color="#000" />
                <Text style={styles.bodyTagDate}>
                  {trip.persons} {`${trip.persons > 1 ? 'People' : 'Person'}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Trip Details</Text>
            <View style={styles.bodyTagDateContainer}>
              <Text style={styles.bodyTagDate}>{trip.description}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.modalContainer, { marginBottom: 20 }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Plan</Text>
            <View style={styles.bodyTagDateContainer}>
              <EmptyStateTripCard
                isLoading={false}
                onRetry={() => {
                  SheetManager.show('select-planning-choice-sheet', {
                    context: 'global',
                  });
                }}
                buttonText="Start planning"
                buttonStyle={{ width: '100%' }}
                cardTitle="No Plan Found"
                cardDescription="Start planning your next adventure!"
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 18,
    borderCurve: 'continuous',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
    backgroundColor: 'white',
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
    marginBottom: 4,
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
    fontSize: 16,
  },
});
