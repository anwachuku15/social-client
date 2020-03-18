import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// REDUX
import { connect } from 'react-redux';
import { getFollowerData } from '../redux/actions/dataActions'
// Components
import UserCard from '../components/misc/UserCard'
import StaticProfile from '../components/profile/StaticProfile'
import Profile from '../components/profile/Profile'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import { Container } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import MyButton from '../../util/MyButton';
// import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 10,
    paddingLeft: 15,
  },
  image: {
    minWidth: 200,
    borderRadius: '50%'
  },
  avatar: {
    width: 75,
    height: 75,
    marginTop: 25
  },
  content: {
    padding: 25,
    paddingLeft: 15,
    objectFit: 'cover'
  }
})

class userFollowers extends Component {
  state = {
    profile: null,
    userHandle: null
  }

  componentDidMount(){
    const handle = this.props.match.params.handle;
    console.log(handle)
    // run action through redux which makes back end request
    this.props.getFollowerData(handle);

    // get user details to fill profile card (userProfile.js:38)
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user,
          userHandle: res.data.user.handle
        })
      })
      .catch(err => console.log(err));
  }
  
  

  render() {
    const { classes } = this.props;
    const { followers } = this.props.data;
    const { credentials: {handle} } = this.props.user
    const { loading } = this.props.data;

    
    const followersMarkup = loading ? (
      <div style={{margin:'auto', maxWidth:'10px'}}>
        <CircularProgress className={classes.progress} color='primary' />
      </div>
    ) : followers.length === 0 ? (
      <p>No followers yet...</p>
    ) : (
      followers.map(
        follower => <UserCard key={follower.followerHandle} follower={follower}/>
      )
    )
    
    

    return (
      <Container maxWidth='lg'>

        <Grid container spacing={8}>
          <Grid item sm={4} xs={12} style={{paddingBottom:'3px'}}>
            {this.state.profile && 
              this.state.userHandle !== handle ? (
                <StaticProfile profile={this.state.profile}/>
              ) : (
                <Profile />
              )
            }
          </Grid>
          <Grid item sm={8} xs={12}>
            {followersMarkup}
          </Grid>
        </Grid>
        
      </Container>
      
    )
  }
}

userFollowers.propTypes = {
  getFollowerData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToActions = {
  getFollowerData
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
})

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(userFollowers))
