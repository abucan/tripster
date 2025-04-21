import {
  ProtectedParamList,
  RootParamList,
  TabsParamList,
} from '@/types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TripsTabNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  'Trips'
>;

export type RootNavigationProp = NativeStackNavigationProp<RootParamList>;

export type ProtectedProp = NativeStackNavigationProp<ProtectedParamList>;

export const useTripsNavigation = () => useNavigation<TripsTabNavigationProp>();

export const useRootNavigation = () => useNavigation<RootNavigationProp>();

export const useProtectedNavigation = () => useNavigation<ProtectedProp>();
