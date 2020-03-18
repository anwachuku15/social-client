import React, { Component } from 'react';
// import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
import NoImg from './img/no-img.png';
import Play from '@material-ui/icons/PlayCircleOutlineOutlined';
import Pause from '@material-ui/icons/PauseCircleOutlineOutlined';
import Prev from '@material-ui/icons/SkipPreviousOutlined';
import Next from '@material-ui/icons/SkipNextOutlined';
// import VolumeDown from '@material-ui/icons/VolumeDownOutlined';
// import VolumeUp from '@material-ui/icons/VolumeUpOutlined';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
import VolumeSlider from './VolumeSlider';
// import SpotifyPlayer from './util/spotify-player';

// SPOTIFY WEB API
// https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js
// https://www.youtube.com/watch?v=prayNyuN3w0&feature=emb_title

// WEB PLAYBACK SDK QUICK START
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
// BQBacbOIFWAYnOB3nCNnaA1AJ5rrO-TLtfLUkKJfUv5ecH7G4Kb4wSr5F42qNzpkQFH2hw26Oz6TYTBaFsMTK9je_JduPZM40HOHoXoCkgPqqk-4kw6YV2lg1tv9fpklmBbYcfbSmujD5nGzPvMYtZCfeA

// it's a class, so instantiate it
const spotifyWebApi = new Spotify();
var resume;
var currentProgress;
// var defaultVolume;

