import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';

import Colors from '../../Constants/colors';

import { CATEGORIES } from '../../data/categories';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';

const MenuScreen = props => {
    
    const renderGridItem = itemData => {
        
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'menu2',
                        params: {
                            pubId: PubId,
                            menuClass: itemData.item.name

                        }
                    });
                }}>
                <View>
                    
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

MenuScreen.navigationOptions = {
    headerTitle: 'Menu',
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
        height: 150,
        width: 150,
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
