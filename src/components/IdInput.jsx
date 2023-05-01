import React, { useState } from 'react';

const IdInput = ({ getMeetingId }) => {
  const [id, setId] = useState(null);

  return (
    <div>
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
