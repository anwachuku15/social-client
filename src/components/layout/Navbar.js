import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// COMPONENTS
import CreatePost from '../post/CreatePost';
import Notifications from './Notifications';
// REDUX
import { connect } from 'react-redux';
// Material-UI
import withStyles  from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
// import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 315,
    flexShrink: 0,
  },
});

export class Navbar extends Component {
  render() {
    const { classes } = this.props;
    const { authenticated } = this.props
    return (
      <AppBar color='secondary' position="fixed" className={classes.appBar}>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment> 
              
              <CreatePost />

              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon color='primary' />
                </MyButton>
              </Link>

              <Notifications color='primary'/>
              
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to='/'>Home</Button>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
              <Button color="inherit" component={Link} to='/signup'>Sign Up</Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
