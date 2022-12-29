import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import authContext from '../contexts/AuthContext';
import resourceContext from '../contexts/ResourceContext';
// import './../styles/formStyles.scss';
const stat = 1;
const SignupPage = () => {
  const navigateTo = useNavigate();

  const authContxt = useContext(authContext);
  const resourceContxt = useContext(resourceContext);
  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);
  const [formData, setFormData] = useState({
    surName: '',
    otherNames: '',
    userPassword: '',
    passwordConfirm: '',
    emailAddress: '',
    facultyId: 0,
    indexNumber: 0,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    authContxt.signupUser(formData, navigateTo);
  };
  return (
    <div className="login-container">
      <p className="form__name">Sign up</p>
      <h1 className="logo">LOGO</h1>
      SignupPage
      <form className="auth-form" onSubmit={onSubmit}>
        {/* -------LAST NAME INPUT------- */}
        <div className="form__group">
          <label className="form__label">Last name: </label>
          <input
            className="form__input"
            type="text"
            placeholder="last name"
            required
            name="surName"
            value={formData.surName}
            onChange={onChange}
            minLength={'3'}
            maxLength={'15'}
          />
        </div>

        {/* -------OTHER NAMES INPUT------- */}
        <div className="form__group">
          <label className="form__label">Other names: </label>
          <input
            className="form__input"
            type="text"
            placeholder="other names"
            required
            name="otherNames"
            value={formData.otherNames}
            onChange={onChange}
            minLength={'3'}
            maxLength={'100'}
          />
        </div>
        {/* -------EMAIL INPUT------- */}
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
        {/* -------FACULTY SELECT ------- */}
        <div className="form__group">
          <label className="form__label">Faculty: </label>
          <select name="facultyId" onChange={onChange} required>
            <option>---- Please select a faculty ----</option>
            {/*EDGE-CASE: IF THERES NO FACULTIES LOADED YET RENDER "LOADING..."  */}
            {!resourceContxt.faculties ? (
              <option> loading... </option>
            ) : (
              resourceContxt.faculties.map((faculty) => (
                <option value={faculty.facultyId} key={faculty.facultyId}>
                  {faculty.facultyName}
                </option>
              ))
            )}
          </select>
        </div>
        {/* -------PASSWORD INPUT------- */}
        <div className="form__group">
          <label className="form__label">Password: </label>
          <input
            className="form__input"
            type={'password'}
            placeholder="• • • • • • • •"
            required
            name="userPassword"
            value={formData.userPassword}
            onChange={onChange}
          />
        </div>
        {/* -------PASSWORD CONFIRM INPUT------- */}
        <div className="form__group">
          <label className="form__label">Confirm password: </label>
          <input
            className="form__input"
            type={'password'}
            placeholder="• • • • • • • •"
            required
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={onChange}
          />
        </div>
        {/* -------INDEX NUMBER INPUT------- */}
        <div className="form__group">
          <label className="form__label">Index number: </label>
          <input
            className="form__input"
            type={'number'}
            placeholder="eg.12345678"
            required
            name="indexNumber"
            value={formData.indexNumber}
            onChange={onChange}
            minLength={'8'}
            maxLength={'8'}
          />
        </div>
        <input type={'submit'} value="Sign up" />
      </form>
    </div>
  );
};

export default SignupPage;
