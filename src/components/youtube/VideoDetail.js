import React from 'react';

import Container from '@material-ui/core/Container';


const VideoDetail = ({video}) => {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    // console.log(typeof(video));
    
    return (
        <Container className='col-sm-8'>
            <div>
                <iframe src={videoSrc} width='100%' height="400" allowFullScreen title='Video player'/>
                {/* <iframe src={videoSrc} width="560" height="315" allowFullScreen title='Video player'/> */}
            </div>
            <div style={{color:'#06d4cd'}}>
                <h4 className=''>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </Container>

    )
}

export default VideoDetail;