import React from 'react';
import './../styles/modalStyles.scss';

const ModalBackground = ({ children }) => {
  return <div className="modal_bg">{children}</div>;
};

export default ModalBackground;
