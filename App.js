import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import PubsNavigator from './Navigation/pubsNavigator';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});
enableScreens();

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
 
const fetchFonts = () => {
  /* return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  }); */
  return Font.loadAsync({
    'Baloo': require('./assets/fonts/Baloo_Da_2/BalooDa2-Regular.ttf'),
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
      <PubsNavigator />
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