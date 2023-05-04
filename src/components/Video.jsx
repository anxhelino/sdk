import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import ParrotiasLogo from '../images/Parrotias_logo.png';

const Video = ({ videos }) => {
  const [video, setVideo] = useState(null);
  const [loop, setLoop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedVideos = useRef();
  useEffect(() => {
    sortedVideos.current = videos;
    sortedVideos.current = sortedVideos.current.sort((a, b) => {
      const aIndex = parseInt(a.match(/F(\d)\.mp4/)[1]);
      const bIndex = parseInt(b.match(/F(\d)\.mp4/)[1]);
      return aIndex - bIndex;
    });

    setVideo(sortedVideos.current[0]);
  }, [videos]);
  function goToNextVideo(sortedVideos) {
    // Increment the current index and loop back to 0 if we've reached the end
    console.log(sortedVideos.length);
    const nextIndex = (currentIndex + 1) % sortedVideos.length;
    setCurrentIndex(nextIndex);

    // Set the video state to the next URL in the sorted array
    setVideo(sortedVideos[nextIndex]);
  }
  return (
    <div className='video'>
      {/* <ReactPlayer
        loop={loop}
        url={video}
        playing={true}
        controls={true}
        muted={true}
        light={false}
        onEnded={() => goToNextVideo(sortedVideos.current)}
      /> */}
      <video
        src={video}
        autoPlay
        muted
        controls
        poster={ParrotiasLogo}
        onEnded={() => goToNextVideo(sortedVideos.current)}
      ></video>
    </div>
  );
};

export default Video;
