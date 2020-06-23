import { ADD_ORDER } from '../actions/orders';
import { CREATE_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
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
          ...state
        };
  }

  return state;
};
