import { SET_PUB } from '../actions/pub';

const initialState = {
  pubId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PUB:
      return {
        pubId: action.pubId
      };
    
    default:
      return state;
  }
};
