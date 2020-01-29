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
import MuiLink from '@material-ui/core/Link';
import withStyles  from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
// import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import GitHubIcon from '@material-ui/icons/GitHub';

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
  avatar: {
    margin: theme.spacing(1),
    maxWidth: '40px',
    borderRadius: '50%'
  },
});

export class Navbar extends Component {
  render() {
    const { 
      classes,
      user: {
        credentials: { handle, imageUrl }
      }
    } = this.props;
    const { authenticated } = this.props
    return (
      <AppBar color='secondary' position="fixed" className={classes.appBar}>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment> 

              <a href="https://github.com/anwachuku15/social-client">
                <MyButton tip='Front-End Source Code'>
                  <DeveloperModeIcon color='secondary' />
                </MyButton>
              </a>
              
              <a href="https://github.com/anwachuku15/social">
                <MyButton tip='Back-End Source Code'>
                  <GitHubIcon color='primary' />
                </MyButton>
              </a>

              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon color='primary' />
                </MyButton>
              </Link>
              
              <MuiLink component={Link} to={`/${handle}`} color='white' variant='h5'>
              <img src={imageUrl} alt={handle} className={classes.avatar} />
              </MuiLink>
              
              <CreatePost />

              <Notifications color='primary'/>

              

            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to='/'>Home</Button>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
              <Button color="inherit" component={Link} to='/signup'>Sign Up</Button>

              <a href="https://github.com/anwachuku15/social-client" target='_blank'>
                <MyButton tip='Front-End Source Code'>
                  <DeveloperModeIcon color='secondary' />
                </MyButton>
              </a>
              
              <a href="https://github.com/anwachuku15/social" target='_blank'>
                <MyButton tip='Back-End Source Code'>
                  <GitHubIcon color='primary' />
                </MyButton>
                </a>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
