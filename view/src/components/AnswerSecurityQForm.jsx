import React, { useContext, useState, useEffect } from 'react';
import attendanceContext from '../contexts/AttendanceContext';
/**
 * This component is the form that will recieve one random
 * security question from 'AttendanceContext' for the student to answer in order to sign his/her attendance
 * @returns JSX form element
 */
const AnswerSecurityQForm = () => {
  const attendanceContxt = useContext(attendanceContext);
  const [formData, setFormData] = useState({ secretAnswer: '' });

  const [timeLeft, setTimeLeft] = useState(10);
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
    if (isNoTimeLeft) {
      return;
    }
    attendanceContxt.answerQuestionAndSignAttendance(formData);
  };
  return (
    <div>
      <span>Time remaining: {timeLeft}</span>

      <form onSubmit={onSubmit}>
        <label>
          {attendanceContxt.studentRandomQ &&
            attendanceContxt.studentRandomQ.secretQs}
        </label>
        <input
          type={'text'}
          value={formData.secretAnswer}
          required
          name="secretAnswer"
          onChange={onChange}
        />
        {/* NOTE: CONDITIONAL RENDERING FOR THE FORM SUBMIT BUTTON (IF THE TIME TO ANSWER THE QUESTION HAS ELAPSED) */}
        {!isNoTimeLeft ? <input type={'submit'} value="done" /> : ''}
      </form>
    </div>
  );
};

export default AnswerSecurityQForm;
