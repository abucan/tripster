import React from 'react';
import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { TripCardListProps } from '@/types';

import { EmptyStateTripCard } from './EmptyStateTripCard';
import { TripCardItem } from './TripCardItem';
import { ViewTitle } from './ViewTitle';

export const TripCardList = ({
  trips,
  isTripsScreen,
  title,
  cta,
  ctaText,
}: TripCardListProps) => {
  return (
    <View style={{ marginTop: isTripsScreen ? 0 : 20 }}>
      {title && trips.length > 0 && (
        <ViewTitle
          title={title}
          cta={cta}
          ctaText={ctaText}
          onPress={() => router.push('/trips')}
        />
      )}
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        horizontal={!isTripsScreen}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: isTripsScreen ? 0 : 16,
          gap: isTripsScreen ? 20 : 0,
        }}
        ListEmptyComponent={<EmptyStateTripCard onRetry={() => {}} />}
        renderItem={({ item, index }) => (
          <TripCardItem {...item} index={index} />
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});
