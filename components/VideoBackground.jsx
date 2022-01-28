import React, {VFC} from 'react';

export const VideoBackground = ({height, width, videoId="WFZoozP342s"}) =>{
  return <div className="video-background">
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&mute=0&loop=1&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>;
}

export default VideoBackground;
