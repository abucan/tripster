import { create } from 'zustand';

import { Trip } from '@/types';
import { TripFormData } from '@/utils/schemas/trips.schemas';

import { supabase } from './supabase';

interface TripStore {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  createTrip: (trip: TripFormData) => Promise<Trip | null>;
  updateTrip: (trip: Trip) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  fetchTrips: () => Promise<void>;
}

export const useTripStore = create<TripStore>((set) => ({
  trips: [],
  isLoading: false,
  error: null,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  createTrip: async (tripData) => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not found');
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
        })
        .select()
        .single();

      if (error) throw error;
      if (!trip) throw new Error('Trip not created.');

      if (tripData.categories.length > 0) {
        const { error: categoriesError } = await supabase
          .from('trip_categories')
          .insert(
            tripData.categories.map((categoryId) => ({
              trip_id: trip.id,
              category_id: categoryId,
            })),
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
  fetchTrips: async () => {},
}));
