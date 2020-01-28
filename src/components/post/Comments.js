import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  avatar: {
    width: 75,
    height: 75,
    marginTop: 25
  },
  commentData: {
    marginLeft: 20
  }
})

export class Comments extends Component {
  render(){
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <hr className={classes.visibleSeparator} />
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt='comment' className={classes.commentImage}/>
                    {/* <Avatar alt={userHandle} src={userImage} className={classes.avatar} /> */}
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='primary'
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a · MMMM DD YYYY')}
                        {/* {dayjs(createdAt).fromNow()} */}
                      </Typography>
                      <hr className={classes.invisibleSeparator}/>
                      <Typography variant='body1'>{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              
            </Fragment>
          )
        })}
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default withStyles(styles)(Comments)
