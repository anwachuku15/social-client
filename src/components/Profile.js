import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// REDUX
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// MATERIAL-UI
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
// import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

const styles = (theme) => ({
  paper: {
    padding: 20
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
  }

  render() {
    const { 
      classes, 
      user: { 
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;
    
    let profileMarkup = !loading ? 
                        (authenticated ? 
                          ( // Show Profile
                            <Paper className={classes.paper}>
                              <div className={classes.profile}>
                                <div className="image-wrapper">
                                  <img src={imageUrl} alt='profile' className='profile-image' />
                                  <input 
                                    onChange={this.handleImageChange}
                                    type='file' 
                                    id='imageInput' 
                                    hidden='hidden'
                                  />
                                  <Tooltip title='Edit profile picture' placement='top' color='secondary' TransitionComponent={Zoom} arrow>
                                    <IconButton onClick={this.handleEditPicture} className='button'>
                                      {/* <EditIcon color='primary'/> */}
                                      <AddAPhotoOutlinedIcon color='primary' />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <hr/>
                                <div className="profile-details">
                                  <MuiLink component={Link} to={`/users/${handle}`} color='secondary' variant='h5'>
                                    @{handle}
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
                                      <LinkIcon color='secondary' />
                                      <a href={website} target='_blank' rel='noopener noreferrer' color='primary'>
                                        {' '}{website}
                                      </a>
                                      <hr/>
                                    </Fragment>
                                  )}
                                  <CalendarToday color='secondary' />{' '}
                                  <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                </div>
                              </div>
                            </Paper>
                          ) : 
                          ( // No Profile Found
                            <Paper className={classes.paper}>
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

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
