import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { top: insets.top, bottom: insets.bottom }]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Profile" rightIcon="settings-sharp" />
      </ScrollView>
    </View>
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
