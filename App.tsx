import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthProvider';

// This component will protect our routes
const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to the sign-in page
      router.replace('/sign-in');
    } else if (session && inAuthGroup) {
      // Redirect away from the auth pages
      router.replace('/');
    }
  }, [session, loading, segments]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}