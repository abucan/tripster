import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  Calendar,
  LoaderPinwheel,
  LucideUser,
  MapPin,
  PenLine,
  Wallet,
} from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyStateTripCard } from '@/components/EmptyStateTripCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTripsNavigation } from '@/hooks/useNavigation';
import { colors } from '@/lib/theme';
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

  const insets = useSafeAreaInsets();

  const actionSheetRef = useRef<ActionSheetRef>(null);

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
        <Animated.Image
          source={{ uri: trip.image_url }}
          resizeMode="cover"
          style={styles.image}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          sharedTransitionTag="tag"
        />
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <ScreenHeader
            leftIcon="arrow-back"
            rightIcon="create-sharp"
            onBackPress={() => navigation.goBack()}
            onMorePress={() =>
              navigation.navigate('Trips', {
                screen: 'TripEdit',
                params: { id },
              })
            }
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
                  //SheetManager.show('select-planning-choice-sheet');
                  actionSheetRef.current?.show();
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

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        indicatorStyle={{
          paddingBottom: 0,
          marginBottom: 12,
        }}
        safeAreaInsets={{
          bottom: insets.bottom,
          top: insets.top,
          left: insets.left,
          right: insets.right,
        }}
      >
        <View
          style={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Helvetica-Now-Display-Bold',
            }}
          >
            Create your plan with
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              flex: 1,
              paddingHorizontal: 24,
              gap: 16,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                borderWidth: 1,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderColor: colors.light.brand,
                flex: 1,
              }}
            >
              <LoaderPinwheel
                width={60}
                height={60}
                color={colors.light.brand}
              />
              <Text
                style={{
                  fontFamily: 'Helvetica-Now-Display-Bold',
                  color: colors.light.brand,
                }}
              >
                AI Help
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                borderWidth: 1,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderColor: colors.light.brand,
                flex: 1,
              }}
            >
              <PenLine width={60} height={60} color={colors.light.brand} />
              <Text
                style={{
                  fontFamily: 'Helvetica-Now-Display-Bold',
                  color: colors.light.brand,
                }}
              >
                Manually
              </Text>
            </View>
          </View>
        </View>
      </ActionSheet>
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
