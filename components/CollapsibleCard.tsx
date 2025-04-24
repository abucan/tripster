import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
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
}

export const CollapsibleCard = forwardRef(
  (props: CollapsibleCardProps, ref) => {
    const {
      children,
      collapsedContent,
      collapsedHeight = 80,
      initiallyCollapsed = false,
      containerStyle,
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
          <View style={styles.content}>
            {isCollapsed ? collapsedContent : children}
          </View>
        </Animated.View>

        {/* Example Buttons (optional control UI) */}
        {/* <Button title="Expand" onPress={expand} />
          <Button title="Collapse" onPress={collapse} /> */}
      </>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 18,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderCurve: 'continuous',
  },
  content: {
    flexDirection: 'column',
  },
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    left: 1000,
    zIndex: -1,
  },
});
