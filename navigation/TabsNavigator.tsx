import React, { useEffect } from 'react';
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
import ExploreScreen from '@/screens/Protected/Explore';
import HomeScreen from '@/screens/Protected/Home';
import ProfileScreen from '@/screens/Protected/Profile';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

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
    route.name === 'TripsDetail' || route.name === 'TripSettings';

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
            headerShown: true,
            title: 'Explore',
            headerTransparent: true,
            headerShadowVisible: false,
            headerBackground: () => <View />,
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name={'settings-sharp'} size={20} color="black" />
              </TouchableOpacity>
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
            headerShown: false,
            title: 'Profile',
            headerTransparent: true,
            headerShadowVisible: false,
            headerBackground: () => <View />,
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name={'settings-sharp'} size={20} color="black" />
              </TouchableOpacity>
            ),
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
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 5,
    backgroundColor: colors.light.brand,
  },
});
