import { Platform } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import PubsScreen from '../Components/screens/PubsScreen';
import HomeScreen from '../Components/screens/HomeScreen';
import PubScreen from '../Components/screens/PubScreen';
import SignInScreen from '../Components/screens/SignInScreen';
import MenuScreen from '../Components/screens/MenuScreen';
import Menu2 from '../Components/screens/Menu2';
import productOptions from '../Components/screens/productOptionsScreen';
import poscreen from '../Components/screens/poscreen';
import scan from '../Components/screens/scan';
import Tray from '../Components/screens/tray';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/Button/HeaderButton';

import Colors from '../Constants/colors';


const PubsNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        scan: {
            screen: scan
        },
        Pubs: {
            screen: PubsScreen
        },
        Pub: {
            screen: PubScreen
        },
        SignIn: {
            screen: SignInScreen
        },
        Menu: {
            screen: MenuScreen
        },
        Menu2: {
            screen: Menu2
        },
        ProductOpts: {
            screen: productOptions,
            navigationOptions: {
                title: 'Options',

                headerRight: () =>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Tray"
                            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            onPress={() => {
                                navigationData.navigation.navigate('Tray')
                            }} />
                    </HeaderButtons>
                
            }

        },
        Tray: {
            screen: Tray
        },
        ProductOpts2: {
            screen: poscreen,
            navigationOptions: {
                title: 'Options',
               
            }
        }

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.darkest : ''
            },
            headerTintColor:
                Platform.OS === 'android' ? Colors.white : Colors.dark
        }
    }
);

export default createAppContainer(PubsNavigator);