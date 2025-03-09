import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Compass, Globe, Home, PlusCircle, User } from 'lucide-react-native';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
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
        onPress={() => console.log('pressed')}
      >
        <PlusCircle size={32} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    display: 'none',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 18,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    backgroundColor: '#007AFF', // Customize color
  },
});
