import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import credentials from '../credentials.json';
import { Screen } from '../components/type'; // 🔹 Import the Screen type from type.ts

type Props = { 
  push: (screen: Screen) => void;
  setSignedIn: (value: boolean) => void; // 🔹 Added setSignedIn as prop
};

const SignIn: React.FC<Props> = ({ push, setSignedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignIn = () => {
    setErrorMessage('');

    if (username.length < 5) {
      setErrorMessage('Username must be at least 5 characters long.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    const user = credentials.users.find(user => user.username === username && user.password === password);

    if (!user) {
      setErrorMessage('Invalid username or password.');
      return;
    }
    console.log("User signed in, updating state...");
    setSignedIn(true);

    
    push('WelcomePage'); // 🔹 Navigate to WelcomePage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { width: '100%', padding: 8, marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  error: { color: 'red', marginBottom: 10 },
});
