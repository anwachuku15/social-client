import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import BackImg from '../../images/whitebackgroundimg.jpg';
// MATERIAL-UI
import withStyles from '@material-ui/core/styles/withStyles'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative'
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
  }
});

const StaticProfile = (props) => {
  const { 
    classes, 
    profile: { handle, createdAt, imageUrl, bio, website, location, following, followers },
    user: authenticated 
  } = props;

  return (
    <Paper className={classes.paper} style={{position: 'sticky', top: 70, minWidth:'160px', backgroundImage:`url(${BackImg})`}} >
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt='profile' className='profile-image' />
        </div>
        <hr/>
        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${handle}`} color='secondary' variant='h5'>
            @{handle}
          </MuiLink>
          <hr/>
          <MuiLink component={Link} to={`/${handle}/followers`}>
            <Typography variant='subtitle2' display='inline'>{followers} </Typography>
            <Typography variant='subtitle2' color='textSecondary' display='inline'>Followers </Typography>
          </MuiLink>|
          <MuiLink component={Link} to={`/${handle}/following`}>
            <Typography variant='subtitle2' display='inline'> {following} </Typography>
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
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  user: PropTypes.object.isRequired
}


export default withStyles(styles)(StaticProfile);
