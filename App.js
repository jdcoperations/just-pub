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
import pubReducer from './store/reducers/pub';

const drinkImage = require('./assets/images/pint.jpg');

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  pub: pubReducer
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
