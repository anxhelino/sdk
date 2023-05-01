import React, { useState } from 'react';

const IdInput = ({ getMeetingId }) => {
  const [id, setId] = useState(null);

  return (
    <div>
      <p>Enter livestream Id to access a livestream</p>
      <input type='text' onChange={(e) => setId(e.target.value)} />
      <button
        type='button'
        onClick={() => {
          getMeetingId(id);
        }}
      >
        Enter Livestream
      </button>
    </div>
  );
};

export default IdInput;
