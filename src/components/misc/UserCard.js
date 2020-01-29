import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';

// Components
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';



const cardStyles = {
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
}

class UserCard extends Component {

  render() {
    const { classes } = this.props;
    const { follower: { followerHandle, followerImage} } = this.props;
    
    
    return (
      <Card className={classes.card}>
        <Link to={`/${followerHandle}`}>
          <Avatar alt={followerHandle} src={followerImage} className={classes.avatar} />
        </Link>
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/${followerHandle}`}
            color='secondary'
          >
            {followerHandle}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  follower: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data
})



export default connect(mapStateToProps)(withStyles(cardStyles)(UserCard))
