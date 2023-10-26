import React from 'react';

const LoadingFallBack = () => {
  const style = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  };
  return (
    <div style={style}>
      <img
        src="/img/circle-loader.gif"
        style={{
          maxHeight: '7em',
          minHeight: '7em',
          minWidth: '7em',
          maxWidth: '7em',
          marginTop: '50%',
        }}
      />
    </div>
  );
};

export default LoadingFallBack;
