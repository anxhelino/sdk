import React, { useState } from 'react';
import ViewerView from '../components/ViewerView';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { authToken } from '../api';
import IdInput from '../components/IdInput';

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
    <IdInput getMeetingId={getMeetingId} />
  );
};

export default Viewer;
