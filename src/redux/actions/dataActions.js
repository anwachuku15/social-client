import axios from 'axios';
import * as actionTypes from "./actionTypes";

export const clearErrors = () => dispatch => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
}

export const getUserData = (userHandle) => dispatch => {
  dispatch({ type: actionTypes.LOADING_DATA })
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: res.data.posts
      })
    })
    .catch(() => {
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: null
      })
    })
}

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

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: actionTypes.SET_POST,
        payload: res.data
      });
      dispatch({ type: actionTypes.STOP_LOADING_UI })
    })
    .catch(err => console.log(err));
}

export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI});
  axios
    .post('/post', newPost)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_POST,
        payload: res.data
      });
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const likePost = (postId) => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: actionTypes.LIKE_POST,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err => console.log(err));
}

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

export const deletePost = (postId) => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ 
        type: actionTypes.DELETE_POST,
        payload: postId
      })
      console.log('deleted post')
    })
    .catch(err => console.log(err))
}

export const submitComment = (postId, commentData, history) => dispatch => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({ 
        type: actionTypes.SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(getPost(postId));
      dispatch(clearErrors());
      console.log(res.data)
    })
    .catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      })
    })
}


