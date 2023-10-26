import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';

// import './../styles/formStyles.scss';
import './../styles/profileStyle.scss';

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
      <div style={{ textAlign: 'center' }}>
        <p className="form__name">login</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1 className="logo">PRESENCEPAL</h1>
      </div>

      <form onSubmit={onSubmit} style={{ padding: '0 1%' }}>
        {/* EMAIL-ADDRESS INPUT */}
        <div className="input-block">
          <input
            // className="form__input"
            type="email"
            required
            name="emailAddress"
            value={formData.emailAddress}
            onChange={onChange}
            style={{ width: '95%' }}
          />
          <span className="placeholder">Email Address: </span>
        </div>

        {/* PASSWORD INPUT */}
        <div className="input-block">
          <input
            // className="form__input"
            type="password"
            // placeholder="• • • • • • • •"
            required
            name="userPassword"
            value={formData.userPassword}
            onChange={onChange}
            style={{ width: '95%' }}
          />
          <span className="placeholder">Password: </span>
        </div>
        <button
          className="password_btn"
          style={{ width: '100%', marginTop: '1em' }}
          onClick={onSubmit}
        >
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

        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <Link to="/forgot-password">
            <p> Forgot password?</p>
          </Link>
        </div>
      </form>
      <span className="signup__note">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </span>
    </div>
  );
};

export default LoginPage;
