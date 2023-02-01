import React, { useState, useContext } from 'react';
import { UilTimes } from '@iconscout/react-unicons';

import attendanceContext from '../contexts/AttendanceContext';

import './../styles/scoresStyle.scss';
import './../styles/profileStyle.scss';
/**
 * This component renders the form use to control the attendance scores recieved, by setting the start & end date,
 * as well as the faculties and courses
 * @returns JSX form
 */
const ControlScoresForm = ({ isModalActive, setIsModalActive }) => {
  const attendanceContxt = useContext(attendanceContext);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  /**
   *The Date Select-Option Input:
   *This "onChange" event handler is responsible for changing the date input values
   * @param {*} e The event Object
   */
  const onDateInputsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* -------THE FORM ONSUBMIT EVEVNT HANDLERS------- */
  const onsubmit = (e) => {
    e.preventDefault();
    //EDGE-CASE: IF THERES NO SELECTED FACULTY AND COURSE
    attendanceContxt.loadAttendanceScores(formData);
    setIsModalActive(!isModalActive);
  };
  return (
    <form onSubmit={onsubmit} className={`control__form`}>
      <div
        className="cancel__icon"
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        <UilTimes color="#5F5E5E" size="30" />
      </div>
      <div className="illustration__container">
        <img src={`/img/businessman-explaining-the-strategy.png`} />
        <h1>Let's Get Started.</h1>
        <p>
          Choose a start & end date, as well as the faculty to get the specific
          course you want
        </p>
      </div>
      <label className="form__label">Dates: </label>
      <div className="form__group start__end__dates">
        <input
          required
          name="startDate"
          type={'datetime-local'}
          value={formData.startDate}
          onChange={onDateInputsChange}
          className={`form__input start__date`}
        />
        <span className="dash">-</span>
        <input
          required
          name="endDate"
          type={'datetime-local'}
          value={formData.endDate}
          onChange={onDateInputsChange}
          className={`form__input end__date`}
        />
      </div>

      <input type={'submit'} className="sub__btn" onClick={onsubmit} />
    </form>
  );
};

export default ControlScoresForm;
