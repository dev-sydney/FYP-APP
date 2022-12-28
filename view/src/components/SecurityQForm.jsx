import React, { useContext, useState, useEffect } from 'react';
import authContext from '../contexts/AuthContext';

import './../styles/modalStyles.scss';
const staticValue = 1;
/**
 * This component is the form that will recieve a series of random questions from 'AttendanceContext'
 * for the student to answer as their personal security questions
 * @param {*} param0
 * @returns
 */
const SecurityQForm = ({ setIsModalActive, isModalActive }) => {
  const authContxt = useContext(authContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    authContxt.loadSecurityQuestions();
  }, [staticValue]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toLowerCase() });
  };

  const onSaveBtnClick = (e) => {
    e.preventDefault();
    //EDGE-CASE: IF THERE IS AN EMPTY FIELD
    if (Object.values(formData).some((answer) => answer === '')) {
      console.log('No Duplicate fields allowed');
      return;
    }
    //EDGE-CASE: IF THERE ARE DUPLICATED FIELD VALUES
    if (
      [...new Set(Object.values(formData))].length !==
      authContxt.securityQuestions.length
    ) {
      console.log('No duplicate answers allowed');
      return;
    }
    //NOTE: ATP FORMDATA VALUES ARE VALID
    authContxt.answerSecurityQuestions(formData);
  };
  return (
    <div className="test_styling">
      Security Question Modal
      <span
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        ❌
      </span>
      <div>
        {currentSlide + 1} /{' '}
        {authContxt.securityQuestions && authContxt.securityQuestions.length}
      </div>
      {/* TODO: THIS RIGHT HERE,BELOW WILL BE THE FORM */}
      <form className="qs_container">
        {/* TODO: INSIDE THE FORMS WILL BE THE DYNAMICALLY RENDERED FORM GROUPS */}
        {authContxt.securityQuestions &&
          authContxt.securityQuestions.map((question, i) => (
            <div
              className="question form-group"
              key={i}
              style={{
                transform: `translateX(${100 * (i - currentSlide)}%)`,
              }}
            >
              <label>{question.question} </label>
              <input
                required
                autoComplete="on"
                type={'text'}
                minLength={3}
                name={question.question}
                onChange={onChange}
              />
            </div>
          ))}
      </form>
      {/* CONDITIONAL RENDERING FOR THE BACK BUTTON */}
      {currentSlide > 0 ? (
        <button
          onClick={() => {
            setCurrentSlide(currentSlide - 1);
          }}
        >
          back
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
          >
            next
          </button>
        ) : (
          ''
        ))}
      {/* CONDITIONAL RENDERING FOR THE SAVE BUTTON BELOW*/}
      {authContxt.securityQuestions &&
      currentSlide + 1 === authContxt.securityQuestions.length ? (
        <div>
          <button onClick={onSaveBtnClick}>
            {authContxt.isLoading ? 'sending...' : 'save'}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SecurityQForm;
