import { useEffect, useState } from 'react';
import { X } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchBarProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';

import { PlacesAutocomplete } from './PlacesAutocomplete';
// TODO
export function SearchBar({
  isSearchBarExpanded,
  setIsSearchBarExpanded,
}: SearchBarProps) {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(isSearchBarExpanded);
  const height = useSharedValue(70);
  const top = useSharedValue(200);

  useEffect(() => {
    height.value = withTiming(expanded ? 300 : 70, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    top.value = withTiming(expanded ? insets.top : 200, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [expanded]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      top: top.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {!expanded ? (
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={32}
            style={styles.icon}
            onPress={() => {
              setExpanded(!expanded);
              setIsSearchBarExpanded(!isSearchBarExpanded);
            }}
          />
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => {
                setExpanded(!expanded);
                setIsSearchBarExpanded(!isSearchBarExpanded);
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingVertical: 12,
            gap: 12,
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Now-Display-Bold',
                fontSize: 22,
                color: 'black',
              }}
              onPress={() => {
                setExpanded(!expanded);
                setIsSearchBarExpanded(!isSearchBarExpanded);
              }}
            >
              Where to?
            </Text>
            <TouchableOpacity
              onPress={() => {
                setExpanded(!expanded);
                setIsSearchBarExpanded(!isSearchBarExpanded);
              }}
              style={styles.closeButton}
            >
              <X size={20} color="black" />
            </TouchableOpacity>
          </View>
          <PlacesAutocomplete value="" onSelect={() => {}} />
        </View>
      )}
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    top: 200,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 18,
    borderCurve: 'continuous',
    boxShadow: '0px 0px 20px -10px rgba(0, 0, 0, 0.16)',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    marginHorizontal: 18,
    opacity: 0.8,
    color: 'gray',
  },
  closeButton: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  whereText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
