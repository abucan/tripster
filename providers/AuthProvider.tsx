import React, { PropsWithChildren, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { setSession, setIsLoading } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
      SplashScreen.hideAsync();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
};