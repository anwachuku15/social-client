import React from 'react';

import Container from '@material-ui/core/Container';
import { ThumbUp, Chat } from '@material-ui/icons'
import Card from "@material-ui/core/Card"
import { CardMedia, CardContent, Divider } from '@material-ui/core';

const VideoDetail = ({video}) => {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(video);
    // const string = video.snippet.title
    // const substring = '&#39;'
    // var x = "\""
    // const newString = string.replace(substring, x)
    // console.log(newString)
    // const videoTitle = string.includes(substring) ? newString : video.snippet.title
    return (
        <Container className='col-sm-8'>
            <Card style={{padding:10}}>
            <div>
                <iframe src={videoSrc} width='100%' height="400" allowFullScreen title='Video player'/>
                {/* <iframe src={videoSrc} width="560" height="315" allowFullScreen title='Video player'/> */}
            </div>
            <Divider/>
            <div style={{color:'#06d4cd'}}>
                <h4 style={{color:'#f50057'}}>{video.snippet.title}</h4>
                <p style={{color:'#f50057'}}>{video.snippet.description}</p>
                
                   
                    {/* <Divider /> */}
                    {/* <CardContent style={{textAlign:'right'}}>
                        <div>
                            <ThumbUp/><span>0</span> <Chat/><span>0</span>
                        </div>
                    </CardContent> */}
                
            </div>
            </Card>
        </Container>

    )
}

export default VideoDetail;