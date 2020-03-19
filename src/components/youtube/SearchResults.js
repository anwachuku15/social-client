import React, { Component } from 'react';
import PropTypes from 'prop-types'

// import { handleForm } from '../../pages/youtube'
// MATERIAL-UI
import withStyles from '@material-ui/core/styles/withStyles'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import { Container, TextField } from '@material-ui/core';
import Video from './VideoDetail';

const styles = (theme) => ({
	...theme.spreadThis
})



const SearchResults = (props) => {
  const renderedVideos = props.videos.map(video => {
    return <Video key={video.id.videoId} video={video} clickVideo={props.clickVideo}/>
  })

  return renderedVideos
}


export default (withStyles(styles)(SearchResults));