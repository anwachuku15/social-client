import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import youtubeAPIkey from '../util/youtubeAPIkey'


import Post from '../components/post/Post'
// REDUX
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
// COMPONENTS
import StaticProfile from '../components/profile/StaticProfile'
import Profile from '../components/profile/Profile'
import Search from '../components/youtube/Search'
import SearchResults from '../components/youtube/SearchResults'
// MATERIAL-UI
import YoutubeIcon from '@material-ui/icons/YouTube'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import withStyles from '@material-ui/core/styles/withStyles'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import VideoDetail from '../components/youtube/VideoDetail';
import { Divider, Typography } from '@material-ui/core'

const styles = (theme) => ({
	...theme.spreadThis
})

const token = localStorage.fbIdToken;

class youtube extends Component {
  state = {
    searchResults: [],
    selectedVideo: null
  }

  componentDidMount(){
    if(token){
      axios.defaults.headers.common = {
        Accept: "application/json"
      }
    }
  }

  handleSubmit = async (searchQuery) => {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: youtubeAPIkey,
        part:'snippet',
        q: searchQuery,
        maxResults:20
      }
    })
    this.setState({
      searchResults: res.data.items
    })
    console.log(this.state)
  }

  handleSelect = (video) => {
    this.setState({
      selectedVideo: video
    })
  }

  // handleSubmit = (searchQuery) => {
  //   axios
  //     .get('https://www.googleapis.com/youtube/v3/search', {
  //       params: {
  //         key: 'AIzaSyATWyxu32Jup7ZcaTkZfQTasI_7POpbbzM',
  //         part:'snippet',
  //         q: searchQuery,
  //         maxResults:20
  //       }
  //     })
  //     .then(res => {
  //       this.setState({
  //         searchResults: res.data.items
  //       })
  //     })
  //     .then( () => {
  //       console.log(this.state)
  //     })
  // }

  render() {
    const { classes } = this.props;
    // const { user: { credentials: {handle} } } = this.props;

    return (
      <Container maxWidth='lg'>
        <Typography align='center' color='primary' component='h3' variant='h3' display='block'>
          <YoutubeIcon fontSize='large' color='secondary'/> YouTube
        </Typography>
        <Search handleForm={this.handleSubmit}/>
        <br/>
        <Divider/>
        <br/>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {this.state.selectedVideo !== null ? (
              <VideoDetail video={this.state.selectedVideo}/>
            ) : (
              <div style={{textAlign:'center'}}>Find a video to play!</div>
            )}
          </Grid>
          
          <Grid item sm={4} xs={12}>
            {this.state.searchResults.length > 0 ? (
              <SearchResults videos={this.state.searchResults} clickVideo={this.handleSelect}/>
            ) : (
              ''
            )}
          </Grid>

        </Grid>
      </Container>
    )
  }
}

youtube.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
})

const mapStateToActions = {
  getUserData
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(youtube))