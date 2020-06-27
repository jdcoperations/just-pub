
import {
  DELETE_CAT,
  CREATE_CAT,
  UPDATE_CAT,
  SET_CAT
} from '../actions/categories';
import Product from '../../models/products';
import { CATEGORIES } from '../../data/categories';

const initialState = {
  availableCategories: CATEGORIES,
  // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  switch (action.type) {
      case SET_CAT:
          return {
              availableCategories: action.categories
          };
    case CREATE_CAT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_CAT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_CAT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};
