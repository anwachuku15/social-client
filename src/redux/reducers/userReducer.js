import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  loading: false,
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
    
    case actionTypes.LOADING_USER:
      return {
        ...state,
        loading: true
      };
    
    case actionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    
    default:
      return state;
  }
}