import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import BackImg from '../../images/whitebackgroundimg.jpg';
// FIREBASE
import firebase from 'firebase/app';
import config from '../../util/config';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// COMPONENTS
import CreatePost from '../post/CreatePost';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
// REDUX
import { connect } from 'react-redux';
import { facebookLoginUser, logoutUser, uploadImage } from '../../redux/actions/userActions';

import { FacebookLoginButton } from 'react-social-login-buttons';
// MATERIAL-UI
// import FacebookIcon from '@material-ui/icons/Facebook';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
// import EditIcon from '@material-ui/icons/Edit';
// import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'; 

firebase.initializeApp(config);

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.secondary.main
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  logoutbutton: {
    float: 'right'
  }
})

const skeletonStyle = {
  display: 'inline-block'
}


class Profile extends Component {
  handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  }
  
  handleFacebook = () => {
    this.props.facebookLoginUser();
  }

  handleTwitter = () => {
    this.props.twitterLoginUser();
  }

  handleGithub = () => {
    this.props.githubLoginUser();
  }


  render() {
    const { 
      classes, 
      user: { 
        credentials: { handle, createdAt, imageUrl, bio, website, location, followers, following },
        loading,
        authenticated
      }
    } = this.props;
    
    let profileMarkup = !loading ? 
                          (authenticated ? 
                            ( // Show Profile
                              <Paper className={classes.paper} style={{position: 'sticky', top: 70, minWidth:'160px', backgroundImage:`url(${BackImg})`}} >
                                <div className={classes.profile}>
                                  <div className="image-wrapper">
                                    <img src={imageUrl} alt='profile' className='profile-image' />
                                    <input 
                                      onChange={this.handleImageChange}
                                      type='file' 
                                      id='imageInput' 
                                      hidden='hidden'
                                    />
                                    <MyButton tip='Edit Profile picture' onClick={this.handleEditPicture} btnClassName='button'>
                                      <AddAPhotoOutlinedIcon color='primary'/>
                                    </MyButton>
                                  </div>
                                  <hr/>
                                  <div className="profile-details">
                                    <MuiLink component={Link} to={`/${handle}`} color='secondary' variant='h5'>
                                      @{handle}
                                    </MuiLink>
                                    <hr/>
                                    <MuiLink component={Link} to={`/${handle}/followers`}>
                                      <Typography variant='subtitle2' display='inline'>{followers}</Typography>&nbsp;
                                      <Typography variant='subtitle2' color='textSecondary' display='inline'>Followers</Typography>
                                    </MuiLink>&nbsp;|&nbsp;
                                    <MuiLink component={Link} to={`/${handle}/following`}>
                                      <Typography variant='subtitle2' display='inline'>{following}</Typography>&nbsp;
                                      <Typography variant='subtitle2' color='textSecondary' display='inline'>Following</Typography>
                                    </MuiLink>
                                    <hr/>
                                    {bio && <Typography variant='body2'>{bio}</Typography>}
                                    <hr/>
                                    {location && (
                                      <Fragment>
                                        <LocationOn color='secondary' />
                                        <span>{location}</span>
                                      </Fragment>
                                    )}
                                    <hr/>
                                    {website && (
                                      <Fragment>
                                        <Tooltip title={website} placement='left' color='secondary' TransitionComponent={Zoom} arrow>
                                          <a href={website} target='_blank' rel='noopener noreferrer' color='primary'>
                                            <LinkIcon color='secondary' />
                                          </a>
                                        </Tooltip>
                                        <hr/>
                                      </Fragment>
                                      
                                    )}
                                    <CalendarToday color='secondary' />{' '}
                                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                  </div>
                                  {/* <Grid> */}
                                    <Tooltip title='Logout' placement='top' color='secondary' TransitionComponent={Zoom} arrow>
                                      <IconButton onClick={this.handleLogout} >
                                        <KeyboardReturn color='primary'  />
                                      </IconButton>
                                    </Tooltip>
                                    <CreatePost />
                                    <EditDetails />
                                  {/* </Grid> */}
                                  
                                </div>
                              </Paper>
                            ) : 
                            ( // No Profile Found
                              <Paper className={classes.paper} style={{position: 'sticky', top: 70, minWidth:'160px', backgroundImage:`url(${BackImg})`}} >
                                <Typography variant='body2' align='center'>
                                  No profile found, please login
                                </Typography>
                                <div className={classes.buttons}>
                                  <Button variant='contained' color='secondary' component={Link} to='/login'>
                                    Login
                                  </Button>
                                  <Button variant='contained' color='primary' component={Link} to='/signup'>
                                    Sign Up
                                  </Button>
                                </div>
                                <div>
                                  {/* <Button variant='contained' color='primary' onClick={this.handleFacebook}>
                                    <FacebookIcon/>
                                    Facebook
                                  </Button> */}
                                  <FacebookLoginButton onClick={this.handleFacebook}/>
                                </div>
                              </Paper>
                            ) 
                          ) : 
                        (
                          <Paper className={classes.paper}>
                            <div className={classes.profile}>
                              <div className="image-wrapper">
                                  <Skeleton variant='circle' className='profile-image' style={skeletonStyle}></Skeleton>
                                  <div className='profile-details'>
                                    <Skeleton variant='text' height={40} width={200} style={skeletonStyle} />
                                    <Skeleton variant='text' height={30} width={200} style={skeletonStyle} />
                                    <Skeleton variant='text' height={35} width={160} style={skeletonStyle} />
                                    <Skeleton variant='text' height={35} width={200} style={skeletonStyle} />
                                    <Skeleton variant='text' height={35} width={150} style={skeletonStyle} />
                                  </div>
                              </div>
                            </div>
                          </Paper>
                        )
      
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = { 
  facebookLoginUser, 
  logoutUser, 
  uploadImage 
}

Profile.propTypes = {
  facebookLoginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
