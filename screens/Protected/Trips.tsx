import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryTagSelector } from '@/components/CategoryTagSelector';
import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar';
import { Input } from '@/components/Input';
import { ScreenHeader } from '@/components/ScreenHeader';
import { TripCardList } from '@/components/TripCardList';
import { useTripStore } from '@/lib/tripStore';

export default function TripsScreen() {
  const {
    trips,
    isLoading,
    query,
    searchTrips,
    selectedCategories,
    filterTripsByCategory,
  } = useTripStore();

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { top: insets.top, bottom: insets.bottom }]}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <ScreenHeader title="Trips" rightIcon="funnel-sharp" />
      <View style={styles.searchContainer}>
        <Input
          value={query}
          onChangeText={(text) => {
            searchTrips(text);
          }}
          placeholder="Search for a trip"
          icon="search-outline"
          wrapperStyle={{ marginHorizontal: 20 }}
        />
        {trips.length > 0 && (
          <CategoryTagSelector
            selectedCategories={selectedCategories}
            selectedTags={[]}
            onCategoriesChange={(item) => {
              filterTripsByCategory(item);
            }}
            onTagsChange={() => {}}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <TripCardList trips={trips} isTripsScreen type="upcoming" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginVertical: 16,
    gap: 16,
  },
});
