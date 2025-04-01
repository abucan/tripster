import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';

export function ScreenHeader({
  title,
  leftIcon,
  rightIcon,
  onMorePress,
  onBackPress,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <TouchableOpacity
          onPress={onBackPress || (() => router.back())}
          style={styles.backButton}
        >
          <Ionicons name={leftIcon} size={20} color="black" />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightIcon && (
        <View style={styles.moreButton}>
          <Ionicons name={rightIcon} size={20} color="black" />
        </View>
      )}
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
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  moreButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Now-Display-Bold',
    textAlign: 'center',
  },
});
