import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';
import AlertComponent from '../components/AlertComponent';

import './../styles/formStyles.scss';
const stat = 1;
const LoginPage = () => {
  const navigateTo = useNavigate();

  const authContxt = useContext(authContext);
  const { loginUser } = authContxt;
  useEffect(() => {
    authContxt.setNavBarVisibilty(false);
  }, [stat]);
  const [formData, setFormData] = useState({
    userPassword: '',
    emailAddress: '',
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (authContxt.isLoading) return;
    loginUser(formData, navigateTo);
  };

  return (
    <div className="login-container">
      <AlertComponent />
      <p className="form__name">login</p>
      <h1 className="logo">LOGO</h1>
      <form onSubmit={onSubmit} className={'auth__form'}>
        {/* EMAIL-ADDRESS INPUT */}
        <div className="form__group">
          <label className="form__label">Email Address: </label>
          <input
            className="form__input"
            type="email"
            placeholder="Youremail@example.com"
            required
            name="emailAddress"
            value={formData.emailAddress}
            onChange={onChange}
          />
        </div>
        {/* PASSWORD INPUT */}
        <div className="form__group">
          <label className="form__label">Password: </label>
          <input
            className="form__input"
            type="password"
            placeholder="• • • • • • • •"
            required
            name="userPassword"
            value={formData.userPassword}
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
            'login'
          )}
        </button>
      </form>
      <span className="signup__note">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </span>
    </div>
  );
};

export default LoginPage;
