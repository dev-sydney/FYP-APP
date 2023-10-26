import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UilBooks,
  UilAngleRight,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';

import attendanceContext from '../contexts/AttendanceContext';
import './../styles/attendanceStyle.scss';
/**
 * This page component renders information about the courses lectures attended between
 * a specified span of time.The information here is the number of lecturers attended &
 * the marks gathered so far for that course
 * @returns
 */
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

    attendanceContxt.getAttendedLecturesSummaries(formData);
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
          <span className="dash">to</span>
          <input
            required
            name="endDate"
            type={'datetime-local'}
            value={formData.endDate}
            onChange={onDateInputsChange}
            className={`form__input end__date`}
          />
        </div>
        <button className="sub__btn" onClick={onSubmit}>
          {attendanceContxt.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="22"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'submit'
          )}
        </button>
      </form>

      <section className="lists_section">
        <div className="lists__items">
          {attendanceContxt.attendedLecturesSummaries &&
            (attendanceContxt.attendedLecturesSummaries.length > 0
              ? attendanceContxt.attendedLecturesSummaries.map((el, i) => (
                  <div
                    className="attended_course"
                    onClick={() => {
                      attendanceContxt.setCurrentCourseName(el.courseName);
                    }}
                    key={i}
                  >
                    <Link
                      key={el.courseId}
                      to={`/attendedLectures/${el.courseId}`}
                    >
                      <div className="course_title">
                        <div className="icon">
                          <UilBooks
                            size="40"
                            color="#676666"
                            style={{
                              padding: '.5em',
                              borderRadius: '10px',
                              background: attendanceContxt.coursesColors[i],
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
                            <b>{el.Total}</b> marks
                          </p>
                          <p style={{ color: 'gray' }}>Scored</p>
                        </div>
                        <div
                          className="course_code"
                          style={{
                            background: attendanceContxt.coursesColors[i],
                            color: 'black',
                          }}
                        >
                          {el.courseCode}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : 'No Results Found')}
        </div>
      </section>
    </div>
  );
};

export default AttendedLecturesPage;
