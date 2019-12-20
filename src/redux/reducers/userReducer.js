import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
}

export default function(state = initialState, action){
  switch(action.type){
    case actionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case actionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case actionTypes.SET_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
}