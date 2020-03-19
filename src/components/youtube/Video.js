import React from 'react';

import Container from '@material-ui/core/Container';


const Video = ({video}) => {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof(video));
    
    return (
        <Container className='col-sm-8'>
            <div>
                <iframe  src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className=''>
                <h4 className=''>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </Container>

    )
}

export default Video;