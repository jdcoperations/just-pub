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

const poscreen = props => {
    const dispatch = useDispatch();
    const [prices, setPrices] = useState();
    const [options, setOptions] = useState();
    const [dataLoaded, setdataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const Options2 = useSelector(state => state.items.availableOptions);
    const [modalVisible, setModalVisible] = useState(false);
    const mixers = useSelector(state => state.items.availableMixers);
    const PubId = useSelector(state => state.pub.pubId);
    const product = props.navigation.getParam('product');
    const item = product.item;
    const selectedProduct = item.title;
    const [itemSelected, setItemSelected] = useState(false);

    const loadOpts = useCallback(async () => {
        // console.log('in loadopts');
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(itemActions.getOptions(PubId, item.description));
        } catch (err) {
            //     console.log('error in fetchOpts' + err.message);
            setError(err.message);
        }
        // console.log('end of loadOpts');
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    const loadMixers = useCallback(async () => {
        // console.log('in loadMixers');
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(itemActions.getMixers(PubId, 'mixers'));
        } catch (err) {
            //    console.log('error in fetchOpts' + err.message);
            setError(err.message);
        }
        // console.log('end of loadMmixers');
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadOpts
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadOpts]);

    useEffect(() => {
        loadOpts();
    }, [dispatch, loadOpts]);

    useEffect(() => {
        loadMixers();
    }, [dispatch, loadMixers]);

    fetchData = (item) => {
        //  var item = props.navigation.getParam('item');

        var prices = item.prices;
        prices = prices.map(item => {
            item.name = item.title;
            item.size = item.size;
            item.price = item.price;
            item.isSelected = false;
            return item;
        });

        setPrices(prices);
        //   console.log('in fetchdata: ' + Options2)
        //var options = item.options;
        var options = Options2;
        //  console.log(options);
        options = options.map(item => {
            //console.log(item.name);
            item.name = item.name;
            item.isSelected = false;
            return item;
        });

        setOptions(options);
        setdataLoaded(true);
        //console.log('leaving fetch Data:' + dataLoaded);
        //console.log('options:' + options);


    };

    updatePrices = (thisItem) => {
        //  console.log('thisitem:' + thisItem.name);
        var prices = item.prices;
        var mixer = mixers.map(thismixer => {
            //    console.log('updatePrices:' + thismixer.name + '+' + thismixer.price);
            if (thismixer.name === thisItem.name) {
                //       console.log('gotmatch:' + thismixer.name);

                prices = prices.map(item => {
                    item.name = item.name;
                    item.size = item.size + ' + ' + thismixer.name;
                    item.price = item.price + thismixer.price;
                    item.isSelected = item.isSelected;
                    return item;
                });
                return mixer;
            }

        });



        setPrices(prices);
    };

    toggleSelected = (thisitem) => {
        //console.log(thisitem.name + ":" + thisitem.size + ":" + thisitem.price + ":" + thisitem.isSelected);

        var selected = thisitem.isSelected ? false : true;
        var Notselected = thisitem.isSelected ? true : false;
        setItemSelected(false);
        var localprices = prices.map(item => {
            if (item.size === thisitem.size && item.price === thisitem.price) {
                item.isSelected = selected;
                setItemSelected(true);
            } else {
                item.isSelected = Notselected;
            }
            return item;
        })
        setPrices(localprices);

    };

    toggleOptionSelected = (thisitem) => {
        //console.log('in toggleoptions:' + thisitem.name + ":" + thisitem.isSelected);

        var selected = thisitem.isSelected ? false : true;

        var localoptions = options.map(item => {
            if (item.name === thisitem.name) {
                item.isSelected = selected;
            }
            return item;
        })
        setOptions(localoptions);

    };

    renderGridItem = itemData => {
        var size = itemData.item.size;
        // console.log("renderGrid:" + itemData.item.name + ":" + itemData.item.size + ":" + itemData.item.isSelected + ':' + itemData.item.price + ':');


        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => { toggleSelected(itemData.item) }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{size}</Text>
                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>£{(itemData.item.price.toFixed(2))}</Text>

                </View>
            </TouchableOpacity>
        );
    };

    renderGridMixer = itemData => {
        mixerName = itemData.item.name;
        mixerPrice = itemData.item.price;
        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => {
                    updatePrices(itemData.item);
                    setModalVisible(false)
                }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{mixerName}</Text>
                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>£{(mixerPrice.toFixed(2))}</Text>

                </View>
            </TouchableOpacity>
        );
    };

    renderOptions = itemData => {
        // console.log('in render options:' + itemData.item.name + ":" + itemData.item.isSelected);
        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => { toggleOptionSelected(itemData.item) }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{itemData.item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    addToOrder = () => {
        if (!itemSelected) {
            Alert.alert('Just-Pub!', 'Please select an item size');
            return;
        }
        //console.log('in add to order');
        var name;
        //console.log('state: ' + state);
        //var prices = prices;
        //console.log(prices);
        var size = prices.map(item => {
            if (item.isSelected) {
                //  console.log(item);
                name = item.name;
                return item.size;
            }
        });
        var price = prices.map(item => {
            if (item.isSelected) {

                return item.price;
            }
        });
        //    console.log('in addtoorder' + price);
        var selectedoptions = options.map(item => {
            if (item.isSelected) {
                return item.name;
            }
        });
        const optionsArray = [];
        for (const k in options) {
            if (options[k].isSelected) {
                optionsArray.push(options[k].name);
            }
        };
        //console.log('size:' + size + ' options:' + options + ' name:' + selectedProduct);
        //   console.log('b4thiitem:' + price);
        price = price.toString().replace(',', '');
        price = parseFloat(price);
        //  console.log(price);
        const thisitem = new CartItem(1,
            selectedProduct, size, optionsArray, price
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

    if (!dataLoaded && !isLoading) {
        return (
            <AppLoading
                startAsync={fetchData(item)}
                onFinish={() => {
                    //   console.log('data-loaded');
                    setdataLoaded(true);
                }}
            />
        )
    };


    return (
        <PubBackground>
            <Modal
                style={styles.modal}
                animationType='fade'
                visible={modalVisible}
                transparent={true}
            >
                <View style={styles.modalView}>
                    <FlatList
                        keyExtractor={(item, index) => item.id}
                        data={mixers}
                        renderItem={renderGridMixer}
                        numColumns={1}
                    />
                </View>
            </Modal>
            <View>
                <Text style={styles.headline}>
                    {item.title}
                </Text>
                {<FlatList
                    keyExtractor={(item, index) => item.size}
                    data={prices}
                    renderItem={renderGridItem}
                    numColumns={1}
                />}
                {item.description === 'Vodka' || item.description === 'Gin' || item.description === 'Spirits' ?
                    <Button
                        title='Add mixer?'
                        onPress={() => { setModalVisible(!modalVisible) }}
                        color={Platform.OS === 'android' ? Colors.dark : Colors.white} />
                    : null}

                <Text style={styles.headline}>
                    Options:
            </Text>

                <FlatList
                    keyExtractor={(item, index) => item.name}
                    data={options}
                    renderItem={renderOptions}
                    numColumns={1}
                />
                <View style={styles.buttonview}>
                    <Button
                        color={Platform.OS === 'android' ? Colors.dark : Colors.white}

                        title="Add to Order!"
                        onPress={addToOrder} />
                </View>
            </View>
        </PubBackground>

    )
};

poscreen.navigationOptions = props => {
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
    buttonview: {
       
        padding: 10,
        marginBottom: 10
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

export default poscreen;
