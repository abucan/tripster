import { create } from 'zustand';

import { Category, Trip } from '@/types';
import { TripFormData } from '@/utils/schemas/trips.schemas';

import { supabase } from './supabase';

interface TripStore {
  // trip state
  trips: Trip[];
  allTrips: Trip[];
  upcomingTrip: Trip[];
  categories: Category[];
  selectedCategories: string[];
  query: string;
  // trip actions
  uploadImage: (imageUri: string, userId: string) => Promise<string | null>;
  createTrip: (trip: TripFormData) => Promise<Trip | null>;
  updateTrip: (
    tripId: string,
    updatedTrip: TripFormData,
  ) => Promise<Trip | null>;
  deleteTrip: (tripId: string) => Promise<void>;
  fetchTripsAndCategories: () => Promise<void>;
  searchTrips: (query: string) => void;
  filterTripsByCategory: (selectedCategories: string[]) => void;
  applyFilters: () => void;
  // loading and error states
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  allTrips: [],
  upcomingTrip: [],
  categories: [],
  selectedCategories: [],
  query: '',
  isLoading: false,
  error: null,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),

  uploadImage: async (imageUri: string, userId: string) => {
    try {
      let blob: Blob;
      try {
        const response = await fetch(imageUri);
        blob = await response.blob();
        console.log('Blob size:', blob.size); // Check if blob is valid
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError; // Ensure we catch the issue
      }

      const arrayBuffer = await new Response(blob).arrayBuffer();
      const fileName = `images/user-${userId}.jpg`;

      const { error } = await supabase.storage
        .from('trip-images')
        .upload(fileName, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        console.log('error', error);
        throw error;
      }

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

      // const imageUrl: string | null = await get().uploadImage(
      //   tripData.image_url!,
      //   user.id,
      // );

      // if (!imageUrl) {
      //   throw new Error('Image not uploaded');
      // }

      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          title: tripData.title,
          description: tripData.description,
          destination: tripData.destination,
          start_date: tripData.range.startDate.toISOString(),
          end_date: tripData.range.endDate.toISOString(),
          budget: tripData.budget,
          persons: tripData.persons,
          image_url: '',
          existing_image_url: '',
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
  updateTrip: async (
    tripId: string,
    updatedTrip: TripFormData,
  ): Promise<Trip | null> => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }

      let imageUrl = updatedTrip.image_url;

      if (
        updatedTrip.image_url &&
        updatedTrip.image_url !== updatedTrip.existing_image_url
      ) {
        const newImageUrl = await get().uploadImage(
          updatedTrip.image_url,
          user.id,
        );
        if (!newImageUrl) {
          throw new Error('Image not uploaded');
        }
        imageUrl = newImageUrl;
      }

      const { data: trip, error } = await supabase
        .from('trips')
        .update({
          title: updatedTrip.title,
          description: updatedTrip.description,
          destination: updatedTrip.destination,
          start_date: updatedTrip.range.startDate,
          end_date: updatedTrip.range.endDate,
          budget: updatedTrip.budget,
          persons: updatedTrip.persons,
          image_url: imageUrl,
        })
        .eq('id', tripId)
        .select()
        .single();

      if (error) throw error;
      if (!trip) throw new Error('Trip not updated.');

      if (updatedTrip.categories) {
        await supabase.from('trip_categories').delete().eq('trip_id', tripId);
        if (updatedTrip.categories.length > 0) {
          const { error: categoriesError } = await supabase
            .from('trip_categories')
            .insert(
              updatedTrip.categories.map((categoryId) => ({
                trip_id: tripId,
                category_id: categoryId,
              })),
            );
          if (categoriesError) throw categoriesError;
        }
      }

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId ? updatedTrip : trip,
        ),
      }));
      return updatedTrip;
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTrip: async (tripId) => {},
  fetchTripsAndCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }

      const [trips, categories] = await Promise.all([
        supabase
          .from('trips')
          .select(
            `
          *,
          trip_categories:trip_categories(*),
          categories:trip_categories(category_id, categories(*))
        `,
          )
          .eq('user_id', user.id)
          .order('start_date', { ascending: true }),

        supabase.from('categories').select('*').order('name'),
      ]);

      if (trips.error) throw trips.error;
      if (categories.error) throw categories.error;
      set({
        trips: trips.data,
        allTrips: trips.data,
        categories: categories.data,
        upcomingTrip: trips.data.length > 0 ? [trips.data[0]] : [],
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  searchTrips: (query: string) => {
    set({ query });
    get().applyFilters();
  },
  filterTripsByCategory: (selectedCategories: string[]) => {
    set({ selectedCategories });
    get().applyFilters();
  },
  applyFilters: () => {
    const { allTrips, query, selectedCategories } = get();

    let filteredTrips = allTrips;

    // Apply search filter
    if (query.trim()) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.trip_categories.some((cat) =>
          selectedCategories.includes(cat.category_id),
        ),
      );
    }

    set({ trips: filteredTrips });
  },
}));
