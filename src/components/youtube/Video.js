import React from 'react';

import Container from '@material-ui/core/Container';


const Video = ({video, clickVideo}) => {
    return (
        <Container className='col-sm-8'>
            <div onClick={() => clickVideo(video)}>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            
                <div>
                    <div>{video.snippet.title}</div>
                </div>
            </div>
        </Container>
    )
}

export default Video;