import React, { useState } from 'react';
import Uploady from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    if (!file) {
      return;
    }
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = Math.trunc(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Success');
      }
    );
  };
  return (
    <>
      <form>
        <input
          type='file'
          id='myVideo'
          name='filename'
          onChange={(e) => {
            console.log(e.target.files[0]);
            handleChange(e);
          }}
        />
        <input
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        />
      </form>
    </>
  );
};

export default UploadVideo;
