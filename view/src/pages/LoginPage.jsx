import React, { Fragment, useContext, useState } from 'react';
import authContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import './../styles/formStyles.scss';

const LoginPage = () => {
  const navigateTo = useNavigate();

  const authContxt = useContext(authContext);
  const { loginUser, user } = authContxt;

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
    <Fragment>
      LOGIN HERE
      <form onSubmit={onSubmit}>
        {/* EMAIL-ADDRESS INPUT */}
        <div className="form-group">
          <label>Email Address: </label>
          <input
            className="input"
            type="email"
            placeholder="Youremail@example.com"
            required
            name="emailAddress"
            value={formData.emailAddress}
            onChange={onChange}
          />
        </div>

        {/* PASSWORD INPUT */}
        <div className="form-group">
          <label>Password: </label>
          <input
            className="input"
            type="password"
            placeholder="• • • • • • • •"
            required
            name="userPassword"
            value={formData.userPassword}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Login" className="submit-btn" />
      </form>
    </Fragment>
  );
};

export default LoginPage;
