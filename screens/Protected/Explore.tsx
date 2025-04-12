import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        top: insets.top,
        bottom: insets.bottom,
        left: insets.left,
        right: insets.right,
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <FocusAwareStatusBar barStyle="dark-content" />
        <Text>Explore</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
