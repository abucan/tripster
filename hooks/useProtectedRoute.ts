import { useEffect } from 'react';

import {
  NavigationContainerRef,
  useNavigationState,
} from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';

const PROTECTED_GROUPS = ['(protected)'];

export function useProtectedRoute(session: Session | null, isLoading: boolean) {
  const state = useNavigationState((state) => state);

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = state.routes[state.index]?.name;

    const isAuthScreen = currentRoute?.startsWith('Auth'); // e.g., 'AuthLogin', 'AuthRegister'
    const isProtectedScreen =
      currentRoute?.startsWith('Trips') || currentRoute?.startsWith('Profile');

    if (!session && !isAuthScreen) {
      // navigationRef.current?.navigate('AuthLogin'); // replace with your actual login screen name
    } else if (session && !isProtectedScreen) {
      //  navigationRef.current?.navigate('Trips'); // replace with your default authenticated route
    }
  }, [session, isLoading, state]);
}
