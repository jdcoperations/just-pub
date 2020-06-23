import React from 'react';
import { View, Text, Button, StyleSheet, Image, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../Components/Button/HeaderButton';

import { PUBS } from '../../data/pubs';

const PubScreen = props => {
  const PubId = props.navigation.getParam('pubId');

  const selectedPub = PUBS.find(pub => pub.id === PubId);
    
  return (
    <View style={styles.screen}>
      <Image style={styles.imgStyle} source={{
                        uri: `${selectedPub.ImageUrl}`
                    }} />
      <Button
        title="Place Your Order!"
        onPress={() => {
          props.navigation.navigate({
            routeName: 'Menu',
            params: {
                pubId: PubId
            }
          });
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
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
  }
});

export default PubScreen;