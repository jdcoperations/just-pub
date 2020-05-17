import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Permissions} from'expo';

import HomeScrn from './Components/screens/HomeScreen';
import PubsScrn from './Components/screens/PubsScreen';
import MyMap from './Components/Map/Map';

function HomeScreen() {
  return (
    <HomeScrn/>
  );
}

function PubsScreen() {
  return (
    <PubsScrn/>
  );
}

function MyMaps() {
  return(
    <MyMap/>
  )
}
const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator> 
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pubs" component={PubsScreen} />     
        <Tab.Screen name="Maps" component={MyMaps}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}