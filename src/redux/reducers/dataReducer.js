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
      };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case actionTypes.LIKE_POST:
    case actionTypes.UNLIKE_POST:
      let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
      state.posts[index] = action.payload;
      return {
        ...state
      }

    case actionTypes.DELETE_POST:
      let index1 = state.posts.findIndex(post => post.postId === action.payload);
      state.posts.splice(index1, 1);
      return {
        ...state
      };

    default:
      return state;
  }
}