import React, { useEffect } from 'react';
import Spotify from 'spotify-web-api-js';
import Slider from '@material-ui/core/Slider';

const spotifyWebApi = new Spotify();

const VolumeSlider = (props) => {
    const [value, setValue] = React.useState(props.volumeLevel)
    useEffect(() => {
      setValue(props.volumeLevel)
    }, [props])
    
    const handleChange = (event, newValue) => {
      spotifyWebApi.setVolume(newValue)
      setValue(newValue)
    }

    return (
      <Slider value={value} onChange={handleChange} style={{width:100}} />
    )
}

export default VolumeSlider