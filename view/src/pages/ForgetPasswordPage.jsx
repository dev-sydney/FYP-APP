import React, { useState, useContext, useEffect } from 'react';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';

import './../styles/formStyles.scss';

const stat = 1;
const ForgetPasswordPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const authContxt = useContext(authContext);

  useEffect(() => {
    authContxt.setNavBarVisibilty(false);
  }, [stat]);

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
