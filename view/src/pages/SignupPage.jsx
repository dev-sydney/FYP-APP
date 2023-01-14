import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import AlertComponent from '../components/AlertComponent';

import authContext from '../contexts/AuthContext';
import resourceContext from '../contexts/ResourceContext';

import './../styles/formStyles.scss';
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
  const [allFieldsComplete, setAllFieldsComplete] = useState(false);
  const [showSecondStep, setShowStep] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    if (!Object.values(formData).includes('')) {
      setAllFieldsComplete(true);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    authContxt.signupUser(formData, navigateTo);
  };
  return (
    <div className="signup-container">
      <AlertComponent />
      <p className="form__name">Sign up</p>
      <h1 className="logo">LOGO</h1>

      <form className="signup__form">
        {/* -------FACULTY SELECT ------- */}
        <div
          className={`form__group--signup ${!showSecondStep ? 'hide' : 'show'}`}
        >
          <select name="facultyId" onChange={onChange} required>
            <option>Faculty </option>
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

        {/* -------INDEX NUMBER INPUT------- */}
        <div
          className={`form__group--signup ${!showSecondStep ? 'hide' : 'show'}`}
        >
          <input
            type={'number'}
            placeholder="Index number eg.12345678"
            required
            name="indexNumber"
            className="form__input--signup"
            onChange={onChange}
            minLength={'8'}
            maxLength={'8'}
          />
        </div>
        {/* -------FIRST & LAST NAME INPUT------- */}
        <div
          className={`double__input form__group--signup ${
            showSecondStep && 'hide'
          }`}
        >
          <input
            className={`input form__input--signup`}
            type="text"
            placeholder="last name"
            required
            name="surName"
            value={formData.surName}
            onChange={onChange}
            minLength={'3'}
            maxLength={'15'}
          />
          <input
            className={`input form__input--signup`}
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
        <div
          className={`form__group--signup ${showSecondStep ? 'hide' : 'show'}`}
        >
          <input
            className="form__input--signup"
            type="email"
            placeholder="Email address"
            required
            name="emailAddress"
            value={formData.emailAddress}
            onChange={onChange}
          />
        </div>

        {/* -------PASSWORD INPUT------- */}
        <div
          className={`form__group--signup ${showSecondStep ? 'hide' : 'show'}`}
        >
          <input
            className="form__input--signup"
            type={'password'}
            placeholder="Password"
            required
            name="userPassword"
            value={formData.userPassword}
            onChange={onChange}
          />
        </div>
        {/* -------PASSWORD CONFIRM INPUT------- */}
        <div
          className={`form__group--signup ${showSecondStep ? 'hide' : 'show'}`}
        >
          <input
            className="form__input--signup"
            type={'password'}
            placeholder="Confirm password"
            required
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={onChange}
          />
        </div>
        {!showSecondStep && (
          <span className={`login__note`}>
            Already have an account? <NavLink to={'/login'}>Log in</NavLink>
          </span>
        )}

        {/* NOTE: CONDITIONAL RENDERING FOR THE 'NEXT-STEP' & 'SIGN-UP' BUTTONS */}
        {showSecondStep ? (
          <span className="back--signup__container">
            <input
              type={'button'}
              value={'Back'}
              className={'back__btn'}
              onClick={() => {
                setShowStep(!showSecondStep);
              }}
            />

            <input
              type={'button'}
              value="Sign up"
              className="signup-btn"
              onClick={onSubmit}
            />
          </span>
        ) : (
          <input
            disabled={formData.passwordConfirm === '' ? true : false}
            type={'button'}
            value="continue"
            className={`signup-btn continue__btn ${
              allFieldsComplete ? 'active__btn' : 'inactive__btn'
            }`}
            onClick={() => {
              if (!allFieldsComplete) return;
              setShowStep(!showSecondStep);
            }}
          />
        )}
      </form>
    </div>
  );
};

export default SignupPage;
