import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SelectionList, TouchableOpacity, Alert, Button, ActivityIndicator, Modal } from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../Constants/colors';
import PubBackground from '../PubBackground';

import { MENU } from '../../data/menus';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../../models/cart-item';
import optionsModel from '../../models/options';
import { AppLoading } from 'expo';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';
import * as itemActions from '../../store/actions/items';
import colors from '../../Constants/colors';
import Mixers from '../screens/Mixers';

const snackscreen = props => {
    const dispatch = useDispatch();
    const [prices, setPrices] = useState();
    const [options, setOptions] = useState();
    const [dataLoaded, setdataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const PubId = useSelector(state => state.pub.pubId);
    const snacks = useSelector(state => state.items.availableSnacks);
    const [localSnacks, setLocalSnacks] = useState();
    //  const product = props.navigation.getParam('product');
  //  const item = product.item;
   // const selectedProduct = item.title;

    const loadSnacks = useCallback(async () => {
        setError(null);
        setIsLoading(true);
       // console.log('pre-try');
        try {
         //   console.log('menu2 in try block');
            await dispatch(itemActions.getSnacks(PubId));
            
        } catch (err) {
       //     console.log('error in loadSnacks' + err.message);
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);
    
    useEffect(() => {
        loadSnacks();
    }, [dispatch, loadSnacks]);

    /* fetchData = (item) => {
        //  var item = props.navigation.getParam('item');
        setdataLoaded(false);
        var prices = item.prices;
        prices = prices.map(item => {
            item.name = item.name;
            item.price = item.price;
            item.isSelected = false;
            return item;
        });

        setPrices(prices);
        setdataLoaded(true);
    }; */

    toggleSelected = (thisitem) => {
      //  console.log(thisitem.id + ":" + thisitem.name + ":" + thisitem.price);

        var selected = thisitem.isSelected ? false : true;
        var Notselected = thisitem.isSelected ? true : false;
        var localprices = snacks.map(item => {
            if (item.name === thisitem.name) {
                item.isSelected = selected;
            } else {
                item.isSelected = Notselected;
            }
            return item;
        })
        setPrices(localprices);

    };

    renderGridItem = itemData => {
        var name = itemData.item.name;
        // console.log("renderGrid:" + itemData.item.name + ":" + itemData.item.size + ":" + itemData.item.isSelected + ':' + itemData.item.price + ':');


        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => { toggleSelected(itemData.item) }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{name}</Text>
                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>£{(itemData.item.price.toFixed(2))}</Text>

                </View>
            </TouchableOpacity>
        );
    };

    addToOrder = () => {
        //console.log('in add to order');
        var price;
        var name = snacks.map(item => {
            if (item.isSelected) {
                //  console.log(item);
                price = item.price;
                return item.name;
            }
        });
       
        //    console.log('in addtoorder' + price);

        //console.log('size:' + size + ' options:' + options + ' name:' + selectedProduct);
        //   console.log('b4thiitem:' + price);
        price = price.toString().replace(',', '');
        price = parseFloat(price);
        //  console.log(price);
        const thisitem = new CartItem(1,
            name, '', '', price
        );
        //       console.log('thiitem:' + thisitem.price);
        dispatch(cartActions.addToCart(thisitem));

        Alert.alert('Just-Pub!', 'Item added to your tray!');

    };
    //console.log(dataLoaded);
    //fetchData(item);
    if (isLoading) {
        return (
            <PubBackground>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.darkest} />
                </View>
            </PubBackground>
        );
    };

   /*  if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchData(item)}
                onFinish={() => {
                    //   console.log('data-loaded');
                    setdataLoaded(true);
                }}
            />
        )
    }; */


    return (
        <PubBackground>

            <View>
                <Text style={styles.headline}>
                   
                </Text>
                {<FlatList
                    keyExtractor={(item, index) => item.id}
                    data={snacks}
                    renderItem={renderGridItem}
                    numColumns={1}
                />}
                

                <Button title="Add to Order!"
                    onPress={addToOrder} />
            </View>
        </PubBackground>

    )
};

snackscreen.navigationOptions = props => {
    const menuClass = props.navigation.getParam('menuClass');
    const PubId = props.navigation.getParam('pubId');
    // console.log('poscreen-nav:' + PubId);
    return {
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Tray"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        props.navigation.navigate({
                            routeName: 'Tray',
                            params: {
                                pubId: PubId
                            }
                        });
                    }} />
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
    modal: {

        alignItems: 'center',
        justifyContent: 'center',
        margin: 30

    },
    modalView: {
        margin: 50,
        backgroundColor: Colors.white,
        opacity: 0.9,
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: Colors.darkest,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    gridItemSelected: {
        flex: 1,
        margin: 15,
        padding: 20,
        borderColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark,
    },
    gridItemNotSelected: {
        flex: 1,
        margin: 15,
        padding: 20,
        borderColor: Colors.darkest,
        borderRadius: 10,
        borderWidth: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white
    },
    imgStyle: {
        height: 50,
        width: 50,
    },
    headline: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.white,
        fontFamily: 'Baloo',
        justifyContent: "center",
    },
    priceNotSelected: {
        color: Colors.dark,
        paddingHorizontal: 30
    },
    priceSelected: {
        color: Colors.white,
        paddingHorizontal: 30
    },
    line: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    }
});

export default snackscreen;
