import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSegments } from 'expo-router';

import { Session } from '@supabase/supabase-js';

const PROTECTED_GROUPS = ['(protected)'];

export function useProtectedRoute(session: Session | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthGroup = segments[0] === '(auth)';
    const isProtectedGroup = PROTECTED_GROUPS.includes(segments[0]);

    if (!session && !isAuthGroup) {
      router.replace('/login');
    } else if (session && !isProtectedGroup) {
      router.replace('/(protected)/(tabs)/home');
    }
  }, [session, segments, isLoading, router]);
}
