import React, { useState, useContext } from 'react';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import AlertComponent from '../components/AlertComponent';
import authContext from '../contexts/AuthContext';

import './../styles/formStyles.scss';

const ForgetPasswordPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const authContxt = useContext(authContext);

  const onChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (authContxt.isLoading) return;
    authContxt.forgotUserPassword(emailAddress);
  };

  return (
    <div className="forgotpassword-container">
      <AlertComponent />
      <form className="auth__form" onSubmit={onSubmit}>
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
        <button className="login-btn " onClick={onSubmit}>
          {/* NOTE:'condtional rendering logic for displaying either the loading animation or 'done'  */}
          {authContxt.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="22"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'done'
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
