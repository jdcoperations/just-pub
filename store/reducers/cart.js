import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';


const initialState = {
  items: {},
  totalAmount: 0,
  prodId: 0,
};



export default (state = initialState, action) => {
  
  switch (action.type) {
    case ADD_TO_CART:
      

      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodId = state.prodId + 1;
      const prodTitle = addedProduct.product;
      const prodSize = addedProduct.size;
      const prodOptions = addedProduct.options;
      var newTotal = 0;
      let updatedOrNewCartItem;
      console.log('in cart-reducer.  price:' + prodPrice + 'product title:' + prodTitle + 'size:' + prodSize + 'options:' + prodOptions + 'prodId' + prodId);
      //if (state.items[addedProduct.id]) {
      // already have the item in the cart
      //updatedOrNewCartItem = new CartItem(
      //  state.items[addedProduct.id].quantity + 1,
      //  prodPrice,

      //  prodTitle,
      //  state.items[addedProduct.id].sum + prodPrice
      //);
      //} else {

      updatedOrNewCartItem = new CartItem(prodId, prodTitle, prodSize, prodOptions, prodPrice);
      // }
      if (state.totalAmount === 0) {
        newTotal = prodPrice;
      } else {
        newTotal = state.totalAmount + prodPrice;
      }
      return {
        ...state,
        items: { ...state.items, [prodId]: updatedOrNewCartItem },
        totalAmount: newTotal,
        prodId: prodId
      };
    case REMOVE_FROM_CART:
      console.log('request to remove item id:' + state.items[action.pid]);
      const selectedCartItem = state.items[action.pid];
      //const currentQty = selectedCartItem.quantity;
      const prodPriceRemoved = selectedCartItem.price
      console.log('prodPriceRemoved:' + prodPriceRemoved + 'totalAmount:' + state.totalAmount);
      let updatedCartItems;
      /* if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else { */
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
        newTotal = state.totalAmount - prodPriceRemoved;
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: newTotal
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      };
    case CLEAR_CART:
      return {
        ...state,
        items: {},
        totalAmount: 0
      };
  }

  return state;
};
