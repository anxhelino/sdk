import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Video from './Video';

const FirebaseVideoView = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const storage = getStorage();
    const listRef = ref(storage, 'videos');

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          //   itemRef.getDownloadURL().then((url) => {
          //     console.log()
          //   })

          const downloadUrl = getDownloadURL(ref(storage, itemRef));
          downloadUrl.then((url) => {
            setVideos((prev) => [...prev, url]);
          });

          //   setVideos((prev) => [...prev, downloadUrl]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }, []);
  return (
    <div>
      {videos.length === 0 ? (
        <>There are no videos to display</>
      ) : (
        videos.map((video, i) => {
          return <Video key={i} url={video} />;
        })
      )}
    </div>
  );
};

export default FirebaseVideoView;
