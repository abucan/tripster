// ProgressTracker.tsx (Plane on same line as dot, line and dot layout preserved)
import React, { useEffect } from 'react';
import { Plane } from 'lucide-react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ProgressTrackerProps {
  totalSteps: number;
  currentStep: number;
  onStepPress?: (index: number) => void;
  labels?: string[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalSteps,
  currentStep,
  onStepPress,
  labels = [],
}) => {
  const trackWidth = SCREEN_WIDTH - 40;
  const stepWidth = trackWidth / (totalSteps - 1);
  const planeX = useSharedValue(0);

  useEffect(() => {
    planeX.value = withTiming(currentStep * stepWidth, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentStep]);

  const animatedPlaneStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: planeX.value - 12 }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track} />

      <View style={styles.stepsRow}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.stepContainer}>
            <TouchableOpacity
              onPress={() => onStepPress?.(index)}
              style={styles.dotWrapper}
            >
              <View
                style={[
                  styles.dot,
                  index < currentStep ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.label} numberOfLines={1}>
              {labels[index] || `Step ${index + 1}`}
            </Text>
          </View>
        ))}
      </View>

      <Animated.View style={[styles.planeIcon, animatedPlaneStyle]}>
        <Plane size={24} color="#007AFF" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  track: {
    position: 'absolute',
    top: 34, // aligns with center of dots
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    width: 60,
  },
  dotWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D3D3D3',
  },
  dotActive: {
    backgroundColor: '#007AFF',
  },
  dotInactive: {
    backgroundColor: '#D3D3D3',
  },
  planeIcon: {
    position: 'absolute',
    top: 22, // aligns plane center with dot
    left: 20,
    zIndex: 1,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
