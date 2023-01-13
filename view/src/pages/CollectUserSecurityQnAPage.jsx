import React, { useState } from 'react';
import SecurityQForm from '../components/SecurityQForm';
import './../styles/CollectQnAStyle.scss';

const CollectUserSecurityQnAPage = () => {
  const [isInfoHidden, setIsInfoHidden] = useState(false);
  const [isInfoTransparent, setIsInfoTransparent] = useState(false);

  const onBtnClick = () => {
    //TODO: MAKE THE OPACITY 0
    setIsInfoTransparent(!isInfoTransparent);
    //AFTER SOME TIME SET THE DISPLAY TO NONE
    setTimeout(() => {
      setIsInfoHidden(!isInfoHidden);
    }, 400);
  };
  return (
    <div className="collectQnA__container">
      <div
        style={{ opacity: `${isInfoTransparent ? 0 : 1}` }}
        className={`info_modal ${isInfoHidden ? 'hide_info' : ''}`}
      >
        <div className="info__block">
          <div className="info_illustration">
            <img
              src="/img/bonbon-secure-protection-with-fingerprint-and-lock.png"
              alt=""
            />
            <h2>Before We Get Started</h2>
            <p>
              We would like to know you better by answering a series of
              questions. These questions would be asked everytime you try to
              sign attendance.Please don't share these information with anyone
              else, incase your'e having a hard time answering some of these
              questions, feel free to improvise your answers :)
            </p>
          </div>
          <button className="start_btn" onClick={onBtnClick}>
            Got it
          </button>
        </div>
      </div>
      <SecurityQForm />
    </div>
  );
};

export default CollectUserSecurityQnAPage;
