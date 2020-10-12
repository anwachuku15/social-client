import React from 'react';

import Container from '@material-ui/core/Container';


const Video = ({video, clickVideo}) => {
    const string = video.snippet.title
    const substring = '&#39;'
    // console.log(string)
    var x = "'"
    const newString = string.replace(substring, x)
    const videoTitle = string.includes(substring) ? newString : video.snippet.title
    console.log(videoTitle)
    // const substring = '&#39;'
    // var x = "\""
    // const newString = string.replace(substring, x)
    // console.log(newString)
    // const videoTitle = string.includes(substring) ? newString : video.snippet.title
    return (
        <Container>
            <div onClick={() => clickVideo(video)}>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} style={{padding: '0px 0px', maxWidth:'100%', height:'auto'}}/>
            
                <div>
                    <div style={{color:'#06d4cd'}}>{video.snippet.title}</div>
                </div>
            </div>
        </Container>
    )
}

export default Video;