import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';

import './../styles/profileStyle.scss';

const ChangePasswordPage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();

  const [securityFormData, setSecurityFormData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const onPasswordFieldsChange = (e) => {
    setSecurityFormData({
      ...securityFormData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) navigateTo('/login');

    //EDGE-CASE: IF THE USER IS A STUDENT & HAS NO SECURITY QUESTIONS SET
    if (
      authContxt.user.privilege === 'student' &&
      authContxt.user.hasSecurityQuestionsSet === 0
    ) {
      navigateTo('/user-securityQnAs');
    }
  }, []);

  /**
   * The event handler function that takes of the submit action when the securitySettings form gets submitted
   * @param {*} e
   */
  const onPasswordFormSubmit = (e) => {
    e.preventDefault();
    if (authContxt.isLoading) return;

    authContxt.updateUserPassword(securityFormData);
  };
  return (
    <div className="change_password__container">
      <h1 style={{ textAlign: 'left', margin: '1em 0' }}>Security settings</h1>
      <form onSubmit={onPasswordFormSubmit}>
        <div className="input-block">
          <input
            onChange={onPasswordFieldsChange}
            type="password"
            name="currentPassword"
            value={securityFormData.currentPassword}
            id="input-text"
            required
          />
          <span className="placeholder">Current password</span>
        </div>

        <div className="input-block">
          <input
            onChange={onPasswordFieldsChange}
            type="password"
            name="newPassword"
            value={securityFormData.newPassword}
            id="input-text"
            required
          />
          <span className="placeholder">New password</span>
        </div>

        <div className="input-block">
          <input
            onChange={onPasswordFieldsChange}
            type="password"
            name="newPasswordConfirm"
            value={securityFormData.newPasswordConfirm}
            id="input-text"
            required
          />
          <span className="placeholder">Confrim password</span>
        </div>

        <button className="password_btn" onClick={onPasswordFormSubmit}>
          {authContxt.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="22"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'set new password'
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '.5em' }}>
        <Link to="/account/overview" style={{ color: 'gray' }}>
          <p>Cancel</p>
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
