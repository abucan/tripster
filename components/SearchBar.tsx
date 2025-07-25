import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchBarProps } from '@/types';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { PlacesAutocomplete } from './PlacesAutocomplete';

export function SearchBar({
  isSearchBarExpanded,
  setIsSearchBarExpanded,
}: SearchBarProps) {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(isSearchBarExpanded);
  const [measuredHeight, setMeasuredHeight] = useState(300); // default fallback
  const height = useSharedValue(70);
  const top = useSharedValue(200);

  const [suggestionHeight, setSuggestionHeight] = useState(0);

  const contentRef = useRef(null);

  useEffect(() => {
    height.value = withTiming(
      expanded ? measuredHeight + suggestionHeight : 70,
      {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }
    );
    top.value = withTiming(expanded ? insets.top : 200, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [expanded, measuredHeight, suggestionHeight]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      top: top.value,
    };
  });

  useEffect(() => {
    if (!expanded) setSuggestionHeight(0);
  }, [expanded]);

  return (
    <>
      {/* Hidden view to measure height */}
      <View
        style={styles.hiddenMeasure}
        onLayout={(event) => {
          const { height: h } = event.nativeEvent.layout;
          setMeasuredHeight(h + 24); // add padding for smoother UX
        }}
      >
        <View style={styles.expandedContent}>
          <View style={styles.expandedTopRow}>
            <Text style={styles.expandedTitle}>Where to?</Text>
            <TouchableOpacity>
            <AntDesign name="closecircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <PlacesAutocomplete value="" onSelect={() => {}} />
        </View>
      </View>

      <Animated.View style={[styles.container, animatedStyles]}>
        {!expanded ? (
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={32}
              style={styles.icon}
              onPress={() => {
                setExpanded(true);
                setIsSearchBarExpanded(true);
              }}
            />
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() => {
                  setExpanded(true);
                  setIsSearchBarExpanded(true);
                }}
              >
                <Text style={styles.whereText}>Where to?</Text>
              </TouchableOpacity>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>Anywhere</Text>
                <View style={styles.dot} />
                <Text style={styles.descriptionText}>Anytime</Text>
                <View style={styles.dot} />
                <Text style={styles.descriptionText}>Any budget</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.expandedContent}>
              <View style={styles.expandedTopRow}>
                <Text style={styles.expandedTitle}>Where to?</Text>
                <TouchableOpacity
                  onPress={() => {
                    setExpanded(false);
                    setIsSearchBarExpanded(false);
                  }}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 16 }}>
                <PlacesAutocomplete
                  value=""
                  onSelect={() => {}}
                  onHeightChange={setSuggestionHeight}
                />
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    left: 1000, // off-screen
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    marginHorizontal: 18,
    opacity: 0.8,
    color: 'gray',
  },
  whereText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descriptionText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 14,
    color: 'gray',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  // expandedContent: {
  //   padding: 12,
  //   gap: 12,
  // },
  expandedContent: {
    flexDirection: 'column',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  expandedTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  expandedTitle: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 22,
    color: 'black',
  },
});
