import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// REDUX
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';
// COMPONENTS
import MyButton from '../../util/MyButton';
// MUI
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// ICONS
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    float: 'right',
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    // left: '90%',
    // top: '10%'
  },
  button: {
    float: 'right'
  }
})

class CreatePost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  // When I tried submitting an empty form, I received errors in Redux, but they did not display
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({ 
        body: '', 
        open: false, 
        errors: {} 
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost({ body: this.state.body })
  }
  render() {
    const { errors } = this.state;
    const { classes, UI: { loading }} = this.props;
    
    return (
      <Fragment>
        <Tooltip arrow>
          <MyButton 
            onClick={this.handleOpen} 
            tip='Make a Post' 
            btnClassName={classes.button} 
            placement='top' 
            color='secondary'
          >
            <EditIcon color='primary'/>
          </MyButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton} color='secondary'>
            <CloseIcon/>
          </MyButton>
          <hr/>
          <hr/>
          {/* <DialogTitle>Make a post!</DialogTitle> */}
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField 
                onChange={this.handleChange}
                name='body'
                type='text'
                label='New Post'
                multiline
                rows='3'
                placeholder={'What\'s happening?'}
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                fullWidth
              />
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading || !(this.state.body).trim().length} >
                Submit
                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
})

const mapStateToActions = {
  createPost,
  clearErrors
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(CreatePost))
