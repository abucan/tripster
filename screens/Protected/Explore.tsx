import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Explore</Text>
    </SafeAreaView>
  );
}