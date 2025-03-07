import { ScreenHeader } from '@/components/ScreenHeader';
import { TripCardList } from '@/components/TripCardList';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="My Trips"
        leftIcon="arrow-back"
        rightIcon="settings-sharp"
      />

      <TripCardList
        trips={[{ id: '1' }, { id: '2' }]}
        isTripsScreen
        type="upcoming"
      />
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
});
