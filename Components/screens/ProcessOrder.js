import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActionSheetIOS, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PubBackground from '../PubBackground';
import Colors from '../../Constants/colors';
import CartItem from '../CartItem';
import Card from '../Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import { TextInput } from 'react-native-gesture-handler';
import Input from '../Input';



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const ProcessOrder = props => {

  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [tableNo, setTableNo] = useState();

const orderId = props.navigation.getParam('orderId');


  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const orders = useSelector( state => state.orders.openOrders);
  const orderIdx = orders.findIndex(order => order.id === orderId);
  const order = orders[orderIdx];
  
  console.log('got order: ' + order.id + 'totalAmount:' + order.totalAmount + 'tableno:' + order.tableNo);
  //+ 'totalAmount:' + order.totalAmount + 'tableno:' + order.tableNo
  /* const cartItems = useSelector(state => {
    const transformedCartItems = [];
    // console.log('cart:' + state.cart.items);
    for (const key in state.orders.availableOrders) {
      //   console.log('selector' + state.cart.items[key].product);
      transformedCartItems.push({
        productId: key,
        product: state.cart.items[key].product,
        price: state.cart.items[key].price,
        size: state.cart.items[key].size,
        options: state.cart.items[key].options
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  }); */
  //  console.log('intray with pubid:' + PubId);

  const cartItems = [];
for (const key in order.items) {
    
    
    cartItems.push({
        id: key,
        product: order.items[key].product,
        size: order.items[key].size,
        options: order.items[key].options,
        price: order.items[key].price
    });
};
console.log(cartItems);



  //cartItems.map( item => {console.log('MAPPING' + item.productId + item.product + item.size + "amount" + item.price)});
  return (
    <PubBackground>
      <View style={styles.screen}>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{' '}
            <Text style={styles.amount}>
              £{(order.totalAmount.toFixed(2))}
            </Text>
          </Text>
        
        </Card>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>Table No: {order.tableNo} </Text>
        </Card>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <CartItem
              size={itemData.item.size}
              title={itemData.item.product}
              amount={itemData.item.price}
              options={itemData.item.options}
              
              onRemove={() => {
                //   console.log('removing prodid:' + itemData.item.productId);
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />

      </View>
    </PubBackground>
  );
};

ProcessOrder.navigationOptions = {
  headerTitle: 'Order'
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    padding: 10,
    margin: 20,
    justifyContent: 'flex-start'
  },
  tno: {
    marginBottom: 10,
    padding: 10
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  InputCap: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '90%',
    height: 400,
    margin: 10
  },
  summaryText: {
    fontFamily: 'Baloo',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkest,
    borderWidth: 1,
    fontFamily: 'Baloo',
    fontSize: 18,
    padding: 5,
    marginBottom: 10
  },
  label: {
    fontSize: 18,
    fontFamily: 'Baloo',
    color: Colors.dark
  },
  form: {
    marginTop: 10
  }
});

export default ProcessOrder;
