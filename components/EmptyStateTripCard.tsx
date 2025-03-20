import React from 'react';
import { Ghost } from 'lucide-react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Button } from './Button';

export function EmptyStateTripCard({
  onRetry,
  isLoading,
}: {
  onRetry: () => void;
  isLoading: boolean;
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
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.cardContainer}>
        <Ghost size={48} color="#ccc" />
        <Text style={styles.title}>No Trips Found</Text>
        <Text style={styles.subtitle}>Start planning your next adventure!</Text>
        <Button
          title="Retry"
          isLoading={isLoading}
          disabled={isLoading}
          onPress={onRetry}
          style={styles.button}
        />
      </View>
    </Animated.View>
  );
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
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
