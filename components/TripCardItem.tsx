import React, { useEffect } from 'react';
import { BlurView } from 'expo-blur';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react-native';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { TripCardItemProps } from '@/types';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Button } from './Button';
import { useTripsNavigation } from '@/hooks/useNavigation';

const DELAY = 200;
const SPRING_CONFIG = { damping: 15, stiffness: 120 };

export function TripCardItem({
  id,
  index,
  image_url,
  destination,
  start_date,
  end_date,
}: TripCardItemProps) {
  const navigation = useTripsNavigation();

  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(index! * DELAY, withSpring(0, SPRING_CONFIG));
    opacity.value = withDelay(index! * DELAY, withSpring(1, SPRING_CONFIG));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Animated.Image
            source={
              image_url
                ? { uri: image_url }
                : require('@/assets/images/home_header.png')
            }
            style={styles.image}
            sharedTransitionTag="tag"
          />

          <View style={styles.imageTag}>
            <FontAwesome6 name="wand-magic-sparkles" size={14} color="#fff" />
            <Text style={{ color: '#fff' }}>AI Generated</Text>
          </View>

          <BlurView tint="extraLight" intensity={100} style={styles.bodyTag}>
            <View style={{ gap: 2 }}>
              <Text style={styles.bodyTagTitle}>{destination}</Text>
              <View style={styles.bodyTagDateContainer}>
                <Calendar size={16} color="#000" />
                <Text style={styles.bodyTagDate}>
                  {dayjs(start_date).format('DD MMM YYYY')} -{' '}
                  {dayjs(end_date).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <Button
              title="See Details"
              onPress={() =>
                navigation.navigate('Trips', {
                  screen: 'TripDetails',
                  params: { id },
                })
              }
            />
          </BlurView>
        </View>
      </View>
    </Animated.View>
  );
}

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    width: width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 18,
    borderCurve: 'continuous',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
  },
  cardHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderCurve: 'continuous',
    objectFit: 'cover',
  },
  imageTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
    borderCurve: 'continuous',
    top: 10,
    left: 10,
    gap: 6,
  },
  bodyTag: {
    position: 'absolute',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 18,
    borderCurve: 'continuous',
    bottom: 10,
    left: 10,
    right: 10,
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
