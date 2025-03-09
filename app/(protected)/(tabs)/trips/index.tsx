import { CategoryTagSelector } from '@/components/CategoryTagSelector';
import { Input } from '@/components/Input';
import { ScreenHeader } from '@/components/ScreenHeader';
import { TripCardList } from '@/components/TripCardList';
import { useTripStore } from '@/lib/tripStore';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripsScreen() {
  const { trips, isLoading } = useTripStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="My Trips"
        leftIcon="arrow-back"
        rightIcon="funnel-sharp"
      />

      <View style={styles.searchContainer}>
        <Input
          value={''}
          onChangeText={() => {}}
          placeholder="Search for a trip"
          icon="search-outline"
        />
        <CategoryTagSelector
          selectedCategories={[]}
          selectedTags={[]}
          onCategoriesChange={() => {}}
          onTagsChange={() => {}}
        />
      </View>

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <TripCardList trips={trips} isTripsScreen type="upcoming" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
});
