import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

// Development: use REDUX_DEVTOOLS_EXTENSION
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers, 
  initialState, 
  compose(applyMiddleware(...middleware), reduxDevTools))

// Deployment
// const store = createStore(
//   reducers, 
//   initialState, 
//   compose(applyMiddleware(...middleware)))

export default store;