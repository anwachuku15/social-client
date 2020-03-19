import React, { Component } from 'react';
import PropTypes from 'prop-types'

// import { handleForm } from '../../pages/youtube'
// MATERIAL-UI
import withStyles from '@material-ui/core/styles/withStyles'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import { Container, TextField } from '@material-ui/core';

const styles = (theme) => ({
	...theme.spreadThis
})



class Search extends Component {
    state = {
      query: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        // console.log("submitted")
        this.props.handleForm(this.state.query);
    }

    render() {
      const { classes } = this.props;

      return (
          <Container>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField 
                name='query' 
                value={this.state.query} 
                onChange={this.handleChange} 
                variant="outlined"
                // placeholder='Search Youtube'
                placeholder='Search'
              />
            </form>
          </Container>
      )
    }
}
export default (withStyles(styles)(Search));