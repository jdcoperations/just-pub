import React, { useState, ImageBackground } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import MainNavigator from './Navigation/pubsNavigator';

import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import categoriesReducer from './store/reducers/categories';
import itemsReducer from './store/reducers/items';

const drinkImage = require('./assets/images/pint.jpg');

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
  items: itemsReducer
});
enableScreens();

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
 
const fetchFonts = () => {
  return Font.loadAsync({
    'Baloo': require('./assets/fonts/Baloo_Da_2/BalooDa2-Regular.ttf'),
    'Baloo-bold': require('./assets/fonts/Baloo_Da_2/BalooDa2-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

/* import * as React from 'react';
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
} */