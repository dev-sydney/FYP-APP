import React, { useContext, useState, useEffect } from 'react';
import attendanceContext from '../contexts/AttendanceContext';
import { UilAngleDown } from '@iconscout/react-unicons';

import './../styles/componentsStyles.scss';
/**
 * This component is the form that will recieve one random
 * security question from 'AttendanceContext' for the student to answer in order to sign his/her attendance
 * @returns JSX form element
 */
const AnswerSecurityQForm = () => {
  const attendanceContxt = useContext(attendanceContext);
  const [formData, setFormData] = useState({ secretAnswer: '' });

  const [timeLeft, setTimeLeft] = useState(20); //TODO: REVERT BACK TO 10
  const [isNoTimeLeft, setIsNoTimeLeft] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsNoTimeLeft(true);
      setTimeLeft(0);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //EDGE-CASE: IF THE TIME TO ANSWER THE SECURITY QUESTION HAS ELASPED
    if (timeLeft <= 0) {
      return;
    }
    attendanceContxt.answerQuestionAndSignAttendance(formData);
  };
  return (
    <div className={`answer__securityQ`}>
      <span
        onClick={() => {
          if (timeLeft !== 0) return;
          attendanceContxt.clearRandomSecurityQuestion();
        }}
      >
        <UilAngleDown
          color={`${timeLeft <= 0 ? '#353535' : '#ADADAD'}`}
          size="40"
        />
      </span>
      <div className="time__left">
        <h2 style={{ color: `${timeLeft <= 3 ? 'red' : 'green'}` }}>
          {timeLeft}
        </h2>
        <p>Sec</p>
      </div>

      <form onSubmit={onSubmit} className={`answer_securityQ__form`}>
        {/* <label className="securityQ__label">
          What was the first class or lecture you skipped in Universty?
        </label> */}
        <label className="securityQ__label">
          {attendanceContxt.studentRandomQ &&
            attendanceContxt.studentRandomQ.secretQs}
        </label>
        <input
          type={'text'}
          value={formData.secretAnswer}
          required
          name="secretAnswer"
          onChange={onChange}
          className={`form__input`}
          placeholder="Your answer"
        />
        {/* NOTE: CONDITIONAL RENDERING FOR THE FORM SUBMIT BUTTON (IF THE TIME TO ANSWER THE QUESTION HAS ELAPSED) */}

        <input
          type={'submit'}
          value={`${attendanceContxt?.isLoading ? '• • •' : 'done'}`}
          className={`${timeLeft <= 0 ? 'inactive' : 'active'}`}
          onClick={onSubmit}
        />

        {/* {!isNoTimeLeft ? (
          <input type={'submit'} value="done" className="done__btn" />
        ) : (
          ''
        )} */}
      </form>
    </div>
  );
};

export default AnswerSecurityQForm;
