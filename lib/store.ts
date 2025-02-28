import { create } from 'zustand';

import { Session, User } from '@supabase/supabase-js';

import { supabase } from './supabase';

interface AuthStore {
  // user and session
  user: User | null;
  session: Session | null;
  setSession: (session: Session | null) => void;
  userEmail: string | null;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (token: string) => Promise<{ success: boolean; error?: string }>;
  resendOTP: () => Promise<{ success: boolean; error?: string }>;
  isEmailVerified: boolean;

  // loading and error states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  userEmail: null,
  isEmailVerified: false,
  isLoading: false,
  error: null,
  setSession: (session: Session | null) => set({ session }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ userEmail: email });
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.user?.confirmed_at === null) {
        set({ error: 'Email not verified' });
        return { success: false, error: 'Email not verified' };
      }

      set({ user: data.user, session: data.session });
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, session: null });
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  verifyOTP: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      if (!state.userEmail) {
        set({ error: 'No email found' });
        return { success: false, error: 'No email found' };
      }

      const { error } = await supabase.auth.verifyOtp({
        email: state.userEmail,
        token,
        type: 'signup',
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  resendOTP: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      if (!state.userEmail) {
        set({ error: 'No email found' });
        return { success: false, error: 'No email found' };
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: state.userEmail,
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
