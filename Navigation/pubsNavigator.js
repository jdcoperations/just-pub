import { Platform } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
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
import Login from '../Components/screens/LoginSignup';
import OrdersScreen from '../Components/screens/OrdersScreen';
import ProcessOrder from '../Components/screens/ProcessOrder';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../Constants/colors';



const StaffNavigator = createStackNavigator(
    {
        
        Orders: {
            screen: OrdersScreen
        },
        Process: {
            screen: ProcessOrder
        },
        Login: {
            screen: Login
        },
    },
    
);

const PubsNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                drawerIcon: drawerConfig => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={drawerConfig.tintColor}
                    />
                )
            }
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
                title: 'Options'

            }
        },
        Login: {
            screen: Login
        }

    },
    {
        
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.darkest : ''
            },
            headerTintColor:
                Platform.OS === 'android' ? Colors.white : Colors.dark,
            
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Pubs: PubsNavigator,
        Staff: StaffNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.dark
        }
    }
);

export default createAppContainer(MainNavigator);