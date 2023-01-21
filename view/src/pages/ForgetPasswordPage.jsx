import React, { useState } from 'react';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import './../styles/formStyles.scss';

const ForgetPasswordPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const onChange = (e) => {
    setEmailAddress(e.target.value);
  };

  return (
    <div className="forgotpassword-container">
      <form className="auth__form">
        <div className="form__group">
          <input
            className="form__input"
            type="email"
            placeholder="Youremail@example.com"
            required
            name="emailAddress"
            value={emailAddress}
            onChange={onChange}
          />
        </div>
        <button className="login-btn ">
          {/* NOTE:'condtional rendering logic for displaying either the loading animation or 'done'  */}
          Done
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
