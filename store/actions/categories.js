export const DELETE_CAT = 'DELETE_CAT';
export const CREATE_CAT = 'CREATE_CAT';
export const UPDATE_CAT = 'UPDATE_CAT';
export const SET_CAT = 'SET_CAT';

import CatergoriesModel from '../../models/categoriesModel';

export const fetchCategories = (pubId) => {
    return async dispatch => {
      // any async code you want!
      try {
        const response = await fetch(
          `https://just-pub.firebaseio.com/${pubId}/categories.json`
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        const loadedCats = [];
  
        for (const key in resData) {
        //    console.log('cat action: ' + key + ':' + resData[key]);
          loadedCats.push(
            new CatergoriesModel(
              resData[key].Name,
              resData[key].URL
            )
          );
        }
  
        dispatch({ type: SET_CAT, categories: loadedCats });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };
  

export const deleteCatefory = cattId => {
  return { type: DELETE_CAT, pid: catId };
};

export const createCategory = (title, description, imageUrl, price) => {
  return {
    type: CREATE_CAT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  };
};

export const updateCategory = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_CAT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};