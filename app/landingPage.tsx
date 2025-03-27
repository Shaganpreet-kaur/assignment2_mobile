import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import supabase from '../components/supabaseClient';
import { Session } from '@supabase/supabase-js';

export default function LandingPage() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{
    first_name: string;
    last_name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check current session when component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        router.replace('/sign-in');
      } else {
        fetchUserDetails(session.user.id);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.replace('/sign-in');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_details')
        .select('first_name, last_name, email')
        .eq('uuid', userId)
        .single();

      if (error) throw error;
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/sign-in');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome !</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Email:</Text> {session?.user?.email || userDetails?.email}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>User ID:</Text> {session?.user?.id}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
});