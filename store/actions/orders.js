export const ADD_ORDER = 'ADD_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const SET_ORDERS = 'SET-ORDERS';
import Order from '../../models/order';

export const fetchOrders = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://just-pub.firebaseio.com/order.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            resData[key].pubId
          )
        );
      }

      dispatch({ type: SET_ORDERS, products: loadedProducts });
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

export const createOrder = (cartItems, totalAmount, pubId) => {
  return async dispatch => {
    // any async code you want!
    try {
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
          orderDate
        })
      }
    );

    const resData = await response.json();
    console.log('inCreateOrder:' + resData);
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


