import axios from 'axios';
import * as actionTypes from "./actionTypes";

export const getPosts = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_DATA });
  axios
    .get('/posts')
    .then(res => {
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: res.data
      });
    })
    .catch(err=> {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: []
      })
    })
}

// Like a post
export const likePost = (postId) => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: actionTypes.LIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

// Unlike a post
export const unlikePost = (postId) => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: actionTypes.UNLIKE_POST,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}