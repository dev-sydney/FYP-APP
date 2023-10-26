import React from 'react';
import './../../styles/skeletonStyle.scss';

const LoadingQRcodeDetails = () => {
  return (
    <div className="skeleton_details_container skeleton">
      <div className="skeleton_icon"></div>
      <div className="skeleton_ph_container">
        <h2></h2>
        <p></p>
      </div>
      <div
        className="skeleton_icon"
        style={{
          maxHeight: '3em',
          minHeight: '3em',
          minWidth: '3em',
          maxWidth: '3em',
          marginTop: 'auto',
          marginBottom: '.4em',
        }}
      ></div>
    </div>
  );
};

export default LoadingQRcodeDetails;
