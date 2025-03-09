import { create } from 'zustand';

import { Category, Trip } from '@/types';
import { TripFormData } from '@/utils/schemas/trips.schemas';

import { supabase } from './supabase';
import * as FileSystem from 'expo-file-system';

interface TripStore {
  // trip state
  trips: Trip[];
  upcomingTrip: Trip[];
  categories: Category[];
  // trip actions
  uploadImage: (image: string, userId: string) => Promise<string | null>;
  createTrip: (trip: TripFormData) => Promise<Trip | null>;
  updateTrip: (trip: Trip) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  fetchTrips: () => Promise<void>;
  fetchCategories: () => Promise<void>;

  // loading and error states
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  trips: [],
  upcomingTrip: [],
  categories: [],
  isLoading: false,
  error: null,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),

  uploadImage: async (image: string, userId: string) => {
    try {
      const file = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `images/user-${userId}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from('trip-images')
        .upload(fileName, file, { contentType: 'image/jpeg', upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('trip-images')
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  },
  createTrip: async (tripData): Promise<Trip | null> => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }

      const imageUrl: string | null = await useTripStore
        .getState()
        .uploadImage(tripData.image_url!, user.id);

      if (!imageUrl) {
        throw new Error('Image not uploaded');
      }

      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          title: tripData.title,
          description: tripData.description,
          destination: tripData.destination,
          start_date: tripData.range.startDate?.toISOString(),
          end_date: tripData.range.endDate?.toISOString(),
          budget: tripData.budget,
          persons: tripData.persons,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (error) throw error;
      if (!trip) throw new Error('Trip not created.');

      if (tripData.categories && tripData.categories.length > 0) {
        const { error: categoriesError } = await supabase
          .from('trip_categories')
          .insert(
            tripData.categories.map((categoryId) => ({
              trip_id: trip.id,
              category_id: categoryId,
            }))
          );
        if (categoriesError) throw categoriesError;
      }

      set((state) => ({ trips: [...state.trips, trip] }));
      return trip;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  updateTrip: async (trip) => {},
  deleteTrip: async (tripId) => {},
  fetchTrips: async () => {
    try {
      set({ isLoading: true, error: null });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }
      const { data: trips, error } = await supabase
        .from('trips')
        .select(
          `
          *,
          trip_categories:trip_categories(*),
          categories:trip_categories(category_id, categories(*))
        `
        )
        .eq('user_id', user.id)
        .order('start_date', { ascending: true });
      if (error) throw error;
      set({ trips });
      console.log('trips', trips);
      if (trips.length > 0) {
        set({ upcomingTrip: [trips[0]] });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      set({ categories });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
