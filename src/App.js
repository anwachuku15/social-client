import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Material-UI Theme
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signin from "./pages/signin";
import signup from "./pages/signup";

// Components
import Navbar from './components/Navbar';

// CONSIDER DARKER THEME!
const theme = createMuiTheme({
  palette: {
    common: {black: "#000", white: "#fff" },
    background: {paper: 'whitesmoke', default: "white"},
    secondary: {light: "#ff4081", main: "#f50057", dark: "#c51162", contrastText: "#fff"},
    primary: {light: "#4d5eff",main:"#0018ff",dark:"#0013ce",contrastText:"#fff"},
    error: {light: "#ff4242", main:"#ff0000",dark:"#c50000",contrastText:"#fff"},
    text: {primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}
  },
  typography: {
    userNextVariants: true
  }
})

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={home}/>
              <Route exact path='/login' component={login}/>
              {/* <Route exact path='/login' component={signin}/> */}
              <Route exact path='/signup' component={signup}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>

      
    );
  }
  
}

export default App;
