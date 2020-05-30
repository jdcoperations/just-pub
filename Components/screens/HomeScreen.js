import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';

import Colors from '../../Constants/colors';

import { PUBS } from '../../data/pubs';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';

const HomeScreen = props => {
    
    return (
        <View style={styles.screen}>
            <Text style={styles.headline}> Welcome to Just-Pub!</Text>
            <Image style={styles.imgStyle} source={require('../../assets/images/IconBeer.png')}/>
            <Button onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Pubs',
                        
                    });}}>View Pubs</Button>
            <Button onPress={() => {
                    props.navigation.navigate({
                        routeName: 'SignIn',
                        
                    });}}>Sign In / Register</Button>
        </View>
    );
};

HomeScreen.navigationOptions = {
    headerTitle: 'Just-Pub!',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    headline: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.darkest,
        fontFamily: 'Baloo',
        justifyContent: "center",
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