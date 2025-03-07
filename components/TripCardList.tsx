import { useRef, useState } from 'react';
import React from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { TripCardListProps } from '@/types';

import { TripCardItem } from './TripCardItem';
import { ViewTitle } from './ViewTitle';

export const TripCardList = ({
  trips,
  title,
  cta,
  ctaText,
}: TripCardListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dotWidths = useRef(trips.map(() => useSharedValue(8))).current;

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);

      dotWidths.forEach((width, index) => {
        width.value = index === newIndex ? withSpring(16) : withSpring(8);
      });
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={{ marginTop: 20 }}>
      <ViewTitle title={title} cta={cta} ctaText={ctaText} />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={{
          marginVertical: 12,
        }}
        renderItem={({ item }) => <TripCardItem {...item} />}
      />
      {trips.length > 0 && (
        <View style={styles.indicatorContainer}>
          {trips.map((_, index) => {
            const animatedDotStyle = useAnimatedStyle(() => ({
              width: dotWidths[index].value,
            }));

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                  animatedDotStyle,
                ]}
              />
            );
          })}
        </View>
      )}
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
