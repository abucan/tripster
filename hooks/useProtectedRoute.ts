import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSegments } from 'expo-router';

import { Session } from '@supabase/supabase-js';

export function useProtectedRoute(session: Session | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  const protectedGroups = ['(tabs)'];

  useEffect(() => {
    if (isLoading) return;

    const isAuthGroup = segments[0] === '(auth)';
    const isProtectedGroup = protectedGroups.includes(segments[0]);

    if (!session && !isAuthGroup) {
      router.replace('/login');
    } else if (session && !isProtectedGroup) {
      router.replace('/(tabs)/home');
    }
  }, [session, segments, isLoading, router]);
}
