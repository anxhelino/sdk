import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ViewerView from '../components/ViewerView';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { authToken } from '../api';
import IdInput from '../components/IdInput';
import FirebaseVideoView from '../components/FirebaseVideoView';

const Viewer = () => {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingId = (id) => {
    setMeetingId(id);
  };

  console.log(meetingId);
  return meetingId ? (
    <MeetingProvider
      config={{
        meetingId: meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'Parrotias livestream',
        //These will be the mode of the participant CONFERENCE or VIEWER
        mode: 'VIEWER',
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => {
          console.log('viewser');
          return <ViewerView />;
        }}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <>
      <div className='dashboard-container'>
        <nav>
          <h1>Welcome to dashboard</h1>
          <span>Want to upload video or start a livestream?</span>
          <Link to='/admin'>Admin Upload videos</Link>
          <span>
            PS: Layout to be fixed and styles to be added sorry for the ugly
            layout
          </span>
        </nav>
        <IdInput getMeetingId={getMeetingId} />
        <FirebaseVideoView />\
      </div>
    </>
  );
};

export default Viewer;
