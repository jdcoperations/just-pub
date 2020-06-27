import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/colors';

import { PUBS } from '../../data/pubs';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import HeaderButton from '../Button/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Input from '../Input';
import Card from '../Card';

const drinkImage = require('../../assets/images/pint.jpg');
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDTE';
const image = { uri: "" };

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputvalidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const HomeScreen = props => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });


  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.screen}>



      <ImageBackground
        source={drinkImage}
        style={styles.image}>
        <Card style={styles.center}>
          <View style={styles.textBG}>
            <Text style={styles.headline}> Welcome to Just-Pub!</Text>
            {/*  <Image style={styles.imgStyle} source={require('../../assets/images/IconBeer.png')} /> */}
            <Text style={styles.headline2}>
              Order your drinks from the comfort of your table and pay by contactless when your drinks are delivered.
            </Text>
            <Text style={styles.headline2}>
              Please Login/Signup to continue.
            </Text>
          </View>
        </Card>
        <Button onPress={() => {
          props.navigation.navigate({
            routeName: 'Login',

          });

        }}>Login/Signup</Button>
      </ImageBackground>



    </KeyboardAvoidingView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Just-Pub!',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    }
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    marginHorizontal: 20
  },
  gridItem: {
    flex: 1,
    margin: 15,
    margin: 30,
    padding: 20,
    borderColor: Colors.darkest,
    borderRadius: 10,
    borderWidth: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark,
  },
  imgStyle: {
    height: 150,
    width: 150,
    marginVertical: 20
  },
  headline: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.darkest,
    fontFamily: 'Baloo-bold',
    justifyContent: "center",
  },
  headline2: {
    margin: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.darkest,
    fontFamily: 'Baloo',
    justifyContent: "center",
  },
  form: {
    width: '90%',
    justifyContent: 'center',
    margin: 15
  },
  label: {
    fontFamily: 'Baloo',
    padding: 10
  },
  input: {
    padding: 10,
    backgroundColor: Colors.dark,
    fontFamily: 'Baloo'
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBG: {

  }
});

export default HomeScreen;

/*
export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'Baloo': require('../../assets/fonts/Baloo_Da_2/BalooDa2-Regular.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  state = {
    loggedIn: false,
    facebookUserInfo: {},
    hasError: false,
    fontLoaded: false,
  }

  static getDerivedStatusFromError(error) {
    return { hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log("error" + error + ":" + errorInfo);
  }

  guest = () => {
    Alert.alert('Guest', 'Some features will not be available');
  }
  logIn = async() => {
    try {
      await Facebook.initializeAsync('522060078508503');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        const facebookUserInfo = await response.json();
        // console.log(facebookUserInfo);
        // console.log(permissions);
        this.setState({
        loggedIn: true,
        facebookUserInfo

      });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  renderFaceBookUserInfo = () => {
    return this.state.loggedIn ? (
      <View style={styles.facebookUserInfo}>
        <Text style={styles.facebookUserInfoLabel}>Name:</Text>
        <Text style={styles.facebookUserInfoText}>
          {this.state.facebookUserInfo.name}
        </Text>
        <Text style={styles.facebookUserInfoLabel}>User ID:</Text>
        <Text style={styles.facebookUserInfoText}>
          {this.state.facebookUserInfo.id}
        </Text>
        <Text style={styles.facebookUserInfoLabel}>Email:</Text>
        <Text style={styles.facebookUserInfoText}>
          {this.state.facebookUserInfo.email}
        </Text>
      </View>
    ) : null;
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      facebookUserInfo: {}
    });
  }



  landingScreen = () => {
    return this.state.loggedIn ? (
      <View>
        <Text>Hi {this.state.facebookUserInfo.name}</Text>

        <Button onPress={this.logOut}>
          Logout
        </Button>
        <NavBar/>

      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.imgView}>
          <Image style={styles.imgstyle} source={require('../../assets/images/IconBeer.png')}/>
        </View>
        <Text style={styles.headerText}>You must be signed in to use this app, registration is free!</Text>

        <View style={styles.buttonLine}>
          <Button onPress={this.logIn}>Sign In</Button>
          <Button onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Pub',
                        params: {
                            pubId: itemData.item.id
                        }
                    });}}>View Pubs</Button>
        </View>
          {this.renderFaceBookUserInfo()}
      </View>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong</Text>
        </View>
      );
    } else if (this.state.fontLoaded) {
      return (
        <ErrorBoundary>
        <View style={styles.container}>
          <View style={styles.heading}>
              <Text style={styles.headingTxt}>Just-Pub</Text>
          </View>
          {this.landingScreen()}
        </View>
        </ErrorBoundary>
      );
    } else {
      return null;
    }
  };


} */

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  heading: {
    marginTop: 35,
  },
  headingTxt: {
    color: Colors.dark,
    fontSize: 40,
    //fontFamily: 'Baloo',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: Colors.darkest,
    borderRadius: 10,
    borderColor: Colors.darkest,
    borderWidth: 3

  },
  buttonText: {
    color: Colors.light,
    fontSize: 30,
    fontFamily: 'Baloo',
  },
  headerText: {
    padding: 30,
    fontSize: 20,
    fontFamily: 'Baloo',
    alignItems: 'center'
  },
  facebookUserInfo: {
    paddingTop: 30,
    fontFamily: 'Baloo',
  },
  facebookUserInfoText: {
    fontSize: 24,
    fontFamily: 'Baloo',
  },
  facebookUserInfoLabel: {
    fontSize: 20,
    marginTop: 10,
    color: '#474747',
    fontFamily: 'Baloo',
  },
  buttonLine: {
    flexDirection: 'row',
    padding: 10
  },
  imgstyle: {
    width: 200,
    height: 200,
  },
  imgView: {
    justifyContent: 'flex-start',

  }
}); */