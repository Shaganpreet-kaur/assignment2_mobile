import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Screen } from '../components/type';

type CityName = 'Calgary' | 'Edmonton' | '';
type Props = { 
  city: CityName;
  push: (screen: Screen, city?: CityName) => void;
};

const CityScreen: React.FC<Props> = ({ city, push }) => {
  const [selectedCity, setSelectedCity] = useState<CityName>(city);

  useEffect(() => {
    setSelectedCity(city);
  }, [city]);

  const cityData: Record<CityName, { link: string; info: string }> = {
    '': {
      link: '',
      info: 'Please select a city to see the information.'
    },
    Calgary: {
      link: 'https://www.calgary.ca/home.html',
      info: 'Calgary is a city in Alberta, Canada, known for its beautiful natural landscapes and events like the Calgary Stampede.'
    },
    Edmonton: {
      link: 'https://www.edmonton.ca/',
      info: 'Edmonton is the capital of Alberta, famous for its arts scene and the West Edmonton Mall, one of the largest shopping malls in the world.'
    },
  };

  const handleTabChange = (city: CityName) => {
    setSelectedCity(city);
  };

  // Open the city page in the browser
  const openCityPage = (city: CityName) => {
    Linking.openURL(cityData[city].link).catch((err) =>
      console.error("Error opening URL: ", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {selectedCity}</Text>
      
      <View style={styles.cityInfoContainer}>
        <Text style={styles.cityInfo}>{cityData[selectedCity].info}</Text>
        
        <TouchableOpacity 
          onPress={() => openCityPage(selectedCity)} 
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Go to {selectedCity} city page</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedCity === 'Calgary' && styles.selectedTab]} 
          onPress={() => handleTabChange('Calgary')}
        >
          <Text style={styles.tabText}>Calgary</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCity === 'Edmonton' && styles.selectedTab]} 
          onPress={() => handleTabChange('Edmonton')}
        >
          <Text style={styles.tabText}>Edmonton</Text>
        </TouchableOpacity>
      </View>

      <Button title="Go Back" onPress={() => push('WelcomePage')} />
    </View>
  );
};

export default CityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  cityInfoContainer: { alignItems: 'center', marginBottom: 20 },
  cityInfo: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  linkButton: { marginTop: 10 },
  linkText: { fontSize: 16, color: 'blue', textDecorationLine: 'underline' },
  tabsContainer: { flexDirection: 'row', marginTop: 20 },
  tab: { padding: 10, marginHorizontal: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  selectedTab: { backgroundColor: '#ddd' },
  tabText: { fontSize: 18 },
});
