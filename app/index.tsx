import React, { useState } from 'react';
import SignIn from '../components/sign_in';
import WelcomePage from '../components/welcome';
import CityScreen from '../components/city';
import { Screen, CityName } from '../components/type';

export default function App() {
  const [screen, setScreen] = useState<Screen>('SignIn');
  const [selectedCity, setSelectedCity] = useState<CityName | null>(null);
  const [isSignedIn, setSignedIn] = useState(false); 

  const push = (newScreen: Screen, city: CityName | null = null) => {
    setScreen(newScreen);
    setSelectedCity(city);
  };

  if (!isSignedIn) return <SignIn push={push} setSignedIn={setSignedIn} />; 

  if (screen === 'WelcomePage') return <WelcomePage push={push} />;
  if (screen === 'City' && selectedCity) return <CityScreen city={selectedCity} push={push} />;

  return null;
}
