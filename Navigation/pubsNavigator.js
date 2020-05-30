import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import PubsScreen from '../Components/screens/PubsScreen';
import HomeScreen from '../Components/screens/HomeScreen';
import PubScreen from '../Components/screens/PubScreen';
import SignInScreen from '../Components/screens/SignInScreen';
import MenuScreen from '../Components/screens/MenuScreen';

import Colors from '../Constants/colors';

const PubsNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
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