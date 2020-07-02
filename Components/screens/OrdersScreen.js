import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Platform } from 'react-native';
import * as Font from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/colors';
import PubBackground from '../PubBackground';

import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Button/HeaderButton';
import * as ordersActions from '../../store/actions/orders';


const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    var orders = useSelector(state => state.orders.openOrders);
    const dispatch = useDispatch();

    //const PubId = props.navigation.getParam('pubId');
    const Pubid = '6c69c5dc-2d64-4c85-9009-3ad0562d4b6d';

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (orders.length > 0 ){
         //       console.log('clearing orders');
                orders = await dispatch(ordersActions.clearOrders(Pubid));
            }
            await dispatch(ordersActions.fetchOrders(Pubid));
        } catch (err) {
        //    console.log('error in fetchOrders=' + err.message);
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    const updateOrders = useCallback(async (pubId, orderId, status) => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(ordersActions.updateOrder(pubId, orderId, status))
        } catch (err) {
          //  console.log('error in update:' + err);
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

      /* useEffect(() => {
          const willFocusSub = props.navigation.addListener(
              'willFocus',
              loadOrders
          );
  
          return () => {
              willFocusSub.remove();
          };
      }, [loadOrders]);  */

    useEffect(() => {
        loadOrders();
    }, [dispatch, loadOrders]);

    const onRefreshList = () => {
        setIsRefreshing(true);
        orders = [];
       // console.log('refreshing');
        loadOrders;
        setIsRefreshing(false);
    };

    if (isLoading) {
        return (
            <PubBackground>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.darkest} />
                </View>
            </PubBackground>
        );
    }

    if (!isLoading && orders.length === 0) {
        return (
            <PubBackground>
                
                    <View style={styles.centered}>
                        <Text style={styles.headline}>No new orders found - check back soon!</Text>
                        <Button onPress={loadOrders}>Refresh!</Button>
                    </View>
                
            </PubBackground>


        );
    }
    const renderGridItem = itemData => {
        const id = itemData.item.id;
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    updateOrders(Pubid, id, "ACCEPTED");
                    props.navigation.navigate({
                        routeName: 'Process',
                        params: {
                            orderId: id


                        }
                    });
                }}>
                <View>

                    <Text style={styles.headline}>Table: {itemData.item.tableNo}</Text>

                </View>
            </TouchableOpacity>
        );
    };



    return (
        <PubBackground>
            <View style={styles.screen}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={orders}
                    renderItem={renderGridItem}
                    numColumns={1}
                    refreshing={isLoading}
                    onRefresh={onRefreshList}

                />
            </View>
            <Button onPress={loadOrders}>Refresh!</Button>
        </PubBackground>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
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

export default OrdersScreen;