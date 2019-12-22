import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case actionTypes.LIKE_POST:
    case actionTypes.UNLIKE_POST:
      let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
      state.posts[index] = action.payload;
      return {
        ...state
      }
    default:
      return state;
  }
}