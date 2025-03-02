import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input } from './Input';
import { useEffect } from 'react';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import { MapPin, Globe, Map, Home, Building } from 'lucide-react-native';

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface Place {
  place_name: string;
  center: [number, number];
}

interface PlacesAutocompleteProps {
  value: string;
  onSelect: (place: { name: string; coordinates: [number, number] }) => void;
  placeholder?: string;
}

const fakeList = [
  {
    place_name: 'San Francisco',
    coordinates: [37.774929, -122.419418],
    place_type: 'City',
    countryCode: 'US',
  },
  {
    place_name: 'San Francisco',
    coordinates: [37.774929, -122.419418],
    place_type: 'City',
    countryCode: 'US',
  },
];

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
      console.log('no search query or token');
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place&limit=10`
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

  const getIconForPlaceType = (type: string) => {
    switch (type) {
      case 'country':
        return <Globe size={20} color="black" />;
      case 'region':
        return <Map size={20} color="black" />;
      case 'city':
        return <Building size={20} color="black" />;
      case 'neighborhood':
        return <Home size={20} color="black" />;
      default:
        return <MapPin size={20} color="black" />;
    }
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
                  style={{
                    fontFamily: 'Helvetica-Now-Display-Bold',
                    fontSize: 16,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.text}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Helvetica-Now-Display-Regular',
                    fontSize: 16,
                    color: 'gray',
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item?.place_name}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: 'aliceblue',
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                  borderRadius: 50,
                }}
              >
                {getIconForPlaceType(item.place_type[0])}
                <Text
                  style={{
                    fontFamily: 'Helvetica-Now-Display-Medium',
                    fontSize: 16,
                    color: 'black',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.place_type[0]}
                </Text>
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
});
