import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './../styles/formStyles.scss';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const { token } = useParams();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="resetpassword-container">
      <form className="auth__form">
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Password:{' '}
          </label>
          <input
            onChange={onChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
          />
        </div>
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Confirm password:{' '}
          </label>
          <input
            onChange={onChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
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

export default ResetPasswordPage;
