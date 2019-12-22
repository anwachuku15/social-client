import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';
// Components
import MyButton from '../../util/MyButton';
// MUI
// Icons
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

class LikeButton extends Component {
  isLiked = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
      return true;
    } else {
      return false;
    }
  };
  handleLike = () => {
    this.props.likePost(this.props.postId)
  };
  handleUnlike = () => {
    this.props.unlikePost(this.props.postId)
  };
  
  
  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <ThumbUpOutlinedIcon color='primary'/>
        </MyButton>
      </Link>
    ) : (
      !this.isLiked() ? 
      (
        <MyButton tip='Like' color='secondary' onClick={this.handleLike} className='button'>
            <ThumbUpOutlinedIcon color='primary'/>
        </MyButton>
      ) : (
        <MyButton tip='Unlike' color='secondary' onClick={this.handleUnlike} className='button'>
            <ThumbUpIcon color='primary'/>
        </MyButton>
      )
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likePost,
  unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);


