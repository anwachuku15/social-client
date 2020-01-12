import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import NoImg from '../../images/no-img.png'
// REDUX
import { connect } from 'react-redux';

// Components
import LikeButton from './LikeButton';
// import CommentButton from './CommentButton';
import CommentFormDialog from './CommentFormDialog';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog'
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// import MyButton from '../../util/MyButton';




const cardStyles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Post extends Component {

  render() {
    dayjs.extend(relativeTime)
    const { 
      classes, 
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount, comments },
      user: { authenticated, credentials: { handle } } 
    } = this.props;

    
    
    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography 
            variant="h5" 
            component={Link}
            to={`/${userHandle}`}
            color='secondary'
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          
          {/* <CommentButton /> */}
          <CommentFormDialog postId={postId} userHandle={userHandle} likeCount={likeCount} commentCount={commentCount} />
          <span>{commentCount}</span>
          
          <LikeButton postId={postId}/>
          <span>{likeCount}</span>

          <span>{deleteButton}</span>

          <PostDialog postId={postId} userHandle={userHandle} likeCount={likeCount} commentCount={commentCount} comments={comments} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data
})



export default connect(mapStateToProps)(withStyles(cardStyles)(Post))
