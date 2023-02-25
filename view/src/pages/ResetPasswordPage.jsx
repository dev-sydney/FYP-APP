import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import './../styles/formStyles.scss';
import authContext from '../contexts/AuthContext';

const stat = 1;
const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const { token } = useParams();
  const navigateTo = useNavigate();

  const authContxt = useContext(authContext);
  useEffect(() => {
    authContxt.setNavBarVisibilty(false);
  }, [stat]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (authContxt.isLoading) return;
    console.log({ formData, token });
    authContxt.resetUserPassword(formData, token, navigateTo);
  };
  return (
    <div className="resetpassword-container">
      <form className="auth__form" onSubmit={onSubmit}>
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Password:{' '}
          </label>
          <input
            name="password"
            onChange={onChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
            value={formData.password}
          />
        </div>
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Confirm password:{' '}
          </label>
          <input
            name="passwordConfirm"
            onChange={onChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
            value={formData.passwordConfirm}
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

export default ResetPasswordPage;
