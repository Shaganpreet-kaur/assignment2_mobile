import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Screen, CityName } from '../components/type';

<<<<<<< HEAD
type Props = { push: (screen: Screen, city?: CityName) => void }; 
=======
type Props = { push: (screen: Screen, city?: CityName) => void };
>>>>>>> 40453e5ae692c0f438b22b706470cb3c6e95f451

const WelcomePage: React.FC<Props> = ({ push }) => {
  const [selectedTab, setSelectedTab] = useState<CityName>('Calgary');

  const cityData: Record<CityName, { link: string; info: string }> = {
    '': {
      link: '',
      info: ''
    },
    Calgary: {
      link: 'https://www.calgary.ca/home.html',
      info: 'Calgary is a city in Alberta, Canada, known for its beautiful natural landscapes and events like the Calgary Stampede.'
    },
    Edmonton: {
      link: 'https://www.edmonton.ca/',
      info: 'Edmonton is the capital of Alberta, famous for its arts scene and the West Edmonton Mall, one of the largest shopping malls in the world.'
    }
  };

  const openCityPage = (city: CityName) => {
    Linking.openURL(cityData[city].link).catch((err) =>
      console.error("Error opening URL: ", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My New App</Text>

      <View style={styles.content}>
        <Image
          source={selectedTab === 'Calgary'
            ? require('../assets/calgary.webp')
            : require('../assets/edmonton.webp')
          }
          style={styles.cityImage}
        />
        <Text style={styles.cityInfo}>{cityData[selectedTab].info}</Text>
        <TouchableOpacity
          onPress={() => openCityPage(selectedTab)}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Go to {selectedTab} city page</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Calgary' && styles.selectedTab]}
          onPress={() => setSelectedTab('Calgary')}
        >
          <Text style={styles.tabText}>Calgary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Edmonton' && styles.selectedTab]}
          onPress={() => setSelectedTab('Edmonton')}
        >
          <Text style={styles.tabText}>Edmonton</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  cityImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  cityInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  linkButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  selectedTab: {
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
  },
});

export default WelcomePage;