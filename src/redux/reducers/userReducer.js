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
    
    case actionTypes.LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId
          }
        ]
      };
    case actionTypes.UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload.postId)
      };
    case actionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case actionTypes.MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notification => notification.read = true);
      return {
        ...state
      }

    default:
      return state;
  }
}