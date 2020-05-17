import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  Image} from 'react-native';
import Expo from 'expo';
import FBLoginButton from '../../FBLoginButton';
import * as Facebook from 'expo-facebook';
import * as Font from 'expo-font';

import Button from '../Button/Button';
import Colors from '../../Constants/colors';
import NavBar from '../NavBar/NavBar';

import {LandingImg} from '../../assets/images/IconBeer.png';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  getDerivedStatusFromError(error, errorInfo){
      this.setState({
          error: error,
          errorInfo: errorInfo
      })
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

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
          <Button onPress={this.guest}>Register</Button>
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

    
}

const styles = StyleSheet.create({
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
});