import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSegments } from 'expo-router';

import { Session } from '@supabase/supabase-js';

export function useProtectedRoute(session: Session | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthGroup = segments[0] === '(auth)';
    const isTabsGroup = segments[0] === '(tabs)';

    if (!session && !isAuthGroup) {
      router.replace('/login');
    } else if (session && !isTabsGroup) {
      router.replace('/(tabs)/home');
    }
  }, [session, segments, isLoading, router]);
}
