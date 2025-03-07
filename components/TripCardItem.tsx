import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

import { TripCardItemProps } from '@/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Button } from './Button';

export function TripCardItem({ id }: TripCardItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Image
            source={require('@/assets/images/home_header.png')}
            style={styles.image}
          />

          <View style={styles.imageTag}>
            <FontAwesome6 name="wand-magic-sparkles" size={14} color="#fff" />
            <Text style={{ color: '#fff' }}>AI Generated</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardFooterInfo}>
            <View style={styles.cardFooterDistinct}>
              <Ionicons name="map-outline" size={20} color="black" />
              <Text style={styles.cardFooterTitle} numberOfLines={1}>
                Split, Croatia
              </Text>
            </View>
            <View style={styles.cardFooterDistinct}>
              <AntDesign name="calendar" size={20} color="black" />
              <Text>2 days - 3 nights</Text>
            </View>
            <Text style={styles.cardFooterPriceText}>
              $100
              <Text style={styles.cardFooterPersonText}>/person</Text>
            </Text>
          </View>
          <Button title="See Details" size="lg" />
        </View>
      </View>
    </View>
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
    height: 300,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderCurve: 'continuous',
    objectFit: 'fill',
  },
  imageTag: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    left: 10,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
    borderCurve: 'continuous',
  },
  cardFooter: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12,
    gap: 24,
  },
  cardFooterInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  cardFooterDistinct: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  cardFooterTitle: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
  },
  cardFooterPriceText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 24,
  },
  cardFooterPersonText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 14,
  },
});
