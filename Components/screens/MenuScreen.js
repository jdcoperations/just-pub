import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';

import Colors from '../../Constants/colors';

import { CATEGORIES } from '../../data/categories';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';

const MenuScreen = props => {
    
    const renderGridItem = itemData => {
        
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Menu2',
                        params: {
                            pubId: PubId,
                            menuClass: itemData.item.name

                        }
                    });
                }}>
                <View>
                    <Image style={styles.imgStyle} source={{
                        uri: `${itemData.item.iconUrl}`
                    }} />
                    <Text style={styles.headline}>{itemData.item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const PubId = props.navigation.getParam('pubId');
    
    
    return (
        <FlatList
            keyExtractor={(item, index) => item.name}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

MenuScreen.navigationOptions = navigationData => {
    const PubId = navigationData.navigation.getParam('pubId');
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
        headerTitle: 'Menu'
            }
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
        height: 50,
        width: 50,
    },
    headline: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.white,
        fontFamily: 'Baloo',
        justifyContent: "center",
    }
});

export default MenuScreen;
