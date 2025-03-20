import React from 'react';
import { Ghost } from 'lucide-react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Button } from './Button';

export function EmptyStateTripCard({ onRetry }: { onRetry: () => void }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ghost size={48} color="#ccc" />
      <Text style={styles.title}>No Trips Found</Text>
      <Text style={styles.subtitle}>Start planning your next adventure!</Text>
      <Button title="Retry" onPress={onRetry} style={styles.button} />
    </Animated.View>
  );
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    marginTop: 20,
  },
});