class SpofityPlayer extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    
    this.state = {
      loggedIn: params.access_token ? true : false,
      spotifyToken: params.access_token,
      userInfo: {
        image: ''
      },
      listener: {
        progress: null
      },
      volumeSlider: {
        value: null
      },
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        uri: '',
        isPlaying: false,
        progress: null,
        duration: null,
        album: '',
        albumURI: '',
        albumID: '',
        track: '',
        volume: null
      },
      play: {
        uris: [],
        position: 0
      },
      album: {
        name: '',
        uri: '',
        tracks: []
      }
    }
   
    if (params.access_token){ // If user has logged into Spotify account, allow the webApi to use the access token
      spotifyWebApi.setAccessToken(params.access_token);
      spotifyWebApi.getMe()
      .then((res) => {
        this.setState({
          userInfo: {
            image: res.images[0].url
          }
        })
      })
      const token = spotifyWebApi.getAccessToken()
      console.log(token)
      // spotifyWebApi.getMyCurrentPlaybackState()
      // .then((res) => {
      //   this.setState({
      //     nowPlaying: {
      //       name: res.item.name,
      //       image: res.item.album.images[0].url,
      //       uri: res.item.uri,
      //       isPlaying: res.is_playing,
      //       progress: res.progress_ms,
      //       duration: res.item.duration_ms,
      //       album: res.item.album.name,
      //       albumURI: res.item.album.uri,
      //       albumID: res.item.album.id,
      //       track: res.item.track_number,
      //       volume: res.device.volume_percent
      //     }
      //   })
      // })
      // .then(() => {
      //   console.log(this.state.nowPlaying)
      // })
    } else {
      const token = spotifyWebApi.getAccessToken()
      console.log(token)
    }
  }
  // END OF CONSTRUCTOR

  // from auth-server index.html:71
  // Gives an object with access_token and refresh_token
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams; 
  }

  

  getUserInfo() {
    spotifyWebApi.getMe()
      .then((res) => {
        this.setState({
          userInfo: {
            image: res.images[0].url
          }
        })
      })
  }

  componentDidMount(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((res) => {
      this.setState({
        nowPlaying: {
          name: res.item.name,
          image: res.item.album.images[0].url,
          uri: res.item.uri,
          isPlaying: res.is_playing,
          progress: res.progress_ms,
          duration: res.item.duration_ms,
          album: res.item.album.name,
          albumURI: res.item.album.uri,
          albumID: res.item.album.id,
          track: res.item.track_number,
          volume: res.device.volume_percent
        },
        volumeSlider: {
          value: res.device.volume_percent
        }
      })
      resume = this.state.nowPlaying.progress
    })
    .then(() => this.getAlbum())
    .then(() => {
      this.logProgress()
    })
  }
  
  logProgress(){
    currentProgress = this.state.nowPlaying.progress
    console.log(currentProgress)

    if(this.state.nowPlaying.isPlaying){
      console.log("Started Playing at " + this.state.nowPlaying.progress)
    } else {
      console.log("Paused at " + this.state.nowPlaying.progress)
    }
    // var id = setInterval(() => {
    //   if(this.state.nowPlaying.isPlaying){
    //     currentProgress += 1;
    //     console.log(currentProgress)
    //   }
    // }, 1)
  }

  
  // Player Methods
  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
        resume = this.state.nowPlaying.progress
      })
      .then(() => this.getAlbum())
  }

  getAlbum(){
    spotifyWebApi.getAlbum(this.state.nowPlaying.albumID)
    .then((res) => {
      // console.log(res)
      this.setState({
        album: {
          name: res.name,
          uri: res.uri,
          tracks: res.tracks.items
        }
      })
      // for(var i=0; i < this.state.album.tracks.length; i++){
      //   console.log(this.state.album.tracks[i].name)
      // }
    })
  }
  
  pauseSong(){
    spotifyWebApi.pause()
      .then(() => {
        spotifyWebApi.getMyCurrentPlaybackState()
        .then((res) => {
          this.setState({
            play: {
              position: res.progress_ms
            },
            nowPlaying: {
              name: res.item.name,
              image: res.item.album.images[0].url,
              uri: res.item.uri,
              isPlaying: res.is_playing,
              progress: res.progress_ms,
              duration: res.item.duration_ms,
              album: res.item.album.name,
              albumURI: res.item.album.uri,
              albumID: res.item.album.id,
              track: res.item.track_number,
              volume: res.device.volume_percent
            }
          })
          resume = res.progress_ms
        })
        .then(() => this.logProgress())
      })
  }

  playSong(){
    spotifyWebApi.play({
      uris: [this.state.nowPlaying.uri],
      position_ms: resume
    })
    .then( () => {
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          play: {
            position: res.progress_ms
          },
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
        resume = res.progress_ms
      })
      .then(() => this.logProgress())
    })
  }

  nextSong(){
    const currentSongURI = this.state.nowPlaying.uri
    var next;
    for(var i=0; i < this.state.album.tracks.length; i++){
      var albumSongURI = this.state.album.tracks[i].uri
      if (currentSongURI === albumSongURI) {
        if(i < this.state.album.tracks.length - 1){
          next = this.state.album.tracks[i+1]
        } else {
          next = this.state.album.tracks[0]
        }
        break
      }
    }
    spotifyWebApi.play({
      uris: [next.uri],
      position_ms: 0
    })
    .then(() => {
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          play: {
            position: res.progress_ms
          },
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
        resume = res.progress_ms
      })
    })
  }

  prevSong(){
    const currentSongURI = this.state.nowPlaying.uri
    var prev;
    for(var i=0; i < this.state.album.tracks.length; i++){
      var albumSongURI = this.state.album.tracks[i].uri
      if (currentSongURI === albumSongURI) {
        if(i !== 0){
          prev = this.state.album.tracks[i-1]
        } else {
          prev = this.state.album.tracks[this.state.album.tracks.length-1]
        }
        break
      }
    }
    spotifyWebApi.play({
      uris: [prev.uri],
      position_ms: 0
    })
    .then(() => {
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          play: {
            position: res.progress_ms
          },
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
        resume = res.progress_ms
      })
    })
  }

  volumeUp(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((res) => {
      spotifyWebApi.setVolume(res.device.volume_percent + 5)
    })
    .then(
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
      })
    )
  }

  volumeDown(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((res) => {
      spotifyWebApi.setVolume(res.device.volume_percent - 5)
    })
    .then(
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            uri: res.item.uri,
            isPlaying: res.is_playing,
            progress: res.progress_ms,
            duration: res.item.duration_ms,
            album: res.item.album.name,
            albumURI: res.item.album.uri,
            albumID: res.item.album.id,
            track: res.item.track_number,
            volume: res.device.volume_percent
          }
        })
      })
    )
  }

  handleChange = (event, newValue) => {
    spotifyWebApi.setVolume(newValue)
  }
  
  render(){
    // const [value, setValue] = React.useState(this.state.volumeSlider.value)
    // const volume = this.state.nowPlaying.volume;

    return (
      <main className="SpofityPlayer">
        {!this.state.loggedIn ? <a href='http://localhost:5000/login'>Log in to Spotify</a> : null}
        
        <div>
          {this.state.userInfo.image.length === '' ? (
            <img src={NoImg} style={{width:75, borderRadius:'50%'}} alt='no-img'/>
          ) : (
            <img src={ this.state.userInfo.image } style={{width:75, borderRadius:'50%'}} alt='user-img'/>
          )
          }
        </div>

        <div>Song: { this.state.nowPlaying.name } <br/>Album: { this.state.nowPlaying.album }</div>
        <div>
          <img src={ this.state.nowPlaying.image} style={{width:100, borderRadius:'50%'}} alt='song-img'/>
        </div>

        <div>
          <button type="button" className="btn btn-dark" onClick={ () => this.prevSong() }><Prev/></button>
          {this.state.nowPlaying.isPlaying 
            ? <button type="button" className='btn btn-outline-success' onClick={ () => this.pauseSong() }><Pause/></button>
            : <button type="button" className='btn btn-success' onClick={ () => this.playSong() }><Play/></button>
          }
          <button type="button" className="btn btn-dark" onClick={ () => this.nextSong() }><Next/></button>
        </div>
        
        <div>
          <VolumeSlider volumeLevel={this.state.nowPlaying.volume}/>
        </div>

       
        
        <button type="button" className="btn btn-success" onClick={ () => this.getAlbum() }>Get Album</button>
        
      </main>
      
      
      
    );
  }
  
}

export default SpofityPlayer;
