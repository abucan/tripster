import { StyleSheet, Text, View } from 'react-native';

import { FeatureItemProps } from '@/types';

export function FeatureItem({ title, icon }: FeatureItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
  },
  featureTitle: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 12,
    color: 'gray',
  },
});
