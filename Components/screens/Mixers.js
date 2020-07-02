import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PubBackground from '../PubBackground';
import Colors from '../../Constants/colors';

import { MENU } from '../../data/menus';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import * as itemsActions from '../../store/actions/items';

const Mixers = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const items = useSelector(state => state.items.availableMixers);
    const PubId = useSelector(state => state.pub.pubId);
    const dispatch = useDispatch();
console.log('in mixer with pubid; ' + PubId + ' items: ' + items);
    const catId = 'mixers';
   // console.log('pubid:' +  PubId + ' menuClass:' + catId);

    const loadItems = useCallback(async () => {
        setError(null);
        setIsLoading(true);
       // console.log('pre-try');
        try {
         //   console.log('menu2 in try block');
            await dispatch(itemsActions.getMixers(PubId, catId));
        } catch (err) {
            console.log('error in fetchItems' + err.message);
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

   // console.log('menu2 sect 2');
   /*  useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadItems
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadItems]); */

    useEffect(() => {
        loadItems();
    }, [dispatch, loadItems]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.darkest} />
            </View>
        );
    }

    if (!isLoading && items.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }
    const renderGridItem = itemData => {
        
        return (
            
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    setModalVisible(!modalVisable)
                }}>
                <View>
                    
                    <Text style={styles.headline}>{itemData.item.name}</Text><Text>{itemData.item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    //const PubId = props.navigation.getParam('pubId');
    //const menuClass = props.navigation.getParam('menuClass');
    
    
    //const FILTERED_ITEMS = MENU.filter(menuItem => menuItem.pubId.indexOf(props.navigation.getParam('pubId')) >= 0 && menuItem.classification.indexOf(props.navigation.getParam('menuClass')) >= 0);
    
    return (
       
            <View style={styles.view}>
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={items}
            renderItem={renderGridItem}
            numColumns={1}
        />
        </View>
        
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        width: '100%'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        padding: 20,
        borderColor: Colors.white,
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

export default Mixers;
