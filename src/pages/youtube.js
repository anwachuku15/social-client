import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import youtubeAPIkey from '../util/youtubeAPIkey'

// REDUX
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
// COMPONENTS
import Search from '../components/youtube/Search'
import SearchResults from '../components/youtube/SearchResults'
// MATERIAL-UI
import YoutubeIcon from '@material-ui/icons/YouTube'
import withStyles from '@material-ui/core/styles/withStyles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import VideoDetail from '../components/youtube/VideoDetail';
import { Divider, Typography } from '@material-ui/core'

const styles = (theme) => ({
  ...theme.spreadThis,
  vl: {
    borderLeft: '1px solid white',
    height: 500
  }
})

const token = localStorage.fbIdToken;

class youtube extends Component {
  state = {
    searchResults: [],
    selectedVideo: null
  }

  handleSubmit = async (searchQuery) => {
    axios.defaults.headers.common = {
      Accept: "application/json"
    }

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


  render() {
    const { classes } = this.props;
    // const { user: { credentials: {handle} } } = this.props;

    return (
      <Container maxWidth='lg'>

        <Typography align='center' style={{color:'white'}} component='h3' variant='h3' display='block'>
          <YoutubeIcon fontSize='large' color='secondary'/> YouTube
        </Typography>
        <br/>
        <Search handleForm={this.handleSubmit} />
        
        <br/>
        {/* <Divider /> */}
        <hr style={{border:'1px solid #f50057'}}/>
        <br/>

        <Grid container spacing={1}>
          <Grid item lg={8} md={8} sm={12} >
            {this.state.selectedVideo !== null ? (
              <VideoDetail video={this.state.selectedVideo}/>
            ) : (
              <div style={{textAlign:'center', color:'#06d4cd'}}>Find a video to play!</div>
            )}
          </Grid>
          {/* <div className={classes.vl}></div> */}
          <Grid item lg={4} md={4} sm={12}>
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