import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ViewTitleProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

export function ViewTitle({ title, cta, ctaText }: ViewTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {cta && (
        <TouchableOpacity style={styles.seeAll}>
          <Text style={styles.seeAllText}>{ctaText}</Text>
          <MaterialIcons name="navigate-next" size={20} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  seeAll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeAllText: {
    display: 'flex',
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 14,
    color: '#2593fa',
  },
  icon: {
    color: '#2593fa',
  },
});
