export const ADD_ORDER = 'ADD_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const SET_ORDERS = 'SET-ORDERS';
export const UPDATE_ORDERS = 'UPDATE-ORDERS';
export const GET_ORDER = 'GET_ORDER';


import Order from '../../models/order';
import * as cartActions from './cart';
import colors from '../../Constants/colors';

export const fetchOrders = (pubId) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/order.json`
      );

      if (!response.ok) {
        console.log('error in fetch orders');
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        //console.log('inorders:' + resData);
        if (resData[key].orderStatus === "NEW ORDER") {
          loadedProducts.push(
            new Order(
              key,
              resData[key].cartItems,
              resData[key].totalAmount,
              resData[key].pubId,
              resData[key].orderDate,
              resData[key].tableNo,
              resData[key].orderStatus
            )
          );
        }
      }

      dispatch({ type: SET_ORDERS, openOrders: loadedProducts });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount, pubId) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount, pub: pubId }
  };
};

export const createOrder = (cartItems, totalAmount, pubId, tableNo) => {
  return async (dispatch, getState) => {
    // any async code you want!
    try {
      //  console.log(getState());
      const orderStatus = 'NEW ORDER';
      const date = new Date();
      const orderDate = date.getHours() + ':' + date.getMinutes();

      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/order.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            pubId,
            orderStatus,
            orderDate,
            tableNo
          })
        }
      );

      const resData = await response.json();
      //   console.log('inCreateOrder:' + resData);
      dispatch({
        type: CREATE_ORDER,
        productData: {
          id: resData.name,
          cartItems,
          totalAmount,
          pubId
        }
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const updateOrder = (pubId, id, orderStatus) => {
  console.log('in update order. id:' + id + ' status:' + orderStatus);
  
  return async dispatch => {
   
    try {
  
      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/order/${id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderStatus
          })
        }
      );

      if (!response.ok) {
        console.log('error in update order');
        throw new Error('Something went wrong!');
      }
      console.log('response:' + response);
      dispatch({
        type: UPDATE_ORDERS,
        pid: id,
        orderStatus: orderStatus
      });
    } catch (err) {
      console.log('error: ' + err);
    }
  };


};

export const getOrder = (orderId) => {
  console.log('in getorder');
  return {
    type: GET_ORDER,
    orderId: orderId
  }
};

