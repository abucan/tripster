import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';

export default function ScreenHeader({
  title,
  leftIcon,
  rightIcon,
  onMorePress,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name={leftIcon} size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
        <Ionicons name={rightIcon} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  moreButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Now-Display-Bold',
    textAlign: 'center',
  },
});
