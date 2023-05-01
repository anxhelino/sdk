import Hls from 'hls.js';
import { useRef, useEffect } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';

function ViewerView() {
  // States to store downstream url and current HLS state
  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, hlsState } = useMeeting();

  const { join } = useMeeting();

  useEffect(() => {
    join();
  }, []);

  //Playing the HLS stream when the downstreamUrl is present and it is playable
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == 'HLS_PLAYABLE') {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: 'mp4a.40.2',
        });

        let player = document.querySelector('#hlsPlayer');

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === 'function') {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState, playerRef.current]);

  return (
    <div>
      {/* Showing message if HLS is not started or is stopped by HOST */}
      {hlsState != 'HLS_PLAYABLE' ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState == 'HLS_PLAYABLE' && (
          <div>
            <video
              ref={playerRef}
              id='hlsPlayer'
              autoPlay={true}
              controls
              style={{ width: '100%', height: '100%' }}
              playsinline
              playsInline
              muted={true}
              playing
              onError={(err) => {
                console.log(err, 'hls video error');
              }}
            ></video>
          </div>
        )
      )}
    </div>
  );
}

export default ViewerView;
