import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';

import Colors from '../../Constants/colors';

import { MENU } from '../../data/menus';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';

const MenuDetail = props => {
    
    const renderGridItem = itemData => {
        
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'ProductOpts2',
                        params: {
                            product: itemData,
                            pubId: PubId
                        }
                    });
                }}>
                <View>
                    
                    <Text style={styles.headline}>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const PubId = props.navigation.getParam('pubId');
    const menuClass = props.navigation.getParam('menuClass');
    
    
    const FILTERED_ITEMS = MENU.filter(menuItem => menuItem.pubId.indexOf(props.navigation.getParam('pubId')) >= 0 && menuItem.classification.indexOf(props.navigation.getParam('menuClass')) >= 0);
    
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={FILTERED_ITEMS}
            renderItem={renderGridItem}
            numColumns={1}
        />
    );
};

MenuDetail.navigationOptions = navigationData => {
    const menuClass = navigationData.navigation.getParam('menuClass');
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
      headerTitle: menuClass
    };
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
        width: '90%',
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

export default MenuDetail;
