import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {  MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from './Button';

export function EmptyStateTripCard({
  onRetry,
  isLoading,
  buttonText,
  buttonStyle,
  cardTitle,
  cardDescription,
}: {
  onRetry: () => void;
  isLoading: boolean;
  buttonText: string;
  buttonStyle: ViewStyle;
  cardTitle: string;
  cardDescription: string;
}) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={[styles.container, animatedStyle]}>
      <View style={styles.cardContainer}>
      <MaterialCommunityIcons name="ghost-outline" size={48} color="gray" />
        <Text style={styles.title}>{cardTitle}</Text>
        <Text style={styles.subtitle}>{cardDescription}</Text>
        <Button
          title={buttonText}
          isLoading={isLoading}
          disabled={isLoading}
          onPress={onRetry}
          style={[styles.button, buttonStyle]}
          size="lg"
        />
      </View>
    </View>
  );
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 'auto',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#ccc',
    borderCurve: 'continuous',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Now-Display-Bold',
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 20,
  },
});
