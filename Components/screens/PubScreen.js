import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

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