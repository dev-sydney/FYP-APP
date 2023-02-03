import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UilBooks, UilAngleRight } from '@iconscout/react-unicons';

import attendanceContext from '../contexts/AttendanceContext';
import './../styles/attendanceStyle.scss';

const AttendedLecturesPage = () => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace('T', ' '),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.startDate === '' || formData.endDate === '') return;

    attendanceContxt.loadAttendedLectures(formData);
  };
  return (
    <div className="attendedLectures__container">
      <section className="heading_section">
        <h1>
          Lectures you've attended,
          <br />
          This semester
        </h1>
      </section>

      <form onSubmit={onSubmit}>
        <div style={{ textAlign: 'left', padding: '0 1em' }}>
          <label htmlFor="">Dates:</label>
        </div>
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
        <input type={'submit'} className="sub__btn" onClick={onSubmit} />
      </form>

      <section className="lists_section">
        <div className="lists__items">
          {attendanceContxt.attendedLectures &&
            (attendanceContxt.attendedLectures.length > 0
              ? attendanceContxt.attendedLectures.map((el) => (
                  <div className="attended_course" key={el.courseId}>
                    <div className="course_title">
                      <div className="icon">
                        <UilBooks
                          size="40"
                          color="#676666"
                          style={{
                            padding: '.5em',
                            borderRadius: '10px',
                            background: '#8e18b930',
                          }}
                        />
                      </div>
                      <h3>{el.courseName}</h3>
                      <div className="icon" style={{ marginLeft: 'auto' }}>
                        <UilAngleRight size="30" color="#676666" />
                      </div>
                    </div>

                    <div className="lectures_scores">
                      <div className="lecture_num">
                        <p>
                          <b>{el.TimesAttended}</b> lecture
                          {el.TimesAttended > 1 && 's'}
                        </p>
                        <p style={{ color: 'gray' }}>Attended</p>
                      </div>
                      <div className="score_num">
                        <p>
                          <b>{el.Total}</b> points
                        </p>
                        <p style={{ color: 'gray' }}>Gathered</p>
                      </div>
                      <div className="course_code">{el.courseCode}</div>
                    </div>
                  </div>
                ))
              : 'No Results Found')}
        </div>
      </section>
    </div>
  );
};

export default AttendedLecturesPage;
