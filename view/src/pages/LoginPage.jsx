import React, { useContext, useState } from 'react';
import authContext from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';

import './../styles/formStyles.scss';

const LoginPage = () => {
  const navigateTo = useNavigate();

  const authContxt = useContext(authContext);
  const { loginUser } = authContxt;

  const [formData, setFormData] = useState({
    userPassword: '',
    emailAddress: '',
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(formData, navigateTo);
  };

  return (
    <div className="login-container">
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
        <input type="submit" value="Login" className="login-btn " />
      </form>
      <span className="signup__note">
        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
      </span>
    </div>
  );
};

export default LoginPage;
