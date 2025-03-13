import React, { useEffect } from 'react';
import { router, Tabs } from 'expo-router';
import { Compass, Globe, Home, User } from 'lucide-react-native';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import OpenAI from '@/assets/icons/openai.svg';
import { colors } from '@/lib/theme';
import { useTripStore } from '@/lib/tripStore';

export default function TabsLayout() {
  const { fetchTrips, fetchCategories, isLoading } = useTripStore();

  // TODO: check if there are re-renders
  useEffect(() => {
    fetchTrips();
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 85,
            paddingTop: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="explore/index"
          options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Compass color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="trips/index"
          options={{
            title: 'My Trips',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Globe color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/(protected)/create-trip')}
      >
        <OpenAI width={26} height={26} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    right: 25,
    bottom: 100,
    borderRadius: 30,
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // shadow for Android
    backgroundColor: colors.light.brand,
  },
});
