import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActionSheetIOS, KeyboardAvoidingView, Alert } from 'react-native';
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

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
   // console.log(state);
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const CartScreen = props => {

  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [tableNo, setTableNo] = useState('0');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      tableNo: ''
    },
    inputValidities: {
      tableNo: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

    const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
     setTableNo(inputValue);
      
    
     // console.log('inputChange' + tableNo);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const PubId = props.navigation.getParam('pubId');

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    // console.log('cart:' + state.cart.items);
    for (const key in state.cart.items) {
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
  });
  //  console.log('intray with pubid:' + PubId);




  //cartItems.map( item => {console.log('MAPPING' + item.productId + item.product + item.size + "amount" + item.price)});
  return (
    <PubBackground>
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
            disabled={cartItems.length === 0 || tableNo === "0"}
            onPress={() => {
              //console.log(props);
              dispatch(ordersActions.createOrder(cartItems, cartTotalAmount, PubId, tableNo));
              dispatch(cartActions.clearCart());
              Alert.alert('Just-Pub!', 'Order placed!');
              props.navigation.navigate('Home');
            }}
          />
        </Card>
        <Card style={styles.tno}>
          <Input
            id="tableNo"
            label="Table Number:"
            keyboardType="numeric"
            required
            autoCapitalize="none"
            errorText="Enter Table Number"
            onInputChange={inputChangeHandler}
            initialValue="0"
          />
        </Card>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              title={itemData.item.product}
              size={itemData.item.size}
              amount={itemData.item.price}
              options={itemData.item.options}
              deletable
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

CartScreen.navigationOptions = {
  headerTitle: 'Your Tray'
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

export default CartScreen;
