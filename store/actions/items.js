export const DELETE_ITEM = 'DELETE_ITEM';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEM = 'SET_ITEM';

import menuModel from '../../models/menuModel';

export const fetchItems = (pubId, category) => {
    return async dispatch => {
      // any async code you want!
      try {
      //    console.log('in items actions');
        const response = await fetch(
          `https://just-pub.firebaseio.com/${pubId}/menu/${category}.json`
        );
  
        if (!response.ok) {
       //     console.log('error in fetch items!');
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        const loadedItems = [];
  
        for (const key in resData) {
        //    console.log('Item action: ' + key + ':' + resData[key]);
            //id, pubId, title, description, classification, prices, options
          loadedItems.push(
            new menuModel(
              key,
              resData[key].pubId,
              resData[key].title,
              resData[key].description,
              resData[key].classification,
              resData[key].prices,
              resData[key].options
            )
          );
        }
  
        dispatch({ type: SET_ITEM, items: loadedItems });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };
  

export const deleteItem = itemId => {
  return { type: DELETE_ITEM, pid: itemId };
};

export const createCategory = (id, pubId, title, description, classification, prices, options) => {
  return {
    type: CREATE_ITEM,
    itemData: {
      id,
      pubId,
      title,
      description,
      classification,
      prices,
      options
    }
  };
};

export const updateItem = (id, title, description, price) => {
  return {
    type: UPDATE_ITEM,
    pid: id,
    productData: {
      title,
      description,
      price,
    }
  };
};