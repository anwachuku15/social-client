import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  errors: null
};

export default function(state = initialState, action){
  switch(action.type){
    case actionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
      
    case actionTypes.LOADING_UI:
      return {
        ...state,
        loading: true
      };
      default:
        return state;
    
    case actionTypes.STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      }
  }
}