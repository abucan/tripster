import React from 'react';
import { FlatList, View } from 'react-native';

import { useTripsNavigation } from '@/hooks/useNavigation';
import { useTripStore } from '@/lib/tripStore';
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
  const navigation = useTripsNavigation();

  return (
    <View style={{ marginTop: isTripsScreen ? 0 : 20 }}>
      {title && trips.length > 0 && (
        <ViewTitle
          title={title}
          cta={cta}
          ctaText={ctaText}
          onPress={() => navigation.navigate('Trips', { screen: 'TripsIndex' })}
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
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <EmptyStateTripCard
            onRetry={() => {
              useTripStore.getState().fetchTripsAndCategories();
            }}
            isLoading={useTripStore.getState().isLoading}
            buttonText="Retry"
            buttonStyle={{}}
            cardTitle="No Trips Found"
            cardDescription="We couldn't find any trips. Try again or create a new trip."
          />
        }
        renderItem={({ item, index }) => (
          <TripCardItem {...item} index={index} />
        )}
      />
    </View>
  );
};
