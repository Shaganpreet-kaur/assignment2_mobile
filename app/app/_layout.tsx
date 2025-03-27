import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import  supabase  from '../../components/supabaseClient';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (session && inAuthGroup) {
        router.replace('/landing-page');
      } else if (!session && !inAuthGroup) {
        router.replace('/sign-in');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (session && inAuthGroup) {
        router.replace('/landing-page');
      } else if (!session && !inAuthGroup) {
        router.replace('/sign-in');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <Slot />;
}