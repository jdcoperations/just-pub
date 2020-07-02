import React from 'react';
import { View, Text, StyleSheet, Image, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Button from '../Button/Button';

import HeaderButton from '../../Components/Button/HeaderButton';
import PubBackground from '../PubBackground';

import { PUBS } from '../../data/pubs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../Constants/colors';

const PubScreen = props => {
  const PubId = props.navigation.getParam('pubId');
  //console.log('in pubscren:' + PubId);
  const selectedPub = PUBS.find(pub => pub.id === PubId);
    
  return (
    <View style={styles.screen}>
      <PubBackground>
      <Image style={styles.imgStyle} source={{
                        uri: `${selectedPub.ImageUrl}`
                    }} />
      <Button
        onPress={() => {
          props.navigation.navigate({
            routeName: 'Menu',
            params: {
                pubId: PubId
            }
          });
        }}
      >Place Your Order!</Button>
      
      </PubBackground>
    </View>
  );
};

PubScreen.navigationOptions = navigationData => {
  const PubId = navigationData.navigation.getParam('pubId');

  const selectedPub = PUBS.find(pub => pub.id === PubId);

  return {
    headerRight: () => 
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Tray"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navigationData.navigation.navigate({
                routeName: 'Tray',
                params: {
                  pubId: PubId
                }
              });
          }}/>
      </HeaderButtons>
    ,
    headerTitle: selectedPub.Name
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgStyle: {
      height: 300,
      width: 300,
      margin: 10
  },
  text: {
    fontFamily: 'Baloo',
    color: colors.white
  }
});

export default PubScreen;