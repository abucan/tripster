import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Home, Compass, Globe, User } from 'lucide-react-native';
import OpenAI from '@/assets/icons/openai.svg';
import { colors } from '@/lib/theme';
import { useTripStore } from '@/lib/tripStore';

import HomeScreen from '@/screens/Protected/Home';
import ExploreScreen from '@/screens/Protected/Explore';
import ProfileScreen from '@/screens/Protected/Profile';
import TripsStack from './TripsStack';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fetchTripsAndCategories, isLoading } = useTripStore();

  useEffect(() => {
    fetchTripsAndCategories();
  }, []);

  const isOnTripsSubpage =
    route.name === 'TripsDetail' || route.name === 'TripSettings'; // Adjust if you have nested trip pages

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 85,
            paddingTop: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Compass color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Trips"
          component={TripsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Globe color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tab.Navigator>

      {!isOnTripsSubpage && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('CreateTrip' as never)}
        >
          <OpenAI width={26} height={26} />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: colors.light.brand,
  },
});
