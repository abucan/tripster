import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function ScreenHeader({
  title,
  leftIcon,
  rightIcon,
  onMorePress,
  onBackPress,
}: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {leftIcon && (
        <TouchableOpacity
          onPress={onBackPress || (() => navigation.goBack())}
          style={styles.backButton}
        >
          <Ionicons name={leftIcon} size={20} color="black" />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightIcon && (
        <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
          <Ionicons name={rightIcon} size={20} color="black" />
        </TouchableOpacity>
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
