import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import OpenAI from '@/assets/icons/openai.svg';
import { colors } from '@/constants/theme';
import { useTheme } from '@/lib/theme';
import { useTripStore } from '@/lib/tripStore';
import ExploreScreen from '@/screens/Protected/Explore';
import HomeScreen from '@/screens/Protected/Home';
import ProfileScreen from '@/screens/Protected/Profile';
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

import TripsStack from './TripsStack';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fetchTripsAndCategories, isLoading } = useTripStore();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  useEffect(() => {
    fetchTripsAndCategories();
  }, []);

  const isOnTripsSubpage =
    route.name === 'TripsDetail' || route.name === 'TripSettings';

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
      backgroundColor: themeColors.brand,
    },
  });

  if (isLoading) {
    return (
      <View
        style={[styles.loader, { backgroundColor: themeColors.background }]}
      >
        <ActivityIndicator size="large" color={themeColors.primary} />
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
          tabBarIconStyle: {
            marginBottom: 2
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="explore" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Trips"
          component={TripsStack}
          options={{
            tabBarIcon: ({ color, size }) => <Fontisto name="world" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
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
