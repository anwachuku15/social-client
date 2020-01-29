import axios from "axios";
import * as actionTypes from "./actionTypes";
import jwtDecode from "jwt-decode";


export const getUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

const setAuthorizatonHeader = (token) => {
  const fbIdToken = `Bearer ${token}`;
  const decodedToken = jwtDecode(token)
  const loginDate = new Date(decodedToken.iat * 1000)
  const expDate = new Date(decodedToken.exp * 1000)
  
  localStorage.setItem('fbIdToken', fbIdToken);
  localStorage.setItem('loginDate', loginDate)
  localStorage.setItem('expDate', expDate)
  axios.defaults.headers.common['Authorization'] = fbIdToken;
}

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
  .post('/login', userData)
  .then(res => {
    setAuthorizatonHeader(res.data.token);
    // REVIEW!!!! REVIEW!!!! REVIEW!!!!
    dispatch(getUserData());
    dispatch({ type: actionTypes.CLEAR_ERRORS })
    history.push('/')
  })
  .catch(err => {
    dispatch({
      type: actionTypes.SET_ERRORS,
      payload: err.response.data
    })
  })
}

export const registerUser = (userData, history) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
  .post('/signup', userData)
  .then(res => {
    setAuthorizatonHeader(res.data.token);
    // REVIEW!!!! REVIEW!!!! REVIEW!!!!
    dispatch(getUserData());
    dispatch({ type: actionTypes.CLEAR_ERRORS })
    history.push('/')
  })
  .catch(err => {
    dispatch({
      type: actionTypes.SET_ERRORS,
      payload: err.response.data
    })
  })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('fbIdToken');
  localStorage.removeItem('loginDate');
  localStorage.removeItem('expDate');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const markNotificationsRead = (notificationIds) => dispatch => {
  axios
    .post('/notifications', notificationIds)
    .then(res => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATIONS_READ
      })
    })
    .catch(err => console.log(err));
};

// Follow a user
export const followUser = (handle) => dispatch => {
  axios
    .get(`/follow/${handle}`)
    .then(res => {
      dispatch({
        type: actionTypes.FOLLOW_USER,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err => console.log(err))
}

// Unfollow a user
export const unfollowUser = (handle) => dispatch => {
  axios
    .get(`/unfollow/${handle}`)
    .then(res => {
      dispatch({
        type: actionTypes.UNFOLLOW_USER,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err => console.log(err))
}

