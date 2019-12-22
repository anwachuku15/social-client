import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';
// Components
import MyButton from '../../util/MyButton';
// MUI

// Icons
import ChatIcon from '@material-ui/icons/Chat';

class CommentButton extends Component {
  render() {
    const commentButton = (
      <MyButton tip='comments'>
        <ChatIcon color='primary'/>
      </MyButton>
    )
    return commentButton
  }
}

export default CommentButton







