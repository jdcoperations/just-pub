import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../Constants/colors';
import CartItem from '../CartItem';
import Card from '../Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    console.log('cart:' + state.cart.items);
    for (const key in state.cart.items) {
      console.log('selector' + state.cart.items[key].product);
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
  });
  const dispatch = useDispatch();
  const PubId = props.navigation.getParam('pubId');
  console.log('intray with pubid:' + PubId);
  //cartItems.map( item => {console.log('MAPPING' + item.productId + item.product + item.size + "amount" + item.price)});
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
           £{(cartTotalAmount.toFixed(2))}
          </Text>
        </Text>
        <Button
          color={Colors.dark}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.createOrder(cartItems, cartTotalAmount, PubId));
            dispatch(cartActions.clearCart());
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            size={itemData.item.size}
            title={itemData.item.product}
            amount={itemData.item.price}
            options={itemData.item.options}
            deletable
            onRemove={() => {
              console.log('removing prodid:' + itemData.item.productId);
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Tray'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'Baloo',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
