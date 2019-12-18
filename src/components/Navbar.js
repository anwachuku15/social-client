import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          <Button color="inherit" component={Link} to='/'>Home</Button>
          <Button color="inherit" component={Link} to='/login'>Login</Button>
          <Button color="inherit" component={Link} to='/signup'>Sign Up</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
