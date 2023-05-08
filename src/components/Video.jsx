import React, { useEffect, useRef, useState } from 'react';
import ParrotiasLogo from '../images/Parrotias_logo.png';

const Video = ({ videos }) => {
  const [video, setVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

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
    const nextIndex = (currentIndex + 1) % sortedVideos.length;
    setCurrentIndex(nextIndex);
    setVideo(sortedVideos[nextIndex]);
  }

  function toggleMute() {
    setIsMuted(!isMuted);
  }

  return (
    <div className='video'>
      <video
        src={video}
        autoPlay
        muted={isMuted}
        onEnded={() => goToNextVideo(sortedVideos.current)}
      ></video>
      <button onClick={toggleMute}>
        mute
        {isMuted ? (
          <i className="fas fa-volume-mute"></i>
        ) : (
          <i className="fas fa-volume-up"></i>
        )}
      </button>
    </div>
  );
};

export default Video;
