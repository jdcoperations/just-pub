export const DELETE_ITEM = 'DELETE_ITEM';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEM = 'SET_ITEM';
export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_MIXERS = 'SET_MIXERS';
export const SET_SNACKS = 'SET_SNACKS';

import menuModel from '../../models/menuModel';
import optionsModel from '../../models/options';
import mixersmodel from '../../models/mixersmodel';
import snacksmodel from '../../models/snacksModel';

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
export const getSnacks = (pubId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/menu/Bar%20Snacks.json`
      );
      if (!response.ok) {
        throw new Error('Something went wrong getting snacks');
      }
      const resData = await response.json();
      const loadedSnacks = [];
      for (const key in resData) {
        loadedSnacks.push(
          new snacksmodel(
            key,
            resData[key].name,
            resData[key].price,
            false
          )
        )
      };
      dispatch({type: SET_SNACKS, availableSnacks: loadedSnacks});

    } catch (err) {
      console.log('error in getSnacks:' + err);
    }
  }
};

export const getOptions = (pubId, productType) => {
  return async dispatch => {
    try {
    //  console.log('in fetch options');
      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/options/${productType}.json`
      );

      if (!response.ok) {
     //   console.log('error in getOps:');
        throw new Error('Something went wrong getting product options');
      }

      const resData = await response.json();
     // console.log('getOptions' + resData);
      const loadedOptions = [];
      for (const key in resData) {
        loadedOptions.push(
          new optionsModel(
            key,
            resData[key].name,
            false
        )
        );
      }
      //console.log('getOptions:'+loadedOptions[0]);

      dispatch({type: SET_OPTIONS, availableOptions: loadedOptions});

    } catch (err) {
      throw err;
    }
  }
};
export const getMixers = (pubId, productType) => {
  return async dispatch => {
    try {
    //  console.log('in fetch mixers');
      const response = await fetch(
        `https://just-pub.firebaseio.com/${pubId}/options/${productType}.json`
      );

      if (!response.ok) {
    //    console.log('error in mixers:');
        throw new Error('Something went wrong getting product mixers');
      }

      const resData = await response.json();
     // console.log('getMixers' + resData);
      const loadedOptions = [];
      for (const key in resData) {
        loadedOptions.push(
          new mixersmodel(
            key,
            resData[key].name,
            resData[key].price
          )
        );
      }
    //  console.log('getMixers:'+loadedOptions[0]);

      dispatch({type: SET_MIXERS, availableMixers: loadedOptions});

    } catch (err) {
      throw err;
    }
  }
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