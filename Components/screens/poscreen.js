import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SelectionList, TouchableOpacity, Alert, Button } from 'react-native';
import * as Font from 'expo-font';
import { useDispatch } from 'react-redux';

import Colors from '../../Constants/colors';
import PubBackground from '../PubBackground';

import { MENU } from '../../data/menus';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../../models/cart-item';
import optionsModel from '../../models/options';
import { AppLoading } from 'expo';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';

const poscreen = props => {
    const dispatch = useDispatch();
    const [prices, setPrices] = useState();
    const [options, setOptions] = useState();
    const [dataLoaded, setdataLoaded] = useState(false);
   
    
    const product = props.navigation.getParam('product');
    const item = product.item;
    const selectedProduct = item.title;

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

        var options = item.options;
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

    toggleSelected = (thisitem) => {
        //console.log(thisitem.name + ":" + thisitem.size + ":" + thisitem.price + ":" + thisitem.isSelected);
        
        var selected = thisitem.isSelected ? false : true;
        var Notselected = thisitem.isSelected ? true : false;
        var localprices = prices.map(item => {
            if (item.size === thisitem.size && item.price === thisitem.price) {
                item.isSelected = selected;
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
        //console.log('size:' + size + ' options:' + options + ' name:' + selectedProduct);
     //   console.log('b4thiitem:' + price);
        price = price.toString().replace(',','');
        price = parseFloat(price);
      //  console.log(price);
        const thisitem = new CartItem(1,
            selectedProduct, size, selectedoptions, price
        );
     //       console.log('thiitem:' + thisitem.price);
        dispatch(cartActions.addToCart(thisitem));



    };
    //console.log(dataLoaded);
    //fetchData(item);
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchData(item)}
                onFinish={() => {
                 //   console.log('data-loaded');
                    setdataLoaded(true);
                }}
            />
        )
    }
    return (
        <PubBackground>
        <View>
            <Text style={styles.headline}>
                {item.title}
            </Text>
        {    <FlatList
                keyExtractor={(item, index) => item.size}
                data={prices}
                renderItem={renderGridItem}
                numColumns={1}
            />}
            <Text style={styles.headline}>
                Options:
            </Text>
            <FlatList
                keyExtractor={(item, index) => item.name}
                data={options}
                renderItem={renderOptions}
                numColumns={1}
            />
            <Button title="Add to Order!"
                onPress={addToOrder} />
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
