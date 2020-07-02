import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/colors';
import PubBackground from '../PubBackground';

import { CATEGORIES } from '../../data/categories';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';
import * as categoriesActions from '../../store/actions/categories';

const MenuScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const categories = useSelector(state => state.categories.availableCategories);
    const dispatch = useDispatch();

    const PubId = props.navigation.getParam('pubId');

    const loadCats = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(categoriesActions.fetchCategories(PubId));
        } catch (err) {
       //     console.log('error in fetchCats' + err.message);
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadCats
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadCats]);

    useEffect(() => {
        loadCats();
    }, [dispatch, loadCats]);

    if (isLoading) {
        return (
            <PubBackground>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.darkest} />
                </View>
            </PubBackground>
        );
    }

    if (!isLoading && categories.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. </Text>
            </View>
        );
    }
    const renderGridItem = itemData => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    if (itemData.item.name === 'Bar Snacks') {
                        props.navigation.navigate({
                            routeName: 'SnackScreen',
                            params: {
                                pubId: PubId,
                                menuClass: itemData.item.name
    
                            }
                        });
                    } else {
                        props.navigation.navigate({
                        routeName: 'Menu2',
                        params: {
                            pubId: PubId,
                            menuClass: itemData.item.name

                        }
                    });
                }
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



    return (
        <PubBackground>
            <View style={styles.screen}>
                <FlatList
                    keyExtractor={(item, index) => item.name}
                    data={categories}
                    renderItem={renderGridItem}
                    numColumns={2}
                />
            </View>
        </PubBackground>
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
                    }} />
            </HeaderButtons>
        ,
        headerTitle: 'Menu'
    }
};

const styles = StyleSheet.create({
    screen: {
      
        width: '100%'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        padding: 20,
        borderColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        height: 100,
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
