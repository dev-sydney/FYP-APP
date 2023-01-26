import React, { useState, useContext } from 'react';

import attendanceContext from '../contexts/AttendanceContext';

import {
  UilAngleDown,
  UilSpinnerAlt,
  UilPlus,
  UilMinus,
} from '@iconscout/react-unicons';

import './../styles/attendanceStyle.scss';
/**
 * The component is the form that the lecturer will use to create start an ongoing attendance
 * @param {*} param0
 * @returns
 */
const AttendanceForm = ({ QRcodeData, setQRcodeData, setDidProfessorScan }) => {
  const attendanceContxt = useContext(attendanceContext);

  const [duration, setDuration] = useState(5);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (attendanceContxt.isLoading) return;

    attendanceContxt.startOngoingAttendance(duration, QRcodeData);

    setTimeout(() => {
      setDidProfessorScan(false);
    }, 200);
  };

  return (
    <div className="attendance__form__container">
      <span
        onClick={() => {
          setDidProfessorScan(false);
          setQRcodeData('');
        }}
      >
        <UilAngleDown color="#ADADAD" size="40" />
      </span>
      <form onSubmit={onSubmit} className={'attendance__form'}>
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
            margin: '1em 0',
          }}
        >
          <div className="duration__controls">
            <div
              onClick={() => {
                setDuration(duration <= 5 ? duration : duration - 5);
              }}
              className="control__icon"
            >
              <UilMinus size="30" color="#9e9e9e" />
            </div>

            <div style={{ margin: '0 0.7em' }}>
              <b className="duration__value">{duration}</b>
              <p>minutes</p>
            </div>

            <div
              className="control__icon"
              onClick={() => {
                setDuration(duration >= 20 ? duration : duration + 5);
              }}
            >
              <UilPlus size="30" color="#9e9e9e" />
            </div>
          </div>
        </div>

        <button className="start__btn" onClick={onSubmit}>
          {attendanceContxt.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="23"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'start'
          )}
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
