import React, { useState } from 'react'; 
import SignIn from '../components/sign_in'; 
import WelcomePage from '../components/welcome'; 
import CityScreen from '../components/city'; 
import { Screen, CityName } from '../components/type';  

export default function App() { 
  // State to track the current screen, starting with 'SignIn'
  const [screen, setScreen] = useState<Screen>('SignIn'); 

  // State to track the selected city (null initially)
  const [selectedCity, setSelectedCity] = useState<CityName | null>(null); 

  // State to track whether the user is signed in
  const [isSignedIn, setSignedIn] = useState(false);     

  // Function to change the screen and optionally set a city
  const push = (newScreen: Screen, city: CityName | null = null) => {     
    setScreen(newScreen);  // Change the screen
    setSelectedCity(city); // Optionally update the selected city
  };    

  // If the user is not signed in, show the SignIn screen
  if (!isSignedIn) return <SignIn push={push} setSignedIn={setSignedIn} />;   

  // If the current screen is 'WelcomePage', show the WelcomePage
  if (screen === 'WelcomePage') return <WelcomePage push={push} />;   

  // If the current screen is 'City' and a city is selected, show the CityScreen
  if (screen === 'City' && selectedCity) return <CityScreen city={selectedCity} push={push} />;    

  // Default fallback, should never reach here unless something is wrong
  return null; 
}
