import axios from "axios";
import * as actionTypes from "./actionTypes";
import jwtDecode from "jwt-decode";
import firebase /*, { auth }*/ from 'firebase'

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

export const setAuthorizatonHeader = (token) => {
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

export const facebookLoginUser = (history) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI })
  var facebook = new firebase.auth.FacebookAuthProvider();
  facebook.setCustomParameters({
    'display': 'popup'
  })

  firebase
    .auth()
    .signInWithPopup(facebook)
    .then(res => {
      console.log(res.user)
      return res.user.getIdToken()
    })
    .then(token => {
      setAuthorizatonHeader(token);
      dispatch(getUserData());
      dispatch({ type: actionTypes.CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      console.log(err)
    })
}

// export const twitterLoginUser = (history) => (dispatch) => {
//   dispatch({ type: actionTypes.LOADING_UI })
//   var twitter = new firebase.auth.TwitterAuthProvider();
//   twitter.setCustomParameters({
//     'display': 'popup'
//   })

//   firebase
//     .auth()
//     .signInWithPopup(twitter)
//     .then(res => {
//       console.log(res.user)
//       return res.user.getIdToken()
//     })
//     .then(token => {
//       setAuthorizatonHeader(token);
//       dispatch(getUserData());
//       dispatch({ type: actionTypes.CLEAR_ERRORS })
//       history.push('/')
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// export const githubLoginUser = (history) => (dispatch) => {
//   dispatch({ type: actionTypes.LOADING_UI })
//   var github = new firebase.auth.GithubAuthProvider();
//   github.setCustomParameters({
//     'display': 'popup'
//   })

//   firebase
//     .auth()
//     .signInWithPopup(github)
//     .then(res => {
//       console.log(res.user)
//       return res.user.getIdToken()
//     })
//     .then(token => {
//       setAuthorizatonHeader(token);
//       dispatch(getUserData());
//       dispatch({ type: actionTypes.CLEAR_ERRORS })
//       history.push('/')
//     })
//     .catch(err => {
//       if (err.code === 'auth/account-exists-with-different-credential'){
//         var pendingCred = err.credential
//         var email = err.email
//         auth().fetchSignInMethodsForEmail(email).then((methods) => {
//           if (methods[0] === 'password'){
//             var password = promptUserForPassword();
//             auth().signInWithEmailAndPassword(email, password)
//               .then(user => {
//                 return user.
//               })
//           }
//         })
//       }
//     })
// }

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

