import React, { useState } from 'react';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { authToken, createMeeting } from '../api';
import UploadVideo from '../components/UploadVideo';
import { Link } from 'react-router-dom';

import MeetingView from '../components/MeetingView';
import JoinScreen from '../components/JoinScreen';

function Admin() {
  const [meetingId, setMeetingId] = useState(null);

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState('CONFERENCE');

  //Getting MeetingId from the API we created earlier
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'Parrotias livestream',
        //These will be the mode of the participant CONFERENCE or VIEWER
        mode: mode,
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <>
      <div className='adminContainer'>
        <nav>
          <h2>
            Welcome Boss click create meeting to start a livestream and
            conference or choose a file to upload video
          </h2>
          <p>PS: Sorry for the ugly layout styling will be made soon</p>
          <Link to='/'>Return to watch videos </Link>
        </nav>
        <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
        <UploadVideo />
      </div>
    </>
  );
}

export default Admin;
