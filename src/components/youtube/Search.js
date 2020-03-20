import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

// import { handleForm } from '../../pages/youtube'
// MATERIAL-UI
import withStyles from '@material-ui/core/styles/withStyles'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import { Container, TextField, Button, InputBase, Divider, Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = (theme) => ({
  ...theme.spreadThis,
  

  searchPaper: {
    alignItems: 'center',
    // padding: '2px 4px',
    display: 'flex',
    width: 400,
    background: 'rgb(150, 150, 150)',
    // background: 'rgb(48, 48, 48)',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    // padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

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
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{display:'flex', flexDirection:'row'}}
          >
            <form onSubmit={this.handleSubmit}>
              <Paper className={classes.searchPaper}>
                  <TextField 
                    name='query' 
                    value={this.state.query} 
                    onChange={this.handleChange} 
                    variant="outlined"
                    placeholder='Search'
                    fullWidth
                  />
                  <Button 
                    onclick={this.handleSubmit}
                    variant='contained' 
                    style={{height:56}} 
                    type="submit" 
                    color='primary' 
                    className={classes.iconButton} 
                    aria-label="search"
                  >
                    <SearchIcon />
                  </Button>
              </Paper>
            </form>
          </Grid>
      )
    }
}
export default (withStyles(styles)(Search));