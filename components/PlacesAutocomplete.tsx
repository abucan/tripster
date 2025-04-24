import { useEffect,useState } from 'react';
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

import { Button } from './Button';
import { Input } from './Input';

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
// TODO
export function PlacesAutocomplete({
  value,
  onSelect,
  onHeightChange,
}: PlacesAutocompleteProps & { onHeightChange?: (height: number) => void }) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<Place | null>(
    null,
  );

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
    // setQuery(place.place_name);
    setSelectedSuggestion(place);
    // setShowSuggestions(false);

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
      <View
        style={styles.listWrapper}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          onHeightChange?.(height);
        }}
      >
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => `${item.place_name}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.suggestionItem}
            >
              <View style={{ width: '70%' }}>
                <Text
                  style={styles.cityText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.text}
                </Text>
                <Text
                  style={styles.regionText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.place_name}
                </Text>
              </View>
              <View style={styles.placeTypeWrapper}>
                {getIconForPlaceType(item.place_type[0])}
                <Text style={styles.placeTypeText}>{item.place_type[0]}</Text>
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="Select"
          size="lg"
          disabled={!selectedSuggestion}
          onPress={() => handleSelect(selectedSuggestion!)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // minHeight: 60,
    flexShrink: 1,
  },
  listWrapper: {
    maxHeight: 300,
  },
  footer: {
    marginTop: 12,
    // paddingBottom: 12,
    // paddingHorizontal: 20,
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
  suggestionItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
