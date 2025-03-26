import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import supabase from '../../components/supabaseClient';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/type';

const SignUp = () => { 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      // 1. Sign up with auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: { first_name: firstName, last_name: lastName }
        }
      });
  
      if (authError) throw authError;
  
      // 2. Insert into user_details
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('user_details')
          .insert({
            uuid: authData.user.id,  
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase().trim()
          });
  
        if (insertError) throw insertError;
        
        router.replace('landingPage');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        setErrorMessage(
          error.message.includes('row-level security')
            ? "Permission denied. Please contact support."
            : error.message
        );
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput 
        style={styles.input} 
        placeholder="First Name" 
        value={firstName} 
        onChangeText={setFirstName} 
        autoCapitalize="words"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
        autoCapitalize="words"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button 
        title="Already have an account? Sign In" 
        onPress={() => router.push('/sign-in')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { width: '100%', padding: 8, marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  error: { color: 'red', marginBottom: 10 },
});

export default SignUp;