import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({ url }) => {
  console.log(url);
  return (
    <div>
      <ReactPlayer url={url} playing={false} controls />
    </div>
  );
};

export default Video;
