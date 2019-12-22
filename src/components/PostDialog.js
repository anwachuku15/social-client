import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

// Components
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';


const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})

class PostDialog extends Component {
  state = {
    open: false
  }
  // open dialog --> send req to server to get the post and set it in props
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  }
  handleClose = () => {
    this.setState({ open: false });
  }

  
  render() {
    const { 
      classes, 
      likeCount,
      commentCount,
      post: { postId, body, createdAt, userImage, userHandle }, 
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={150} thickness={2}/>
      </div>
    ) : (
      <Grid container spacing={1}>

        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage}/>
        </Grid>

        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant='body1'>
            {body}
          </Typography>

          <CommentButton />
          <span>{commentCount}</span>
          
          <LikeButton postId={postId}/>
          <span>{likeCount}</span>
        </Grid>

      </Grid>
    )

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Expand post' tipClassName={classes.expandButton}>
          <UnfoldMore color='primary'/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton} color='secondary'>
            <CloseIcon/>
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
})

const mapActionsToProps = {
  getPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))
