import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import appTheme from './util/appTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/actions/actionTypes';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Material-UI Theme
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages
import home from "./pages/home";
import login from "./pages/login";
import register from './pages/register';
// import signin from "./pages/signin";
// import signup from "./pages/signup";

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';


const theme = createMuiTheme(appTheme);


// Bad practice to have global variables...
// let isAuthenticated;
const token = localStorage.fbIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
    
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  } 
} else {
    console.log('no token found')
}


class App extends Component {
  
  render(){
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={home}/>
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={register} />
                {/* <AuthRoute exact path='/login' component={signin} /> */}
                {/* <AuthRoute exact path='/signup' component={signup} /> */}
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
      
    );
  }
  
}

export default App;
