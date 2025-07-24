import { create } from 'zustand';

import * as authService from '@/services/api/auth';
import { Session, User } from '@supabase/supabase-js';

interface AuthStore {
  // user and session
  user: User | null;
  session: Session | null;
  userEmail: string | null;
  isEmailVerified: boolean;
  isAwaitingVerification: boolean;

  // auth actions
  setSession: (session: Session | null) => void;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (token: string) => Promise<{ success: boolean; error?: string }>;
  resendOTP: () => Promise<{ success: boolean; error?: string }>;

  // loading and error states
  isLoading: boolean;
  error: string | null;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  userEmail: null,
  isEmailVerified: false,
  isAwaitingVerification: false,
  isLoading: false,
  error: null,
  setSession: (session: Session | null) => set({ session }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.signUp(email, password);
      if (!data.session) {
        set({ isAwaitingVerification: true });
      }
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
      const data = await authService.signIn(email, password);
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
      await authService.signOut();
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
      await authService.verifyOTP(state.userEmail, token);
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
      await authService.resendOTP(state.userEmail);
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
