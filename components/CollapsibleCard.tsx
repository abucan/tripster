/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CollapsibleCardProps {
  children: React.ReactNode;
  collapsedContent: React.ReactNode;
  collapsedHeight?: number;
  initiallyCollapsed?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

export const CollapsibleCard = forwardRef(
  (props: CollapsibleCardProps, ref) => {
    const {
      children,
      collapsedContent,
      collapsedHeight = 80,
      initiallyCollapsed = false,
      containerStyle,
      onPress,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);
    const [measuredHeight, setMeasuredHeight] = useState(300); // default fallback

    const height = useSharedValue(
      initiallyCollapsed ? collapsedHeight : measuredHeight,
    );

    useEffect(() => {
      if (!initiallyCollapsed && measuredHeight) {
        height.value = measuredHeight;
      }
    }, [measuredHeight]);

    const collapse = () => {
      height.value = withTiming(collapsedHeight, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      setIsCollapsed(true);
    };

    const expand = () => {
      height.value = withTiming(measuredHeight, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      setIsCollapsed(false);
    };

    const onLayout = (event: LayoutChangeEvent) => {
      const { height: h } = event.nativeEvent.layout;
      setMeasuredHeight(h); // add padding for smoother UX
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });

    useImperativeHandle(ref, () => ({
      expand,
      collapse,
    }));

    return (
      <>
        {/* Hidden for measuring */}
        <View style={styles.hiddenMeasure} onLayout={onLayout}>
          <View style={styles.content}>{children}</View>
        </View>

        <Animated.View style={[styles.card, containerStyle, animatedStyle]}>
          <Pressable onPress={onPress} style={styles.content}>
            {isCollapsed ? collapsedContent : children}
          </Pressable>
        </Animated.View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 18,
    borderCurve: 'continuous',
    backgroundColor: 'white',

    marginHorizontal: 20,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'column',
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    left: 1000,
    zIndex: -1,
  },
});
