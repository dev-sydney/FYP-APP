import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UilArrowRight,
  UilArrowLeft,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import authContext from '../contexts/AuthContext';

import './../styles/modalStyles.scss';
import './../styles/CollectQnAStyle.scss';

const staticValue = 1;
/**
 * This component is the form that will recieve a series of random questions from 'AttendanceContext'
 * for the student to answer as their personal security questions
 * @param {*} param0
 * @returns
 */
const SecurityQForm = () => {
  const authContxt = useContext(authContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    authContxt.loadSecurityQuestions();
  }, [staticValue]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toLowerCase() });
  };

  const onSaveBtnClick = (e) => {
    e.preventDefault();
    if (currentSlide + 1 !== authContxt.securityQuestions?.length) return;

    //EDGE-CASE: IF THERE IS AN EMPTY FIELD
    if (Object.values(formData).some((answer) => answer === '')) {
      setErrorMsg('Sorry buddy, gotta answer all the questions');
      return;
    }
    //EDGE-CASE: IF THERE ARE DUPLICATED FIELD VALUES
    if (
      [...new Set(Object.values(formData))].length !==
      authContxt.securityQuestions.length
    ) {
      setErrorMsg('Sorry buddy, duplicate answers not allowed');
      return;
    }
    //NOTE: ATP FORMDATA VALUES ARE VALID
    if (errorMsg !== null) setErrorMsg(null);
    authContxt.answerSecurityQuestions(formData, navigateTo);
  };
  return (
    <div className="QnA__container">
      <div className="progress_heading">
        <div style={{ width: 96, height: 96 }}>
          <CircularProgressbar
            value={currentSlide + 1}
            maxValue={
              authContxt.securityQuestions &&
              authContxt.securityQuestions.length
            }
            text={`${currentSlide + 1} of ${
              authContxt.securityQuestions &&
              authContxt.securityQuestions.length
            }`}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: `#AD1CEA`,
              textColor: '#000000',
            })}
          />
        </div>
        <div className="heading">
          <h2>Security Questions</h2>
          {/* NOTE: CONDTIONAL RENDERING BELOW FOR WHEN THE USER IS HALFWAY THROUGH ANSWERING THE QUESTIONS*/}
          <p>
            {(currentSlide + 1) * 2 >= authContxt.securityQuestions?.length
              ? 'Almost there!'
              : 'Lets get started'}
          </p>
        </div>
      </div>

      <p className="error__msg">{errorMsg ? errorMsg : ''}</p>

      {/* TODO: THIS RIGHT HERE,BELOW WILL BE THE FORM */}
      <form className="qs_container">
        {/* TODO: INSIDE THE FORMS WILL BE THE DYNAMICALLY RENDERED FORM GROUPS */}
        {authContxt.securityQuestions &&
          authContxt.securityQuestions.map((question, i) => (
            <div
              className="question form__group securityQ__group"
              key={i}
              style={{
                transform: `translateX(${100 * (i - currentSlide)}%)`,
              }}
            >
              <label
                // style={{ color: 'black' }}
                className="form__label securityQ__label"
              >
                {question.question}{' '}
              </label>
              <input
                required
                autoComplete="on"
                type={'text'}
                minLength={3}
                name={question.question}
                onChange={onChange}
                className="form__input securityQ__input"
              />
            </div>
          ))}
      </form>
      <div className="nav_buttons">
        {/* CONDITIONAL RENDERING FOR THE BACK BUTTON */}
        {currentSlide > 0 ? (
          <button
            onClick={() => {
              setCurrentSlide(currentSlide - 1);
            }}
            className="navigation__btn"
            style={{
              backgroundColor: 'white',
              color: '#8e18b9',
              outline: '1px solid #8e18b9',
            }}
          >
            <span style={{ display: 'flex' }}>
              <UilArrowLeft size="30" color="#8e18b9" />
              <span style={{ marginTop: '.4em' }}>back</span>
            </span>
          </button>
        ) : (
          ''
        )}

        {/* CONDITIONAL RENDERING FOR THE NEXT BUTTON BELOW*/}
        {/* NOTE: If the current slide value LESSER THAN OR EQUAL TO THE LENGTH OF THE Qs? Render the next btn*/}
        {authContxt.securityQuestions &&
          (currentSlide <= authContxt.securityQuestions.length - 2 ? (
            <button
              onClick={() => {
                setCurrentSlide(currentSlide + 1);
              }}
              className="navigation__btn"
              style={{ backgroundColor: '#8e18b9' }}
            >
              <span style={{ display: 'flex' }}>
                <span style={{ marginTop: '.4em' }}>next</span>
                <UilArrowRight size="30" color="#FFFFFF" />
              </span>
            </button>
          ) : (
            ''
          ))}
      </div>

      {/* CONDITIONAL RENDERING FOR THE SAVE BUTTON BELOW*/}

      <div
        className={`sub_container ${
          currentSlide + 1 === authContxt.securityQuestions?.length
            ? 'show_sub'
            : 'hide_btn'
        }`}
      >
        <button onClick={onSaveBtnClick} className={`submit__btn`}>
          {authContxt?.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="22"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'save'
          )}
        </button>
      </div>
    </div>
  );
};

export default SecurityQForm;
