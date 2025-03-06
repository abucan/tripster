import { useEffect } from 'react';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Place, PlacesAutocompleteProps } from '@/types';
import { getIconForPlaceType } from '@/utils/icons';

import { Input } from './Input';

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function PlacesAutocomplete({
  value,
  onSelect,
  placeholder,
}: PlacesAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const searchPlaces = async (searchQuery: string) => {
    if (!searchQuery.trim() || !MAPBOX_ACCESS_TOKEN) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery,
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place&limit=10`,
      );

      if (!response.ok) throw new Error('Failed to fetch places');

      const data = await response.json();
      const filteredResults = data.features || [];

      setSuggestions(filteredResults);
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Failed to fetch places');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchPlaces, 2000);

  useEffect(() => {
    if (query !== value) {
      debouncedSearch(query);
    }
  }, [query]);

  const handleSelect = (place: Place) => {
    setQuery(place.place_name);
    setShowSuggestions(false);

    onSelect({
      name: place.place_name,
      coordinates: place.center,
    });
  };

  return (
    <View style={styles.container}>
      <Input
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          setShowSuggestions(true);
        }}
        placeholder="Search for a place"
        icon="search-outline"
      />
      {showSuggestions && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `${item.place_name}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                paddingHorizontal: 0,
                paddingVertical: 16,
                borderBottomWidth: suggestions.length === index + 1 ? 0 : 1,
                borderBottomColor: '#E0E0E0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ width: '70%' }}>
                <Text
                  style={styles.cityText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.text}
                </Text>
                <Text
                  style={styles.regionText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item?.place_name}
                </Text>
              </View>
              <View style={styles.placeTypeWrapper}>
                {getIconForPlaceType(item.place_type[0])}
                <Text style={styles.placeTypeText}>{item.place_type[0]}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  cityText: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 16,
  },
  regionText: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    color: 'gray',
  },
  placeTypeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 50,
    gap: 5,
  },
  placeTypeText: {
    fontFamily: 'Helvetica-Now-Display-Medium',
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
});
