import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SelectionList, TouchableOpacity, Alert, TouchableHighlightBase, Button } from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../Constants/colors';

import { MENU } from '../../data/menus';
import { FlatList } from 'react-native-gesture-handler';
import { getSupportedVideoFormats } from 'expo/build/AR';
import CartItem from '../../models/cart-item';
import optionsModel from '../../models/options';

class productOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: props.navigation.getParam('product'),
            loading: false,
            prices: [],
            options: [],
        };
    };
   
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.setState({ loading: true })
        var prices = this.state.selectedItem.item.prices;

        prices = prices.map(item => {
            item.name = this.state.selectedItem.item.title;
            item.size = item.size;
            item.price = item.price;
            item.isSelected = false;
            return item;
        });

        var options = this.state.selectedItem.item.options;
        options = options.map(item => {
            //console.log(item.name);
            item.name = item.name;
            item.isSelected = false;
            return item;
        });
        var item = new CartItem (
            null,
            null,
            null,
            null
        );
       //console.log('options:' + options);
        this.setState({
            loading: false,
            prices: prices,
            options: options,
            item: item
        });

    };

    toggleSelected(thisitem) {
       // console.log(thisitem.name + ":" + thisitem.size + ":" + thisitem.price + ":" + thisitem.isSelected);
        var prices = this.state.prices;
        var selected = thisitem.isSelected ? false : true;
        var Notselected = thisitem.isSelected ? true : false;
        prices = prices.map(item => {
            if (item.size === thisitem.size && item.price === thisitem.price) {
                item.isSelected = selected;
            } else {
                item.isSelected = Notselected;
            }
            return item;
        })
        this.setState({
            prices: prices
        })
       
    };

    toggleOptionSelected(thisitem) {
       // console.log('in toggleoptions:' + thisitem.name + ":" + thisitem.isSelected);
        var options = this.state.options;
        var selected = thisitem.isSelected ? false : true;

        options = options.map(item => {
            if (item.name === thisitem.name) {
                item.isSelected = selected;
            }
            return item;
        })
        this.setState({
            options: options
        })
        
    };

    renderGridItem = itemData => {
        var size = itemData.item.size;
        //console.log(itemData.item.name + ":" + itemData.item.size + ":" + itemData.item.isSelected);


        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => { this.toggleSelected(itemData.item) }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{size}</Text>
                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{itemData.item.price}</Text>

                </View>
            </TouchableOpacity>
        );
    };

    renderOptions = itemData => {
       // console.log('in render options:' + itemData.item.name + ":" + itemData.item.isSelected);
        return (
            <TouchableOpacity
                style={itemData.item.isSelected ? styles.gridItemSelected : styles.gridItemNotSelected}
                onPress={() => { this.toggleOptionSelected(itemData.item) }}>
                <View style={styles.line}>

                    <Text style={itemData.item.isSelected ? styles.priceSelected : styles.priceNotSelected}>{itemData.item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    addToOrder = () => {
        console.log('in add to order');
        
        //console.log('state: ' + state);
        var prices = this.state.prices;
        //console.log(prices);
        var size = prices.map(item =>  {
           if (item.isSelected) {
               return item.size;
           }
        })
        var options = this.state.options.map(item => {
            if (item.isSelected) {
                return item.name;
            }
        })
       // console.log('size:' + size + ' options:' + options);
            const thisitem = new CartItem (
                prices.name, size, options, prices.price
            );

            this.setState({
                item: thisitem
            });
            
                props.navigation.navigate({
                    routeName: 'Pub',
                    params: {
                        item: thisitem
                    }
                });
        
    };

    render() {
        return (

            <View>
                <Text style={styles.headline}>
                    {this.state.selectedItem.title}
                </Text>
                <FlatList
                    keyExtractor={(item, index) => item.size}
                    data={this.state.prices}
                    renderItem={this.renderGridItem}
                    numColumns={1}
                />
                <Text style={styles.headline}>
                    Options:
            </Text>
                <FlatList
                    keyExtractor={(item, index) => item.name}
                    data={this.state.options}
                    renderItem={this.renderOptions}
                    numColumns={1}
                />
                <Button title="Add to Order!" 
                onPress={this.addToOrder}/>
            </View>

        )
    };

}

/* 
const productOptions = props => {
    console.log(props);
    var [drinkOrder, setDrinkOrder] = useState({
        'drink': '',
        'size': '',
        'options': ''
    })

    const SelectedItem = props.navigation.getParam('product');
    console.log(SelectedItem.item.title);
    var prices = SelectedItem.item.prices;
    prices = prices.map(item => {
        item.size = item.size;
        item.price = item.price;
        item.isSelected = false;
        return item;
    });

    const options = SelectedItem.item.options;
    console.log('prices:' + prices);

    const renderGridItem = itemData => {
        const size = itemData.item.size;
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    setDrinkOrder = {'size': {size}}
                    console.log('change' + {drinkOrder});
                }}>
                <View style={styles.line}>
                    
                    <Text style={styles.price}>{size}</Text><Text style={styles.price}>{itemData.item.price}</Text><Text> {itemData.item.isSelected}</Text>
                </View>
            </TouchableOpacity>
        );
    }; 

    const renderOptions = itemData => {
    
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'ProductOpts',
                        
                    });
                }}>
                <View style={styles.line}>
                    
                    <Text style={styles.price}>{itemData.item}</Text>
                </View>
            </TouchableOpacity>
        );
    }; 

    
    return (
        <View>
            <Text style={styles.headline}>
                {SelectedItem.item.title}
            </Text>
            <FlatList
                keyExtractor={(item, index) => item.size}
                data={prices}
                renderItem={renderGridItem}
                numColumns={1}
            />
            <Text style={styles.headline}>
                Options:
            </Text>
            <FlatList
                keyExtractor={(item, index) => item}
                data={options}
                renderItem={renderOptions}
                numColumns={1}
            />
            <Button title="Add to Order!"/>
        </View>
    );
};
 */

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
        borderColor: Colors.darkest,
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
        color: Colors.dark,
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

export default productOptions;