const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./firebase');
const { google } = require('googleapis');
const { exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const got = require('got');
const fs = require('fs')
const request = require('request');
const concat = require('ffmpeg-concat');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const ClientID =
  '600480940198-umoo6hqifbbnhgtpg18tv3nseodnba7r.apps.googleusercontent.com';
const ClientSecret = '"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"';

app.use(express.static(path.join(__dirname, "/path/to")));


// const getVideos = async() => {
//   try{
//     const videoRef = db.collection('videos');
//     const response = await videoRef.get();
//     let responseArr = [];
//     response.forEach((doc) => {
//       responseArr.push(doc.data().url);
//     });
//     const outputStreamOptions = {
//       end: true, // Close the output stream when processing ends
//     };
//     const outputFilePath = 'output.mp4';
//     const outputStream = fs.createWriteStream(outputFilePath, outputStreamOptions);
//     responseArr.forEach(videoPath => {
//       ffmpeg().input(videoPath);
//     });
   
//     ffmpeg().output(outputFilePath).on('end', () => {
//       // Create a readable stream from the output file
//       const stream = fs.createReadStream(outputFilePath);
  
//       // Set the appropriate headers for streaming the video
//       res.setHeader('Content-Type', 'video/mp4');
//       res.setHeader('Content-Disposition', 'attachment; filename=concatenated-video.mp4');
  
//       // Pipe the readable stream to the response
//       stream.pipe(res);
//     }).run()

//   //  return video;
//   }catch(err){
//     console.log(err)
//   }
 
// }

app.post('/add-video-stream',async(req,res) => {
 try{
  const videoRef = db.collection('videos');
  const response = await videoRef.get();
  let videoUrls = [];
  response.forEach((doc) => {
    videoUrls.push(doc.data().url);
  });

  const outputFilePath = './path/to/output.mp4';
  const downloadedVideos = [];

  const downloadAndConcatVideos = async () => {
    try {
      for (let i = 0; i < videoUrls.length; i++) {
        const videoUrl = videoUrls[i];
        const videoFilePath = `./path/to/video${i + 1}.mp4`;

        await downloadVideo(videoUrl, videoFilePath);
        downloadedVideos.push(videoFilePath);
      }

      concatVideos(downloadedVideos, outputFilePath);
    } catch (error) {
      console.error('Error:', error);
      res.sendStatus(500);
    }
  };

  const downloadVideo = (videoUrl, videoFilePath) => {
    return new Promise((resolve, reject) => {
      request.get(videoUrl)
        .on('error', reject)
        .pipe(fs.createWriteStream(videoFilePath))
        .on('finish', resolve);
    });
  };

  const concatVideos = (videoFilePaths, outputFilePath) => {
    const ffmpegCommand = ffmpeg();

    videoFilePaths.forEach(videoFilePath => {
      ffmpegCommand.input(videoFilePath);
    });

    ffmpegCommand
      .on('error', (error) => {
        console.error('FFmpeg Error:', error);
        res.sendStatus(500);
      })
      .on('end', () => {
        // Create a readable stream from the output file
        const stream = fs.createReadStream(outputFilePath);

        // Set the appropriate headers for streaming the video
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename=concatenated-video.mp4');

        // Pipe the readable stream to the response
        stream.pipe(res);
      })
      .mergeToFile(outputFilePath);
  };

  downloadAndConcatVideos();


 }catch(err) {
  console.log(err)
 }


})

// getJoinStream();


app.get('/', async (req, res) => {
  try {
  
    // const command = ffmpeg();

    // // responseArr.forEach((url) => {
    // //   console.log(url);
    // //   command.mergeAdd(url);
    // // });
    // command({ source: responseArr[0] })
    //   .input(responseArr[1])
    //   .on('end', () => console.log('Merge is done'));

    // // Set FFmpeg output format and pipe to response
    // command.format('mp4').pipe(res, { end: true });
  //  const video = await getVideos();
  //  console.log(video)
    // if (!range) {
    //   res.status(400).send('Requires Range Header');
    // }

    // const videoPath = responseArr[0];
    // const CHUNK_SIZE = 10 ** 6;
    // const start = Number(range.replace(/\D/g, ''));
    // const headers = {
    //   'Content-Range': 'bytes 2000',
    //   'Accept-Ranges': 'bytes',
    //   'Content-Length': 5000,
    //   'Content-Type': 'video/mp4',
    // };

    // res.writeHead(206, headers);
    // console.log(got.stream(videoPath));
    // got.stream(videoPath).pipe(res);
    res.render('homepage', {
      // video: video,
    });
  } catch (err) {
    console.log(err);
  }
});

// const authClient = new google.auth.OAuth2(ClientID, ClientSecret);

// const youtubeLive = google.youtube({
//   version: 'v3',
//   auth: authClient,
//   params: { part: 'snippet,cdn,status' },
// });

// const streamMetadata = {
//   title: 'Live Stream Title',
//   description: 'Live Stream Description',
//   format: '720p',
//   ingestionType: 'rtmp',
// };

app.listen(4000);
