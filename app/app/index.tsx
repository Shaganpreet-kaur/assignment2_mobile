import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../(auth)/sign-in';
import SignUp from '../(auth)/sign-up';
import LandingPage from '../landingPage';
import { NavigationContainer } from '@react-navigation/native';

// Define the RootStackParamList type
type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  LandingPage: undefined;
};

// In your navigation setup file (e.g., App.tsx)
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}