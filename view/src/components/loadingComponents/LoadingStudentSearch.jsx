import React from 'react';
import './../../styles/skeletonStyle.scss';

const LoadingStudentSearch = () => {
  return (
    <div className="skeleton" style={{ padding: '0 1em' }}>
      <div className="skeleton_item">
        <div className="skeleton__info" style={{ width: '100%' }}>
          <div
            className="image"
            style={{
              maxHeight: '5em',
              minHeight: '5em',
              minWidth: '5em',
              maxWidth: '5em',
              borderRadius: '20px',
              marginTop: '.1em',
            }}
          ></div>
          <div className="skeleton_name__privilege">
            <h2 style={{ height: '30px' }}></h2>
            <p></p>
          </div>
        </div>
        <div
          className="skeleton_controls"
          style={{
            maxHeight: '3em',
            minHeight: '3em',
            minWidth: '3em',
            maxWidth: '3em',
            borderRadius: '10px',
            marginTop: 'auto',
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingStudentSearch;
