import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/colors';

const CartItem = props => {
  console.log('cartitem:' + props.title);
  return (
    <View style={styles.cartItem}>
      <View>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.size} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.options}>
        <Text>{props.options}</Text>
      </View>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>£{(props.amount.toFixed(2))}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'Baloo',
    color: Colors.dark,
    fontSize: 16
  },
  mainText: {
    fontFamily: 'Baloo',
    fontSize: 16,
    color: Colors.dark
  },
  options: {
    paddingLeft: 20
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
