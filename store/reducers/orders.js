import { ADD_ORDER, SET_ORDERS, GET_ORDER, UPDATE_ORDERS } from '../actions/orders';
import { CREATE_ORDER } from '../actions/orders';

import Order from '../../models/order';

const initialState = {
  orders: [],
  openOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        openOrders: action.openOrders
      };
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    case CREATE_ORDER:
      const newOrder1 = new Order(
        '1',
        action.productData.items,
        action.productData.totalAmount,
        action.productData.pubId,
        new Date().toString()
      );
      return {
        ...state,
        prevOrder: newOrder1
      };

    case GET_ORDER:
      const orderId = action.orderId;
      console.log('orderID:' + orderId);


    case UPDATE_ORDERS:
      console.log(state.openOrders);
      
      const updatedOrders = [...state.openOrders];
      
      return {
        ...state,
        openOrders: updatedOrders
      };
  };
  return state;
};
