import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// REDUX
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';
// MUI
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    float: 'right',
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  button: {
    float: 'right'
  },


  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'white'
    }
  }
})

export class PostForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({ 
        body: '',
        errors: {} 
      })
    }
  }

  handleChange = e => {
    this.setState({ 
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost({ body: this.state.body })
  }


  render() {
    const { errors } = this.state;
    const { authenticated, classes, UI: { loading }} = this.props
    
    const postFormMarkup = authenticated ? (
      <Container>
        <Fragment>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.body}
              variant='outlined'
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
              style={{display: 'flex'}}
              InputLabelProps={{style: {color: '#06d4cd'}}}
              InputProps={{ classes: {input: classes['input']}}}
            />
            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              className={classes.submitButton} 
              disabled={loading || !(this.state.body).trim().length}
            >
              Submit {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
            </Button>
            <br/><br/><br/>
          </form>
        </Fragment>
        <Divider/>
      </Container>
    ) : null

    return postFormMarkup
  }
}


PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

const mapStateToActions = {
  createPost,
  clearErrors
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(PostForm))
