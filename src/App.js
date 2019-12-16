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
import signup from "./pages/signup";

// Components
import Navbar from './components/Navbar';

// CONSIDER DARKER THEME!
const theme = createMuiTheme({
  palette: {
    common: {black: "#000", white: "#fff" },
    // background: {paper: 'rgba(228, 228, 228, 1)', default: "rgba(255, 227, 227, 1)"},
    background: {paper: 'rgb(242, 234, 186)', default: "rgba(255, 227, 227, 1)"},
    primary: {light: "rgba(255, 84, 84, 1)", main: "rgba(255, 0, 0, 1)", dark: "rgba(201, 0, 0, 1)", contrastText: "#fff"},
    secondary: {light: "rgba(243, 199, 84, 1)",main:"rgba(215, 157, 1, 1)",dark:"rgba(194, 142, 0, 1)",contrastText:"#fff"},
    error: {light: "#e57373", main:"#f44336",dark:"#d32f2f",contrastText:"#fff"},
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
