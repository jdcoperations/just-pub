import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_STAFF = 'SET_STAFF';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
   // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPPN_eFvNvESUaaQxvFG-uw6lhYz-KhIg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
   // console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPPN_eFvNvESUaaQxvFG-uw6lhYz-KhIg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
  //  console.log(resData);
  //  console.log('in checkIsStaff');

    // added start
    const response2 = await fetch(
      `https://just-pub.firebaseio.com/users/${resData.localId}.json`
    );

    if (!response2.ok) {
      console.log('error in fetch items!' + response2.message);
      throw new Error('Something went wrong - checking for staff!');
    }

    const resData2 = await response2.json();
    const staffPubs = [];

    for (const key in resData2) {
   //   console.log('pub action: ' + key + ':' + resData2[key].pubId);
      //id, pubId, title, description, classification, prices, options
      staffPubs.push(
     
          key,
          resData2[key].pubId

      );
    }
    if (staffPubs.length === 0) {
  //    console.log('not staff');
    } else {
   //   console.log('staff pubs:' + staffPubs);
      // dispatch({ type: SET_STAFF, pubs: staffPubs });
    }

    // added end

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        staffPubs
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataToStorage(resData.idToken, resData.localId, expirationDate, staffPubs);
  };
};

export const logout = () => {
  clearLogoutTimer();
 // console.log('in logout');
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate, staffPubs) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      staffPubs: staffPubs
    })
  );
};

const checkIsStaff = (id) => {
  return async dispatch => {
    // any async code you want!
    try {
    //  console.log('in checkIsStaff');
      const response = await fetch(
        `https://just-pub.firebaseio.com/users/${id}.json`
      );

      if (!response.ok) {
        //     console.log('error in fetch items!');
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const staffPubs = [];

      for (const key in resData) {
        //    console.log('Item action: ' + key + ':' + resData[key]);
        //id, pubId, title, description, classification, prices, options
        staffPubs.push(
          new menuModel(
            key,
            resData[key].pubId

          )
        );
      }
      if (staffPubs.length === 0) {
    //    console.log('not staff');
      } else {
        dispatch({ type: SET_STAFF, pubs: staffPubs });
      }
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
