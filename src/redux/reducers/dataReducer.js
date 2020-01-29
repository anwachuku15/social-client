import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: {},
  followers: [],
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case actionTypes.SET_FOLLOWERS:
      return {
        ...state,
        loading: false,
        followers: action.payload
      };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
  
    case actionTypes.SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    
    case actionTypes.CREATE_POST:
    return {
      ...state,
      posts: [
        action.payload,
        ...state.posts
      ]
    }
    
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

    case actionTypes.SUBMIT_COMMENT:
      state.posts.comments = [action.payload, ...state.post.comments]
      let index2 = state.posts.findIndex((post) => post.postId === action.payload.postId);
      state.posts[index2].commentCount++;
      console.log(state.posts[index2].commentCount);
      return {
        ...state,
        post: {
          ...state.post
        },
      };

    

    default:
      return state;
  }
}