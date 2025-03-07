import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

import { TripCardItemProps } from '@/types';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Button } from './Button';
import { Calendar } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

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

          <BlurView tint="extraLight" intensity={100} style={styles.bodyTag}>
            <View style={{ gap: 2 }}>
              <Text style={styles.bodyTagTitle}>Split, Croatia</Text>
              <View style={styles.bodyTagDateContainer}>
                <Calendar size={16} color="#000" />
                <Text style={styles.bodyTagDate}>
                  10 Nov 2025 - 12 Nov 2025
                </Text>
              </View>
            </View>
            <Button title="See Details" style={{ borderRadius: 100 }} />
          </BlurView>
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
