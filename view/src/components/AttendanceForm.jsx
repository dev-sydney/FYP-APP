import React, { useState, useContext, useEffect } from 'react';

import attendanceContext from '../contexts/AttendanceContext';
import resourceContext from '../contexts/ResourceContext';
import { UilAngleDown } from '@iconscout/react-unicons';

import './../styles/attendanceStyle.scss';
const stat = 1;
/**
 * The component is the form that the lecturer will use to create start an ongoing attendance
 * @param {*} param0
 * @returns
 */
const AttendanceForm = ({ QRcodeData, setQRcodeData, setDidProfessorScan }) => {
  const attendanceContxt = useContext(attendanceContext);
  const resourceContxt = useContext(resourceContext);

  useEffect(() => {
    //LOADS ALL THE FACULTIIES
    resourceContxt.loadAllFaculties();
  }, [stat]);

  const [formData, setFormData] = useState({
    facultyId: 0,
    courseId: 0,
    duration: 5,
  });
  /* -------THE SELECT OPTIONS ONCHANGE EVENT HANDLERS------- */

  /**
   *The Faculties Select-Option Input:
   *This "onChange" event handler loads all the courses belonging to the selected faculty
   * @param {Object} e The event Object
   */
  const onFacultySelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    resourceContxt.loadAllCourses(e.target.value);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    attendanceContxt.startOngoingAttendance(formData, QRcodeData);
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
      <form
        onSubmit={onSubmit}
        className={'attendance__form'}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="form_group"
          style={{
            display: 'flex',
            columnGap: '10px',
            marginBottom: '1rem',
          }}
        >
          <select
            id="faculty"
            name="facultyId"
            required
            onChange={onFacultySelectChange}
            className={`form__input`}
          >
            <option>faculty</option>
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

          <select
            id="course"
            name="courseId"
            required
            onChange={onChange}
            className={`form__input`}
          >
            <option>Course</option>
            {/*EDGE-CASE: IF THERES NO COURSES LOADED YET, RENDER "NO RESULTS FOUND..."  */}

            {!resourceContxt.courses || resourceContxt.courses.length === 0 ? (
              <option> No results found </option>
            ) : (
              resourceContxt.courses.map((course) => (
                <option value={course.courseId} key={course.courseId}>
                  {course.courseName}
                </option>
              ))
            )}
          </select>
        </div>

        <div
          className="form_group"
          style={{ margin: '0 1.5em', marginBottom: '1rem' }}
        >
          <label style={{ textAlign: 'center' }}>
            <b
              style={{
                fontWeight: '1em',
                fontSize: '1.5em',
                textAlign: 'center',
              }}
            >
              {formData.duration}
            </b>
            <p>minutes</p>{' '}
          </label>
          <input
            type={'range'}
            name="duration"
            max="20"
            min="5"
            step={5}
            required
            onChange={onChange}
            value={formData.duration}
            className={`form__input`}
          />
        </div>
        <button className="start__btn" onClick={onSubmit}>
          start
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
