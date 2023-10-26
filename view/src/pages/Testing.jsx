import React from 'react';
// import LoadingFallBack from '../components/loadingComponents/LoadingFallBack';
import DialogBox from '../components/DialogBox';
import ModalBackground from '../components/ModalBackground';

const Testing = () => {
  return (
    <div style={{ minHeight: 'inherit' }}>
      <ModalBackground children={<DialogBox />} />
    </div>
  );
};

export default Testing;
